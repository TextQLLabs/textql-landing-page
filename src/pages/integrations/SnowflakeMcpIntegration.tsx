import React from 'react';
import { SEO } from '../../components/SEO';
import StaggeredScreenshots from '../../components/StaggeredScreenshots';
import { Text } from '../../components/ui';
import { Testimonial } from '../../components/Testimonial';
import CommunicateFindings from '../../components/CommunicateFindings';
import HeroSection from '../../components/integrations/HeroSection';
import FaqSection from '../../components/integrations/FaqSection';
import { CTA } from '../../components/sections';
import { FeatureSection } from '../../components/FeatureSection';
import { Plug, RefreshCw, Cpu } from 'lucide-react';

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
      question: "What types of AI-powered analysis can TextQL perform on Snowflake data?",
      answer: (
        <div>
          <p className="mb-4">Our AI agents can perform sophisticated analysis on your Snowflake data, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Anomaly detection and predictive analytics across large datasets</li>
            <li>Natural language querying of Snowflake databases and data warehouses</li>
            <li>Automated insight generation and trend identification</li>
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
            <li>Predictive analytics and forecasting based on historical patterns</li>
            <li>Advanced pattern recognition across multiple data sources</li>
            <li>Natural language explanations of complex data relationships</li>
            <li>Automated root cause analysis for business metrics</li>
            <li>AI-driven recommendations for business actions</li>
          </ul>
        </div>
      )
    },
    {
      question: "How does TextQL's Snowflake integration help with data governance?",
      answer: (
        <div>
          <p className="mb-4">Our Snowflake integration enhances data governance through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Automated data lineage tracking and documentation</li>
            <li>AI-powered data quality assessment and monitoring</li>
            <li>Intelligent access pattern analysis for security optimization</li>
            <li>Compliance recommendation based on regulatory requirements</li>
            <li>Continuous monitoring of data access and usage patterns</li>
          </ul>
        </div>
      )
    },
  ];

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
          videoUrl="/videos/snowflake-mcp.mp4"
        />
      </section>
      <Testimonial
        quote="TextQL's Snowflake integration has transformed how we analyze our data warehouse."
        author="Enterprise Data Leader"
        title="Data Analytics Director"
      />

      <section className="bg-transparent">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-2 relative -translate-x-[10%]">
              <StaggeredScreenshots screenshots={screenshots} />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-5xl font-extralight text-[#B8D8D0] z-20 tracking-tight leading-tight">
                Read. Logic. Write.
              </h2>
              <div className="space-y-6">
                <Text className="text-xl text-[#729E8C]/60 font-light leading-relaxed">
                  TextQL's AI agents can read from all your Snowflake data sources and warehouses.
                </Text>
                <Text className="text-xl text-[#729E8C]/70 font-light leading-relaxed">
                  After performing complex analysis—executing both SQL and Python code—, agents output natural language insight reports, and can update your Snowflake data pipelines.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>   
      
      <FeatureSection
        title="The World's First Snowflake MCP Server"
        subtitle="It's never been easier for AI to understand your Snowflake data."
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

      <CommunicateFindings />

      <FaqSection 
        name="Snowflake MCP"
        faqItems={faqItems}
      />
        
      <CTA 
        theme="dark"
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