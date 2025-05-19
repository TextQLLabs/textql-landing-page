import { useParams } from 'react-router-dom';
import { WorkflowHeader, WorkflowBody } from '../../components/page-sections/workflow-template';
import { WorkflowCTA } from '../../components/page-sections/workflow-template/WorkflowCTA';
import { workflows } from '../../data/workflows';
import { Text } from '../../components/ui';
import { SEO } from '../../components/SEO';

// Import all insight files
const insightModules = import.meta.glob('../../data/workflows/*/insight.ts', { eager: true });

export default function WorkflowTemplate() {
  const { id } = useParams();
  const workflow = workflows.find(w => w.id === id);

  // Find matching insight for the workflow
  const insight = Object.entries(insightModules).reduce((acc: any, [path, module]: [string, any]) => {
    if (path.includes(`/${id}/`)) {
      return module.insight;
    }
    return acc;
  }, null);

  if (!workflow) {
    return (
      <div className="min-h-screen bg-black pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Text variant="header" className="text-4xl mb-6 text-[#B8D8D0]">
            Workflow Not Found
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title={`${workflow.title} | TextQL Workflows`}
        description={workflow.description}
        canonical={`https://textql.com/workflows/${workflow.id}/`}
        ogImage={workflow.image}
        ogType="article"
      />
      {/* Header Section */}
      <WorkflowHeader workflow={workflow} />

      {/* Body Section */}
      <WorkflowBody workflow={workflow} insight={insight} />

      {/* CTA Section */}
      <WorkflowCTA workflow={workflow} />
    </div>
  );
}