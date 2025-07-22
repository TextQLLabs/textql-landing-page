import { SEO } from '../components/SEO';
import { CTA } from '../components/sections';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/JobData';
import { MissionBlock, ValuesBlock } from '../components/careers';
import { WaveBackground } from '../components/animations/WaveBackground';
import { Section } from '../components/ui/Section';
import { useGlobalTheme } from '../components/GlobalThemeProvider';
import { getThemeClasses } from '../utils/theme-utils';

export default function Careers() {
  const { isLightMode } = useGlobalTheme();
  const themeClasses = getThemeClasses(isLightMode);
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
    <div className={`min-h-screen ${themeClasses.bgSecondary}`}>
      <SEO 
        title="Careers | TextQL"
        description="Join TextQL's team and help build the future of enterprise data analysis with AI."
        canonical="https://textql.com/careers/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section */}
      <Section
        variant="wider"
        padding="none"
        height="hero"
        hasNavbarOffset
        overflow="hidden"
        background="secondary"
        className="relative"
      >
        {/* Background with gradient */}
        <div className="absolute inset-0 z-0 animate-fade-in animation-delay-400">
          <WaveBackground theme={isLightMode ? 'light' : 'dark'} />
        </div>        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center max-w-4xl mx-auto px-6">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extralight mb-6 ${themeClasses.textPrimary}`}>
                Help us build the future of AI
              </h1>
              <p className={`text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8 ${themeClasses.textSecondary}`}>
                We're on a mission to drive the cost of a data-driven decision to zero.
              </p>
              <button 
                onClick={scrollToRoles}
                className={`inline-flex items-center font-medium py-3 px-8 rounded-lg transition-all duration-200 ${themeClasses.buttonPrimary} hover:opacity-90 transform hover:scale-105`}
              >
                See open roles
              </button>
          </div>
        </div>
        
        {/* Bottom Gradient */}
        <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${themeClasses.bgSecondary} to-transparent z-20`} />
      </Section>

      {/* Mission Block */}
      {/* <MissionBlock /> */}

      {/* Values Block */}
      <Section variant="content" padding="none">
        <ValuesBlock />
      </Section>

      <Section 
        ref={rolesRef} 
        variant="content"
        padding="md"
        background="secondary"
      >
          <h2 className={`text-3xl sm:text-4xl font-extralight mb-8 ${themeClasses.textPrimary}`}>Open Roles</h2>
          {categories.map((category, index) => (
            <div key={index} className="mb-16">
              <h3 className={`text-xl sm:text-2xl font-extralight mb-4 ${themeClasses.textPrimary}`}>{category.category}</h3>
              
              <div className={`border-t ${themeClasses.border}`}>
                {category.jobs.map((job, jobIndex) => (
                  <div key={jobIndex} className={`py-6 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ${themeClasses.border}`}>
                    <div>
                      <h4 className={`text-base sm:text-lg lg:text-xl font-medium ${themeClasses.textPrimary}`}>{job.title}</h4>
                      <p className={`text-sm lg:text-base font-light mt-1 ${themeClasses.textSecondary}`}>{job.location}</p>
                    </div>
                    <Link 
                      to={job.url} 
                      className={`font-medium flex items-center transition-all duration-200 ${themeClasses.linkPrimary} hover:opacity-75 text-sm sm:text-base whitespace-nowrap`}
                    >
                      Apply <span className="ml-2">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </Section>
    </div>
  );
}