import { SEO } from '../../components/SEO';
import JobPostingTemplate from '../../components/JobPostingTemplate';
import { jobs } from '../../data/JobData';
import { useParams, Navigate } from 'react-router-dom';
import { useComponentTheme } from '../../hooks/useComponentTheme';
import { themeBackgroundSecondary } from '../../utils/theme-utils';

export default function JobPostingPage() {
  const theme = useComponentTheme();
  // Get job ID from URL parameters
  const { jobId } = useParams<{ jobId: string }>();
  
  // Find the job data
  const job = jobs.find(j => j.id === jobId);
  
  // Redirect to careers page if job not found
  if (!job) {
    return <Navigate to="/careers" replace />;
  }

  return (
    <div className={`min-h-screen ${themeBackgroundSecondary(theme)} mt-16`}>
      <SEO 
        title={`${job.title} | TextQL`}
        description={`Join TextQL as ${job.title} and help build the future of data analysis.`}
        canonical={`https://textql.com${job.url}`}
        ogImage="https://textql.com/social-preview.png"
      />
      
      <JobPostingTemplate 
        title={job.title}
        department={job.department}
        type={job.type}
        location={job.location}
        companyInfo={job.companyInfo}
        roleDescription={job.roleDescription}
        responsibilities={job.responsibilities}
        requirements={job.requirements}
        additionalInfo={job.additionalInfo}
        process={job.process}
        applicationInfo={job.applicationInfo}
        applyLink={`/apply/${job.id}`}
        referLink={`/refer/${job.id}`}
      />
    </div>
  );
}