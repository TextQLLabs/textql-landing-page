import type { BlogPost } from '../../components/page-sections/blog/types';

// Import individual blog posts
import { post as buildingDataAgent } from './building-data-agent';
import { post as futureOfData } from './future-of-data';
import { post as tenYearThesis } from './ten-year-thesis';
import { post as sqlModel } from './sql-model';
import { post as fundraising } from './fundraising';
import { post as nbaLaunchpad } from './nba-launchpad';
import { post as soc2Report } from './soc2-report';
import { post as haskellInProduction } from './haskell-in-production';
import { post as tableauIntegration } from './tableau-integration';
import { post as embeddingModels } from './embedding-models';
import { post as whyOntology } from './why-ontology';
import { post as sqlProcess } from './sql-process';
import { post as anaSmall } from './ana-small';

// Export all blog posts
// most recent at top
export const blogPosts: BlogPost[] = [
  anaSmall,
  sqlProcess, 
  whyOntology,
  embeddingModels,
  tableauIntegration,
  haskellInProduction,
  soc2Report,
  nbaLaunchpad,
  fundraising,
  buildingDataAgent,
  futureOfData,
  tenYearThesis,
  sqlModel,
];

// Function to get post content
export function getPostContent(id: string): string {
  try {
    switch (id) {
      case 'ana-small':
        return getAnaSmallContent();
      case 'sql-process':
        return getSQLProcessContent();
      case 'building-data-agent':
        return getBuildingDataAgentContent();
      case 'future-of-data':
        return getFutureOfDataContent();
      case 'ten-year-thesis':
        return getTenYearThesisContent();
      case 'sql-model':
        return getSQLModelContent();
      case 'fundraising':
        return getFundraisingContent();
      case 'nba-launchpad':
        return getNBALaunchpadContent();
      case 'soc2-report':
        return getSOC2ReportContent();
      case 'haskell-in-production':
        return getHaskellInProductionContent();
      case 'tableau-integration':
        return getTableauIntegrationContent();
      case 'embedding-models':
        return getEmbeddingModelsContent();
      case 'why-ontology':
        return getWhyOntologyContent();
      default:
        throw new Error(`Blog post content not found for id: ${id}`);
    }
  } catch (error) {
    console.error('Failed to load content for post ' + id + ':', error);
    return '';
  }
}

export function getAnaSmallContent(): string {
  return import.meta.glob('./ana-small/content.md', { query: '?raw', import: 'default', eager: true })['./ana-small/content.md'] as string;
}

export function getSQLProcessContent(): string {
  return import.meta.glob('./sql-process/content.md', { query: '?raw', import: 'default', eager: true })['./sql-process/content.md'] as string;
}

export function getBuildingDataAgentContent(): string {
  return import.meta.glob('./building-data-agent/content.md', { query: '?raw', import: 'default', eager: true })['./building-data-agent/content.md'] as string;
}

export function getFutureOfDataContent(): string {
  return import.meta.glob('./future-of-data/content.md', { query: '?raw', import: 'default', eager: true })['./future-of-data/content.md'] as string;
}

export function getTenYearThesisContent(): string {
  return import.meta.glob('./ten-year-thesis/content.md', { query: '?raw', import: 'default', eager: true })['./ten-year-thesis/content.md'] as string;
}

export function getSQLModelContent(): string {
  return import.meta.glob('./sql-model/content.md', { query: '?raw', import: 'default', eager: true })['./sql-model/content.md'] as string;
}

export function getFundraisingContent(): string {
  return import.meta.glob('./fundraising/content.md', { query: '?raw', import: 'default', eager: true })['./fundraising/content.md'] as string;
}

export function getNBALaunchpadContent(): string {
  return import.meta.glob('./nba-launchpad/content.md', { query: '?raw', import: 'default', eager: true })['./nba-launchpad/content.md'] as string;
}

export function getSOC2ReportContent(): string {
  return import.meta.glob('./soc2-report/content.md', { query: '?raw', import: 'default', eager: true })['./soc2-report/content.md'] as string;
}

export function getHaskellInProductionContent(): string {
  return import.meta.glob('./haskell-in-production/content.md', { query: '?raw', import: 'default', eager: true })['./haskell-in-production/content.md'] as string;
}

export function getTableauIntegrationContent(): string {
  return import.meta.glob('./tableau-integration/content.md', { query: '?raw', import: 'default', eager: true })['./tableau-integration/content.md'] as string;
}

export function getEmbeddingModelsContent(): string {
  return import.meta.glob('./embedding-models/content.md', { query: '?raw', import: 'default', eager: true })['./embedding-models/content.md'] as string;
}

export function getWhyOntologyContent(): string {
  return import.meta.glob('./why-ontology/content.md', { query: '?raw', import: 'default', eager: true })['./why-ontology/content.md'] as string;
}
