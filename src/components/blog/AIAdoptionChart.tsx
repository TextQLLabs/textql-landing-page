import React from 'react';

interface AdoptionLevel {
  level: number;
  name: string;
  exampleTools: string;
  useCases: string;
  exampleQA: {
    question: string;
    answer: string;
  };
  productivity: string;
  notes: string;
}

const adoptionLevels: AdoptionLevel[] = [
  {
    level: 1,
    name: "Query Assistance",
    exampleTools: "Hex Magic, DataGrip AI, MotherDuck AI, most IDEs",
    useCases: "Natural language to SQL autocomplete, embedded in SQL IDE, context-aware query generation",
    exampleQA: {
      question: "get users, filter by active status",
      answer: "Auto-generates: \"SELECT * FROM users WHERE status = 'active' AND created_at > '2024-01-01'\""
    },
    productivity: "10-20%",
    notes: "Key trait: Embedded in coding environment, converts natural language to SQL inline, has context of other code"
  },
  {
    level: 2,
    name: "Text-to-SQL / Table Chat",
    exampleTools: "ChatGPT, Claude, SeekAI, Zenlytic, Databricks Genie, Snowflake Cortex, Omni AI",
    useCases: "Natural language to SQL, single function calls, creates SQL cell or metric layer cells, returns charts",
    exampleQA: {
      question: "Show me our top 10 customers by revenue last quarter",
      answer: "Generates SQL query, returns results table, creates bar chart"
    },
    productivity: "25-40%",
    notes: "Key trait: Makes one function call at a time, creates SQL cell or metric layer cell, returns chart"
  },
  {
    level: 3,
    name: "Deep Analytics / Integrated Workspace",
    exampleTools: "Tableau Next Research, Palantir AIP, Manus, Genspark, Deep Research, Julius, Replit Agent",
    useCases: "User asks for high-level report, produces complete dashboards, makes 4-10 function calls per request",
    exampleQA: {
      question: "Create a customer churn analysis report",
      answer: "Builds ML model, creates multi-tab dashboard, identifies key drivers, suggests retention strategies"
    },
    productivity: "50%",
    notes: "Key trait: User asks for high-level report, and it produces a complete dashboard. Makes 4-10 function calls per request"
  },
  {
    level: 4,
    name: "Autonomous Analytics Agent",
    exampleTools: "TextQL, Devin [w/ Jira integration]",
    useCases: "Proactively identifies anomalies, works in background, surfaces insights without user requests, makes 100s of function calls",
    exampleQA: {
      question: "No question needed",
      answer: "\"Alert: Detected 15% conversion drop in EU market starting 3 days ago, correlated with competitor price change\""
    },
    productivity: "70%+",
    notes: "Key trait: User doesn't have to ask questions. Agent proactively works in background and surfaces insights. Makes 100s of function calls"
  }
];

export const AIAdoptionChart: React.FC = () => {
  return (
    <div className="my-12 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 text-center">
          AI Data Analysis Adoption Levels
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                Level
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                Example Tools
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                Use Cases
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
                Example Q&A
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Productivity Impact
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adoptionLevels.map((level, index) => (
              <tr key={level.level} className="bg-green-50">
                <td className="px-3 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-green-600 text-white rounded font-bold flex items-center justify-center">
                      <span className="text-lg">
                        {level.level}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {level.name}
                  </div>
                </td>
                <td className="px-3 py-4 text-xs text-gray-700">
                  {level.exampleTools}
                </td>
                <td className="px-3 py-4 text-xs text-gray-700">
                  {level.useCases}
                </td>
                <td className="px-3 py-4 text-xs">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-green-600">Q:</span>
                      <span className="text-gray-700 ml-1">"{level.exampleQA.question}"</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">A:</span>
                      <span className="text-gray-700 ml-1 italic">{level.exampleQA.answer}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-center">
                  <span className="font-bold text-gray-900">
                    {level.productivity}
                  </span>
                </td>
                <td className="px-3 py-4 text-xs text-gray-600">
                  {level.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-2 bg-gray-50 border-t border-gray-200 text-right">
        <p className="text-xs text-gray-500">
          @theethanding
        </p>
      </div>
    </div>
  );
};