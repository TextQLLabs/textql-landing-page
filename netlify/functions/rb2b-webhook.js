// RB2B webhook - stores profile identification events in rb2b_profiles table
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const environment = process.env.CALENDLY_ENVIRONMENT || 'development';
    console.log(`🔍 RB2B webhook received (${environment}):`, event.body);

    const webhookData = JSON.parse(event.body || '{}');
    
    // RB2B typically sends data in a specific format - let's be flexible
    const profileData = webhookData.profile || webhookData.data || webhookData;
    
    if (!profileData) {
      console.error('❌ No profile data found in webhook');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No profile data found' })
      };
    }

    console.log('📋 Profile data received:', JSON.stringify(profileData, null, 2));

    // Extract data with RB2B's actual field names (from real webhook data)
    const extractedData = {
      // Company details - RB2B uses "Company Name", "Website", etc.
      company_name: profileData['Company Name'] || profileData.company?.name || profileData.companyName || null,
      company_domain: profileData['Website'] || profileData.company?.domain || profileData.companyDomain || null,
      company_size: profileData['Employee Count'] || profileData.company?.size || profileData.companySize || null,
      company_industry: profileData['Industry'] || profileData.company?.industry || profileData.companyIndustry || null,
      company_linkedin_url: profileData['LinkedIn URL'] || profileData.company?.linkedin || profileData.company_linkedin || null,
      
      // Person details - RB2B uses "First Name", "Last Name", "Business Email", etc.
      person_name: (profileData['First Name'] && profileData['Last Name']) 
        ? `${profileData['First Name']} ${profileData['Last Name']}` 
        : profileData.person?.name || profileData.personName || profileData.name || null,
      person_email: profileData['Business Email'] || profileData.person?.email || profileData.personEmail || profileData.email || null,
      person_title: profileData['Title'] || profileData.person?.title || profileData.personTitle || profileData.title || null,
      person_linkedin_url: profileData['LinkedIn URL'] || profileData.person?.linkedin || profileData.linkedin || null,
      person_linkedin_profile_id: profileData.person?.linkedinId || profileData.linkedinId || null,
      
      // Visitor tracking - might not be in RB2B payload
      visitor_id: profileData.visitor_id || profileData.visitorId || null,
      session_id: profileData.session_id || profileData.sessionId || null,
      
      // Location - RB2B uses "City", "State", "Zipcode"
      country: profileData['Country'] || profileData.location?.country || profileData.country || null,
      city: profileData['City'] || profileData.location?.city || profileData.city || null,
      region: profileData['State'] || profileData.location?.region || profileData.region || profileData.state || null,
      
      // Technical
      ip_address: profileData.ip || profileData.ipAddress || profileData.ip_address || null,
      user_agent: profileData.user_agent || profileData.userAgent || null,
      
      // Session info - RB2B uses "Captured URL", "Referrer"
      page_url: profileData['Captured URL'] || profileData.page_url || profileData.pageUrl || profileData.url || null,
      referrer: profileData['Referrer'] || profileData.referrer || profileData.referring_url || null,
      
      // RB2B specific - extract from Tags or other fields
      rb2b_profile_id: profileData.profile_id || profileData.profileId || profileData.rb2b_id || null,
      rb2b_company_id: profileData.company_id || profileData.companyId || null,
      confidence_score: profileData.confidence || profileData.confidence_score || profileData.score || null,
      identification_type: profileData.type || profileData.identification_type || (profileData['Tags'] ? 'tagged_lead' : 'unknown'),
      
      // Store full payload
      full_webhook_data: {
        webhook_timestamp: new Date().toISOString(),
        environment: environment,
        raw_webhook_data: webhookData,
        extracted_fields: Object.keys(profileData)
      }
    };

    console.log('🔄 Processed data:', JSON.stringify(extractedData, null, 2));

    // Insert into rb2b_profiles table
    const { data: profileRecord, error: insertError } = await supabase
      .from('rb2b_profiles')
      .insert(extractedData)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Failed to insert rb2b profile:', insertError);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Database insert failed',
          details: insertError.message 
        })
      };
    }

    console.log('✅ Successfully stored RB2B profile:', profileRecord.id);

    // Add to identity table if email exists
    if (extractedData.person_email) {
      console.log('👤 Adding email to identity table:', extractedData.person_email);
      
      const { data: identityData, error: identityError } = await supabase
        .from('identity')
        .insert({
          email: extractedData.person_email.toLowerCase().trim()
        })
        .select()
        .single();

      if (identityError) {
        // If it's a unique constraint error, that's expected (email already exists)
        if (identityError.code === '23505') {
          console.log('ℹ️ Email already exists in identity table:', extractedData.person_email);
        } else {
          console.error('❌ Failed to insert into identity table:', identityError);
        }
      } else {
        console.log('✅ Successfully added new identity:', identityData.id);
      }
    }

    // Try to link to existing form_response by email if available
    if (extractedData.person_email) {
      console.log('🔗 Attempting to find related form_response for email:', extractedData.person_email);
      
      const { data: relatedForms, error: linkError } = await supabase
        .from('form_response')
        .select('id, email, first_name')
        .eq('email', extractedData.person_email.toLowerCase().trim())
        .order('created_at', { ascending: false })
        .limit(3);

      if (!linkError && relatedForms && relatedForms.length > 0) {
        console.log(`✅ Found ${relatedForms.length} related form responses:`, relatedForms.map(f => ({ id: f.id, name: f.first_name })));
      } else {
        console.log('ℹ️ No matching form responses found for email:', extractedData.person_email);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        profile_id: profileRecord.id,
        company: extractedData.company_name,
        person: extractedData.person_name,
        email: extractedData.person_email,
        environment: environment
      })
    };

  } catch (error) {
    console.error('❌ RB2B webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};