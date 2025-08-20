import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    answer: "TextQL is designed to be efficient with your data warehouse resources. We optimize queries to minimize compute costs and provide query cost estimates before execution."
  },
  {
    question: "Which tools does TextQL work with?",
    answer: "TextQL integrates with major data warehouses including Snowflake, BigQuery, Redshift, Databricks, and more. We also work with popular BI tools and databases."
  },
  {
    question: "Is it secure and compliant?",
    answer: "Yes, TextQL follows enterprise-grade security standards with SOC 2 compliance, encryption at rest and in transit, and role-based access controls to keep your data secure."
  },
  {
    question: "Can I keep the queries and dashboards?",
    answer: "Absolutely! All queries, code, and dashboards you create during the trial are yours to keep. You can export them and continue using them even after the trial ends."
  },
  {
    question: "What if I need help?",
    answer: "Our support team is available throughout your trial to help you get the most out of TextQL. We provide documentation, tutorials, and direct assistance to ensure your success."
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
            <div
              key={index}
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
                <ChevronDown 
                  className={`w-5 h-5 transition-transform flex-shrink-0 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                  style={{color: 'var(--theme-text-secondary)'}}
                />
              </button>
              
              {openItems.includes(index) && (
                <div className="pb-6">
                  <p className="text-base leading-relaxed font-normal" style={{color: 'var(--theme-text-primary)'}}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
