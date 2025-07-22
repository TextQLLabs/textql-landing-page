import { Calculator, Database, Brain, PieChart, Cpu } from 'lucide-react';
import { Text, Section } from '../../ui';

const categories = [
  {
    icon: Database,
    name: 'Ontology',
    description: 'Data structure mapping and relationship modeling',
    example: 'Schema analysis: 50 ACUs'
  },
  {
    icon: Brain,
    name: 'Retrieval',
    description: 'Intelligent data access and connection',
    example: 'Complex join: 75 ACUs'
  },
  {
    icon: Calculator,
    name: 'Analysis',
    description: 'Deep data processing and insight generation',
    example: 'Pattern detection: 100 ACUs'
  },
  {
    icon: PieChart,
    name: 'Presentation',
    description: 'Insight formatting and visualization',
    example: 'Report generation: 25 ACUs'
  },
  {
    icon: Cpu,
    name: 'Compute',
    description: 'Processing power and resource utilization',
    example: 'Model execution: 150 ACUs'
  }
];

export function PricingFundamentals() {
  return (
    <Section
      variant="wide"
      padding="lg"
      className="bg-[#0A1F1C]"
    >
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl text-[#B8D8D0] mb-6">
            Understanding Agent Compute Units
          </h2>
          <h3 className="text-xl text-[#729E8C] leading-relaxed">
            Our hybrid pricing model combines outcome-based and usage-based pricing, 
            measured in Agent Compute Units (ACUs). Each ACU represents a standardized 
            unit of AI agent work, priced at $25 per 1,000 ACUs.
          </h3>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.name}
              className="bg-[#041810] border border-[#B8D8D0]/10 p-6 backdrop-blur-sm
                relative overflow-hidden group hover:border-[#B8D8D0]/20 transition-colors"
            >
              {/* Tech Pattern Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(184,216,208,0.03)_40%,rgba(184,216,208,0.03)_60%,transparent_60%)]" />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_48%,rgba(184,216,208,0.05)_48%,rgba(184,216,208,0.05)_52%,transparent_52%)]" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#B8D8D0]/10 rounded-lg">
                    <category.icon className="w-5 h-5 text-[#B8D8D0]" />
                  </div>
                  <h4 className="text-xl text-[#B8D8D0]">
                    {category.name}
                  </h4>
                </div>

                <Text color="secondary" className="mb-4">
                  {category.description}
                </Text>

                <div className="flex items-center gap-2 text-sm text-[#729E8C]">
                  <span className="px-2 py-1 bg-[#B8D8D0]/5 rounded">
                    {category.example}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <Text color="muted" className="text-sm">
            ACU consumption varies based on task complexity and data volume. 
            Contact us for a detailed breakdown and custom pricing for your specific needs.
          </Text>
        </div>
    </Section>
  );
}