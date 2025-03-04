import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import { Text } from '../../ui';
import type { Workflow } from '../../../data/workflows/types';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

interface WorkflowContentProps {
  workflow: Workflow;
}

export function WorkflowContent({ workflow }: WorkflowContentProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.run({ nodes: [mermaidRef.current] });
    }
  }, [workflow.markdownContent]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <div className="max-w-3xl">
        <Text variant="header" theme="light" className="text-4xl mb-6">
          {workflow.title}
        </Text>
        <Text theme="light" color="muted" className="text-xl leading-relaxed">
          {workflow.description}
        </Text>
      </div>

      {/* Features */}
      {workflow.features && workflow.features.length > 0 && (
        <div>
          <Text variant="header" theme="light" className="text-2xl mb-6">
            Features
          </Text>
          <ul className="space-y-3">
            {workflow.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[#2A3B35] mt-1.5">•</span>
                <Text theme="light" className="text-lg">
                  {feature.replace(/^["']|["']$/g, '')}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Implementation Steps */}
      {workflow.implementation_steps && workflow.implementation_steps.length > 0 && (
        <div>
          <Text variant="header" theme="light" className="text-2xl mb-6">
            Implementation Steps
          </Text>
          <div className="space-y-4">
            {workflow.implementation_steps.map((step, index) => (
              <details key={index} className="group">
                <summary className="flex items-center justify-between p-4 bg-[#F0F5F3] cursor-pointer">
                  <Text theme="light" className="font-medium text-lg">
                    {index + 1}. {step.title}
                  </Text>
                  <svg
                    className="w-5 h-5 transform transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                {step.tasks && (
                  <div className="p-4 border border-[#2A3B35]/10">
                    <ul className="space-y-2">
                      {step.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-3">
                          <span className="text-[#2A3B35]/60 mt-1">•</span>
                          <Text theme="light" color="muted">
                            {task}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Technical Architecture */}
      {workflow.markdownContent && (
        <div>
          <Text variant="header" theme="light" className="text-2xl mb-6">
            Technical Architecture
          </Text>
          <div className="p-6 bg-[#F0F5F3]">
            <div ref={mermaidRef} className="mermaid">
              {workflow.markdownContent.match(/```mermaid\n([\s\S]*?)```/)?.[1]}
            </div>
          </div>
        </div>
      )}

      {/* System Requirements */}
      {workflow.requirements && workflow.requirements.length > 0 && (
        <div>
          <Text variant="header" theme="light" className="text-2xl mb-6">
            System Requirements
          </Text>
          <ul className="space-y-3">
            {workflow.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[#2A3B35] mt-1.5">•</span>
                <Text theme="light">
                  {requirement.replace(/^["']|["']$/g, '')}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}