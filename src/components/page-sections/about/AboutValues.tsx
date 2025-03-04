import { type Value } from './types';

const values: Value[] = [
  {
    title: "Having ownership",
    description: "Focused on the outcome and not the output. Take ownership for losses as much as for wins. Get revenue share in the work you do.",
    tradeoff: "Ownership comes with accountability, when we win, we win big. When we lose, everyone will feel it. You're not insulated from the lows - and if we get punched in the face we won't tell you 'it's all going to be alright'"
  },
  {
    title: "Having self awareness & realism",
    description: "Understand the tradeoffs you're making. Understand when someone else is better suited for a given task, and delegate it to someone else.",
    tradeoff: "We don't tell everyone 'we're all equally effective at everything', which is considered impolite in most places. We acknowledge that facing our weaknesses will hurt feelings"
  },
  {
    title: "Having a sense of urgency",
    description: "Constantly asking 'how can we achieve the same outcome with less work'. Prioritizing getting it right over getting it scalable.",
    tradeoff: "When we build something for the first time - we expect duct tape on it. We acknowledge the debt we take on"
  },
  {
    title: "Having integrity",
    description: "We trust you to act in the best interests of the team over yourself. We don't have admin policies to stop you from rent-seeking our hr policies.",
    tradeoff: "We won't be able to maintain strong controls, if we start losing trust in each other, it all comes toppling down. Don't be the person who makes hr necessary"
  },
  {
    title: "Having drive & aggression",
    description: "Winning does matter, and you're always striving for more. Always push for the extra mile, always looking at the next highest peak.",
    tradeoff: "We acknowledge it might cause someone to inflate their achievements, and it comes at the cost of comfort"
  }
];

export function AboutValues() {
  return (
    <section className="bg-[#0A1F1C] py-24">
      <div className="mx-auto max-w-site px-6">
        <div className="grid md:grid-cols-[1fr,1.5fr] gap-24">
          {/* Left Side - Header and Links */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-extralight text-[#B8D8D0]">Real values</h2>
              <p className="text-xl text-[#729E8C]">
                Some meta about value-setting: we believe values don't mean anything if they don't have clear tradeoffs
              </p>
            </div>
            <p className="text-[#729E8C]">
              If you try to have your cake and eat it too - you're just laying out a platitude. In other words, "move fast and break things" is a good value, because it acknowledges that when in doubt, you should err on the side of speed. On the other side: "we work hard but maintain good WLB" is a terrible value, it doesn't acknowledge that an emphasis on WLB comes at the cost of brutal and hard work.
            </p>
            <div className="space-y-4">
              <a 
                href="https://mandate.beehiiv.com/p/the-next-trillion-dollar-company" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-[#B8D8D0] hover:text-[#729E8C] transition-colors"
              >
                Read how we want to build a trillion dollar company →
              </a>
              <a 
                href="https://mandate.beehiiv.com/p/how-do-you-give-a-players-exposure" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-[#B8D8D0] hover:text-[#729E8C] transition-colors"
              >
                Read how we want to give our team exposure →
              </a>
            </div>
          </div>

          {/* Right Side - Values List */}
          <div className="space-y-12">
            {values.map((value) => (
              <div key={value.title} className="space-y-4">
                <h3 className="text-2xl font-light text-[#B8D8D0]">{value.title}</h3>
                <p className="text-[#729E8C]">{value.description}</p>
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-[#B8D8D0] mb-1">Tradeoff:</h4>
                  <p className="text-[#729E8C]">{value.tradeoff}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}