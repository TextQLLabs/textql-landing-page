import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="relative">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden min-h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F1C] to-black" />
        
        {/* Content */}
        <div className="relative z-10 pt-24 pb-16 px-6">
          <div className="mx-auto max-w-site">
            <div className="mb-6">
              <p className="text-[#729E8C] font-light mb-2">{department}, {type} ({location})</p>
              <h1 className="text-5xl font-extralight text-[#B8D8D0] mb-6">
                {title}
              </h1>
              {/* Apply/Refer buttons hidden per request */}
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-20" />
      </div>

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-site grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* About Company Column */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4">About TextQL</h2>
            <div className="text-[#729E8C] font-light space-y-6">
              <p>{companyInfo.intro}</p>
              {companyInfo.culture && <p>{companyInfo.culture}</p>}
            </div>
          </div>
          
          {/* Job Details Column */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4">Role Overview</h2>
              <p className="text-[#729E8C] font-light">{roleDescription}</p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4">What you'll do</h2>
              <ul className="list-disc pl-6 text-[#729E8C] font-light space-y-4">
                {responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-12">
              <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4">Requirements</h2>
              <ul className="list-disc pl-6 text-[#729E8C] font-light space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
            
            {additionalInfo && (
              <div className="mb-12">
                <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4">Additional Information</h2>
                <div className="text-[#729E8C] font-light whitespace-pre-line">
                  {additionalInfo}
                </div>
              </div>
            )}
            
            {process && process.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4">Interview Process</h2>
                <ol className="list-decimal pl-6 text-[#729E8C] font-light space-y-2">
                  {process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            
            {applicationInfo && (
              <div className="mb-12">
                <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4">How to Apply</h2>
                <div className="text-[#729E8C] font-light whitespace-pre-line">
                  {applicationInfo}
                </div>
              </div>
            )}
            
            {/* Apply/Refer buttons hidden per request */}
            
          </div>
        </div>
      </div>

      {/* Back to Careers Link */}
      <div className="bg-[#0A1F1C]/30 py-8">
        <div className="mx-auto max-w-site px-6">
          <Link to="/careers" className="text-[#B8D8D0] hover:text-[#729E8C] font-light flex items-center transition-colors duration-200">
            <span className="mr-2">←</span> Back to all openings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobPostingTemplate;