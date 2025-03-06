import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Header } from '../../sections/Header';
import { Button } from '../../ui';
import type { Workflow } from '../../../data/workflows/types';

interface WorkflowHeaderProps {
  workflow: Workflow;
}

export function WorkflowHeader({ workflow }: WorkflowHeaderProps) {
  const [showCopied, setShowCopied] = useState(false);
  const location = useLocation();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="relative min-h-[400px] pt-32 pb-16">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F1C] via-[#0A1F1C]/80 to-black" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 items-start">
          {/* Left Content */}
          <div>
            {/* Back Link */}
            <Link 
              to="/workflows" 
              className="inline-flex items-center gap-2 text-[#B8D8D0] hover:text-[#729E8C] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Workflows
            </Link>

            {/* Header Component */}
            <Header
              title={workflow.title}
              description={workflow.description}
              theme="dark"
              size="lg"
              align="left"
              className="mb-8"
            />

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Demo Button */}
              <a href="/demo" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                >
                  Request Demo
                </Button>
              </a>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="p-3 bg-[#0A1F1C] border border-[#B8D8D0]/20 hover:border-[#B8D8D0]/40 transition-colors rounded-md"
                >
                  <Share2 className="w-5 h-5 text-[#B8D8D0]" />
                </button>

                {/* Copied Notification */}
                <div 
                  className={`
                    absolute top-full left-1/2 -translate-x-1/2 mt-2 
                    px-3 py-1.5 bg-[#B8D8D0] text-black text-sm rounded
                    transform transition-all duration-200
                    ${showCopied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                  `}
                >
                  Link copied!
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={workflow.image}
              alt={workflow.title}
              className="object-cover w-full h-full"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F1C]/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}