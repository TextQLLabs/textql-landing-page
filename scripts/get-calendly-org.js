#!/usr/bin/env node

// Quick script to get Calendly organization info using PAT
// Run with: CALENDLY_PAT=your_pat_here node scripts/get-calendly-org.js

const CALENDLY_PAT = process.env.CALENDLY_PAT;

if (!CALENDLY_PAT) {
  console.error('❌ CALENDLY_PAT not found in .env.local');
  process.exit(1);
}

async function getCalendlyOrg() {
  try {
    console.log('🔍 Fetching Calendly user info...');
    
    // First get the current user
    const userResponse = await fetch('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${CALENDLY_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error(`User API error: ${userResponse.status} ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();
    console.log('👤 User:', userData.resource.name);
    console.log('📧 Email:', userData.resource.email);
    
    const orgUri = userData.resource.current_organization;
    console.log('🏢 Organization URI:', orgUri);
    
    // Now get organization details
    const orgResponse = await fetch(orgUri, {
      headers: {
        'Authorization': `Bearer ${CALENDLY_PAT}`,
        'Content-Type': 'application/json'
      }
    });

    if (!orgResponse.ok) {
      throw new Error(`Org API error: ${orgResponse.status} ${orgResponse.statusText}`);
    }

    const orgData = await orgResponse.json();
    console.log('🏢 Organization Name:', orgData.resource.name);
    console.log('🆔 Organization ID:', orgData.resource.uri.split('/').pop());
    
    return {
      user: userData.resource,
      organization: orgData.resource
    };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getCalendlyOrg();