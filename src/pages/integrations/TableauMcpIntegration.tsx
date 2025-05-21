import React from 'react';
import { SEO } from '../../components/SEO';
import IntegrationPageTemplate from '../../components/templates/IntegrationPageTemplate';

export default function TableauMcpIntegration() {
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

  return (
    <IntegrationPageTemplate
      name="Tableau MCP"
      headline="Seamless AI Research Within Your Tableau Environment"
      description="TextQL's MCP integration bridges the gap between visualization and intelligent analysis, enabling our AI agents to work directly with your Tableau datasets."
      faqItems={faqItems}
      videoUrl="/videos/tableau-mcp.mp4"
      ctaProps={{
        heading: "Ready to learn more?",
        subheader: "Contact us",
        buttonText: "Get a demo"
      }}
    />
  );
}