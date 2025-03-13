import { CompetitorConfig } from '../types';

export const competitors: CompetitorConfig[] = [
  {
    id: 'amazon-q',
    name: 'Amazon Q',
    theme: {
      primary: '#FF9900',
      background: '#232F3E',
      text: '#FFFFFF',
      userBubble: '#FF9900',
      assistantBubble: '#2D2D2D'
    }
  },
  {
    id: 'databricks',
    name: 'Databricks Genie',
    theme: {
      primary: '#FF3621',
      background: '#1B1B1B',
      text: '#FFFFFF',
      userBubble: '#FF3621',
      assistantBubble: '#2D2D2D'
    }
  },
  {
    id: 'hex',
    name: 'Hex',
    theme: {
      primary: '#7C4DFF',
      background: '#1A1A1A',
      text: '#FFFFFF',
      userBubble: '#7C4DFF',
      assistantBubble: '#2D2D2D'
    }
  },
  {
    id: 'snowflake',
    name: 'Snowflake Cortex Analyst',
    theme: {
      primary: '#29B5E8',
      background: '#1B242C',
      text: '#FFFFFF',
      userBubble: '#29B5E8',
      assistantBubble: '#2D2D2D'
    }
  }
];