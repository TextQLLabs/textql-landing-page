import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '../ui';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  description?: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  categories: FAQCategory[];
  faqs: FAQ[];
  className?: string;
}

export default function FAQ({
  title = "Frequently Asked Questions",
  description,
  categories,
  faqs,
  className = ''
}: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFaqs = selectedCategory
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

  return (
    <section className={`space-y-12 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <Text variant="header" className="text-4xl">
          {title}
        </Text>
        {description && (
          <Text color="muted" className="max-w-2xl mx-auto">
            {description}
          </Text>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`
            px-4 py-2 text-sm font-light
            transition-colors duration-200
            ${!selectedCategory
              ? 'bg-[#B8D8D0]/10 text-[#B8D8D0] border border-[#B8D8D0]/40'
              : 'text-[#B8D8D0]/60 hover:text-[#B8D8D0]/80'
            }
          `}
        >
          All Questions
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 text-sm font-light
              transition-colors duration-200
              ${selectedCategory === category.id
                ? 'bg-[#B8D8D0]/10 text-[#B8D8D0] border border-[#B8D8D0]/40'
                : 'text-[#B8D8D0]/60 hover:text-[#B8D8D0]/80'
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.map(faq => (
          <div
            key={faq.id}
            className="
              border border-[#B8D8D0]/20
              bg-[#004D40]/10 backdrop-blur-sm
              transition-colors duration-200
              hover:border-[#B8D8D0]/40
            "
          >
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between gap-4"
            >
              <Text className="text-left font-light">
                {faq.question}
              </Text>
              <ChevronDown
                className={`
                  w-5 h-5 text-[#B8D8D0]/60 flex-shrink-0
                  transition-transform duration-200
                  ${expandedId === faq.id ? 'rotate-180' : ''}
                `}
              />
            </button>
            
            <AnimatePresence>
              {expandedId === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <Text color="muted" className="font-light">
                      {faq.answer}
                    </Text>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}