import { useState, useMemo } from 'react';
import { Industry, industries } from '../../data/industries';
import { WorkflowLibraryHeader, WorkflowGrid } from '../../components/page-sections/workflow-library';
import { CTA } from '../../components/sections';
import { Text } from '../../components/ui';
import { workflows } from '../../data/workflows';
import { SEO } from '../../components/SEO';

export default function WorkflowLibrary() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Calculate matches for each industry
  const industryMatches = useMemo(() => {
    return industries.reduce((acc, industry) => {
      acc[industry.id] = workflows.filter(w => w.industryId === industry.id).length;
      return acc;
    }, {} as Record<string, number>);
  }, []);

  // Filter out industries with no matches
  const activeIndustries = useMemo(() => {
    return industries.filter(industry => industryMatches[industry.id] > 0);
  }, [industryMatches]);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Workflow Library | TextQL"
        description="Pre-built workflows to help you get started with TextQL. Each workflow is designed to solve specific business problems and can be customized to your needs."
        canonical="https://textql.com/workflows"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section */}
      <WorkflowLibraryHeader />

      {/* Main Content - Light Mode */}
      <div className="bg-white">
        {/* Industry Pills */}
        <div className="border-b border-[#2A3B35]/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedIndustry(null)}
                className={`
                  px-4 py-2 rounded-full whitespace-nowrap transition-all
                  ${!selectedIndustry
                    ? 'bg-[#2A3B35] text-white'
                    : 'bg-[#F0F5F3] text-[#2A3B35] hover:bg-[#F0F5F3]/80'
                  }
                `}
              >
                All Industries ({workflows.length})
              </button>
              {activeIndustries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(
                    selectedIndustry === industry.id ? null : industry.id
                  )}
                  className={`
                    px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-2
                    ${selectedIndustry === industry.id
                      ? 'bg-[#2A3B35] text-white'
                      : 'bg-[#F0F5F3] text-[#2A3B35] hover:bg-[#F0F5F3]/80'
                    }
                  `}
                >
                  <industry.Icon className="w-4 h-4" />
                  <span>{industry.name}</span>
                  <span className="text-sm opacity-60">
                    ({industryMatches[industry.id]})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <WorkflowGrid selectedIndustry={selectedIndustry} />
        </div>
      </div>

      {/* CTA Section */}
      <CTA
        theme="light"
        showWave={true}
        variant="wide"
        heading="Ready to transform your business?"
        subheader="Get started with TextQL's AI-powered workflows today"
        ctaText="Request Demo"
        ctaHref="https://forms.default.com/740749"
      />
    </div>
  );
}