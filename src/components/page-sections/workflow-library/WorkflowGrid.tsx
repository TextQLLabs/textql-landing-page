import { WorkflowCard } from './WorkflowCard';
import { workflows } from '../../../data/workflows';

interface WorkflowGridProps {
  selectedIndustry: string | null;
}

export function WorkflowGrid({ selectedIndustry }: WorkflowGridProps) {
  const filteredWorkflows = selectedIndustry
    ? workflows.filter(w => w.industryId === selectedIndustry)
    : workflows;

  if (filteredWorkflows.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#4A665C]">
          No workflows found for this industry. Check back soon for updates!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredWorkflows.map(workflow => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}