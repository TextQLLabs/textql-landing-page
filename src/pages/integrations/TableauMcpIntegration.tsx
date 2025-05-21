import React from 'react';
import { SEO } from '../../components/SEO';
import IntegrationPageTemplate from '../../components/templates/IntegrationPageTemplate';
import IntegrationMindMap from '../../components/integrations/IntegrationMindMap';
import { tableauMcpMindMapData } from '../../data/integrations/tableauMcpMindMapData';

export default function TableauMcpIntegration() {
  const faqItems = [
    {
      question: "How frequently can TextQL sync Tableau MCP data?",
      answer: (
        <div>
          <p className="mb-4">TextQL can sync Tableau MCP data in real-time, near real-time, or on a scheduled basis depending on your needs:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Real-time syncing via webhooks for critical updates</li>
            <li>Scheduled syncing at intervals ranging from every 5 minutes to daily</li>
            <li>On-demand syncing triggered through our API or user interface</li>
          </ul>
        </div>
      )
    },
    {
      question: "How does TextQL interact with Tableau MCP's API?",
      answer: (
        <div>
          <p className="mb-4">TextQL uses a secure, authenticated connection to Tableau MCP's API. Our integration:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Authenticates using OAuth 2.0 for secure access</li>
            <li>Implements efficient pagination for large data sets</li>
            <li>Handles API version changes automatically to ensure continued functionality</li>
            <li>Minimizes API calls through intelligent caching and change detection</li>
          </ul>
        </div>
      )
    },
    {
      question: "How does TextQL handle rate limits with Tableau MCP?",
      answer: (
        <p>TextQL's integration with Tableau MCP includes built-in rate limit handling. Our system automatically respects Tableau's rate limits, implements exponential backoff when limits are approached, and queues requests appropriately to avoid disruption. This ensures your data syncs reliably without exceeding Tableau's API constraints.</p>
      )
    },
    {
      question: "Can I access custom fields from Tableau MCP?",
      answer: (
        <p>Yes, TextQL's integration with Tableau MCP supports access to all custom fields. Our system automatically detects and maps custom fields from your Tableau environment, making them available through our ontology. You can query, filter, and analyze these custom fields just like standard fields, ensuring you have full access to all your data.</p>
      )
    },
    {
      question: "What other BI integrations can I access with TextQL?",
      answer: (
        <div>
          <p className="mb-4">TextQL offers integrations with many popular business intelligence and data visualization tools, including:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Power BI</li>
            <li>Looker</li>
            <li>Qlik</li>
            <li>Domo</li>
            <li>Sisense</li>
            <li>ThoughtSpot</li>
          </ul>
          <p>Each integration offers similar capabilities to our Tableau MCP integration, allowing you to connect and analyze data from multiple BI tools in one place.</p>
        </div>
      )
    },
    {
      question: "What are some common use cases for TextQL's integration with Tableau MCP?",
      answer: (
        <div>
          <p className="mb-4">Common use cases include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Centralizing analytics from multiple Tableau deployments</li>
            <li>Creating a unified data layer across Tableau and other business applications</li>
            <li>Extending Tableau analytics with AI-powered insights and recommendations</li>
            <li>Building real-time dashboards that combine Tableau data with other business metrics</li>
            <li>Automating workflows based on changes or thresholds in Tableau reports</li>
          </ul>
        </div>
      )
    },
  ];

  // Custom visual content for the Tableau MCP integration
  const visualContent = (
    <div className="flex flex-col">
      <div className="mb-6">
      </div>
      
      <div className="h-[500px]">
        <IntegrationMindMap data={tableauMcpMindMapData} />
      </div>
    </div>
  );

  return (
    <IntegrationPageTemplate
      name="Tableau MCP"
      headline="Seamless AI Research Within Your Tableau Environment"
      description="TextQL's MCP integration bridges the gap between visualization and intelligent analysis, enabling our AI agents to work directly with your Tableau datasets."
      faqItems={faqItems}
      visualContent={visualContent}
      ctaProps={{
        heading: "Ready to integrate Tableau MCP with TextQL?",
        subheader: "Deploy our intelligent data framework in your organization today",
        buttonText: "Get a demo"
      }}
    />
  );
}