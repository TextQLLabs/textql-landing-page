import { Database, Code2, BarChart3 } from 'lucide-react';

export function ExecutionGraph() {
  return (
    <div className="w-full bg-white p-4 my-8 shadow-sm border border-[#E5E5E5]">
      {/* Chat-like sequence of cells flowing top-down */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* User Question */}
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-[#F0F5F3] rounded-full flex items-center justify-center">
            <span className="text-[#2A3B35] font-medium">U</span>
          </div>
          <div className="flex-1">
            <div className="text-[#2A3B35] font-medium mb-1">User</div>
            <div className="text-[#4A665C]">Why did Q3 margins drop compared to previous quarters?</div>
          </div>
        </div>

        {/* System Response - Python Cell */}
        <div className="ml-6 border-l-2 border-[#E5E5E5] pl-4">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#4A90E2] rounded-full flex items-center justify-center text-white">
              <Code2 size={16} />
            </div>
            <div className="flex-1 bg-white border border-[#E5E5E5] rounded shadow-sm">
              <div className="flex items-center bg-[#F7F7F7] px-3 py-2 border-b border-[#E5E5E5]">
                <span className="text-[#2A3B35] font-medium">PythonCell</span>
              </div>
              <div className="p-3 font-mono text-sm overflow-x-auto bg-white">
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">1</div>
                  <div className="text-[#4A665C]"><span className="text-blue-600">import</span> pandas <span className="text-blue-600">as</span> pd</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">2</div>
                  <div className="text-[#4A665C]"><span className="text-blue-600">import</span> matplotlib.pyplot <span className="text-blue-600">as</span> plt</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">3</div>
                  <div className="text-[#4A665C]"></div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">4</div>
                  <div className="text-[#4A665C]"><span className="text-green-600"># Load quarterly sales data</span></div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">5</div>
                  <div className="text-[#4A665C]">df = pd.read_csv(<span className="text-orange-600">'sales_data_2023.csv'</span>)</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">6</div>
                  <div className="text-[#4A665C]"></div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">7</div>
                  <div className="text-[#4A665C]"><span className="text-green-600"># Calculate margin percentages</span></div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">8</div>
                  <div className="text-[#4A665C]">df[<span className="text-orange-600">'margin_pct'</span>] = (df[<span className="text-orange-600">'revenue'</span>] - df[<span className="text-orange-600">'cost'</span>]) / df[<span className="text-orange-600">'revenue'</span>] * 100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* MetricExplorer and JoinCell on same row */}
        <div className="ml-6 border-l-2 border-[#E5E5E5] pl-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Metric Explorer Cell */}
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#50E3C2] rounded-full flex items-center justify-center text-white">
              <Database size={16} />
            </div>
            <div className="flex-1 bg-white border border-[#E5E5E5] rounded shadow-sm">
              <div className="flex items-center bg-[#F7F7F7] px-3 py-2 border-b border-[#E5E5E5]">
                <span className="text-[#2A3B35] font-medium">MetricExplorer</span>
              </div>
              <div className="p-3 font-mono text-sm overflow-x-auto bg-white">
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">1</div>
                  <div className="text-[#4A665C]"><span className="text-purple-600">METRICS</span> GrossMarginPct, Revenue</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">2</div>
                  <div className="text-[#4A665C]"><span className="text-purple-600">DIMENSIONS</span> Quarter, Department</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">3</div>
                  <div className="text-[#4A665C]"><span className="text-purple-600">FILTER</span> Quarter IN (<span className="text-orange-600">'Q1-2023'</span>, <span className="text-orange-600">'Q2-2023'</span>, <span className="text-orange-600">'Q3-2023'</span>)</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">4</div>
                  <div className="text-[#4A665C]"><span className="text-purple-600">ORDER BY</span> Quarter <span className="text-blue-600">ASC</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Cell */}
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#BD10E0] rounded-full flex items-center justify-center text-white">
              <Database size={16} />
            </div>
            <div className="flex-1 bg-white border border-[#E5E5E5] rounded shadow-sm">
              <div className="flex items-center bg-[#F7F7F7] px-3 py-2 border-b border-[#E5E5E5]">
                <span className="text-[#2A3B35] font-medium">JoinCell</span>
              </div>
              <div className="p-3 font-mono text-sm overflow-x-auto bg-white">
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">1</div>
                  <div className="text-[#4A665C]"><span className="text-blue-600">WITH</span> supplier_data <span className="text-blue-600">AS</span> (</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">2</div>
                  <div className="text-[#4A665C]">  <span className="text-blue-600">SELECT</span> supplier_id, effective_date, price_change_pct</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">3</div>
                  <div className="text-[#4A665C]">  <span className="text-blue-600">FROM</span> supplier_price_changes</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">4</div>
                  <div className="text-[#4A665C]">)</div>
                </div>
                <div className="flex">
                  <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">5</div>
                  <div className="text-[#4A665C]"><span className="text-blue-600">JOIN</span> margin_data <span className="text-blue-600">USING</span> (supplier_id)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cell */}
        <div className="ml-6 border-l-2 border-[#E5E5E5] pl-4">
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white">
              <BarChart3 size={16} />
            </div>
            <div className="flex-1 bg-white border border-[#E5E5E5] rounded shadow-sm">
              <div className="flex items-center bg-[#F7F7F7] px-3 py-2 border-b border-[#E5E5E5]">
                <span className="text-[#2A3B35] font-medium">DashboardCell</span>
              </div>
              
              {/* Table output like in the screenshots */}
              <div className="p-4">
                <div className="text-[#2A3B35] font-medium mb-3">Q3 Margin Analysis</div>
                
                {/* Bar Chart */}
                <div className="h-32 mb-4 bg-white border border-[#E5E5E5] p-3">
                  <div className="flex h-full items-end">
                    <div className="flex flex-col h-full justify-between mr-2">
                      <div className="text-xs text-[#4A665C]">30%</div>
                      <div className="text-xs text-[#4A665C]">20%</div>
                      <div className="text-xs text-[#4A665C]">10%</div>
                      <div className="text-xs text-[#4A665C]">0%</div>
                    </div>
                    <div className="flex-1 flex items-end justify-around">
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-[#4A90E2] h-[65%]"></div>
                        <div className="text-xs text-[#4A665C] mt-1">Q1</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-[#4A90E2] h-[62%]"></div>
                        <div className="text-xs text-[#4A665C] mt-1">Q2</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 bg-[#FF6B6B] h-[45%]"></div>
                        <div className="text-xs text-[#4A665C] mt-1">Q3</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Table like in screenshot */}
                <div className="overflow-x-auto border border-[#E5E5E5]">
                  <table className="min-w-full divide-y divide-[#E5E5E5]">
                    <thead className="bg-[#F7F7F7]">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-[#2A3B35]">Department</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-[#2A3B35]">Q2 Margin</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-[#2A3B35]">Q3 Margin</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-[#2A3B35]">Change</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-[#2A3B35]">Supplier Impact</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E5E5E5]">
                      <tr className="bg-[#FFF4F4]">
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">Electronics</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">25.3%</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">14.7%</td>
                        <td className="px-3 py-2 text-xs text-[#FF6B6B]">-10.6%</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">Yes (12% increase)</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">Apparel</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">32.1%</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">29.8%</td>
                        <td className="px-3 py-2 text-xs text-[#FF6B6B]">-2.3%</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">No</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">Home Goods</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">24.8%</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">23.5%</td>
                        <td className="px-3 py-2 text-xs text-[#FF6B6B]">-1.3%</td>
                        <td className="px-3 py-2 text-xs text-[#2A3B35]">No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">1-3 of 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 