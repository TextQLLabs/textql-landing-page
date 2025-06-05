import { Text } from '../../../ui';
import { Brain, Network, Cpu } from 'lucide-react';

export function JoinsContent() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <Text 
          variant="header" 
          theme="light"
          className="text-4xl md:text-5xl font-extralight mb-6"
        >
          Ontology-Powered Joins at Scale
        </Text>
        <Text theme="light" color="secondary" className="text-base lg:text-xl leading-relaxed">
          TextQL's Ontology is the foundation that enables our unmatched join capabilities, 
          connecting hundreds of tables through semantic understanding.
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F0F5F3]">
              <Brain className="w-6 h-6 text-[#2A3B35]" />
            </div>
            <Text variant="header" theme="light" className="text-xl">
              Semantic Understanding
            </Text>
          </div>
          <Text theme="light" color="secondary">
            Our ontology understands the meaning and relationships between tables, 
            automatically determining optimal join paths.
          </Text>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F0F5F3]">
              <Network className="w-6 h-6 text-[#2A3B35]" />
            </div>
            <Text variant="header" theme="light" className="text-xl">
              Relationship Mapping
            </Text>
          </div>
          <Text theme="light" color="secondary">
            The ontology maintains a comprehensive map of table relationships, 
            enabling deterministic joins across your entire data ecosystem.
          </Text>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F0F5F3]">
              <Cpu className="w-6 h-6 text-[#2A3B35]" />
            </div>
            <Text variant="header" theme="light" className="text-xl">
              Intelligent Optimization
            </Text>
          </div>
          <Text theme="light" color="secondary">
            Leveraging the ontology, our system optimizes complex join operations 
            for maximum performance and efficiency.
          </Text>
        </div>
      </div>
    </>
  );
}