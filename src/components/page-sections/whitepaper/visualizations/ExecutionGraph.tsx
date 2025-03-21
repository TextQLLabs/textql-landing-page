import { ArrowRight } from 'lucide-react';

export function ExecutionGraph() {
  return (
    <div className="w-full bg-[#1A1A1A] rounded-xl p-8 my-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        {/* Cell 1 - Python */}
        <div className="flex-1 bg-[#2A2A2A] rounded-lg p-4 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#4A90E2]"></div>
            <span className="text-[#4A90E2] font-medium">PythonCell</span>
          </div>
          <p className="text-gray-400 text-sm">Clean Data</p>
        </div>

        {/* Arrow 1 */}
        <ArrowRight className="text-gray-600 w-6 h-6 transform rotate-90 md:rotate-0" />

        {/* Cell 2 - Metric */}
        <div className="flex-1 bg-[#2A2A2A] rounded-lg p-4 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#50E3C2]"></div>
            <span className="text-[#50E3C2] font-medium">MetricExplorer</span>
          </div>
          <p className="text-gray-400 text-sm">Apply CAC Formula</p>
        </div>

        {/* Arrow 2 */}
        <ArrowRight className="text-gray-600 w-6 h-6 transform rotate-90 md:rotate-0" />

        {/* Cell 3 - Join */}
        <div className="flex-1 bg-[#2A2A2A] rounded-lg p-4 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#BD10E0]"></div>
            <span className="text-[#BD10E0] font-medium">JoinCell</span>
          </div>
          <p className="text-gray-400 text-sm">Merge CRM + ERP via OQL</p>
        </div>

        {/* Arrow 3 */}
        <ArrowRight className="text-gray-600 w-6 h-6 transform rotate-90 md:rotate-0" />

        {/* Cell 4 - Streamlit */}
        <div className="flex-1 bg-[#2A2A2A] rounded-lg p-4 min-w-[200px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
            <span className="text-[#FF6B6B] font-medium">StreamlitCell</span>
          </div>
          <p className="text-gray-400 text-sm">Render Dashboard</p>
        </div>
      </div>
    </div>
  );
} 