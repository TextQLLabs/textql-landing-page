import { JoinsContent } from './joins';
import { JoinsChart } from '../agents/joins';



export function JoinsSection() {
  return (
    <section className="pt-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-site px-6">
        <JoinsContent />
        
        {/* Full-width Chart */}
        <div className="hidden lg:block w-full">
          <JoinsChart />
        </div>
      </div>
    </section>
  );
}