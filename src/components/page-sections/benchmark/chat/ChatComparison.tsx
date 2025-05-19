import { useState } from 'react';
import { competitors } from './competitors';
import { TextQLChat } from './TextQLChat';
import { CompetitorChat } from './CompetitorChat';
import { Text } from '../../../ui';

export function ChatComparison() {
  // Set Databricks Genie as default
  const [selectedCompetitor, setSelectedCompetitor] = useState('databricks');
  
  const currentCompetitor = competitors.find(c => c.id === selectedCompetitor)!;

  return (
    <div className="space-y-8">
      <Text variant="header" className="text-2xl text-center">
        Real-world Comparison
      </Text>

      <div className="grid grid-cols-2 gap-8 h-[400px]">
        <TextQLChat />
        <CompetitorChat 
          competitor={currentCompetitor}
          onCompetitorChange={setSelectedCompetitor}
        />
      </div>
    </div>
  );
}