import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Text } from '../components/ui';
import { TermsHeader } from '../components/page-sections/legal';
import { SEO } from '../components/SEO';

// Import terms content with the updated syntax
import termsContent from '../data/legal/terms.md?raw';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Terms & Conditions | TextQL"
        description="Terms and conditions for using TextQL services. Please read these Terms carefully before using the Site."
        canonical="https://textql.com/terms/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <TermsHeader />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({node, ...props}) => <Text theme="light" className="text-lg leading-relaxed mb-6" {...props} />,
              h1: ({node, ...props}) => <h1 className="text-4xl font-extralight text-[#2A3B35] mb-8" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-light text-[#2A3B35] mt-12 mb-6" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-medium text-[#2A3B35] mt-8 mb-4" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 text-[#4A665C]" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 text-[#4A665C]" {...props} />,
              li: ({node, ...props}) => <li className="mb-2" {...props} />,
              hr: ({node, ...props}) => <hr className="my-12 border-[#2A3B35]/10" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-[#2A3B35]" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-[#2A3B35]/20 pl-4 my-6 italic text-[#4A665C]" {...props} />
              ),
            }}
          >
            {termsContent}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}