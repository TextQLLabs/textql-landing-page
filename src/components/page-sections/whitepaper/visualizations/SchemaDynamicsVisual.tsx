import { Text } from '../../../ui';

export function SchemaDynamicsVisual() {
  return (
    <div className="my-8 max-w-4xl mx-auto">
      <div className="font-mono bg-black border border-[#0f8a7a]/20 overflow-hidden">
        <div className="bg-[#0A1F1C] py-1 px-4 flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#0f8a7a] mr-2"></div>
          <span className="text-xs text-[#B8D8D0]">schema_changes.log</span>
        </div>
        
        <div className="p-6 text-sm">
          {/* New Tables */}
          <div className="mb-4">
            <span className="text-[#0f8a7a]">$</span>
            <span className="text-[#729E8C]"> CREATE TABLE</span>
            <span className="text-[#B8D8D0]"> q3_2024_financials </span>
            <span className="text-[#729E8C]">(</span>
            <span className="text-[#B8D8D0]">id, date, revenue, expenses, ...</span>
            <span className="text-[#729E8C]">);</span>
            <div className="pl-6 text-[#729E8C]/70 mt-1">// New tables appear weekly</div>
          </div>
          
          {/* Columns Deprecated */}
          <div className="mb-4">
            <span className="text-[#0f8a7a]">$</span>
            <span className="text-[#729E8C]"> ALTER TABLE</span>
            <span className="text-[#B8D8D0]"> customers </span>
            <span className="text-[#729E8C]">RENAME COLUMN</span>
            <span className="text-[#B8D8D0]"> region </span>
            <span className="text-[#729E8C]">TO</span>
            <span className="text-[#B8D8D0]"> business_unit;</span>
            <div className="pl-6 text-[#729E8C]/70 mt-1">// Columns are deprecated</div>
          </div>
          
          {/* Cross-Database Joins */}
          <div>
            <span className="text-[#0f8a7a]">$</span>
            <span className="text-[#729E8C]"> SELECT</span>
            <span className="text-[#B8D8D0]"> * </span>
            <span className="text-[#729E8C]">FROM</span>
            <span className="text-[#B8D8D0]"> snowflake.users </span>
            <span className="text-[#729E8C]">JOIN</span>
            <span className="text-[#B8D8D0]"> dynamodb.preferences </span>
            <span className="text-[#729E8C]">ON</span>
            <span className="text-[#B8D8D0]"> users.id = preferences.user_id;</span>
            <div className="pl-6 text-[#729E8C]/70 mt-1">// Cross-database joins emerge</div>
          </div>
        </div>
      </div>
    </div>
  );
} 