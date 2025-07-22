import { JoinsChart } from '../agents/joins';
import { Text } from '../../ui';
import { Section } from '../../ui/Section';
import { Brain, Network, Cpu } from 'lucide-react';

export function JoinsSection() {
  return (
    <Section
      variant="content"
      padding="md"
      background="secondary"
    >
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-12">
            {/* Header */}
            <div>
              <h2 className="text-3xl md:text-5xl font-extralight text-[#2A3B35] mb-6 text-center md:text-left">
                How Do We Find Insights Others Can't?
              </h2>
              <Text theme="light" color="muted" className="text-base md:text-xl text-center md:text-left">
                Our agents can connect 100x more data sources than any other solution, 
                finding insights across all your systems—regardless of how many 
                databases your data lives in.
              </Text>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-8">
              <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="md:p-2 rounded-lg bg-[#F0F5F3]">
                    <Brain className="w-6 h-6 text-[#2A3B35]" />
                  </div>
                  <Text variant="header" theme="light" className="text-lg text-center md:text-left">
                    Intelligent Agent Architecture
                  </Text>
                </div>
                <Text theme="light" color="secondary" className="text-center md:text-left">
                  Our agent understands complex data relationships and can 
                  automatically determine optimal join paths across hundreds of tables.
                </Text>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="md:p-2 rounded-lg bg-[#F0F5F3]">
                    <Network className="w-6 h-6 text-[#2A3B35]" />
                  </div>
                  <Text variant="header" theme="light" className="text-xl text-center md:text-left">
                    Comprehensive Data Ontology
                  </Text>
                </div>
                <Text theme="light" color="secondary" className="text-center md:text-left">
                  A sophisticated semantic layer maps relationships between tables, 
                  enabling deterministic joins at scale.
                </Text>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="md:p-2 rounded-lg bg-[#F0F5F3]">
                    <Cpu className="w-6 h-6 text-[#2A3B35]" />
                  </div>
                  <Text variant="header" theme="light" className="text-xl text-center md:text-left">
                    Massive Compute Power
                  </Text>
                </div>
                <Text theme="light" color="secondary" className="text-center md:text-left">
                  Our infrastructure handles complex join operations efficiently, 
                  processing hundreds of tables without performance degradation.
                </Text>
              </div>
            </div>
          </div>

          {/* Right Chart */}
          <div className="lg:sticky lg:top-32">
            <JoinsChart 
              height={600}
              xAxisHeight={100}
              margin={{ 
                top: 5, 
                right: 30, 
                bottom: 100, 
                left: 20 
              }}
            />
          </div>
        </div>
    </Section>
  );
}