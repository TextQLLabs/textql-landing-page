import React from 'react';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqSectionProps {
  name: string;
  faqItems: FaqItem[];
}

export default function FaqSection({ name, faqItems }: FaqSectionProps) {
  return (
    <section className="py-16 bg-black">
      <div className="mx-auto max-w-site px-6">
        <h2 className="text-2xl lg:text-3xl text-center lg:text-left font-extralight text-[#B8D8D0] mb-12">FAQ on integrating with {name}</h2>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details 
              key={index} 
              className="border border-[#0A1F1C] rounded-lg overflow-hidden group"
            >
              <summary className="flex justify-between items-center p-6 cursor-pointer text-base lg:text-xl font-light text-[#B8D8D0]">
                {item.question}
                <span className="transform group-open:rotate-180 transition-transform duration-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15L18 9L16.6 7.6L12 12.2L7.4 7.6L6 9L12 15Z" fill="#B8D8D0"/>
                  </svg>
                </span>
              </summary>
              <div className="p-6 pt-0 text-[#729E8C] font-light border-t border-[#0A1F1C]">
                <p className="text-xs lg:text-md text-[#729E8C] font-light leading-relaxed mt-2">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
} 