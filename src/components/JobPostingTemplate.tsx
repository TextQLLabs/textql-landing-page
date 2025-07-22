import React from 'react';
import { Link } from 'react-router-dom';
import { useComponentTheme } from '../hooks/useComponentTheme';
import { themeBackgroundSecondary, themeText, themeTextSecondary } from '../utils/theme-utils';

interface CompanyInfo {
  intro: string;
  culture: string;
}

interface JobPostingTemplateProps {
  title: string;
  department: string;
  type: string;
  location: string;
  companyInfo: CompanyInfo;
  roleDescription: string;
  responsibilities: string[];
  requirements: string[];
  additionalInfo?: string;
  process?: string[];
  applicationInfo?: string;
  applyLink: string;
  referLink?: string;
}

const JobPostingTemplate: React.FC<JobPostingTemplateProps> = ({
  title,
  department,
  type,
  location,
  companyInfo,
  roleDescription,
  responsibilities,
  requirements,
  additionalInfo,
  process,
  applicationInfo,
  applyLink,
  referLink
}) => {
  const theme = useComponentTheme();
  return (
    <div className="relative px-12">
      {/* Header with solid black background */}
      <div className="relative overflow-hidden min-h-[200px]">
        <div className={`absolute inset-0 ${themeBackgroundSecondary(theme)}`} />
        
        {/* Content */}
        <div className="relative z-10 navbar-offset pb-16 px-6">
          <div className="mx-auto max-w-site">
            <div className="mb-6">
              <p className={`font-light mb-2 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>{department}, {type} ({location})</p>
              <h1 className={`text-5xl font-extralight mb-6 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>
                {title}
              </h1>
              {/* Apply/Refer buttons hidden per request */}
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient */}
        <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${theme === 'light' ? 'from-[#F7F7F7]' : 'from-black'} to-transparent z-20`} />
      </div>

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-site grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* About Company Column */}
          <div className="lg:col-span-1">
            <h2 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>About TextQL</h2>
            <div className={`font-light space-y-6 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
              <p>{companyInfo.intro}</p>
              {companyInfo.culture && <p>{companyInfo.culture}</p>}
            </div>
          </div>
          
          {/* Job Details Column */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Role Overview</h2>
              <p className={`font-light ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>{roleDescription}</p>
            </div>
            
            <div className="mb-12">
              <h2 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>What you'll do</h2>
              <ul className={`list-disc pl-6 font-light space-y-4 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
                {responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-12">
              <h2 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Requirements</h2>
              <ul className={`list-disc pl-6 font-light space-y-4 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
            
            {additionalInfo && (
              <div className="mb-12">
                <h2 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Additional Information</h2>
                <div className={`font-light whitespace-pre-line ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
                  {additionalInfo}
                </div>
              </div>
            )}
            
            {process && process.length > 0 && (
              <div className="mb-12">
                <h2 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Interview Process</h2>
                <ol className={`list-decimal pl-6 font-light space-y-2 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
                  {process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            
            {applicationInfo && (
              <div className="mb-12">
                <h2 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>How to Apply</h2>
                <div className={`font-light whitespace-pre-line ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
                  {applicationInfo}
                </div>
              </div>
            )}
            
            {/* Apply/Refer buttons hidden per request */}
            
          </div>
        </div>
      </div>

      {/* Back to Careers Link */}
      <div className={`py-8 ${theme === 'light' ? 'bg-[#2A3B35]/20' : 'bg-[#0A1F1C]/30'}`}>
        <div className="mx-auto max-w-site px-6">
          <Link to="/careers" className={`font-light flex items-center transition-colors duration-200 ${theme === 'light' ? 'text-[#2A3B35] hover:text-[#4A665C]' : 'text-[#B8D8D0] hover:text-[#729E8C]'}`}>
            <span className="mr-2">←</span> Back to all openings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobPostingTemplate;