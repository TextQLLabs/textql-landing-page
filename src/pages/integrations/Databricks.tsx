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
import { JoinsChart } from '../../components/page-sections/agents/joins/JoinsChart';
import TabsDisplay, { TabContentType } from '../../components/TabsDisplay';

export default function DatabricksMcpIntegration() {
  const screenshots = [
    {
      src: "/images/integrations/databricks/1-large.png",
      alt: "Databricks Data Lakehouse Analytics"
    },
    {
      src: "/images/integrations/databricks/2-small.png",
      alt: "Data Query Interface"
    },
    {
      src: "/images/integrations/databricks/3-small.png",
      alt: "Machine Learning Workflow Overview"
    }
  ];

  const faqItems = [
    {
      question: "How do TextQL's AI agents interact with Databricks through MCP?",
      answer: (
        <div>
          <p className="mb-4">TextQL's AI agents leverage the Databricks MCP (Management and Control Plane) to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Directly query and analyze Databricks lakehouse data and Delta tables</li>
            <li>Monitor Spark job performance and cluster utilization in real-time</li>
            <li>Provide intelligent insights and recommendations based on your Databricks data</li>
          </ul>
        </div>
      )
    },
    {
      question: "What types of AI-powered analysis can TextQL perform on Databricks data?",
      answer: (
        <div>
          <p className="mb-4">Our AI agents can perform sophisticated analysis on your Databricks data, including:</p>
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
      question: "Can TextQL's AI agents enhance existing Databricks workflows?",
      answer: (
        <div>
          <p className="mb-4">Yes, our AI agents can automatically enhance your Databricks workflows by:</p>
          <ul className="list-disc pl-6 space-y-2">
          <li>Deep analysis joining hundreds of tables instead of tens</li>
            <li>Predictive analytics and forecasting based on historical patterns</li>
            <li>Natural language explanations of complex data relationships</li>
            <li>Automated root cause analysis for business metrics</li>
            <li>AI-driven recommendations for business actions</li>          </ul>
        </div>
      )
    },
    {
      question: "How do TextQL's AI agents handle real-time Databricks data updates?",
      answer: (
        <div>
          <p className="mb-4">Our AI agents maintain real-time awareness of your Databricks environment through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Continuous monitoring of Delta Lake changes and streaming data</li>
            <li>Instant analysis of new data points and machine learning model outputs</li>
            <li>Automated alerts for significant changes in data patterns or model drift</li>
            <li>Real-time adjustment of AI models based on new streaming information</li>
          </ul>
        </div>
      )
    },
    {
      question: "What unique insights can TextQL's AI provide beyond standard Databricks analytics?",
      answer: (
        <div>
          <p className="mb-4">TextQL's AI agents extend Databricks' capabilities by providing:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cross-platform predictive analytics combining multiple data sources</li>
            <li>Advanced pattern recognition across structured and unstructured data</li>
            <li>Natural language explanations of complex ML model behaviors</li>
            <li>Automated root cause analysis for data quality and model performance</li>
            <li>AI-driven recommendations for business actions based on lakehouse insights</li>
          </ul>
        </div>
      )
    }
  ];

  type TabOption = 'Connect Your Lakehouse' | 'Run Deep Analysis' | 'Report Anywhere';

  const tabContent: Record<TabOption, TabContentType> = {
    'Connect Your Lakehouse': {
      title: 'Connect Your Lakehouse',
      description: 'Sync your Databricks lakehouse with TextQL, and map your data relationships in the ontology.',
      images: [
        {
          src: '/images/integrations/databricks/tripartite/slide-1/databases.png',
          width: '150%',
          translateX: 'translate-x-[30%]',
          translateY: 'translate-y-[-6%]',
          zIndex: 0,
          top: '0',
          right: '0',
        },
        {
          src: '/images/integrations/databricks/tripartite/slide-1/schema.jpeg',
          width: '100%',
          translateX: 'translate-x-[-20%]',
          translateY: 'translate-y-[15%]',
          zIndex: 30,
          top: '50%',
          left: '50%',
        },
        {
          src: '/images/integrations/databricks/tripartite/slide-1/sql.png',
          width: '100%',
          translateX: 'translate-x-[-15%]',
          translateY: 'translate-y-[80%]',
          zIndex: 10,
          bottom: '0',
          left: '0',
        },
      ],
      bgColor: 'bg-white'
    },
    'Run Deep Analysis': {
      title: 'Run Deep Analysis',
      description: 'Take your analysis further with advanced machine learning and distributed computing capabilities. Transform your lakehouse data into actionable insights with our powerful analytical tools.',
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
      description: "Share your insights across any platform. Whether it's through email, Slack, or embedded in your applications, your lakehouse insights reach the right audience at the right time.",
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
        title="Databricks MCP Integration | TextQL"
        description="Integrate Databricks MCP with TextQL. TextQL's MCP integration connects intelligent analysis with your Databricks lakehouse, enabling our AI agents to work directly with all of your datasets."
        canonical="https://textql.com/integrations/databricks-mcp/"
        ogImage="https://textql.com/social-preview.png"
      />
      <section>
        <HeroSection 
          headline="Powerful AI Research Within Your Databricks Environment"
          description="TextQL's MCP integration connects intelligent analysis with your Databricks lakehouse, enabling our AI agents to work directly with all of your datasets and ML workflows."
          videoUrl="/images/integrations/databricks/databricks-visual.m4v"
        />
      </section>
      <Testimonial
        quote="TextQL's Databricks integration has revolutionized how we analyze our lakehouse data and ML models."
        author="Enterprise ML Leader"
        title="Machine Learning Director"
      />

<FeatureSection
        title="Advanced reasoning. Deep insights."
        subtitle="It'll feel like you just hired a whole new data team."
        features={[
          {
            icon: Plug,
            title: "Effortless connection",
            description: "Connect Ana to your Databricks environment in minutes—no code required."
          },
          {
            icon: RefreshCw,
            title: "Always up-to-date",
            description: "The underlying lakehouse and Delta tables are always up-to-date, so Ana can always provide the most accurate and relevant insights."
          },
          {
            icon: Cpu,
            title: "AI-Native",
            description: "Ana can interface directly with the Databricks servers using the Model Context Protocol, ensuring a seamless experience."
          }
        ]}
      />


      <section className="relative overflow-hidden bg-black">
        {/* Content */}
        <div className="relative z-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 items-center">
              <div className="relative">
                <div className="relative max-w-full">
                  <video 
                    className="w-full h-auto rounded-5xl"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    src="/videos/databricks-mcp.m4v"
                  />
                </div>
              </div>
              <div className="lg:col-span-1 space-y-6 relative z-50 p-6 rounded-lg">
                <h2 className="text-4xl font-extralight text-[#B8D8D0] tracking-tight leading-tight">
                  AI fluent in your Lakehouse.
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-[#729E8C] font-light leading-relaxed">
                  TextQL's agents can perform hundreds of joins across Delta tables, and ingest thousands of datasets from your lakehouse.
                  </p>
                  <p className="text-xl text-[#729E8C] font-light leading-relaxed">
                    After performing complex analysis—executing both Spark SQL and Python code—agents output natural language insight reports, and can update your Databricks pipelines and ML workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>   
      

<TabsDisplay
      title="Find Deep Value Hidden in Your Databricks Lakehouse"
      tabs={tabContent}
      defaultActiveTab="Connect Your Lakehouse"
     />


      <FaqSection 
        name="Databricks MCP"
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