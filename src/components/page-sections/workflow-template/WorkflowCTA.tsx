import { useLocation, useNavigate } from 'react-router-dom';
import { CTA } from '../../sections';
import type { Workflow } from '../../../data/workflows/types';

interface WorkflowCTAProps {
  workflow: Workflow;
}

export function WorkflowCTA({ workflow }: WorkflowCTAProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const onDemoRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/demo');
  };

  return (
    <CTA
      theme="dark"
      showWave={true}
      variant="wide"
      heading={`Get a demo of ${workflow.title}`}
      subheader="See how this workflow can transform your business operations"
      onCtaClick={onDemoRequest}
    />
  );
}