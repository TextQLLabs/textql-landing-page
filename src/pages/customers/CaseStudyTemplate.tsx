import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { CTA } from '../../components/sections';

interface CaseStudyProps {
  id: string;
  category: string;
  metric: string;
  metricLabel: string;
  description: string;
  challenge: string;
  solution: string;
  implementation: string[];
  results: string[];
  impact: string[];
  industry: string;
  size: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

export default function CaseStudyTemplate({
  id,
  category,
  metric,
  metricLabel,
  description,
  challenge,
  solution,
  implementation,
  results,
  impact,
  industry,
  size,
  quote
}: CaseStudyProps) {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <SEO 
        title={`${category} Case Study | TextQL`}
        description={description}
        canonical={`https://textql.com/customers/${id}/`}
        ogImage="https://textql.com/social-preview.png"
      />
      
      <div className="container mx-auto px-4 py-20">
        {/* Back Link */}
        <Link 
          to="/customers" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Customer Stories
        </Link>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full">{industry}</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full">{size}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
              {category}
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-6xl md:text-7xl font-bold text-primary">{metric}</span>
              <span className="text-2xl text-gray-600">{metricLabel}</span>
            </div>
            <p className="text-xl text-gray-600">
              {description}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Challenge Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">The Challenge</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {challenge}
            </p>
          </div>

          {/* Solution Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">The Solution</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {solution}
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Highlights</h3>
              <div className="space-y-3">
                {implementation.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quote Section */}
          {quote && (
            <div className="mb-16 bg-primary/5 rounded-2xl p-8 md:p-12">
              <blockquote className="text-2xl font-medium text-gray-900 mb-6">
                "{quote.text}"
              </blockquote>
              <div>
                <div className="font-semibold text-gray-900">{quote.author}</div>
                <div className="text-gray-600">{quote.role}</div>
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">The Results</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {results.map((result, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                  <p className="text-lg text-gray-700">{result}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Business Impact */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Business Impact</h2>
            <div className="space-y-4">
              {impact.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Ready to achieve similar results?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              See how TextQL can transform your organization with AI-powered insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Request a Demo
              </Link>
              <Link
                to="/customers"
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200"
              >
                More Success Stories
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CTA 
        theme="light"
        showWave={false}
        variant="wide"
      />
    </div>
  );
}