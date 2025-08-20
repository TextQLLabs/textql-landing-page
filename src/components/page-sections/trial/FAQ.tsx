import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What happens during the $5 trial?",
    answer: "Connect your data warehouse, ask questions in plain English, and get verified SQL/Python code and visualizations. Generate insights, export results, and share dashboards—all with no long-term commitment."
  },
  {
    question: "Will TextQL spike my warehouse costs?",
    answer: "No—our guardrails prevent excessive spend. Historically, every $1.00 of TextQL work costs approximately $0.0001 in warehouse compute, making it extremely cost-effective."
  },
  {
    question: "Which tools does TextQL work with?",
    answer: "TextQL integrates with warehouses (Snowflake, BigQuery, Redshift, Databricks), BI tools (Looker, Power BI, Tableau), and semantic layers (dbt, LookML). We are able to connect 100x more data sources than any other solution, helping you get insights regardless of how many databases your data lives in."
  },
  {
    question: "Is it secure and compliant?",
    answer: "Yes. Enterprise-grade security with configurable LLMs, anonymization guardrails, and compliance features. Deployed in your environment with full control over data access."
  },
  {
    question: "Can I keep the queries and dashboards?",
    answer: "Yes, you can export all generated SQL, Python code, and visualizations."
  },
  {
    question: "What if I need help?",
    answer: "Request a demo with our team or reach out at hello@textql.com."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16" style={{backgroundColor: 'var(--theme-bg-primary)'}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 pb-8 border-b" style={{borderColor: 'var(--theme-text-secondary)'}}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4" style={{color: 'var(--theme-text-primary)'}}>
            Frequently Asked Questions
          </h2>
          <p className="text-2xl" style={{color: 'var(--theme-text-secondary)'}}>
            Everything you need to know about the trial
          </p>
        </div>

        <div className="space-y-0 px-8">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.04, 0.62, 0.23, 0.98]
              }}
              className="border-b last:border-b-0"
              style={{borderColor: 'var(--theme-text-secondary)'}}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full py-6 px-4 text-left flex items-center justify-between transition-colors hover:opacity-100"
              >
                <span className="text-base font-normal pr-4" style={{color: 'var(--theme-text-primary)'}}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="flex-shrink-0"
                >
                  <ChevronDown 
                    className="w-5 h-5"
                    style={{color: 'var(--theme-text-secondary)'}}
                  />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openItems.includes(index) && (
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
                      className="pb-6"
                    >
                      <p className="text-base leading-relaxed font-normal" style={{color: 'var(--theme-text-primary)'}}>
                        {item.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
