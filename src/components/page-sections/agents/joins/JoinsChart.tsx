import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Text } from '../../../ui';

const joinCapabilityData = [
  { name: 'TextQL Ana', joins: 250, color: '#2A3B35' },
  { name: 'Palantir AIP', joins: 24, color: '#4A665C' },
  { name: 'Snowflake Cortex', joins: 8, color: '#4A665C' },
  { name: 'Databricks Genie', joins: 6, color: '#4A665C' },
  { name: 'Dystil AI', joins: 5, color: '#4A665C' },
  { name: 'Looker AI', joins: 3, color: '#4A665C' },
  { name: 'Tableau Pulse', joins: 2, color: '#4A665C' }
];

interface JoinsChartProps {
  height?: number;
  xAxisHeight?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  className?: string;
}

export function JoinsChart({ 
  height = 300,
  xAxisHeight = 80,
  margin = { top: 5, right: 30, bottom: 80, left: 60 },
  className = ''
}: JoinsChartProps) {
  return (
    <div className={`bg-[#F0F5F3] p-6 rounded-lg ${className}`}>
      <Text variant="header" theme="light" className="text-xl mb-6">
        Maximum Number of Tables AI Can Join Together
      </Text>
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={joinCapabilityData}
            margin={margin}
            barSize={40}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="rgba(42, 59, 53, 0.1)"
            />
            <XAxis 
              dataKey="name"
              stroke="#4A665C"
              tick={{ 
                fill: '#4A665C',
                angle: -45,
                textAnchor: 'end',
                dominantBaseline: 'auto',
                dx: -8,
                dy: 8,
                fontSize: 12
              }}
              height={xAxisHeight}
              interval={0}
            />
            <YAxis 
              stroke="#4A665C"
              tick={{ fill: '#4A665C' }}
              label={{ 
                value: 'Number of Table Sources They Can Connect', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#4A665C' },
                dx: -40
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#F0F5F3',
                border: '1px solid rgba(42, 59, 53, 0.2)',
                borderRadius: '4px',
                color: '#2A3B35'
              }}
              formatter={(value) => [`${value} sources`, 'Connection Capability']}
            />
            <Bar 
              dataKey="joins" 
              fill="#2A3B35"
              background={{ fill: 'rgba(42, 59, 53, 0.1)' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <Text theme="light" color="muted" className="text-sm italic">
          *This excludes other data agent products that don't come with any out of the box advertised joining capabilities
        </Text>
      </div>
    </div>
  );
}