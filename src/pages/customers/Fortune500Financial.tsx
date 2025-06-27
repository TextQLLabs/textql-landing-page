import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';
import { CTA } from '../../components/sections';

export default function Fortune500Financial() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <SEO 
        title="Fortune 500 Financial Services Case Study | TextQL"
        description="How a leading financial institution reduced fraud detection time by 87% with TextQL's AI agents"
        canonical="https://textql.com/customers/fortune-500-financial-services/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section */}
      <section className="bg-black text-white">
        <div className="container mx-auto px-6 py-20">
          {/* Back Link */}
          <Link 
            to="/customers" 
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Customer Stories
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 text-sm mb-6">
              <span className="px-4 py-2 bg-white/10 rounded-full">Financial Services</span>
              <span className="px-4 py-2 bg-white/10 rounded-full">Enterprise</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
              Fortune 500 Financial Services
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-6xl md:text-8xl font-bold text-primary-400">87%</span>
              <span className="text-2xl text-gray-300">reduction in fraud detection time</span>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              A leading financial institution deployed Ana to transform their fraud detection capabilities, 
              processing millions of transactions daily with unprecedented accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="bg-[#F0F5F3] py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Fraud Detection Models</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">$120M</div>
              <div className="text-gray-600">Annual Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Challenge */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
              The Challenge
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              As one of the nation's largest financial institutions, our client processes millions of 
              transactions daily. Their legacy fraud detection system was struggling to keep pace with 
              increasingly sophisticated fraud attempts, resulting in:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Average fraud detection time of 48-72 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">High false positive rates causing customer friction</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Limited ability to detect emerging fraud patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Manual review processes creating operational bottlenecks</span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
              The Solution
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              TextQL deployed a comprehensive AI agent ecosystem that transformed their fraud detection 
              capabilities from reactive to proactive. Our solution integrated seamlessly with their 
              existing infrastructure while providing quantum leaps in performance.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Implementation Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Deployed 50+ specialized AI agents for different fraud types and patterns
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Real-time analysis of transaction patterns across multiple data sources
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Custom ontology mapping 200+ financial data attributes
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Seamless integration with existing security and compliance frameworks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="mb-20 bg-primary/5 rounded-2xl p-8 md:p-12">
            <blockquote className="text-2xl font-medium text-gray-900 mb-6">
              "TextQL's AI agents have revolutionized our fraud detection capabilities. What used to 
              take days now happens in minutes, and we're catching fraud patterns we never could have 
              identified before."
            </blockquote>
            <div>
              <div className="font-semibold text-gray-900">Chief Risk Officer</div>
              <div className="text-gray-600">Fortune 500 Financial Institution</div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
              The Results
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-primary mb-2">87%</div>
                <p className="text-gray-700">Reduction in average fraud detection time</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-primary mb-2">65%</div>
                <p className="text-gray-700">Decrease in false positive rates</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-primary mb-2">$120M</div>
                <p className="text-gray-700">Annual savings from prevented fraud</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-primary mb-2">3.5x</div>
                <p className="text-gray-700">Increase in fraud pattern detection</p>
              </div>
            </div>
          </div>

          {/* Business Impact */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
              Business Impact
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-700">
                  Enhanced customer trust with faster resolution and fewer false positives
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-700">
                  Freed up 40% of fraud analyst time for strategic initiatives
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-700">
                  Achieved regulatory compliance with enhanced reporting capabilities
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-lg text-gray-700">
                  Established foundation for AI-driven innovation across the enterprise
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Ready to transform your fraud detection?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              See how TextQL can help your organization achieve similar results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                Request a Demo
                <ArrowRight className="w-4 h-4" />
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
      </section>

      <CTA 
        theme="light"
        showWave={false}
        variant="wide"
      />
    </div>
  );
}