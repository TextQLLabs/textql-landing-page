import { Check } from 'lucide-react';

interface MenuItemProps {
  label: string;
  count?: number;
}

function MenuItem({ label, count }: MenuItemProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-white/5 border border-[#B8D8D0]/20 rounded-md mb-2 backdrop-blur-sm">
      <span className="text-[#B8D8D0]">{label}</span>
      {count !== undefined && (
        <span className="text-[#0f8a7a] font-medium">{count}</span>
      )}
    </div>
  );
}

export function AccuracyDiagram() {
  return (
    <div className="grid grid-cols-2 gap-12 h-[400px] w-full">
      {/* Structured Approach - Left Side */}
      <div className="flex items-center w-full">
        <div className="p-6 bg-[#0D4A42]/50 border border-[#B8D8D0]/10 rounded-lg backdrop-blur-sm w-full">
          <h3 className="text-[#B8D8D0] font-medium mb-4">Ana's Structured Approach</h3>
          <div className="space-y-2">
            <MenuItem label="Core Object" count={1} />
            <MenuItem label="Joinable Objects" count={2} />
            <MenuItem label="Attributes" count={12} />
            <MenuItem label="Saved Metrics" count={1} />
            <MenuItem label="Filters" />
            <MenuItem label="Orders" />
          </div>
        </div>
      </div>

      {/* Unstructured Approach - Right Side */}
      <div className="flex items-center w-full">
        <div className="p-6 bg-[#0D4A42]/50 border border-[#B8D8D0]/10 rounded-lg backdrop-blur-sm w-full">
          <h3 className="text-[#B8D8D0] font-medium mb-4">Traditional Approach</h3>
          <div className="flex items-center justify-center w-full h-[180px] bg-white/5 border border-[#B8D8D0]/20 rounded-md">
            <span className="text-[#B8D8D0]/60 select-none">Enter your SQL here...</span>
          </div>
        </div>
      </div>
    </div>
  );
}