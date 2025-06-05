import { Text } from '../../ui';
import { missionEssay } from './content/mission';

export function AboutMission() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-site px-6 pb-20 md:pb-0">
        {/* Mission Header */}
        <div className="text-center mb-32">
          <h1 className="text-8xl lg:text-[12rem] font-extralight text-[#B8D8D0] mb-12 leading-none tracking-tight w-full">
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
      </div>
    </section>
  );
}