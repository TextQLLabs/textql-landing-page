import React from 'react';
import { SEO } from '../../components/SEO';
import StaggeredScreenshots from '../../components/StaggeredScreenshots';
import { Text } from '../../components/ui';
import { Testimonial } from '../../components/Testimonial';
import HeroSection from '../../components/integrations/IntegrationHeroSection';
import FaqSection from '../../components/integrations/FaqSection';
import { CTA } from '../../components/sections';
import { FeatureSection } from '../../components/FeatureSection';
import { Plug, RefreshCw, Cpu } from 'lucide-react';
import TabsDisplay, { TabContentType } from '../../components/TabsDisplay';

export default function SnowflakeMcpIntegration() {
  const screenshots = [
    {
      src: "/images/integrations/snowflake/1-large.png",
      alt: "Snowflake Data Warehouse Analytics"
    },
    {
      src: "/images/integrations/snowflake/2-small.png",
      alt: "Data Query Interface"
    },
    {
      src: "/images/integrations/snowflake/3-small.png",
      alt: "Business Intelligence Overview"
    }
  ];

  const faqItems = [
    {
      question: "How do TextQL's AI agents interact with Snowflake through MCP?",
      answer: (
        <div>
          <p className="mb-4">TextQL's AI agents leverage the Snowflake MCP (Management and Control Plane) to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Directly query and analyze Snowflake databases and data warehouses</li>
            <li>Monitor query performance and resource utilization in real-time</li>
            <li>Provide intelligent insights and recommendations based on your Snowflake data</li>
          </ul>
        </div>
      )
    },
    {
      question: "What types of AI-powered analysis and research can TextQL perform on Snowflake data?",
      answer: (
        <div>
          <p className="mb-4">Our AI agents can perform sophisticated analysis on your Snowflake data, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Natural language querying of Snowflake databases and data warehouses</li>
            <li>Visualization of patterns, trends, and insights</li>
            <li>Automated insight generation and trend identification</li>
            <li>Anomaly and fraud detection and predictive analytics</li>
            <li>Advanced machine learning model training and evaluation across large datasets</li>
            <li>Cross-database correlation analysis and pattern recognition</li>
            <li>Intelligent data quality monitoring and validation</li>
          </ul>
        </div>
      )
    },
    {
      question: "Can TextQL's AI agents enhance existing Snowflake workflows?",
      answer: (
        <div>
          <p className="mb-4">Yes, our AI agents can automatically enhance your Snowflake workflows by:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Suggesting query optimizations based on performance patterns</li>
            <li>Automatically generating natural language insights from query results</li>
            <li>Identifying potential improvements in data warehouse performance</li>
            <li>Creating AI-powered custom metrics and analytics</li>
            <li>Recommending relevant cross-database connections</li>
          </ul>
        </div>
      )
    },
    {
      question: "How do TextQL's AI agents handle real-time Snowflake data updates?",
      answer: (
        <div>
          <p className="mb-4">Our AI agents maintain real-time awareness of your Snowflake environment through:</p>
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
      question: "What unique insights can TextQL's AI provide beyond standard Snowflake analytics?",
      answer: (
        <div>
          <p className="mb-4">TextQL's AI agents extend Snowflake's capabilities by providing:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Deep analysis joining hundreds of tables instead of tens</li>
            <li>Predictive analytics and forecasting based on historical patterns</li>
            <li>Natural language explanations of complex data relationships</li>
            <li>Automated root cause analysis for business metrics</li>
            <li>AI-driven recommendations for business actions</li>
          </ul>
        </div>
      )
    }
  ];

  type TabOption = 'Connect Your Warehouse' | 'Run Deep Analysis' | 'Report Anywhere';

  const tabContent: Record<TabOption, TabContentType> = {
    'Connect Your Warehouse': {
      title: 'Connect Your Warehouse',
      description: 'Sync your Snowflake data warehouse with TextQL, and map your data relationships in the ontology.',
      images: [
        {
          src: '/images/integrations/snowflake/tripartite/slide-1/databases.png',
          width: '150%',
          translateX: 'translate-x-[30%]',
          translateY: 'translate-y-[-6%]',
          zIndex: 0,
          top: '0',
          right: '0',
        },
        {
          src: '/images/integrations/snowflake/tripartite/slide-1/schema.png',
          width: '100%',
          translateX: 'translate-x-[-20%]',
          translateY: 'translate-y-[15%]',
          zIndex: 30,
          top: '50%',
          left: '50%',
        },
        {
          src: '/images/integrations/snowflake/tripartite/slide-1/sql.png',
          width: '100%',
          translateX: 'translate-x-[-15%]',
          translateY: 'translate-y-[50%]',
          zIndex: 10,
          bottom: '0',
          left: '0',
        },
      ],
      bgColor: 'bg-white'
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
      bgColor: 'bg-white'
    }
  };

  return (
    <>
      <SEO 
        title="Snowflake MCP Integration | TextQL"
        description="Integrate Snowflake MCP with TextQL. TextQL's MCP integration connects intelligent analysis with your Snowflake data warehouse, enabling our AI agents to work directly with all of your datasets."
        canonical="https://textql.com/integrations/snowflake-mcp/"
        ogImage="https://textql.com/social-preview.png"
      />
      <section>
        <HeroSection 
          headline="Powerful AI Research Within Your Snowflake Environment"
          description="TextQL's MCP integration connects intelligent analysis with your Snowflake data warehouse, enabling our AI agents to work directly with all of your datasets."
          videoUrl="/images/integrations/snowflake/snowflake.m4v"
        />
      </section>
      
      <FeatureSection
        title="Massive scale. Advanced reasoning."
        subtitle="It'll feel like you just hired a whole new data team."
        features={[
          {
            icon: Plug,
            title: "Effortless connection",
            description: "Connect Ana to your Snowflake environment in minutes—no code required."
          },
          {
            icon: RefreshCw,
            title: "Always up-to-date",
            description: "The underlying data warehouse and tables are always up-to-date, so Ana can always provide the most accurate and relevant insights."
          },
          {
            icon: Cpu,
            title: "AI-Native",
            description: "Ana can interface directly with the Snowflake servers using the Model Context Protocol, ensuring a seamless experience."
          }
        ]}
      />

<Testimonial
        quote="TextQL's Snowflake integration has transformed how we analyze our data warehouse."
        author=""
        title=""
      />

<section className="bg-transparent py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative z-19">
              <video 
                className="w-full rounded-lg"
                autoPlay 
                loop 
                muted 
                playsInline
                src="/images/integrations/snowflake/snowflake-mcp.m4v"
              />
            </div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl font-extralight text-[#B8D8D0] tracking-tight leading-tight">
                The world's first Snowflake MCP server.
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-[#729E8C] font-light leading-relaxed">
                TextQL's agents can perform hundreds of joins, and ingest thousands of tables.
                </p>
                <p className="text-xl text-[#729E8C] font-light leading-relaxed">
                  After performing complex analysis—executing both SQL and Python code—agents output natural language insight reports, and can update your Snowflake data pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>   

<TabsDisplay
      title="Find Deep Value Hidden in Your Snowflake Data"
      tabs={tabContent}
      defaultActiveTab="Connect Your Warehouse"
     />


      <FaqSection 
        name="Snowflake MCP"
        faqItems={faqItems}
      />
        
      <CTA 
        theme="dark"
        showWave={true}
        variant="wide"
        heading="Ready to learn more?"
        subheader="Contact us"
        useSimpleButton={true}
        buttonText="Get a demo"
      />
    </>
  );
} 