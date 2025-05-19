export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CompetitorConfig {
  id: string;
  name: string;
  theme: {
    primary: string;
    background: string;
    text: string;
    userBubble: string;
    assistantBubble: string;
  };
}

export interface ChatComparisonProps {
  selectedCompetitor: string;
  onCompetitorChange: (id: string) => void;
}