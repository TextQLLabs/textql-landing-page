import { SEO } from '../components/SEO';
import { Hero } from '../components/page-sections/trial/hero';
import { default as Logos3 } from '../components/page-sections/trial/logos3';
import { default as IntegrationsSection } from '../components/page-sections/trial/integrations-section';
import { FeatureSection } from '../components/page-sections/trial/feature-section';
import { default as Testimonials } from '../components/page-sections/trial/Testimonials';
import { default as FAQ } from '../components/page-sections/trial/FAQ';
import { default as FooterCTA } from '../components/page-sections/trial/FooterCTA';
// import { default as Footer } from '../components/page-sections/trial/Footer';

const transformFeatures = [
  {
    title: "Intelligent Analysis",
    description:
      "Advanced algorithms process your data to identify key patterns and opportunities",
  },
  {
    title: "Contextual Insights",
    description:
      "Get specific, actionable recommendations tailored to your business goals",
  },
  {
    title: "Automated Actions",
    description:
      "Implement suggestions seamlessly with one-click execution and tracking",
  },
];

const analyticsFeatures = [
  {
    title: "Scalable Processing",
    description:
      "Handle massive datasets with enterprise-grade processing power",
  },
  {
    title: "Real-time Analysis",
    description: "Get instant insights as your data changes and evolves",
  },
  {
    title: "Smart Recommendations",
    description:
      "Receive intelligent suggestions based on comprehensive data analysis",
  },
];

export default function Trial() {
  return (
    <div className="">
      <SEO 
        title="TextQL Trial - 200 Queries And 50 Visualizations For $5"
        description="Get $500 worth of queries and visualizations for $5. Connect your data source and try TextQL now."
        canonical="https://textql.com/trial"
        ogImage="https://textql.com/social-preview.png"
      />

      {/* LinkedIn Insight Tag (page-specific, guarded) */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push("6937250");
          `,
        }}
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(l) {
              if (!window.lintrk) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript"; b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              }
            })(window.lintrk);
          `,
        }}
      />
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} alt="" src="https://px.ads.linkedin.com/collect/?pid=6937250&fmt=gif" />
      </noscript>
      
      <Hero videoEmbedUrl="https://www.youtube.com/embed/UvQ5Q63t1fM?si=BpgR_CM4oUb6Cd5d" />
      <Logos3 />
      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      <IntegrationsSection />

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <FeatureSection
        badge="How it Works"
        title="Transform insights into action"
        description="TextQL analyzes your data patterns and automatically generates actionable insights. Our AI understands context and delivers personalized recommendations that drive real results."
        features={transformFeatures}
        imageSrc="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform.svg"
        imageAlt="TextQL Transform Process"
        layout="text-right"
      />

      <FeatureSection
        badge="Advanced Analytics"
        title="Deep insights at scale"
        description="Unlock powerful analytics capabilities that scale with your data. Our advanced algorithms provide comprehensive analysis and actionable recommendations."
        features={analyticsFeatures}
        imageSrc="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform2.svg"
        imageAlt="TextQL Advanced Analytics Process"
        layout="text-left"
      />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* FAQ Section */}
      <FAQ />
      
      {/* CTA Footer */}
      <FooterCTA />
      
      {/* Main Footer */}
      {/* <Footer /> */}
    </div>
  );
}
