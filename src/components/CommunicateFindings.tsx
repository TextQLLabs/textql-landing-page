import React from 'react';
import TabsDisplay, { TabContentType } from './TabsDisplay';

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

export default function CommunicateFindings() {
  return (
    <TabsDisplay
      title="Discover Deeper Value from Your Tableaus"
      tabs={tabContent}
      defaultActiveTab="Ingest Tableaus"
    />
  );
} 