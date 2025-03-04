import { JoinsChart, JoinsContent } from './joins';

export function JoinsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-site px-6">
        <JoinsContent />
        
        {/* Full-width Chart */}
        <div className="w-full">
          <JoinsChart />
        </div>
      </div>
    </section>
  );
}