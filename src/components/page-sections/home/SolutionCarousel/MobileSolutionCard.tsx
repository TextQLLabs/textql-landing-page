import { industries } from '../../../../data/industries';
import type { Solution } from '../../../../data/solutions/types';

interface MobileSolutionCardProps {
  solution: Solution;
}

export function MobileSolutionCard({ solution }: MobileSolutionCardProps) {
  const industry = industries.find(i => i.id === solution.industryId);

  return (
    <a 
      href={`/solutions/${solution.id}`}
      className="group block bg-white border border-[#2A3B35]/20 rounded-lg overflow-hidden transition-all hover:shadow-lg h-[320px] flex flex-col"
    >
      {/* Image Container - Smaller for mobile */}
      <div className="relative h-[140px] overflow-hidden">
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
        
        {/* Geometric Overlay - Subtle on mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(42,59,53,0.05)_40%,rgba(42,59,53,0.05)_60%,transparent_60%)] z-20" />

        {/* Image with Scale Effect */}
        <img
          src={solution.image}
          alt={solution.title}
          className="object-cover w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content - Compact for mobile */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Industry Tag - Smaller on mobile */}
        {industry && (
          <div className="flex items-center gap-1 text-xs text-[#2A3B35] bg-[#F0F5F3] w-fit px-2 py-1 mb-3 rounded">
            <industry.Icon className="w-3 h-3" />
            <span className="text-xs">{industry.name}</span>
          </div>
        )}

        {/* Title - Smaller and limited to 2 lines */}
        <h3 className="text-lg font-extralight text-[#2A3B35] mb-2 line-clamp-2 leading-tight">
          {solution.title}
        </h3>

        {/* Description - Compact and limited to 2 lines */}
        <p className="text-xs text-[#4A665C] line-clamp-2 flex-1 leading-relaxed">
          {solution.description}
        </p>

        {/* Mobile-specific call to action indicator */}
        <div className="mt-3 flex items-center text-xs text-[#2A3B35] font-medium">
          <span>Learn more</span>
          <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
} 