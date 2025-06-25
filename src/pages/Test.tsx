import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InsightsFeed } from '../components/InsightsFeed/InsightsFeed';
import { InsightsFeedStatic } from '../components/InsightsFeed/InsightsFeedStatic';
import { InsightCard } from '../components/InsightsFeed/InsightCard/InsightCard';
import { InsightContent } from '../components/InsightsFeed/InsightCard/InsightContent';
import { useInsightFeed } from '../hooks/useInsightFeed';
import { INDUSTRIES } from '../components/InsightsFeed/constants';
import { DemoRequestForm } from '../components/ui/DemoRequestForm/DemoRequestForm';
import Button from '../components/ui/Button/Button';
import { Text, Badge, Card } from '../components/ui';
import { Sun, Moon, Grid3X3, Layout, FileText, Mail, Zap, Type, Square } from 'lucide-react';

type ComponentType = 'insights-feed' | 'insights-feed-static' | 'insight-cards' | 'insight-content' | 'demo-form' | 'buttons' | 'ui-components' | 'typography';

interface ComponentInfo {
  id: ComponentType;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
}

const COMPONENTS: ComponentInfo[] = [
  {
    id: 'insights-feed',
    name: 'Insights Feed',
    description: 'Full interactive feed with search and industry selection',
    icon: Layout
  },
  {
    id: 'insights-feed-static',
    name: 'Insights Feed (Static)',
    description: 'Feed without animations for better performance',
    icon: Layout
  },
  {
    id: 'insight-cards',
    name: 'Insight Cards',
    description: 'Individual expandable insight cards',
    icon: Grid3X3
  },
  {
    id: 'insight-content',
    name: 'Insight Content',
    description: 'Expanded content component with minimal/full modes',
    icon: FileText
  },
  {
    id: 'demo-form',
    name: 'Demo Request Form',
    description: 'Form for requesting product demos',
    icon: Mail
  },
  {
    id: 'buttons',
    name: 'Button Components',
    description: 'Button variants in light and dark themes',
    icon: Zap
  },
  {
    id: 'ui-components',
    name: 'UI Components',
    description: 'Basic UI components like badges, cards, and text',
    icon: Square
  },
  {
    id: 'typography',
    name: 'Typography',
    description: 'Text components and typography variants',
    icon: Type
  }
];

