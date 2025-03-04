import { useState } from 'react';
import { Calculator, Database, Search, PieChart, Monitor, Cpu } from 'lucide-react';
import { Text, Card } from '../../ui';

const acuCategories = [
  {
    name: 'Ontology',
    icon: Database,
    description: 'Data structure and relationship mapping',
    examples: [
      { task: 'Schema Analysis', acus: 5 },
      { task: 'Relationship Mapping', acus: 10 },
      { task: 'Data Model Creation', acus: 25 }
    ]
  },
  {
    name: 'Retrieval',
    icon: Search,
    description: 'Data querying and fetching operations',
    examples: [
      { task: 'Simple Query', acus: 2 },
      { task: 'Complex Join', acus: 15 },
      { task: 'Multi-source Query', acus: 30 }
    ]
  },
  {
    name: 'Analysis',
    icon: PieChart,
    description: 'Data processing and insight generation',
    examples: [
      { task: 'Basic Metrics', acus: 8 },
      { task: 'Trend Analysis', acus: 20 },
      { task: 'Predictive Model', acus: 50 }
    ]
  },
  {
    name: 'Presentation',
    icon: Monitor,
    description: 'Visualization and report generation',
    examples: [
      { task: 'Simple Chart', acus: 3 },
      { task: 'Interactive Dashboard', acus: 25 },
      { task: 'Full Report', acus: 40 }
    ]
  },
  {
    name: 'Compute',
    icon: Cpu,
    description: 'Processing and transformation tasks',
    examples: [
      { task: 'Data Transform', acus: 5 },
      { task: 'Batch Processing', acus: 30 },
      { task: 'Real-time Analysis', acus: 45 }
    ]
  }
];

export function PricingCalculator() {
  const [monthlyUsage, setMonthlyUsage] = useState(1000);
  const pricePerThousandACUs = 25;
  const estimatedCost = (monthlyUsage / 1000) * pricePerThousandACUs;

  return (
    <section className="py-24 bg-[#F0F5F3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl text-[#2A3B35] mb-4">
            Understanding ACU Costs
          </h2>
          <h3 className="text-xl text-[#4A665C] max-w-2xl mx-auto">
            Break down your usage with our detailed ACU guide and cost calculator
          </h3>
        </div>

        {/* ACU Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {acuCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                theme="light"
                padding="lg"
                className="bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#F0F5F3] rounded-lg">
                    <Icon className="w-6 h-6 text-[#2A3B35]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl text-[#2A3B35] mb-2">
                      {category.name}
                    </h4>
                    <Text theme="light" color="muted" className="mb-4">
                      {category.description}
                    </Text>
                    <div className="space-y-2">
                      {category.examples.map((example) => (
                        <div
                          key={example.task}
                          className="flex items-center justify-between text-sm"
                        >
                          <Text theme="light">{example.task}</Text>
                          <Text theme="light" className="font-medium">
                            {example.acus} ACUs
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Calculator Section */}
        <Card theme="light" padding="lg" className="max-w-2xl mx-auto bg-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-[#F0F5F3] rounded-lg">
              <Calculator className="w-6 h-6 text-[#2A3B35]" />
            </div>
            <h4 className="text-xl text-[#2A3B35]">
              Cost Calculator
            </h4>
          </div>

          <div className="space-y-6">
            {/* Slider */}
            <div>
              <Text theme="light" className="mb-2">
                Estimated Monthly ACU Usage
              </Text>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={monthlyUsage}
                onChange={(e) => setMonthlyUsage(Number(e.target.value))}
                className="w-full h-2 bg-[#F0F5F3] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2">
                <Text theme="light" color="muted" className="text-sm">
                  100 ACUs
                </Text>
                <Text theme="light" color="muted" className="text-sm">
                  10,000 ACUs
                </Text>
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#F0F5F3] p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Text theme="light" color="muted" className="text-sm mb-1">
                    Monthly Usage
                  </Text>
                  <Text theme="light" variant="metrics">
                    {monthlyUsage.toLocaleString()} ACUs
                  </Text>
                </div>
                <div>
                  <Text theme="light" color="muted" className="text-sm mb-1">
                    Estimated Cost
                  </Text>
                  <Text theme="light" variant="metrics">
                    ${estimatedCost.toLocaleString()}
                  </Text>
                </div>
              </div>
            </div>

            <Text theme="light" color="muted" className="text-sm">
              Note: This is an estimate based on our standard rate of ${pricePerThousandACUs} per 1,000 ACUs. 
              Actual costs may vary based on your specific usage patterns and chosen deployment option.
            </Text>
          </div>
        </Card>
      </div>
    </section>
  );
}