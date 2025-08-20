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
          <motion.div
            key={faq.id}
            layout
            className="
              border border-[#B8D8D0]/20
              bg-[#004D40]/10 backdrop-blur-sm
              transition-all duration-300 ease-out
              hover:border-[#B8D8D0]/40
              hover:bg-[#004D40]/15
            "
          >
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between gap-4"
            >
              <Text className="text-left font-light">
                {faq.question}
              </Text>
              <motion.div
                animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-[#B8D8D0]/60" />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {expandedId === faq.id && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                    opacity: { duration: 0.25 }
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.1,
                      ease: "easeOut"
                    }}
                    className="px-6 pb-4"
                  >
                    <Text color="muted" className="font-light">
                      {faq.answer}
                    </Text>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}