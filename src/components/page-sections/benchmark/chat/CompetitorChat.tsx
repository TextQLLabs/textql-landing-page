import { CompetitorConfig } from './types';
import { competitors } from './competitors';

interface CompetitorChatProps {
  competitor: CompetitorConfig;
  onCompetitorChange: (id: string) => void;
}

export function CompetitorChat({ competitor, onCompetitorChange }: CompetitorChatProps) {
  const { theme } = competitor;
  
  return (
    <div 
      className="h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <div 
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: `${theme.primary}20` }}
      >
        <h3 
          className="font-medium"
          style={{ color: theme.text }}
        >
          Compare with:
        </h3>
        <select
          value={competitor.id}
          onChange={(e) => onCompetitorChange(e.target.value)}
          className="bg-transparent text-sm border rounded px-2 py-1"
          style={{ 
            color: theme.text,
            borderColor: `${theme.primary}40`
          }}
        >
          {competitors.map(comp => (
            <option 
              key={comp.id} 
              value={comp.id}
              style={{ 
                backgroundColor: comp.theme.background,
                color: comp.theme.text
              }}
            >
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Content */}
      <div className="p-4 space-y-4 h-[400px] overflow-y-auto">
        {/* User Message */}
        <div className="flex justify-end">
          <div 
            className="max-w-[80%] rounded-lg px-4 py-2"
            style={{ backgroundColor: theme.userBubble }}
          >
            <p style={{ color: theme.text }}>
              For each property class, what's the total net income per square foot for mixed use spaces
            </p>
          </div>
        </div>

        {/* Assistant Message */}
        <div className="flex justify-start">
          <div 
            className="max-w-[80%] rounded-lg px-4 py-2"
            style={{ backgroundColor: theme.assistantBubble }}
          >
            {competitor.id === 'databricks' && (
              <div className="space-y-4">
                <p style={{ color: theme.text }}>
                  I'll sum the net income from the property table and group by property class.
                </p>
                <div 
                  className="p-3 rounded"
                  style={{ backgroundColor: theme.background }}
                >
                  <p style={{ color: `${theme.primary}` }}>
                    Error: Relation "property" does not exist
                  </p>
                </div>
                <p style={{ color: theme.text }}>
                  I apologize, but I can't find the property table. Could you help me identify which table contains the property information?
                </p>
              </div>
            )}
            {competitor.id === 'amazon-q' && (
              <p style={{ color: theme.text }}>
                I can't find any tables with property information.
              </p>
            )}
            {competitor.id === 'snowflake' && (
              <p style={{ color: theme.text }}>
                I can't help with that right now.
              </p>
            )}
            {competitor.id === 'hex' && (
              <p style={{ color: theme.text }}>
                I can't find a table containing property class information.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}