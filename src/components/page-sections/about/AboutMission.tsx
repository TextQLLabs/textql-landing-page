import { Text } from '../../ui';
import { missionEssay } from './content/mission';

export function AboutMission() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-site px-6">
        {/* Mission Header */}
        <div className="text-center mb-32">
          <h1 className="text-[12rem] font-extralight text-[#B8D8D0] mb-12 leading-none tracking-tight w-full">
            The Mission
          </h1>
          <a 
            href="https://textql.notion.site/onboarding-library-5766c3ba046e479b878de22cb1d786c4?pvs=4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#B8D8D0] hover:text-[#729E8C] transition-colors text-2xl"
          >
            Our Intelligence Hub →
          </a>
        </div>

        {/* Mission Essay */}
        <div className="max-w-4xl mx-auto space-y-12">
          {missionEssay.map((paragraph, index) => (
            <p key={index} className="text-2xl font-light text-[#B8D8D0] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}