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
          Unmatched Text to SQL at Scale
        </Text>
        <Text theme="light" color="secondary" className="text-xl leading-relaxed">
          Your enterprise doesn't have dozens of tables, it has hundreds of thousands. TextQL is the only platform that can connect those at scale.
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F0F5F3]">
              <Brain className="w-6 h-6 text-[#2A3B35]" />
            </div>
            <Text variant="header" theme="light" className="text-xl">
              Intelligent Agent Architecture
            </Text>
          </div>
          <Text theme="light" color="secondary">
            Our agent understands complex data relationships and can 
            automatically determine optimal join paths across hundreds of tables.
          </Text>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F0F5F3]">
              <Network className="w-6 h-6 text-[#2A3B35]" />
            </div>
            <Text variant="header" theme="light" className="text-xl">
              Comprehensive Data Ontology
            </Text>
          </div>
          <Text theme="light" color="secondary">
            A sophisticated semantic layer maps relationships between tables, 
            enabling deterministic joins at scale.
          </Text>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F0F5F3]">
              <Cpu className="w-6 h-6 text-[#2A3B35]" />
            </div>
            <Text variant="header" theme="light" className="text-xl">
              Massive Compute Power
            </Text>
          </div>
          <Text theme="light" color="secondary">
            Our infrastructure handles complex join operations efficiently, 
            processing hundreds of tables without performance degradation.
          </Text>
        </div>
      </div>
    </>
  );
}