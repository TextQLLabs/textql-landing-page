export function TextQLChat() {
  return (
    <div className="h-full bg-[#0A1F1C] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#B8D8D0]/20">
        <h3 className="font-medium text-[#B8D8D0]">TextQL Ana</h3>
      </div>

      {/* Chat Content */}
      <div className="p-4 space-y-4 h-[400px] overflow-y-auto">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-[#0f8a7a] rounded-lg px-4 py-2">
            <p className="text-white">
              For each property class, what's the total net income per square foot for mixed use spaces
            </p>
          </div>
        </div>

        {/* Assistant Message */}
        <div className="flex justify-start">
          <div className="max-w-[80%] bg-[#0D4A42] rounded-lg px-4 py-2 space-y-4">
            <p className="text-[#B8D8D0]">
              The property table holds building details while occupancy_record stores net income, so I'll join these tables by property_id, filter for mixed use, and group by property class to calculate net income per square foot.
            </p>
            
            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 pr-4 text-[#B8D8D0]/60 font-medium">property_class</th>
                    <th className="py-2 px-4 text-[#B8D8D0]/60 font-medium">total_net_income</th>
                    <th className="py-2 px-4 text-[#B8D8D0]/60 font-medium">total_square_feet</th>
                    <th className="py-2 pl-4 text-[#B8D8D0]/60 font-medium">net_income_per_sq_ft</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 text-[#B8D8D0]">A</td>
                    <td className="py-2 px-4 text-[#B8D8D0]">3,743,830</td>
                    <td className="py-2 px-4 text-[#B8D8D0]">11,566,888</td>
                    <td className="py-2 pl-4 text-[#B8D8D0]">0.32</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-[#B8D8D0]">B</td>
                    <td className="py-2 px-4 text-[#B8D8D0]">16,293,990</td>
                    <td className="py-2 px-4 text-[#B8D8D0]">131,085,632</td>
                    <td className="py-2 pl-4 text-[#B8D8D0]">0.12</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-[#B8D8D0]">C</td>
                    <td className="py-2 px-4 text-[#B8D8D0]">3,827,881</td>
                    <td className="py-2 px-4 text-[#B8D8D0]">22,488,184</td>
                    <td className="py-2 pl-4 text-[#B8D8D0]">0.17</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}