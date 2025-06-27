import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Industry, industries } from '../../data/industries';
import { SolutionLibraryHeader, SolutionGrid } from '../../components/page-sections/solution-library';
import { CTA } from '../../components/sections';
import { Text } from '../../components/ui';
import { solutions } from '../../data/solutions';
import { SEO } from '../../components/SEO';

export default function SolutionLibrary() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Initialize selectedIndustry from URL parameter
  useEffect(() => {
    const industry = searchParams.get('industry');
    if (industry) {
      setSelectedIndustry(industry);
    }
  }, [searchParams]);

  // Update URL when selectedIndustry changes
  const handleIndustryChange = (industryId: string | null) => {
    const newSelectedIndustry = selectedIndustry === industryId ? null : industryId;
    setSelectedIndustry(newSelectedIndustry);
    
    // Update URL
    if (newSelectedIndustry) {
      searchParams.set('industry', newSelectedIndustry);
    } else {
      searchParams.delete('industry');
    }
    setSearchParams(searchParams);
  };

  // Calculate matches for each industry
  const industryMatches = useMemo(() => {
    return industries.reduce((acc, industry) => {
      acc[industry.id] = solutions.filter(s => s.industryId === industry.id).length;
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
        title="Solution Library | TextQL"
        description="Pre-built solutions to help you get started with TextQL. Each solution is designed to solve specific business problems and can be customized to your needs."
        canonical="https://textql.com/solutions/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section */}
      <SolutionLibraryHeader />

      {/* Main Content - Light Mode */}
      <div className="bg-[#F5F9F8]">
        {/* Industry Pills */}
        <div className="border-b border-[#2A3B35]/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleIndustryChange(null)}
                className={`
                  px-4 py-2 rounded-full whitespace-nowrap transition-all
                  ${!selectedIndustry
                    ? 'bg-[#2A3B35] text-white'
                    : 'bg-[#F0F5F3] text-[#2A3B35] hover:bg-[#F0F5F3]/80'
                  }
                `}
              >
                All Industries ({solutions.length})
              </button>
              {activeIndustries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleIndustryChange(industry.id)}
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

        {/* Solutions Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <SolutionGrid selectedIndustry={selectedIndustry} />
        </div>
      </div>

      {/* CTA Section */}
      <CTA
        theme="dark"
        showWave={true}
        variant="wide"
        heading="Ready to transform your business?"
        // subheader="Get started with TextQL's AI-powered solutions today."
        useSimpleButton={false}
      />
    </div>
  );
}