const Test: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('buttons');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [cardType, setCardType] = useState<'large' | 'minimal'>('minimal');
  const [enabledIndustries, setEnabledIndustries] = useState<Set<string>>(new Set(['retail', 'healthcare', 'manufacturing', 'finance']));
  
  // Get sample insights data for individual cards
  const { insights, expandedId, handleExpandToggle } = useInsightFeed(INDUSTRIES[0].id);
  const sampleInsights = insights.slice(0, 3);

  const toggleIndustry = (industryId: string) => {
    setEnabledIndustries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(industryId)) {
        newSet.delete(industryId);
      } else {
        newSet.add(industryId);
      }
      return newSet;
    });
  };

  const renderComponentPreview = () => {
    switch (selectedComponent) {
      case 'insights-feed':
        return (
          <div className="h-full flex">
            {/* Industry Sidebar */}
            <div className={`w-64 border-r p-4 ${
              theme === 'dark' 
                ? 'border-[#B8D8D0]/10 bg-[#0F1712]' 
                : 'border-[#2A3B35]/10 bg-white'
            }`}>
              <h3 className={`text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
              }`}>
                Industries
              </h3>
              <div className="space-y-2">
                {INDUSTRIES.map((industry) => {
                  const Icon = industry.icon;
                  const isEnabled = enabledIndustries.has(industry.id);
                  
                  return (
                    <label
                      key={industry.id}
                      className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                        isEnabled
                          ? (theme === 'dark' 
                              ? 'bg-[#B8D8D0]/10 text-[#B8D8D0]' 
                              : 'bg-[#2A3B35]/10 text-[#2A3B35]')
                          : (theme === 'dark' 
                              ? 'text-gray-400 hover:bg-[#B8D8D0]/5' 
                              : 'text-gray-600 hover:bg-[#2A3B35]/5')
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => toggleIndustry(industry.id)}
                        className="sr-only"
                      />
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{industry.label}</span>
                    </label>
                  );
                })}
              </div>
              
              {/* View Mode Toggle */}
              <div className="mt-6">
                <h3 className={`text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
                }`}>
                  View Mode
                </h3>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                    cardType === 'large'
                      ? (theme === 'dark' 
                          ? 'bg-[#B8D8D0]/10 text-[#B8D8D0]' 
                          : 'bg-[#2A3B35]/10 text-[#2A3B35]')
                      : (theme === 'dark' 
                          ? 'text-gray-400 hover:bg-[#B8D8D0]/5' 
                          : 'text-gray-600 hover:bg-[#2A3B35]/5')
                  }`}>
                    <input
                      type="radio"
                      name="cardType"
                      checked={cardType === 'large'}
                      onChange={() => setCardType('large')}
                      className="sr-only"
                    />
                    <Layout className="w-4 h-4" />
                    <span className="text-sm">Large</span>
                  </label>
                  
                  <label className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                    cardType === 'minimal'
                      ? (theme === 'dark' 
                          ? 'bg-[#B8D8D0]/10 text-[#B8D8D0]' 
                          : 'bg-[#2A3B35]/10 text-[#2A3B35]')
                      : (theme === 'dark' 
                          ? 'text-gray-400 hover:bg-[#B8D8D0]/5' 
                          : 'text-gray-600 hover:bg-[#2A3B35]/5')
                  }`}>
                    <input
                      type="radio"
                      name="cardType"
                      checked={cardType === 'minimal'}
                      onChange={() => setCardType('minimal')}
                      className="sr-only"
                    />
                    <Grid3X3 className="w-4 h-4" />
                    <span className="text-sm">Minimal</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex justify-center">
              <div className="w-2/3 flex flex-col">
                {/* View Toggle Bar - Above feed like insight card styling */}
                <div className={`
                  flex items-center justify-between p-3 rounded-lg border
                  ${theme === 'dark' 
                    ? 'bg-[#0F1712] border-[#B8D8D0]/10' 
                    : 'bg-white border-[#2A3B35]/10'
                  }
                `}>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCardType('large')}
                      className={`px-3 py-1.5 rounded text-xs transition-colors ${
                        cardType === 'large'
                          ? (theme === 'dark' 
                              ? 'bg-[#B8D8D0] text-black' 
                              : 'bg-[#2A3B35] text-white')
                          : (theme === 'dark' 
                              ? 'text-[#B8D8D0] hover:bg-[#B8D8D0]/10' 
                              : 'text-[#2A3B35] hover:bg-[#2A3B35]/10')
                      }`}
                    >
                      large
                    </button>
                    <button
                      onClick={() => setCardType('minimal')}
                      className={`px-3 py-1.5 rounded text-xs transition-colors ${
                        cardType === 'minimal'
                          ? (theme === 'dark' 
                              ? 'bg-[#B8D8D0] text-black' 
                              : 'bg-[#2A3B35] text-white')
                          : (theme === 'dark' 
                              ? 'text-[#B8D8D0] hover:bg-[#B8D8D0]/10' 
                              : 'text-[#2A3B35] hover:bg-[#2A3B35]/10')
                      }`}
                    >
                      minimal
                    </button>
                  </div>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
                  }`}>
                    View Mode
                  </span>
                </div>
                <div className="flex-1">
                  <InsightsFeed theme={theme} minimal={cardType === 'minimal'} cardType={cardType} enabledIndustries={enabledIndustries} />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'insights-feed-static':
        return (
          <div className="h-full flex justify-center">
            <div className="w-2/3 flex flex-col">
              {/* View Toggle Bar - Above feed like insight card styling */}
              <div className={`
                flex items-center justify-between p-3 rounded-lg border
                ${theme === 'dark' 
                  ? 'bg-[#0F1712] border-[#B8D8D0]/10' 
                  : 'bg-white border-[#2A3B35]/10'
                }
              `}>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCardType('large')}
                    className={`px-3 py-1.5 rounded text-xs transition-colors ${
                      cardType === 'large'
                        ? (theme === 'dark' 
                            ? 'bg-[#B8D8D0] text-black' 
                            : 'bg-[#2A3B35] text-white')
                        : (theme === 'dark' 
                            ? 'text-[#B8D8D0] hover:bg-[#B8D8D0]/10' 
                            : 'text-[#2A3B35] hover:bg-[#2A3B35]/10')
                    }`}
                  >
                    large
                  </button>
                  <button
                    onClick={() => setCardType('minimal')}
                    className={`px-3 py-1.5 rounded text-xs transition-colors ${
                      cardType === 'minimal'
                        ? (theme === 'dark' 
                            ? 'bg-[#B8D8D0] text-black' 
                            : 'bg-[#2A3B35] text-white')
                        : (theme === 'dark' 
                            ? 'text-[#B8D8D0] hover:bg-[#B8D8D0]/10' 
                            : 'text-[#2A3B35] hover:bg-[#2A3B35]/10')
                    }`}
                  >
                    minimal
                  </button>
                </div>
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
                }`}>
                  View Mode
                </span>
              </div>
              <div className="flex-1">
                <InsightsFeedStatic theme={theme} minimal={cardType === 'minimal'} cardType={cardType} enabledIndustries={enabledIndustries} />
              </div>
            </div>
          </div>
        );
      
      case 'insight-cards':
        return (
          <div className="p-6 space-y-6">
            {/* Component-specific controls */}
            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Type:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCardType('large')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    cardType === 'large'
                      ? (theme === 'dark' 
                          ? 'bg-[#B8D8D0] text-black' 
                          : 'bg-[#2A3B35] text-white')
                      : (theme === 'dark' 
                          ? 'bg-[#0A1F1C] border border-[#B8D8D0]/20 text-[#B8D8D0] hover:bg-[#0A1F1C]/80' 
                          : 'bg-white border border-[#2A3B35]/20 text-[#2A3B35] hover:bg-gray-50')
                  }`}
                >
                  large
                </button>
                <button
                  onClick={() => setCardType('minimal')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    cardType === 'minimal'
                      ? (theme === 'dark' 
                          ? 'bg-[#B8D8D0] text-black' 
                          : 'bg-[#2A3B35] text-white')
                      : (theme === 'dark' 
                          ? 'bg-[#0A1F1C] border border-[#B8D8D0]/20 text-[#B8D8D0] hover:bg-[#0A1F1C]/80' 
                          : 'bg-white border border-[#2A3B35]/20 text-[#2A3B35] hover:bg-gray-50')
                  }`}
                >
                  minimal
                </button>
              </div>
            </div>
            
            {/* Cards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sampleInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="border border-white/10 rounded-lg overflow-hidden"
                >
                  <InsightCard
                    insight={insight}
                    isExpanded={insight.id === expandedId}
                    onExpandToggle={(expanded) => handleExpandToggle(insight.id, expanded)}
                    theme={theme}
                    size="large"
                    minimal={cardType === 'minimal'}
                  />
                </motion.div>
              ))}
            </div>
            
            {sampleInsights.length === 0 && (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Loading insight cards...
              </div>
            )}
          </div>
        );
      
      case 'insight-content':
        return (
          <div className="p-6 space-y-6">
            {/* Component-specific controls */}
            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Type:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCardType('large')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    cardType === 'large'
                      ? (theme === 'dark' 
                          ? 'bg-[#B8D8D0] text-black' 
                          : 'bg-[#2A3B35] text-white')
                      : (theme === 'dark' 
                          ? 'bg-[#0A1F1C] border border-[#B8D8D0]/20 text-[#B8D8D0] hover:bg-[#0A1F1C]/80' 
                          : 'bg-white border border-[#2A3B35]/20 text-[#2A3B35] hover:bg-gray-50')
                  }`}
                >
                  full
                </button>
                <button
                  onClick={() => setCardType('minimal')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    cardType === 'minimal'
                      ? (theme === 'dark' 
                          ? 'bg-[#B8D8D0] text-black' 
                          : 'bg-[#2A3B35] text-white')
                      : (theme === 'dark' 
                          ? 'bg-[#0A1F1C] border border-[#B8D8D0]/20 text-[#B8D8D0] hover:bg-[#0A1F1C]/80' 
                          : 'bg-white border border-[#2A3B35]/20 text-[#2A3B35] hover:bg-gray-50')
                  }`}
                >
                  minimal
                </button>
              </div>
            </div>
            
            {/* Content preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sampleInsights.slice(0, 2).map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className={`border rounded-lg p-4 ${
                    theme === 'dark' 
                      ? 'border-white/10 bg-[#0F1712]' 
                      : 'border-black/10 bg-white'
                  }`}
                >
                  <h3 className={`text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                  }`}>
                    {insight.title} (${insight.metrics.value})
                  </h3>
                  <InsightContent 
                    insight={insight}
                    onExpandToggle={() => {}} // No-op for preview
                    theme={theme}
                    minimal={cardType === 'minimal'}
                  />
                </motion.div>
              ))}
            </div>
            
            {sampleInsights.length === 0 && (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Loading insight content...
              </div>
            )}
          </div>
        );
      
      case 'demo-form':
        return (
          <div className="p-6 space-y-6">
            {/* Component-specific info */}
            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Demo request form with email validation and submission handling
              </span>
            </div>
            
            {/* Demo Form Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`border rounded-lg p-6 ${
                theme === 'dark' 
                  ? 'border-white/10 bg-[#0F1712]' 
                  : 'border-black/10 bg-white'
              }`}>
                <h3 className={`text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  Default Variant
                </h3>
                <DemoRequestForm 
                  theme={theme}
                  variant="default"
                  onSubmit={async (email) => {
                    console.log('Demo form submitted:', email);
                    return { success: true };
                  }}
                />
              </div>
              
              <div className={`border rounded-lg p-6 ${
                theme === 'dark' 
                  ? 'border-white/10 bg-[#0F1712]' 
                  : 'border-black/10 bg-white'
              }`}>
                <h3 className={`text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  Compact Variant
                </h3>
                <DemoRequestForm 
                  theme={theme}
                  variant="compact"
                  onSubmit={async (email) => {
                    console.log('Demo form submitted:', email);
                    return { success: true };
                  }}
                />
              </div>
            </div>
          </div>
        );
      
      case 'buttons':
        return (
          <div className="p-6 space-y-8">
            {/* Button Variants */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Button Variants - {theme === 'dark' ? 'Dark' : 'Light'} Theme
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Primary Buttons */}
                <div className="space-y-3">
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
                  }`}>
                    Primary
                  </h4>
                  <div className="space-y-2">
                    <Button variant="primary" theme={theme} size="sm">
                      Small Primary
                    </Button>
                    <Button variant="primary" theme={theme} size="md">
                      Medium Primary
                    </Button>
                    <Button variant="primary" theme={theme} size="lg">
                      Large Primary
                    </Button>
                    <Button variant="primary" theme={theme} size="md" icon={Zap}>
                      With Icon
                    </Button>
                    <Button variant="primary" theme={theme} size="md" fullWidth>
                      Full Width
                    </Button>
                  </div>
                </div>

                {/* Secondary Buttons */}
                <div className="space-y-3">
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
                  }`}>
                    Secondary
                  </h4>
                  <div className="space-y-2">
                    <Button variant="secondary" theme={theme} size="sm">
                      Small Secondary
                    </Button>
                    <Button variant="secondary" theme={theme} size="md">
                      Medium Secondary
                    </Button>
                    <Button variant="secondary" theme={theme} size="lg">
                      Large Secondary
                    </Button>
                    <Button variant="secondary" theme={theme} size="md" icon={Mail}>
                      With Icon
                    </Button>
                    <Button variant="secondary" theme={theme} size="md" fullWidth>
                      Full Width
                    </Button>
                  </div>
                </div>

                {/* Ghost Buttons */}
                <div className="space-y-3">
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
                  }`}>
                    Ghost
                  </h4>
                  <div className="space-y-2">
                    <Button variant="ghost" theme={theme} size="sm">
                      Small Ghost
                    </Button>
                    <Button variant="ghost" theme={theme} size="md">
                      Medium Ghost
                    </Button>
                    <Button variant="ghost" theme={theme} size="lg">
                      Large Ghost
                    </Button>
                    <Button variant="ghost" theme={theme} size="md" icon={Sun}>
                      With Icon
                    </Button>
                    <Button variant="ghost" theme={theme} size="md" fullWidth>
                      Full Width
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading States */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Loading States
              </h3>
              
              <div className="flex gap-4">
                <Button variant="primary" theme={theme} loading>
                  Loading Primary
                </Button>
                <Button variant="secondary" theme={theme} loading>
                  Loading Secondary
                </Button>
                <Button variant="ghost" theme={theme} loading>
                  Loading Ghost
                </Button>
              </div>
            </div>

            {/* Interactive Examples */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Interactive Examples
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button 
                    variant="primary" 
                    theme={theme}
                    onClick={() => alert('Primary button clicked!')}
                  >
                    Click Me
                  </Button>
                  <Button 
                    variant="secondary" 
                    theme={theme}
                    onClick={() => console.log('Secondary button clicked')}
                  >
                    Log to Console
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="ghost" theme={theme} disabled>
                    Disabled Ghost
                  </Button>
                  <Button variant="primary" theme={theme} disabled>
                    Disabled Primary
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'ui-components':
        return (
          <div className="p-6 space-y-8">
            {/* Badges */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Badge Components
              </h3>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Badge>Default Badge</Badge>
                  <Badge variant="secondary">Secondary Badge</Badge>
                  <Badge variant="outline">Outline Badge</Badge>
                  <Badge variant="destructive">Destructive Badge</Badge>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Card Components
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                  }`}>
                    Basic Card
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    This is a basic card component with some content.
                  </p>
                </Card>
                
                <Card className="p-4 border-2">
                  <h4 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                  }`}>
                    Card with Border
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Card with emphasized border styling.
                  </p>
                </Card>
                
                <Card className="p-4 shadow-lg">
                  <h4 className={`font-medium mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                  }`}>
                    Card with Shadow
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Card with shadow for depth.
                  </p>
                </Card>
              </div>
            </div>

            {/* Interactive States */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Interactive States
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
                  }`}>
                    Hover Effects
                  </h4>
                  <div className="space-y-2">
                    <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <p className="text-sm">Hover for shadow effect</p>
                    </Card>
                    <Badge className="cursor-pointer hover:opacity-80 transition-opacity">
                      Hover for opacity change
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
                  }`}>
                    Focus States
                  </h4>
                  <div className="space-y-2">
                    <Card className="p-3 focus-within:ring-2 focus-within:ring-[#B8D8D0]/50 transition-all">
                      <input 
                        className="w-full bg-transparent outline-none text-sm"
                        placeholder="Focus to see card ring"
                      />
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'typography':
        return (
          <div className="p-6 space-y-8">
            {/* Text Variants */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Text Component Variants
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Text variant="header" className="text-3xl">
                    Header Text Variant
                  </Text>
                  <code className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    variant="header" className="text-3xl"
                  </code>
                </div>
                
                <div>
                  <Text variant="body">
                    Body text variant for regular content and paragraphs.
                  </Text>
                  <code className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    variant="body"
                  </code>
                </div>
                
                <div>
                  <Text variant="caption">
                    Caption text variant for smaller supplementary text.
                  </Text>
                  <code className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    variant="caption"
                  </code>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Text Colors
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Text color="primary">Primary color text</Text>
                  <code className={`text-xs ml-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    color="primary"
                  </code>
                </div>
                
                <div>
                  <Text color="secondary">Secondary color text</Text>
                  <code className={`text-xs ml-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    color="secondary"
                  </code>
                </div>
                
                <div>
                  <Text color="muted">Muted color text</Text>
                  <code className={`text-xs ml-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    color="muted"
                  </code>
                </div>
                
                <div>
                  <Text color="accent">Accent color text</Text>
                  <code className={`text-xs ml-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    color="accent"
                  </code>
                </div>
              </div>
            </div>

            {/* Typography Scale */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Typography Scale
              </h3>
              
              <div className="space-y-4">
                <div className={`text-4xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  Heading 1 - 4xl
                </div>
                <div className={`text-3xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  Heading 2 - 3xl
                </div>
                <div className={`text-2xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  Heading 3 - 2xl
                </div>
                <div className={`text-xl font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  Heading 4 - xl
                </div>
                <div className={`text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  Large text - lg
                </div>
                <div className={`text-base ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  Body text - base
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Small text - sm
                </div>
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Extra small text - xs
                </div>
              </div>
            </div>

            {/* Theme Demonstration */}
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/10'
            }`}>
              <h3 className={`text-lg font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
              }`}>
                Theme-Aware Typography
              </h3>
              
              <div className="space-y-3">
                <p className={`text-base ${
                  theme === 'dark' ? 'text-white' : 'text-[#2A3B35]'
                }`}>
                  This text adapts to the current theme automatically.
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#4A665C]'
                }`}>
                  Secondary text that changes color based on theme.
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Muted text for less important information.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <div 
      className={`min-h-screen flex ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#F7F7F7] text-[#2A3B35]'} transition-colors duration-300`}
    >
      {/* Sidebar */}
      <div 
        className={`w-80 border-r ${theme === 'dark' ? 'border-white/10' : 'border-black/10 bg-white/50'}`}
        style={theme === 'dark' ? { background: '#000000 !important' } : {}}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Components</h1>
          
          <div className="space-y-2">
            {COMPONENTS.map((component) => {
              const Icon = component.icon;
              const isSelected = selectedComponent === component.id;
              
              return (
                <button
                  key={component.id}
                  onClick={() => setSelectedComponent(component.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    isSelected
                      ? (theme === 'dark' 
                          ? 'bg-[#B8D8D0]/10 border border-[#B8D8D0]/20 text-[#B8D8D0]' 
                          : 'bg-[#2A3B35]/10 border border-[#2A3B35]/20 text-[#2A3B35]')
                      : (theme === 'dark'
                          ? 'hover:bg-white/5 border border-transparent text-gray-300 hover:text-white'
                          : 'hover:bg-black/5 border border-transparent text-gray-700 hover:text-black')
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{component.name}</span>
                  </div>
                  <p className={`text-sm ${
                    isSelected 
                      ? (theme === 'dark' ? 'text-[#729E8C]' : 'text-[#4A665C]')
                      : (theme === 'dark' ? 'text-gray-400' : 'text-gray-600')
                  }`}>
                    {component.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div 
          className={`border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10 bg-white/50'} p-6`}
          style={theme === 'dark' ? { background: '#000000 !important' } : {}}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {COMPONENTS.find(c => c.id === selectedComponent)?.name}
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {COMPONENTS.find(c => c.id === selectedComponent)?.description}
              </p>
            </div>
            
            {/* Theme Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Theme:
              </span>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-[#B8D8D0] text-black hover:bg-[#729E8C]'
                    : 'bg-[#2A3B35] text-white hover:bg-[#4A665C]'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-sm font-medium">
                  {theme === 'dark' ? 'Light' : 'Dark'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Component Preview */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            key={selectedComponent}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderComponentPreview()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Test;