import React from 'react';
import { SEO } from '../../components/SEO';
import StaggeredScreenshots from '../../components/StaggeredScreenshots';
import { Text } from '../../components/ui';
import { Section } from '../../components/ui/Section';
import { Testimonial } from '../../components/Testimonial';
import HeroSection from '../../components/integrations/IntegrationHeroSection';
import FaqSection from '../../components/integrations/FaqSection';
import { CTA } from '../../components/sections';
import { FeatureSection } from '../../components/FeatureSection';
import { Plug, RefreshCw, Cpu } from 'lucide-react';
import TabsDisplay, { TabContentType } from '../../components/TabsDisplay';
import { useComponentTheme } from '../../hooks/useComponentTheme';

export default function TableauMcpIntegration() {
  const theme = useComponentTheme();
  
  const screenshots = [
    {
      src: "/images/integrations/tableau/1-large.png",
      alt: "Tableau Dashboard Analytics"
    },
    {
      src: "/images/integrations/tableau/2-small.png",
      alt: "Data Visualization Interface"
    },
    {
      src: "/images/integrations/tableau/3-small.png",
      alt: "Business Intelligence Overview"
    }
  ];

  const faqItems = [
    {
      question: "How do TextQL's AI agents interact with Tableau through MCP?",
      answer: (
        <div>
          <p className="mb-4">TextQL's AI agents leverage the Tableau MCP (Management and Control Plane) to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Directly query and analyze Tableau datasets and visualizations</li>
            <li>Monitor dashboard performance and usage patterns in real-time</li>
            {/* <li>Automatically optimize data models and report structures</li> */}
            <li>Provide intelligent insights and recommendations based on your Tableau data</li>
          </ul>
        </div>
      )
    },
    {
      question: "What types of AI-powered analysis can TextQL perform on Tableau data?",
      answer: (
        <div>
          <p className="mb-4">Our AI agents can perform sophisticated analysis on your Tableau data, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Anomaly detection and predictive analytics on your visualizations</li>
            <li>Natural language querying of Tableau dashboards and reports</li>
            <li>Automated insight generation and trend identification</li>
            <li>Cross-dataset correlation analysis and pattern recognition</li>
            <li>Intelligent data quality monitoring and validation</li>
          </ul>
        </div>
      )
    },
    // {
    //   question: "How does TextQL ensure security when AI agents access Tableau data?",
    //   answer: (
    //     <div>
    //       <p className="mb-4">TextQL implements multiple layers of security:</p>
    //       <ul className="list-disc pl-6 space-y-2">
    //         <li>End-to-end encryption for all data transfers between TextQL and Tableau</li>
    //         <li>Role-based access control for AI agent operations</li>
    //         <li>Audit logging of all AI interactions with your Tableau environment</li>
    //         <li>Compliance with data governance policies and regulations</li>
    //         <li>Secure OAuth 2.0 authentication with MCP</li>
    //       </ul>
    //     </div>
    //   )
    // },
    {
      question: "Can TextQL's AI agents enhance existing Tableau dashboards?",
      answer: (
        <div>
          <p className="mb-4">Yes, our AI agents can automatically enhance your Tableau dashboards by:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Suggesting optimal visualization types based on data patterns</li>
            <li>Automatically generating natural language insights and annotations</li>
            <li>Identifying potential improvements in dashboard performance</li>
            <li>Creating AI-powered custom calculations and metrics</li>
            <li>Recommending relevant cross-dashboard connections</li>
          </ul>
        </div>
      )
    },
    {
      question: "How do TextQL's AI agents handle real-time Tableau data updates?",
      answer: (
        <div>
          <p className="mb-4">Our AI agents maintain real-time awareness of your Tableau environment through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Continuous monitoring of data changes and updates</li>
            <li>Instant analysis of new data points and trends</li>
            <li>Automated alerts for significant changes or anomalies</li>
            <li>Real-time adjustment of AI models based on new information</li>
          </ul>
        </div>
      )
    },
    {
      question: "What unique insights can TextQL's AI provide beyond standard Tableau analytics?",
      answer: (
        <div>
          <p className="mb-4">TextQL's AI agents extend Tableau's capabilities by providing:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Predictive analytics and forecasting based on historical patterns</li>
            <li>Advanced pattern recognition across multiple data sources</li>
            <li>Natural language explanations of complex data relationships</li>
            <li>Automated root cause analysis for business metrics</li>
            <li>AI-driven recommendations for business actions</li>
          </ul>
        </div>
      )
    },
  ];

  type TabOption = 'Ingest Tableaus' | 'Run Deep Analysis' | 'Report Anywhere';

  const tabContent: Record<TabOption, TabContentType> = {
    'Ingest Tableaus': {
      title: 'Ingest Tableaus',
      description: 'Import your existing Tableau workbooks and dashboards seamlessly into our platform. Maintain your visualization investments while gaining new analytical capabilities.',
      images: [
        {
          src: '/images/integrations/tableau/tripartite/slide-1/Customer Analysis.png',
          width: '100%',
          translateX: 'translate-x-[20%]',
          translateY: 'translate-y-[-6%]',
          zIndex: 0,
          top: '0',
          right: '0',
        },
        {
          src: '/images/integrations/tableau/tripartite/slide-1/Sales Performance vs Target.png',
          width: '100%',
          translateX: 'translate-x-[10%]',
          translateY: 'translate-y-[-23%]',
          zIndex: 5,
          top: '50%',
          left: '50%',
        },
        {
          src: '/images/integrations/tableau/tripartite/slide-1/Sales Forecast.png',
          width: '45%',
          translateX: 'translate-x-[-25%]',
          translateY: 'translate-y-[-10%]',
          zIndex: 10,
          bottom: '0',
          left: '0',
        },
      ],
      bgColor: 'bg-[#F7F7F7]'
    },
    'Run Deep Analysis': {
      title: 'Run Deep Analysis',
      description: 'Take your analysis further with advanced analytics and machine learning capabilities. Transform your data into actionable insights with our powerful analytical tools.',
      images: [
        {
          src: '/images/integrations/tableau/tripartite/slide-2/ML Model.png',
          width: '130%',
          translateX: 'translate-x-[-30%]',
          translateY: 'translate-y-[-35%]',
          zIndex: 0,
          top: '50%',
          left: '50%',
        },
        {
          src: '/images/integrations/tableau/tripartite/slide-2/daily_traffic_metrics.png',
          width: '50%',
          translateX: '-translate-x-[40%]',
          translateY: 'translate-y-[65%]',
          zIndex: 10,
          bottom: '0',
          left: '0',
        },
        {
          src: '/images/integrations/tableau/tripartite/slide-2/days_distribution.png',
          width: '60%',
          translateX: 'translate-x-[45%]',
          translateY: '-translate-y-[30%]',
          zIndex: 20,
          top: '0',
          right: '0',
        },
      ],
      bgColor: 'bg-[#D1F2D9]'
    },
    'Report Anywhere': {
      title: 'Report Anywhere',
      description: "Share your insights across any platform. Whether it's through email, Slack, or embedded in your applications, your data stories reach the right audience at the right time.",
      images: [
        {
          src: '/images/integrations/tableau/tripartite/slide-3/email.png',
          width: '70%',
          translateX: 'translate-x-[-40%]',
          translateY: 'translate-y-[-30%]',
          zIndex: 0,
          top: '50%',
          left: '50%',
        },
        {
          src: '/images/integrations/tableau/tripartite/slide-3/slack-1.png',
          width: '50%',
          translateX: '-translate-x-[10%]',
          translateY: 'translate-y-[50%]',
          zIndex: 10,
          bottom: '0',
          left: '0',
        },
        {
          src: '/images/integrations/tableau/tripartite/slide-3/slack-2.png',
          width: '40%',
          translateX: 'translate-x-[50%]',
          translateY: '-translate-y-[10%]',
          zIndex: 20,
          top: '0',
          right: '0',
        },
      ],
      bgColor: 'bg-[#F7F7F7]'
    }
  };
 
  

  return (
        <>
        <SEO 
          title="Tableau MCP Integration | TextQL"
          description="Integrate Tableau MCP with TextQL. TextQL's MCP integration bridges the gap between visualization and intelligent analysis, enabling our AI agents to work directly with your Tableau datasets."
          canonical="https://textql.com/integrations/tableau-mcp/"
          ogImage="https://textql.com/social-preview.png"
        />
        <HeroSection 
          headline="Seamless AI Research Within Your Tableau Environment"
          description="TextQL's MCP integration bridges the gap between visualization and intelligent analysis, enabling our AI agents to work directly with your Tableau datasets."
          videoUrl="/videos/tableau-mcp.m4v"
        />
      {/* <Testimonial
          quote="This is the best Tableau AI on the market—by a massive margin."
          author="F100 CIO"
        /> */}

        
    
      <Section 
        variant="wide"
        padding="md"
        background="transparent"
        className="relative z-20"
      >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-2 relative -translate-x-[10%] md:-translate-x-[5%] xl:-translate-x-[10%] pl-16">
              <StaggeredScreenshots screenshots={screenshots} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl md:text-4xl xl:text-5xl font-extralight text-[#B8D8D0] tracking-tight leading-tight">
                Designed for Enterprise Scales.
              </h2>
              <div className="space-y-6">
                <p className="text-base lg:text-xl text-[#729E8C] font-light leading-relaxed">
                  TextQL's AI agents can read from all your Tableau data sources and dashboards.
                </p>
                <p className="text-base lg:text-xl text-[#729E8C] font-light leading-relaxed">
                After performing complex analysis—executing both SQL and Python code—agents output natural language insight reports, and can update Tableau dashboards.
                </p>
              </div>
              </div>
            </div>
      </Section>   
      

      <FeatureSection
        title="Advanced reasoning. Deep insights."
        subtitle="It'll feel like you just hired a whole new data team."
        features={[
          {
            icon: Plug,
            title: "Effortless connection",
            description: "Connect Ana to your Tableau environment in minutes—no code required. ."
          },
          {
            icon: RefreshCw,
            title: "Always up-to-date",
            description: "The underlying data sources and visualizations are always up-to-date, so Ana can always provide the most accurate and relevant insights."
          },
          {
            icon: Cpu,
            title: "AI-Native",
            description: "Ana can interface directly with the Tableau servers using the Model Context Protocol, ensuring a seamless experience."
          }
        ]}
      />

<TabsDisplay
      title="Discover Deeper Value from Your Tableaus"
      tabs={tabContent}
      defaultActiveTab="Ingest Tableaus"
    />

     

<FaqSection 
          name="Tableau MCP"
          faqItems={faqItems}
        />
        
        <CTA 
          theme={theme}
          showWave={false}
          variant="wide"
          heading="Ready to learn more?"
          subheader="Contact us"
          useSimpleButton={true}
          buttonText="Get a demo"
        />
    </>
    
  );
}