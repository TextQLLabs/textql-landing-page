import React from 'react';
import { HelpCircle, ChevronUp, ChevronDown, Database, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkingDetailsProps {
  steps: string[];
  sources: string[];
  isExpanded: boolean;
  onToggle: () => void;
  theme?: 'dark' | 'light';
}

const getSourceIcon = (source: string) => {
  if (source.toLowerCase().includes('analytics') || 
      source.toLowerCase().includes('data') || 
      source.toLowerCase().includes('system')) {
    return <Database className="w-2.5 h-2.5 md:w-3 md:h-3" />;
  }
  return <FileText className="w-2.5 h-2.5 md:w-3 md:h-3" />;
};

export const WorkingDetails: React.FC<WorkingDetailsProps> = ({
  steps,
  sources,
  isExpanded,
  onToggle,
  theme = 'dark'
}) => {
  const isDark = theme === 'dark';
  const primaryText = isDark ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const secondaryText = isDark ? 'text-[#729E8C]' : 'text-[#4A665C]';
  const bgColor = isDark ? 'bg-[#0F1712]' : 'bg-[#F0F5F3]';
  const borderColor = isDark ? 'border-[#B8D8D0]/10' : 'border-[#2A3B35]/10';
  const hoverBorderColor = isDark ? 'hover:border-[#B8D8D0]/20' : 'hover:border-[#2A3B35]/20';

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`flex items-center gap-1.5 ${secondaryText} hover:${primaryText} transition-colors w-full justify-between text-[10px] md:text-xs`}
      >
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-2.5 h-2.5 md:w-3 md:h-3" />
          <span>How did you get here?</span>
        </div>
        {isExpanded ? <ChevronUp className="w-2.5 h-2.5 md:w-3 md:h-3" /> : <ChevronDown className="w-2.5 h-2.5 md:w-3 md:h-3" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className={`text-[10px] md:text-xs font-medium ${primaryText}`}>Steps:</h4>
                <ul className={`list-disc list-inside ${secondaryText} space-y-1 text-[10px] md:text-xs`}>
                  {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className={`text-[10px] md:text-xs font-medium ${primaryText}`}>Sources:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {sources.map((source, index) => (
                    <div
                      key={index}
                      className={`inline-flex items-center gap-1 px-2 py-1 
                        ${bgColor} border ${borderColor} 
                        ${hoverBorderColor}
                        ${secondaryText} text-[10px] md:text-xs transition-colors cursor-pointer`}
                    >
                      {getSourceIcon(source)}
                      <span>{source}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};