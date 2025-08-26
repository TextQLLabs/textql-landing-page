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

    // Extract data with flexible field mapping (RB2B might use different field names)
    const extractedData = {
      // Company details
      company_name: profileData.company?.name || profileData.companyName || profileData.company_name || null,
      company_domain: profileData.company?.domain || profileData.companyDomain || profileData.company_domain || null,
      company_size: profileData.company?.size || profileData.companySize || profileData.company_size || null,
      company_industry: profileData.company?.industry || profileData.companyIndustry || profileData.company_industry || null,
      company_linkedin_url: profileData.company?.linkedin || profileData.company?.linkedinUrl || profileData.company_linkedin || null,
      
      // Person details
      person_name: profileData.person?.name || profileData.personName || profileData.name || null,
      person_email: profileData.person?.email || profileData.personEmail || profileData.email || null,
      person_title: profileData.person?.title || profileData.personTitle || profileData.title || profileData.job_title || profileData.person?.job_title || null,
      person_linkedin_url: profileData.person?.linkedin || profileData.person?.linkedinUrl || profileData.linkedin || profileData.linkedinProfile || profileData.person?.linkedinProfile || null,
      person_linkedin_profile_id: profileData.person?.linkedinId || profileData.linkedinId || null,
      
      // Visitor tracking
      visitor_id: profileData.visitor_id || profileData.visitorId || null,
      session_id: profileData.session_id || profileData.sessionId || null,
      
      // Location
      country: profileData.location?.country || profileData.country || null,
      city: profileData.location?.city || profileData.city || null,
      region: profileData.location?.region || profileData.region || profileData.state || null,
      
      // Technical
      ip_address: profileData.ip || profileData.ipAddress || profileData.ip_address || null,
      user_agent: profileData.user_agent || profileData.userAgent || null,
      
      // Session info
      page_url: profileData.page_url || profileData.pageUrl || profileData.url || null,
      referrer: profileData.referrer || profileData.referring_url || null,
      
      // RB2B specific
      rb2b_profile_id: profileData.profile_id || profileData.profileId || profileData.rb2b_id || null,
      rb2b_company_id: profileData.company_id || profileData.companyId || null,
      confidence_score: profileData.confidence || profileData.confidence_score || profileData.score || null,
      identification_type: profileData.type || profileData.identification_type || 'unknown',
      
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