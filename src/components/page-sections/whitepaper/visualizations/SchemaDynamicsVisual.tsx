import { Text } from '../../../ui';

export function SchemaDynamicsVisual() {
  return (
    <div className="my-8 max-w-4xl mx-auto">
      <div className="font-mono bg-white border border-[#E5E5E5] overflow-hidden">
        <div className="bg-[#F7F7F7] py-1 px-4 flex items-center border-b border-[#E5E5E5]">
          <div className="w-3 h-3 bg-[#B8D8D0] mr-2"></div>
          <span className="text-xs text-[#2A3B35]">schema_changes.log</span>
        </div>
        
        <div className="p-6 text-sm">
          {/* New Tables */}
          <div className="mb-4">
            <span className="text-[#B8D8D0]">$</span>
            <span className="text-[#2A3B35]"> CREATE TABLE</span>
            <span className="text-[#4A665C]"> q3_2024_financials </span>
            <span className="text-[#2A3B35]">(</span>
            <span className="text-[#4A665C]">id, date, revenue, expenses, ...</span>
            <span className="text-[#2A3B35]">);</span>
            <div className="pl-6 text-[#729E8C] mt-1">// New tables appear weekly</div>
          </div>
          
          {/* Columns Deprecated */}
          <div className="mb-4">
            <span className="text-[#B8D8D0]">$</span>
            <span className="text-[#2A3B35]"> ALTER TABLE</span>
            <span className="text-[#4A665C]"> customers </span>
            <span className="text-[#2A3B35]">RENAME COLUMN</span>
            <span className="text-[#4A665C]"> region </span>
            <span className="text-[#2A3B35]">TO</span>
            <span className="text-[#4A665C]"> business_unit;</span>
            <div className="pl-6 text-[#729E8C] mt-1">// Columns are deprecated</div>
          </div>
          
          {/* Cross-Database Joins */}
          <div>
            <span className="text-[#B8D8D0]">$</span>
            <span className="text-[#2A3B35]"> SELECT</span>
            <span className="text-[#4A665C]"> * </span>
            <span className="text-[#2A3B35]">FROM</span>
            <span className="text-[#4A665C]"> snowflake.users </span>
            <span className="text-[#2A3B35]">JOIN</span>
            <span className="text-[#4A665C]"> dynamodb.preferences </span>
            <span className="text-[#2A3B35]">ON</span>
            <span className="text-[#4A665C]"> users.id = preferences.user_id;</span>
            <div className="pl-6 text-[#729E8C] mt-1">// Cross-database joins emerge</div>
          </div>
        </div>
      </div>
    </div>
  );
} 