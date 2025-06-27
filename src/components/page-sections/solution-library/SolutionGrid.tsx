import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SolutionCard } from './SolutionCard';
import { solutions } from '../../../data/solutions';

interface SolutionGridProps {
  selectedIndustry: string | null;
}

const SOLUTIONS_PER_PAGE = 12;

export function SolutionGrid({ selectedIndustry }: SolutionGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSolutions = useMemo(() => {
    return selectedIndustry
      ? solutions.filter(s => s.industryId === selectedIndustry)
      : solutions;
  }, [selectedIndustry]);

  // Reset to page 1 when industry filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedIndustry]);

  const totalPages = Math.ceil(filteredSolutions.length / SOLUTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * SOLUTIONS_PER_PAGE;
  const endIndex = startIndex + SOLUTIONS_PER_PAGE;
  const currentSolutions = filteredSolutions.slice(startIndex, endIndex);

  if (filteredSolutions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#4A665C]">
          No solutions found for this industry. Check back soon for updates!
        </p>
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {currentSolutions.map(solution => (
          <SolutionCard key={solution.id} solution={solution} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all
              ${currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#2A3B35] hover:bg-[#F0F5F3]'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  w-10 h-10 rounded-lg transition-all
                  ${page === currentPage
                    ? 'bg-[#2A3B35] text-white'
                    : 'text-[#2A3B35] hover:bg-[#F0F5F3]'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-all
              ${currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#2A3B35] hover:bg-[#F0F5F3]'
              }
            `}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Results info */}
      <div className="text-center mt-6 text-sm text-[#4A665C]">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredSolutions.length)} of {filteredSolutions.length} solutions
      </div>
    </div>
  );
}