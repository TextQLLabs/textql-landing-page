import { Section } from '../ui/Section';
import { useComponentTheme } from '../../hooks/useComponentTheme';
import { themeBackgroundSecondary } from '../../utils/theme-utils';

export function ValuesBlock() {
  const theme = useComponentTheme();
  return (
    <Section
      variant="content"
      padding="md"
      background="secondary"
    >
        <h2 className={`text-xl font-extralight mb-4 uppercase tracking-wider ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Real Values</h2>
        
        <div className={`font-light mb-10 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
          <p className="mb-4">We believe meaningful values require honest trade-offs. Effective values acknowledge what you're choosing to prioritize and what you're willing to sacrifice for it.</p>
          <p className="mb-4">For example, <span className={`font-normal italic ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>move fast and break things</span> is a clear value because it explicitly chooses speed over perfection when decisions need to be made.</p>
          <p className="mb-4">In contrast, <span className={`font-normal italic ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>we work hard but maintain good work-life balance</span> lacks clarity because it doesn't acknowledge the inherent tension between intense commitment and personal time boundaries.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Value 1 */}
          <div className={`border p-6 rounded-lg ${theme === 'light' ? 'border-[#2A3B35]/20' : 'border-[#0A1F1C]'}`}>
            <h3 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Having Ownership</h3>
            <ul className={`list-disc pl-6 font-light mb-6 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
              <li className="mb-2">Focused on the outcome and not the output</li>
              <li className="mb-2">Take ownership for losses as much as for wins</li>
              <li className="mb-2">Get revenue share in the work you do</li>
            </ul>
            <p className={`font-light italic text-sm ${theme === 'light' ? 'text-[#4A665C]/80' : 'text-[#729E8C]/80'}`}>
              Tradeoff: With ownership comes shared accountability. Success and challenges affect everyone. We believe in transparent communication about both wins and setbacks, rather than shielding team members from business realities.
            </p>
          </div>

          {/* Value 2 */}
          <div className={`border p-6 rounded-lg ${theme === 'light' ? 'border-[#2A3B35]/20' : 'border-[#0A1F1C]'}`}>
            <h3 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Having Self Awareness & Realism</h3>
            <ul className={`list-disc pl-6 font-light mb-6 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
              <li className="mb-2">Understand the tradeoffs you're making</li>
              <li className="mb-2">Understand when someone else is better suited for a given task, and delegate it to someone else</li>
            </ul>
            <p className={`font-light italic text-sm ${theme === 'light' ? 'text-[#4A665C]/80' : 'text-[#729E8C]/80'}`}>
              Tradeoff: We prioritize honest feedback and role optimization over avoiding difficult conversations. This means acknowledging individual strengths and growth areas, which can feel uncomfortable but drives better outcomes.
            </p>
          </div>

          {/* Value 3 */}
          <div className={`border p-6 rounded-lg ${theme === 'light' ? 'border-[#2A3B35]/20' : 'border-[#0A1F1C]'}`}>
            <h3 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Having a Sense of Urgency</h3>
            <ul className={`list-disc pl-6 font-light mb-6 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
              <li className="mb-2">Constantly asking "how can we achieve the same outcome with less work"</li>
              <li className="mb-2">Prioritizing getting it right over getting it scalable</li>
            </ul>
            <p className={`font-light italic text-sm ${theme === 'light' ? 'text-[#4A665C]/80' : 'text-[#729E8C]/80'}`}>
              Tradeoff: Speed of execution sometimes means accepting technical debt and iterative improvements. We prioritize learning and validation over perfect initial implementations.
            </p>
          </div>

          {/* Value 4 */}
          <div className={`border p-6 rounded-lg ${theme === 'light' ? 'border-[#2A3B35]/20' : 'border-[#0A1F1C]'}`}>
            <h3 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Having Integrity</h3>
            <ul className={`list-disc pl-6 font-light mb-6 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
              <li className="mb-2">We trust you to act in the best interests of the team over yourself</li>
              <li className="mb-2">We don't have admin policies to stop you from rent-seeking our HR policies</li>
            </ul>
            <p className={`font-light italic text-sm ${theme === 'light' ? 'text-[#4A665C]/80' : 'text-[#729E8C]/80'}`}>
              Tradeoff: A high-trust environment relies on individual responsibility and mutual respect. This approach creates more autonomy but requires everyone to consistently act with integrity and good judgment.
            </p>
          </div>

          {/* Value 5 */}
          <div className={`border p-6 rounded-lg ${theme === 'light' ? 'border-[#2A3B35]/20' : 'border-[#0A1F1C]'}`}>
            <h3 className={`text-xl font-extralight mb-4 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>Having Drive & Aggression</h3>
            <ul className={`list-disc pl-6 font-light mb-6 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
              <li className="mb-2">Winning does matter, and you're always striving for more</li>
              <li className="mb-2">Always push for the extra mile, always looking at the next highest peak</li>
            </ul>
            <p className={`font-light italic text-sm ${theme === 'light' ? 'text-[#4A665C]/80' : 'text-[#729E8C]/80'}`}>
              Tradeoff: High ambition means accepting that comfort zones will be challenged regularly. This drive creates opportunities for exceptional growth but requires resilience and adaptability.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 mt-6">
            <a
              href="https://www.notion.so/textql/work-with-textql-26363a9652824b1a8ed6ba63fbd6b1ac?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
              className={`block font-light transition-colors duration-200 ${theme === 'light' ? 'text-[#2A3B35] hover:text-[#4A665C]' : 'text-[#B8D8D0] hover:text-[#729E8C]'}`}
            >
              Check out our employee handbook →
            </a>
            <a 
              href="https://mandate.beehiiv.com/p/the-next-trillion-dollar-company" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`block font-light transition-colors duration-200 ${theme === 'light' ? 'text-[#2A3B35] hover:text-[#4A665C]' : 'text-[#B8D8D0] hover:text-[#729E8C]'}`}
            >
              Read how we want to build a trillion-dollar company →
            </a>
            <a 
              href="https://mandate.beehiiv.com/p/how-do-you-give-a-players-exposure" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`block font-light transition-colors duration-200 ${theme === 'light' ? 'text-[#2A3B35] hover:text-[#4A665C]' : 'text-[#B8D8D0] hover:text-[#729E8C]'}`}
            >
              Read how we want to give our team exposure →
            </a>
          </div>

    </Section>
  );
}

export default ValuesBlock; 