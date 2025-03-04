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

// Export all blog posts
export const blogPosts: BlogPost[] = [
  sqlProcess, // Most recent first
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
  sqlModel
];

// Function to get post content
export function getPostContent(id: string): string {
  try {
    switch (id) {
      case 'sql-process':
        return import.meta.glob('./sql-process/content.md', { as: 'raw', eager: true })['./sql-process/content.md'];
      case 'building-data-agent':
        return import.meta.glob('./building-data-agent/content.md', { as: 'raw', eager: true })['./building-data-agent/content.md'];
      case 'future-of-data':
        return import.meta.glob('./future-of-data/content.md', { as: 'raw', eager: true })['./future-of-data/content.md'];
      case 'ten-year-thesis':
        return import.meta.glob('./ten-year-thesis/content.md', { as: 'raw', eager: true })['./ten-year-thesis/content.md'];
      case 'sql-model':
        return import.meta.glob('./sql-model/content.md', { as: 'raw', eager: true })['./sql-model/content.md'];
      case 'fundraising':
        return import.meta.glob('./fundraising/content.md', { as: 'raw', eager: true })['./fundraising/content.md'];
      case 'nba-launchpad':
        return import.meta.glob('./nba-launchpad/content.md', { as: 'raw', eager: true })['./nba-launchpad/content.md'];
      case 'soc2-report':
        return import.meta.glob('./soc2-report/content.md', { as: 'raw', eager: true })['./soc2-report/content.md'];
      case 'haskell-in-production':
        return import.meta.glob('./haskell-in-production/content.md', { as: 'raw', eager: true })['./haskell-in-production/content.md'];
      case 'tableau-integration':
        return import.meta.glob('./tableau-integration/content.md', { as: 'raw', eager: true })['./tableau-integration/content.md'];
      case 'embedding-models':
        return import.meta.glob('./embedding-models/content.md', { as: 'raw', eager: true })['./embedding-models/content.md'];
      case 'why-ontology':
        return import.meta.glob('./why-ontology/content.md', { as: 'raw', eager: true })['./why-ontology/content.md'];
      default:
        throw new Error(`Blog post content not found for id: ${id}`);
    }
  } catch (error) {
    console.error('Failed to load content for post ' + id + ':', error);
    return '';
  }
}