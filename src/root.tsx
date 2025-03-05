import React, { useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import './index.css';

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Remove no-fouc class immediately for pre-rendered content
    document.body.classList.remove('no-fouc');
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0A1F1C" />
        <meta name="theme-color" content="#0A1F1C" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Security-Policy" content="frame-src 'self' app.termly.io;" />
        
        <meta name="description" content="Deploy AI agents to find trends across all of your data that makes you money" />
        <link rel="canonical" href="https://textql.com" />
        
        <meta property="og:title" content="Find Insights With AI | TextQL" />
        <meta property="og:description" content="Deploy AI agents to find trends across all of your data that makes you money" />
        <meta property="og:url" content="https://textql.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://textql.com/social-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TextQL" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@textql" />
        <meta name="twitter:title" content="Find Insights With AI | TextQL" />
        <meta name="twitter:description" content="Deploy AI agents to find trends across all of your data that makes you money" />
        <meta name="twitter:image" content="https://textql.com/social-preview.png" />
        
        <title>Find Insights With AI | TextQL</title>
        
        <Meta />
        <Links />
        
        {/* Modified FOUC prevention style */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-fouc {
            visibility: hidden;
          }
          
          /* Show content immediately if JavaScript is disabled */
          .no-js .no-fouc {
            visibility: visible;
          }
        `}} />
        
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TextQL",
            "url": "https://textql.com",
            "logo": "https://textql.com/images/logo.png",
            "sameAs": [
              "https://twitter.com/textql",
              "https://linkedin.com/company/textql"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "ethan@textql.com",
              "contactType": "customer service"
            }
          }
        `}</script>
        
        <script>{`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_cmTpctVWkmjZZDI0vGNMD5wHY3ywg9FdQCA48kdfEp2', {
              api_host: 'https://hermes.textql.com',
              person_profiles: 'identified_only',
          })
        `}</script>
      </head>
      <body className="no-fouc">
        {children}
        <ScrollRestoration />
        <Scripts />
        
        {/* Simplified content reveal script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.body.classList.remove('no-fouc');
          `
        }} />
      </body>
    </html>
  );
}

// Root component using React Router's outlet
export default function Root() {
  return <Outlet />;
} 