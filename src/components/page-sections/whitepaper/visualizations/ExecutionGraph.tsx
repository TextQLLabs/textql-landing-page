import { Database, Code2, BarChart3, Calculator, GitMerge, ChevronRight, User } from 'lucide-react';

export function ExecutionGraph() {
  return (
    <div className="w-full p-4 my-8">
      {/* Chat-like sequence of cells flowing top-down */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* User Question */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#B8D8D0] flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-[#2A3B35]" />
          </div>
          <div className="flex-1 bg-[#B8D8D0]/10 border border-[#B8D8D0]/20 px-4 py-3">
            <div className="text-gray-500">
              Why did Q3 margins drop compared to previous quarters?
            </div>
          </div>
        </div>

        {/* MetricExplorer and JoinCell on same row */}
        <div className="ml-6 border-l-2 border-[#E5E5E5] pl-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Metric Explorer Cell */}
            <div className="bg-white border border-[#E5E5E5] h-full">
              <div className="flex items-center bg-[#F7F7F7] px-3 py-2 border-b border-[#E5E5E5]">
                <Calculator size={16} className="text-[#2A3B35] mr-2" />
                <span className="text-[#2A3B35] font-medium">MetricExplorer</span>
              </div>
              <div className="p-3">
                <div className="text-gray-500">
                  Selecting metrics: Gross Margin % and Revenue.
                </div>
                <div className="text-gray-500 ml-4 mt-1">
                  → Group results by Quarter and Department.
                </div>
                <div className="text-gray-500 ml-4 mt-1">
                  → Filter to include Q1-2023, Q2-2023, and Q3-2023.
                </div>
                <div className="text-gray-500 ml-4 mt-1">
                  → Order by Quarter in ascending order.
                </div>
              </div>
            </div>

            {/* Join Cell */}
            <div className="bg-white border border-[#E5E5E5] h-full">
              <div className="flex items-center bg-[#F7F7F7] px-3 py-2 border-b border-[#E5E5E5]">
                <GitMerge size={16} className="text-[#2A3B35] mr-2" />
                <span className="text-[#2A3B35] font-medium">JoinCell</span>
              </div>
              <div className="p-3">
                <div className="text-gray-500">
                  Retrieve supplier price change details (supplier ID, effective date, price change %).
                </div>
                <div className="text-gray-500 ml-4 mt-1">
                  → Use the supplier price changes data source.
                </div>
                <div className="text-gray-500 ml-4 mt-1">
                  → Merge with margin data using supplier ID.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Response - Python Cell */}
        <div className="ml-6 border-l-2 border-[#E5E5E5] pl-4">
          <div className="bg-white border border-[#E5E5E5]">
            <div className="flex items-center bg-[#F7F7F7] px-3 py-2 border-b border-[#E5E5E5]">
              <Code2 size={16} className="text-[#2A3B35] mr-2" />
              <span className="text-[#2A3B35] font-medium">PythonCell</span>
            </div>
            <div className="p-3 font-mono text-sm overflow-x-auto bg-white">
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">1</div>
                <div className="text-[#4A665C]"><span className="text-blue-500 font-semibold">import</span> pandas <span className="text-blue-500 font-semibold">as</span> pd</div>
              </div>
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">3</div>
                <div className="text-[#4A665C]"></div>
              </div>
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">4</div>
                <div className="text-[#4A665C]"><span className="text-green-600"># Access data from previous ontology query</span></div>
              </div>
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">5</div>
                <div className="text-[#4A665C]">margin_data = sandbox.get_dataframe(<span className="text-orange-500">'margin_metrics'</span>)</div>
              </div>
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">6</div>
                <div className="text-[#4A665C]">supplier_impact = sandbox.get_dataframe(<span className="text-orange-500">'supplier_data'</span>)</div>
              </div>
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">7</div>
                <div className="text-[#4A665C]"></div>
              </div>
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">8</div>
                <div className="text-[#4A665C]"><span className="text-green-600"># Calculate quarter-over-quarter changes</span></div>
              </div>
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">9</div>
                <div className="text-[#4A665C]">margin_data[<span className="text-orange-500">'qoq_change'</span>] = margin_data.groupby(<span className="text-orange-500">'Department'</span>)[<span className="text-orange-500">'GrossMarginPct'</span>].diff()</div>
              </div>
              <div className="flex">
                <div className="text-gray-400 w-7 flex-shrink-0 text-right pr-2">10</div>
                <div className="text-[#4A665C]">...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cell */}
        <div className="ml-6 border-l-2 border-[#E5E5E5] pl-4">
          <div className="bg-white border border-[#E5E5E5]">
            <div className="flex items-center bg-[#F7F7F7] px-3 py-2 border-b border-[#E5E5E5]">
              <BarChart3 size={16} className="text-[#2A3B35] mr-2" />
              <span className="text-[#2A3B35] font-medium">DashboardCell</span>
            </div>
            <div className="p-4">
              <div className="text-[#2A3B35] font-medium mb-3">Q3 Margin Analysis</div>

              {/* Charts Grid */}
              <div className="grid grid-cols-2 gap-6 mb-2">
                {/* Bar Chart */}
                <div className="p-4">
                  <div className="text-sm font-medium text-[#2A3B35] mb-3">Quarterly Gross Margin %</div>

                  {/* SVG Chart */}
                  <div className="h-60 mb-4 relative group">
                    <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                      {/* Grid lines */}
                      <line x1="40" y1="0" x2="40" y2="160" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="0" x2="380" y2="0" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="40" x2="380" y2="40" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="80" x2="380" y2="80" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="120" x2="380" y2="120" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="160" x2="380" y2="160" stroke="#E5E5E5" strokeWidth="1" />

                      {/* Y axis labels */}
                      <text x="30" y="10" fontSize="10" textAnchor="end" fill="#4A665C">30%</text>
                      <text x="30" y="50" fontSize="10" textAnchor="end" fill="#4A665C">20%</text>
                      <text x="30" y="90" fontSize="10" textAnchor="end" fill="#4A665C">10%</text>
                      <text x="30" y="170" fontSize="10" textAnchor="end" fill="#4A665C">0%</text>

                      {/* Electronics Group */}
                      <g transform="translate(90, 0)" className="transition-opacity duration-200">
                        <rect x="0" y="99" width="25" height="61" fill="#B8D8D0" className="transition-all duration-200 hover:fill-opacity-90" />
                        <text x="12" y="94" fontSize="10" textAnchor="middle" fill="#4A665C">25.3%</text>
                        <rect x="30" y="124" width="25" height="36" fill="#729E8C" className="transition-all duration-200 hover:fill-opacity-90" />
                        <text x="42" y="119" fontSize="10" textAnchor="middle" fill="#4A665C">14.7%</text>
                        <text x="27" y="180" fontSize="10" textAnchor="middle" fill="#2A3B35" fontWeight="500">Electronics</text>
                      </g>

                      {/* Apparel Group */}
                      <g transform="translate(190, 0)" className="transition-opacity duration-200">
                        <rect x="0" y="83" width="25" height="77" fill="#B8D8D0" className="transition-all duration-200 hover:fill-opacity-90" />
                        <text x="12" y="78" fontSize="10" textAnchor="middle" fill="#4A665C">32.1%</text>
                        <rect x="30" y="88" width="25" height="72" fill="#729E8C" className="transition-all duration-200 hover:fill-opacity-90" />
                        <text x="42" y="83" fontSize="10" textAnchor="middle" fill="#4A665C">29.8%</text>
                        <text x="27" y="180" fontSize="10" textAnchor="middle" fill="#2A3B35" fontWeight="500">Apparel</text>
                      </g>

                      {/* Home Goods Group */}
                      <g transform="translate(290, 0)" className="transition-opacity duration-200">
                        <rect x="0" y="100" width="25" height="60" fill="#B8D8D0" className="transition-all duration-200 hover:fill-opacity-90" />
                        <text x="12" y="95" fontSize="10" textAnchor="middle" fill="#4A665C">24.8%</text>
                        <rect x="30" y="103" width="25" height="57" fill="#729E8C" className="transition-all duration-200 hover:fill-opacity-90" />
                        <text x="42" y="98" fontSize="10" textAnchor="middle" fill="#4A665C">23.5%</text>
                        <text x="27" y="180" fontSize="10" textAnchor="middle" fill="#2A3B35" fontWeight="500">Home Goods</text>
                      </g>
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-6 mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#B8D8D0] mr-1"></div>
                      <span className="text-xs text-[#4A665C]">Q2 2023</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#729E8C] mr-1"></div>
                      <span className="text-xs text-[#4A665C]">Q3 2023</span>
                    </div>
                  </div>
                </div>

                {/* Time Series Chart */}
                <div className="p-4">
                  <div className="text-sm font-medium text-[#2A3B35] mb-3">Margin Trends (12 Month)</div>
                  <div className="h-60 mb-4 relative">
                    <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                      <line x1="40" y1="0" x2="40" y2="160" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="0" x2="380" y2="0" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="40" x2="380" y2="40" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="80" x2="380" y2="80" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="120" x2="380" y2="120" stroke="#E5E5E5" strokeWidth="1" />
                      <line x1="40" y1="160" x2="380" y2="160" stroke="#E5E5E5" strokeWidth="1" />

                      <text x="30" y="10" fontSize="10" textAnchor="end" fill="#4A665C">35%</text>
                      <text x="30" y="50" fontSize="10" textAnchor="end" fill="#4A665C">25%</text>
                      <text x="30" y="90" fontSize="10" textAnchor="end" fill="#4A665C">15%</text>
                      <text x="30" y="170" fontSize="10" textAnchor="end" fill="#4A665C">0%</text>

                      {/* Electronics Line and Points */}
                      <g className="transition-all duration-200">
                        <path
                          d="M60,120 L120,110 L180,105 L240,99 L300,124 L360,140"
                          fill="none"
                          stroke="#B8D8D0"
                          strokeWidth="2"
                        />
                        <circle cx="60" cy="120" r="4" fill="#B8D8D0" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Electronics Q4 '22: 22.5%</title>
                        </circle>
                        <circle cx="120" cy="110" r="4" fill="#B8D8D0" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Electronics Q1 '23: 23.8%</title>
                        </circle>
                        <circle cx="180" cy="105" r="4" fill="#B8D8D0" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Electronics Q2 '23: 25.3%</title>
                        </circle>
                        <circle cx="240" cy="99" r="4" fill="#B8D8D0" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Electronics Q3 '23: 14.7%</title>
                        </circle>
                        <circle cx="300" cy="124" r="4" fill="#B8D8D0" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Electronics Q4 '23 (Projected): 13.2%</title>
                        </circle>
                        <circle cx="360" cy="140" r="4" fill="#B8D8D0" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Electronics Q1 '24 (Projected): 12.1%</title>
                        </circle>
                      </g>

                      {/* Apparel Line and Points */}
                      <g className="transition-all duration-200">
                        <path
                          d="M60,80 L120,85 L180,83 L240,83 L300,88 L360,90"
                          fill="none"
                          stroke="#729E8C"
                          strokeWidth="2"
                        />
                        <circle cx="60" cy="80" r="4" fill="#729E8C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Apparel Q4 '22: 31.2%</title>
                        </circle>
                        <circle cx="120" cy="85" r="4" fill="#729E8C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Apparel Q1 '23: 30.8%</title>
                        </circle>
                        <circle cx="180" cy="83" r="4" fill="#729E8C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Apparel Q2 '23: 32.1%</title>
                        </circle>
                        <circle cx="240" cy="83" r="4" fill="#729E8C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Apparel Q3 '23: 29.8%</title>
                        </circle>
                        <circle cx="300" cy="88" r="4" fill="#729E8C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Apparel Q4 '23 (Projected): 29.1%</title>
                        </circle>
                        <circle cx="360" cy="90" r="4" fill="#729E8C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Apparel Q1 '24 (Projected): 28.9%</title>
                        </circle>
                      </g>

                      {/* Home Goods Line and Points */}
                      <g className="transition-all duration-200">
                        <path
                          d="M60,100 L120,98 L180,102 L240,100 L300,103 L360,105"
                          fill="none"
                          stroke="#4A665C"
                          strokeWidth="2"
                        />
                        <circle cx="60" cy="100" r="4" fill="#4A665C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Home Goods Q4 '22: 25.1%</title>
                        </circle>
                        <circle cx="120" cy="98" r="4" fill="#4A665C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Home Goods Q1 '23: 25.3%</title>
                        </circle>
                        <circle cx="180" cy="102" r="4" fill="#4A665C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Home Goods Q2 '23: 24.8%</title>
                        </circle>
                        <circle cx="240" cy="100" r="4" fill="#4A665C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Home Goods Q3 '23: 23.5%</title>
                        </circle>
                        <circle cx="300" cy="103" r="4" fill="#4A665C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Home Goods Q4 '23 (Projected): 23.2%</title>
                        </circle>
                        <circle cx="360" cy="105" r="4" fill="#4A665C" className="cursor-pointer hover:r-5 transition-all duration-200">
                          <title>Home Goods Q1 '24 (Projected): 23.0%</title>
                        </circle>
                      </g>

                      <text x="60" y="180" fontSize="8" textAnchor="middle" fill="#4A665C">Q4 '22</text>
                      <text x="120" y="180" fontSize="8" textAnchor="middle" fill="#4A665C">Q1 '23</text>
                      <text x="180" y="180" fontSize="8" textAnchor="middle" fill="#4A665C">Q2 '23</text>
                      <text x="240" y="180" fontSize="8" textAnchor="middle" fill="#4A665C">Q3 '23</text>
                      <text x="300" y="180" fontSize="8" textAnchor="middle" fill="#4A665C">Q4 '23</text>
                      <text x="360" y="180" fontSize="8" textAnchor="middle" fill="#4A665C">Q1 '24</text>
                    </svg>
                  </div>

                  <div className="flex justify-center gap-4 mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#B8D8D0] mr-1"></div>
                      <span className="text-xs text-[#4A665C]">Electronics</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#729E8C] mr-1"></div>
                      <span className="text-xs text-[#4A665C]">Apparel</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#4A665C] mr-1"></div>
                      <span className="text-xs text-[#4A665C]">Home Goods</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border border-[#E5E5E5] mt-2">
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
  );
}
