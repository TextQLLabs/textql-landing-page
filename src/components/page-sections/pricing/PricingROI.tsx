import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Clock, DollarSign, Zap } from 'lucide-react';
import { Text, Card } from '../../ui';

const useCase = [
  {
    title: "IMA Use Case",
    acus: 25000,
    annualCost: 7500,
    roi: 12.3,
    timeline: "3 months",
    description: "Automated insurance market analysis reducing manual work by 85%",
    metrics: [
      { month: 'Jan', value: 100 },
      { month: 'Feb', value: 240 },
      { month: 'Mar', value: 520 },
      { month: 'Apr', value: 890 },
      { month: 'May', value: 1200 },
      { month: 'Jun', value: 1450 }
    ]
  },
  {
    title: "ED Utils + SDOH Analysis",
    acus: 35000,
    annualCost: 10500,
    roi: 8.7,
    timeline: "6 months",
    description: "Predictive analytics for emergency department utilization",
    metrics: [
      { month: 'Jan', value: 150 },
      { month: 'Feb', value: 320 },
      { month: 'Mar', value: 480 },
      { month: 'Apr', value: 750 },
      { month: 'May', value: 980 },
      { month: 'Jun', value: 1320 }
    ]
  },
  {
    title: "Condition Management",
    acus: 45000,
    annualCost: 13500,
    roi: 15.2,
    timeline: "4 months",
    description: "AI-driven patient condition monitoring and early intervention",
    metrics: [
      { month: 'Jan', value: 200 },
      { month: 'Feb', value: 450 },
      { month: 'Mar', value: 780 },
      { month: 'Apr', value: 1100 },
      { month: 'May', value: 1550 },
      { month: 'Jun', value: 1890 }
    ]
  }
];

export function PricingROI() {
  const [selectedCase, setSelectedCase] = useState(useCase[0]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl text-[#2A3B35] mb-4">
            Real Results, Measurable ROI
          </h2>
          <h3 className="text-xl text-[#4A665C] max-w-2xl mx-auto">
            See how organizations are transforming their operations with TextQL
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8">
          {/* Use Cases List */}
          <div className="space-y-4">
            {useCase.map((item) => (
              <button
                key={item.title}
                onClick={() => setSelectedCase(item)}
                className={`w-full text-left transition-all ${
                  selectedCase.title === item.title
                    ? 'scale-[1.02]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Card
                  theme="light"
                  padding="lg"
                  className={`border-2 transition-colors ${
                    selectedCase.title === item.title
                      ? 'border-[#2A3B35] bg-white'
                      : 'border-transparent bg-[#F0F5F3]'
                  }`}
                >
                  <h4 className="text-xl text-[#2A3B35] mb-2">
                    {item.title}
                  </h4>
                  <Text theme="light" color="muted" className="mb-4">
                    {item.description}
                  </Text>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#2A3B35]" />
                      <Text theme="light">
                        {item.acus.toLocaleString()} ACUs
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#2A3B35]" />
                      <Text theme="light">{item.timeline}</Text>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>

          {/* ROI Details */}
          <Card theme="light" padding="lg" className="bg-white">
            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="space-y-1">
                <Text theme="light" color="muted" className="text-sm">
                  Annual Cost
                </Text>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#2A3B35]" />
                  <Text variant="metrics" theme="light">
                    ${selectedCase.annualCost.toLocaleString()}
                  </Text>
                </div>
              </div>
              <div className="space-y-1">
                <Text theme="light" color="muted" className="text-sm">
                  ROI
                </Text>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-[#2A3B35]" />
                  <Text variant="metrics" theme="light">
                    {selectedCase.roi}x
                  </Text>
                </div>
              </div>
              <div className="space-y-1">
                <Text theme="light" color="muted" className="text-sm">
                  Timeline
                </Text>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2A3B35]" />
                  <Text variant="metrics" theme="light">
                    {selectedCase.timeline}
                  </Text>
                </div>
              </div>
            </div>

            {/* Value Chart */}
            <div className="h-[300px]">
              <h5 className="text-sm text-[#4A665C] mb-4">
                Value Delivered Over Time
              </h5>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedCase.metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    stroke="#4A665C"
                    tick={{ fill: '#4A665C' }}
                  />
                  <YAxis
                    stroke="#4A665C"
                    tick={{ fill: '#4A665C' }}
                    tickFormatter={(value) => `$${value}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F0F5F3',
                      border: '1px solid #2A3B35',
                      borderRadius: '4px'
                    }}
                    formatter={(value) => [`$${value}k`, 'Value']}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2A3B35"
                    strokeWidth={2}
                    dot={{ fill: '#2A3B35', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}