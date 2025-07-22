import { JoinsChart, JoinsContent } from './joins';
import { Section } from '../../ui/Section';

export function JoinsSection() {
  return (
    <Section 
      variant="content"
      padding="lg"
      background="white"
      overflow="hidden"
      className="relative"
    >
      <JoinsContent />
      
      {/* Full-width Chart */}
      <div className="hidden lg:block w-full">
        <JoinsChart />
      </div>
    </Section>
  );
}