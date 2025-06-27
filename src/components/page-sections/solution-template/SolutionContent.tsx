import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import { Text } from '../../ui';
import type { Solution } from '../../../data/solutions/types';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

interface SolutionContentProps {
  solution: Solution;
}

export function SolutionContent({ solution }: SolutionContentProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.run({ nodes: [mermaidRef.current] });
    }
  }, [solution.markdownContent]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <div className="max-w-3xl">
        <Text variant="header" theme="light" className="text-4xl mb-6">
          {solution.title}
        </Text>
        <Text theme="light" color="muted" className="text-xl leading-relaxed">
          {solution.description}
        </Text>
      </div>

      {/* Features */}
      {solution.features && solution.features.length > 0 && (
        <div>
          <Text variant="header" theme="light" className="text-2xl mb-6">
            Features
          </Text>
          <ul className="space-y-3">
            {solution.features.map((feature, index) => (
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
      {solution.implementation_steps && solution.implementation_steps.length > 0 && (
        <div>
          <Text variant="header" theme="light" className="text-2xl mb-6">
            Implementation Steps
          </Text>
          <div className="space-y-4">
            {solution.implementation_steps.map((step, index) => (
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
      {solution.markdownContent && (
        <div>
          <Text variant="header" theme="light" className="text-2xl mb-6">
            Technical Architecture
          </Text>
          <div className="p-6 bg-[#F0F5F3]">
            <div ref={mermaidRef} className="mermaid">
              {solution.markdownContent.match(/```mermaid\n([\s\S]*?)```/)?.[1]}
            </div>
          </div>
        </div>
      )}

      {/* System Requirements */}
      {solution.requirements && solution.requirements.length > 0 && (
        <div>
          <Text variant="header" theme="light" className="text-2xl mb-6">
            System Requirements
          </Text>
          <ul className="space-y-3">
            {solution.requirements.map((requirement, index) => (
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