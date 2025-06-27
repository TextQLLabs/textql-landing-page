import { useParams } from 'react-router-dom';
import { SolutionHeader, SolutionBody } from '../../components/page-sections/solution-template';
import { solutions } from '../../data/solutions';
import { Text } from '../../components/ui';
import { SEO } from '../../components/SEO';
import { CTA } from '../../components/sections';

// Import all insight files
const insightModules = import.meta.glob('../../data/solutions/*/insight.ts', { eager: true });

export default function SolutionTemplate() {
  const { id } = useParams();
  const solution = solutions.find(s => s.id === id);

  // Find matching insight for the solution
  const insight = Object.entries(insightModules).reduce((acc: any, [path, module]: [string, any]) => {
    if (path.includes(`/${id}/`)) {
      return module.insight;
    }
    return acc;
  }, null);

  if (!solution) {
    return (
      <div className="min-h-screen bg-black pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Text variant="header" className="text-4xl mb-6 text-[#B8D8D0]">
            Solution Not Found
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title={`${solution.title} | TextQL Solutions`}
        description={solution.description}
        canonical={`https://textql.com/solutions/${solution.id}/`}
        ogImage={solution.image}
        ogType="article"
      />
      {/* Header Section */}
      <SolutionHeader solution={solution} />

      {/* Body Section */}
      <SolutionBody solution={solution} insight={insight} />

      {/* CTA Section */}
      <CTA 
        theme="dark"
        heading={`Get a demo of ${solution.title}`}
        useSimpleButton={false}
      />
    </div>
  );
}