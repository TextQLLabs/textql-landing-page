import { SEO } from '../components/SEO';
import { CTA } from '../components/sections';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/JobData';
import { MissionBlock, ValuesBlock } from '../components/careers';
import { WaveBackground } from '../components/animations/WaveBackground';

export default function Careers() {
  const rolesRef = useRef<HTMLDivElement>(null);

  const scrollToRoles = () => {
    if (rolesRef.current) {
      const elementTop = rolesRef.current.offsetTop;
      const offset = -40; // Adjust this value to control how much space you want above the section
      const targetPosition = elementTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Group jobs by department
  const jobsByDepartment = jobs.reduce((acc, job) => {
    if (!acc[job.department]) {
      acc[job.department] = [];
    }
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, typeof jobs>);

  // Convert to array of category objects
  const categories = Object.keys(jobsByDepartment).map(category => ({
    category,
    jobs: jobsByDepartment[category]
  }));

  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="Careers | TextQL"
        description="Join TextQL's team and help build the future of enterprise data analysis with AI."
        canonical="https://textql.com/careers/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[500px] pb-40 min-h-screen flex flex-col justify-center">
        {/* Background with gradient */}
        <div className="absolute inset-0 z-0 animate-fade-in animation-delay-400">
      <WaveBackground />
    </div>        
        {/* Content */}
        <div className="relative z-10 pb-4 px-12">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <h1 className="text-6xl mt-20 font-extralight mb-6 text-[#B8D8D0]">
                Help us build the future of AI
              </h1>
              <p className="text-2xl text-[#729E8C] font-light max-w-3xl mx-auto mb-8">
              We're on a mission is to drive the cost of a data-driven decision to zero.
              </p>
              <button 
                onClick={scrollToRoles}
                className="inline-flex items-center bg-[#0A1F1C] hover:bg-[#0A1F1C]/80 text-[#B8D8D0] font-light py-3 px-6 rounded-md transition-colors duration-200"
              >
                See open roles
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient */}
        <div className="" />
      </div>

      {/* Mission Block */}
      {/* <MissionBlock /> */}

      {/* Values Block */}
      <div className="px-6">
        <ValuesBlock />
      </div>

      <section ref={rolesRef} className="py-16 bg-black/30">
        <div className="mx-auto max-w-site px-12">
          <h2 className="text-4xl font-extralight text-[#B8D8D0] mb-8">Open Roles</h2>
          {categories.map((category, index) => (
            <div key={index} className="mb-16">
              <h3 className="text-2xl font-extralight text-[#B8D8D0] mb-4">{category.category}</h3>
              
              <div className="border-t border-[#0A1F1C]">
                {category.jobs.map((job, jobIndex) => (
                  <div key={jobIndex} className="py-6 border-b border-[#0A1F1C] flex justify-between items-center">
                    <div>
                      <h4 className="text-md lg:text-xl font-light text-[#B8D8D0]">{job.title}</h4>
                      <p className="text-xs lg:text-base text-[#729E8C] font-light mt-2">{job.location}</p>
                    </div>
                    <Link 
                      to={job.url} 
                      className="text-[#B8D8D0] hover:text-[#729E8C] font-light flex items-center transition-colors duration-200"
                    >
                      Apply <span className="ml-2">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}