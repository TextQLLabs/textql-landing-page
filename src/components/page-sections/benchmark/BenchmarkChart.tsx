import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Text } from '../../ui';

interface DataItem {
  name: string;
  value: number;
  isTextQL?: boolean;
}

const data: DataItem[] = [
  { name: 'TextQL Ana', value: 91, isTextQL: true },
  { name: 'TextQL Ana Small', value: 76, isTextQL: true },
  { name: 'Deepnote', value: 74 },
  { name: 'Amazon Q', value: 35 },
  { name: 'Databricks Genie', value: 26 },
  { name: 'Hex', value: 21 },
  { name: 'Snowflake Cortex Analyst', value: 0 }
];

// Smooth easeOut function
const easeOut = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

export function BenchmarkChart() {
  const [animatedData, setAnimatedData] = useState<DataItem[]>(data.map(item => ({ ...item, value: 0 })));
  const maxValue = 100; // Set to 100 for percentage scale

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 800;
      const steps = 100;
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedData(data);
          return;
        }

        const progress = easeOut((currentStep + 1) / steps);
        
        setAnimatedData(data.map(item => ({
          ...item,
          value: Math.floor(item.value * progress)
        })));

        currentStep++;
      }, duration / steps);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <Text variant="header" className="text-2xl text-center">
        Conglomerate Text-to-SQL Benchmark V1 Lite Results
      </Text>
      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={animatedData}
            margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
            barSize={60}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="rgba(114, 158, 140, 0.2)"
            />
            <XAxis 
              dataKey="name"
              stroke="#729E8C"
              tick={{ 
                fill: '#729E8C',
                angle: -45,
                textAnchor: 'end',
                dominantBaseline: 'auto',
                dx: -8,
                dy: 8,
                fontSize: 12
              }}
              height={100}
              interval={0}
            />
            <YAxis 
              stroke="#729E8C"
              tick={{ fill: '#729E8C' }}
              label={{ 
                value: 'Score', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#729E8C' },
                dx: -20
              }}
              domain={[0, maxValue]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(10, 31, 28, 0.9)',
                border: '1px solid rgba(114, 158, 140, 0.2)',
                borderRadius: '4px',
                color: '#B8D8D0',
                backdropFilter: 'blur(8px)'
              }}
              formatter={(value) => [`${value}%`, 'Score']}
              cursor={false}
            />
            <Bar 
              dataKey="value" 
              fill="#0D4A42"
              background={{ fill: 'rgba(114, 158, 140, 0.05)' }}
              fillOpacity={0.8}
            >
              {
                animatedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isTextQL ? '#0f8a7a' : '#0D4A42'}
                  />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}