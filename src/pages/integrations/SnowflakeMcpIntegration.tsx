import React from 'react';
import { SEO } from '../../components/SEO';
import IntegrationPageTemplate from '../../components/templates/IntegrationPageTemplate';
import MindMap from '../../components/MindMap';
import { tableauMcpMindMapData } from '../../data/integrations/tableauMcpMindMapData';

export default function SnowflakeMcpIntegration() {
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

  const MindMapSection = () => (
    <div className="py-16 mt-4">
      <h2 className="text-3xl font-extralight text-[#B8D8D0] mb-8 text-center">Snowflake MCP Integration Map</h2>
      <div className="bg-[#0A1F1C]/30 rounded-lg p-6">
        <div className="h-[600px] w-full">
          <MindMap data={tableauMcpMindMapData} />
        </div>
      </div>
    </div>
  );

  return (
    <IntegrationPageTemplate
      name="Snowflake MCP"
      headline="Powerful AI Research Within Your Snowflake Environment"
      description="TextQL's MCP integration connects intelligent analysis with your Snowflake data warehouse, enabling our AI agents to work directly with all of your datasets."
      faqItems={faqItems}
      videoUrl="/videos/snowflake-mcp.mp4"
      ctaProps={{
        heading: "Ready to learn more?",
        subheader: "Contact us",
        buttonText: "Get a demo"
      }}
    />
  );
} 