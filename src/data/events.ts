interface Event {
  id: string;
  title: string;
  type: 'Conference' | 'Webinar' | 'Meetup' | 'Workshop';
  date: string;
  location: string;
  description: string;
  registrationUrl?: string;
  recordingUrl?: string;
  year?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: 'snowflake-summit-2024',
    title: 'Snowflake Summit 2024',
    type: 'Conference',
    date: 'June 3-6, 2024',
    location: 'Las Vegas, NV',
    description: 'Join us at Snowflake Summit to learn how TextQL is transforming data analysis with AI. Visit our booth for live demos and meet our team.',
    registrationUrl: 'https://www.snowflake.com/summit/'
  },
  {
    id: 'data-council-2024',
    title: 'Data Council Austin 2024',
    type: 'Conference',
    date: 'April 18-19, 2024',
    location: 'Austin, TX',
    description: 'TextQL is presenting on "Building Reliable AI Agents for Enterprise Data". Join us for an in-depth technical discussion.',
    registrationUrl: 'https://www.datacouncil.ai/austin'
  },
  {
    id: 'future-of-ai-webinar',
    title: 'The Future of AI in Enterprise',
    type: 'Webinar',
    date: 'March 28, 2024',
    location: 'Virtual',
    description: 'A deep dive into how AI is transforming enterprise data analysis, featuring case studies and live demonstrations.',
    registrationUrl: 'https://textql.com/webinar/future-of-ai'
  }
];

export const pastEvents: Event[] = [
  {
    id: 'dbt-coalesce-2023',
    title: 'dbt Coalesce 2023',
    type: 'Conference',
    date: 'October 16-19, 2023',
    location: 'San Diego, CA',
    description: 'TextQL presented "Building an Ontology for Enterprise Data" at dbt Coalesce 2023.',
    recordingUrl: 'https://www.youtube.com/watch?v=example1',
    year: '2023'
  },
  {
    id: 'data-council-sf-2023',
    title: 'Data Council SF 2023',
    type: 'Conference',
    date: 'July 11-12, 2023',
    location: 'San Francisco, CA',
    description: 'Our CTO discussed "The Architecture Behind TextQL\'s AI Agents" at Data Council SF.',
    recordingUrl: 'https://www.youtube.com/watch?v=example2',
    year: '2023'
  },
  {
    id: 'modern-data-stack-2023',
    title: 'Modern Data Stack Conference',
    type: 'Conference',
    date: 'May 8-9, 2023',
    location: 'New York, NY',
    description: 'TextQL showcased our enterprise data analysis platform and shared customer success stories.',
    recordingUrl: 'https://www.youtube.com/watch?v=example3',
    year: '2023'
  },
  {
    id: 'ai-summit-2022',
    title: 'AI Summit New York',
    type: 'Conference',
    date: 'December 7-8, 2022',
    location: 'New York, NY',
    description: 'TextQL launched our AI-powered data analysis platform at AI Summit New York.',
    recordingUrl: 'https://www.youtube.com/watch?v=example4',
    year: '2022'
  }
];