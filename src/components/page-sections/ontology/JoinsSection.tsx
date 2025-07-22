import { JoinsContent } from './joins';
import { JoinsChart } from '../agents/joins';
import { Section } from '../../ui/Section';



export function JoinsSection() {
  return (
    <Section 
      variant="content"
      paddingTop="md"
      paddingBottom="lg"
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