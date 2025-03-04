import { industries } from '../../../data/industries';
import type { Workflow } from '../../../data/workflows/types';

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const industry = industries.find(i => i.id === workflow.industryId);

  return (
    <a 
      href={`/workflows/${workflow.id}`}
      className="group block bg-white border border-[#2A3B35]/20 transition-all hover:shadow-lg h-[460px] flex flex-col"
    >
      {/* Image Container with Techno Overlay - Fixed Height */}
      <div className="relative h-[220px] overflow-hidden">
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
        
        {/* Geometric Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(42,59,53,0.1)_40%,rgba(42,59,53,0.1)_60%,transparent_60%)] z-20" />

        {/* Image with Scale Effect */}
        <img
          src={workflow.image}
          alt={workflow.title}
          className="object-cover w-full h-full filter brightness-90 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Tech Lines Overlay */}
        <div className="absolute inset-0 opacity-20 z-30 bg-[linear-gradient(0deg,transparent_48%,rgba(42,59,53,0.1)_48%,rgba(42,59,53,0.1)_52%,transparent_52%)]" />
      </div>

      {/* Content - Flex Grow to Fill Remaining Height */}
      <div className="flex-1 p-6 border-t border-[#2A3B35]/10 flex flex-col">
        {/* Industry Tag */}
        {industry && (
          <div className="flex items-center gap-1.5 text-xs text-[#2A3B35] bg-[#F0F5F3] w-fit px-2 py-1 mb-4">
            <industry.Icon className="w-3.5 h-3.5" />
            <span>{industry.name}</span>
          </div>
        )}

        {/* Title - Limited to 2 Lines */}
        <h2 className="text-2xl font-extralight text-[#2A3B35] mb-2 line-clamp-2">
          {workflow.title}
        </h2>

        {/* Description - Limited to 3 Lines, Grows to Fill Space */}
        <p className="text-sm text-[#4A665C] line-clamp-3 flex-1">
          {workflow.description}
        </p>
      </div>
    </a>
  );
}