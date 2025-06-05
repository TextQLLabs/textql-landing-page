import { FeatureGrid } from '../../sections';
import { Brain, Database, Shield, Zap, Layers, Code, ArrowUpRight } from 'lucide-react';
import { Button } from '../../ui';

export function AgentFeature1() {
  return (
    <div className="space-y-8">
      <FeatureGrid
        badge={{
          text: "Advanced Architecture",
          variant: "outline"
        }}
        title="Built for Enterprise Data"
        subtitle="Secure, Scalable, and Reliable"
        description="TextQL has developed a controllable insights agent for tabular data. Our architecture integrates multiple foundational concepts to ensure reliability and context management."
        features={[
          {
            icon: Brain,
            title: "Dakota Architecture",
            description: "State-machine architecture for runtime tool access and context management"
          },
          {
            icon: Database,
            title: "Chat Engine & Cells",
            description: "Layered architecture enabling natural data-driven conversations"
          },
          {
            icon: Layers,
            title: "Ontology Service",
            description: "Semantic framework for understanding complex data relationships"
          },
          {
            icon: Shield,
            title: "Sandbox Execution",
            description: "Secure environment for safe analysis and query execution"
          },
          {
            icon: Code,
            title: "Textables Format",
            description: "Standardized metadata format for consistent data handling"
          },
          {
            icon: Zap,
            title: "Real-time Processing",
            description: "High-performance engine for instant insights and analysis"
          }
        ]}
        theme="light"
        columns={3}
      />
      
      <div className="flex justify-center mb-16">
        <a 
          href="https://docs.textql.com/core/how-it-works/architecture"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button 
            variant="primary"
            size="lg"
            className="group"
          >
            Read more about how we built Ana
            <ArrowUpRight className="w-4h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </a>
      </div>
    </div>
  );
}