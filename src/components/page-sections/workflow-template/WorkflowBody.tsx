import { useState, useEffect } from 'react';
import { Text } from '../../ui';
import { InsightCard } from '../../InsightsFeed/InsightCard';
import { WorkflowContent } from './WorkflowContent';
import type { Workflow } from '../../../data/workflows/types';
import type { Insight } from '../../../types/insights';

interface WorkflowBodyProps {
  workflow: Workflow;
  insight?: Insight;
}

export function WorkflowBody({ workflow, insight }: WorkflowBodyProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand the insight card after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 800); // Delay to allow initial page render and animations

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-12">
          {/* Left Column - Features, Components, Requirements */}
          <WorkflowContent workflow={workflow} />

          {/* Right Column - Insight Card */}
          {insight && (
            <div className="lg:sticky lg:top-32">
              <div className="mb-6">
                <Text variant="header" theme="light" className="text-xl">
                  Deploy Ana to find insights like...
                </Text>
                <Text theme="light" color="muted" className="mt-2">
                  See how Ana can help you discover valuable opportunities in your data
                </Text>
              </div>
              <InsightCard 
                insight={insight} 
                isExpanded={isExpanded}
                onExpandToggle={setIsExpanded}
                theme="light"
                size="large"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}