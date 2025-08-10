import { ArrowRight, Zap, Scale, GitMerge } from 'lucide-react';
import { Text } from '../../ui';

export function OntologyExplanation() {
  return (
    <section className="bg-white pt-16 lg:pt-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-extralight text-[#2A3B35] mb-6">
            TextQL's Ontology
          </h1>
          <Text variant="header" theme="light" className="text-4xl mb-6">
            A Composable System of Record
          </Text>
          <Text theme="light" color="muted" className="text-base lg:text-xl">
            TextQL's Ontology is a composable system of record for the data in your databases. 
            Unifying tables from databases, warehouses, business intelligence, and more.
          </Text>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[400px,1fr] gap-12 items-start">
          {/* Left Column - Features */}
          <div className="space-y-12">
            {/* Features List */}
            <div className="space-y-8">
              {/* Query Acceleration */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#F0F5F3] rounded-lg">
                  <Zap className="w-5 h-5 text-[#2A3B35]" />
                </div>
                <div>
                  <Text variant="header" theme="light" className="text-lg mb-2">
                    Query Acceleration
                  </Text>
                  <Text theme="light" color="muted">
                    Optimized execution with intelligent caching, reducing costs and improving speed
                  </Text>
                </div>
              </div>

              {/* Enterprise Scale */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#F0F5F3] rounded-lg">
                  <Scale className="w-5 h-5 text-[#2A3B35]" />
                </div>
                <div>
                  <Text variant="header" theme="light" className="text-lg mb-2">
                    Enterprise Scale
                  </Text>
                  <Text theme="light" color="muted">
                    Scales to 550+ tables in one query with built-in optimizations
                  </Text>
                </div>
              </div>

              {/* Universal Translation */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#F0F5F3] rounded-lg">
                  <GitMerge className="w-5 h-5 text-[#2A3B35]" />
                </div>
                <div>
                  <Text variant="header" theme="light" className="text-lg mb-2">
                    Universal Translation
                  </Text>
                  <Text theme="light" color="muted">
                    Translates to 23 different SQL syntaxes for complete compatibility
                  </Text>
                </div>
              </div>
            </div>

            {/* Documentation Links */}
            <div className="flex flex-col gap-4">
              <a 
                href="https://docs.textql.com/core/how-it-works/ontology/queries"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-[#2A3B35] text-white hover:bg-[#4A665C] transition-colors rounded-lg"
              >
                Read the Documentation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              
              <a 
                href="https://textql.com/blog/sql-process"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-6 py-3 border border-[#2A3B35] text-[#2A3B35] hover:bg-[#F0F5F3] transition-colors rounded-lg"
              >
                Read How We Built It
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column - Ontology Diagram */}
          <div className="hidden lg:block">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
              <img 
                src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/72fc7d25-5a18-497b-2bac-087c51cabf00/public"
                alt="TextQL Ontology Visualization"
                className="w-full h-full object-contain shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
