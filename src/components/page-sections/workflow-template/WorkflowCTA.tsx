import { useLocation } from 'react-router-dom';
import { CTA } from '../../sections';
import { handleSimpleDemoRequest } from '../../../utils/demo-requests/simple';
import type { Workflow } from '../../../data/workflows/types';

interface WorkflowCTAProps {
  workflow: Workflow;
}

export function WorkflowCTA({ workflow }: WorkflowCTAProps) {
  const location = useLocation();

  const onDemoRequest = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result = await handleSimpleDemoRequest(location.pathname);
    window.open(result.formUrl, '_blank');
  };

  return (
    <CTA
      theme="dark"
      showWave={true}
      variant="wide"
      heading={`Get a demo of ${workflow.title}`}
      subheader="See how this workflow can transform your business operations"
      ctaText="Request Demo"
      ctaHref="#"
      onCtaClick={onDemoRequest}
    />
  );
}