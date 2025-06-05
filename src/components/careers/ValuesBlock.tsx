export function ValuesBlock() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-site px-12">
        <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4 uppercase tracking-wider">Real Values</h2>
        
        <div className="text-[#729E8C] font-light mb-10">
          <p className="mb-4">We believe values don't mean anything if they don't have clear tradeoffs. If you try to have your cake and eat it too—you're just laying out a platitude.</p>
          <p className="mb-4">In other words, <span className="text-[#B8D8D0] font-normal italic">move fast and break things</span> is a good value, because it acknowledges that when in doubt, you should err on the side of speed.</p>
          <p className="mb-4">On the other hand, <span className="text-[#B8D8D0] font-normal italic">we work hard but maintain good work-life balance</span> is a terrible value because it doesn't acknowledge that an emphasis on work-life balance comes at the cost of brutal and hard work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Value 1 */}
          <div className="border border-[#0A1F1C] p-6 rounded-lg">
            <h3 className="text-xl font-extralight text-[#B8D8D0] mb-4">Having Ownership</h3>
            <ul className="list-disc pl-6 text-[#729E8C] font-light mb-6">
              <li className="mb-2">Focused on the outcome and not the output</li>
              <li className="mb-2">Take ownership for losses as much as for wins</li>
              <li className="mb-2">Get revenue share in the work you do</li>
            </ul>
            <p className="text-[#729E8C]/80 font-light italic text-sm">
              Tradeoff: Ownership comes with accountability, when we win, we win big. When we lose, everyone will feel it. You're not insulated from the lows - and if we get punched in the face we won't tell you "it's all going to be alright"
            </p>
          </div>

          {/* Value 2 */}
          <div className="border border-[#0A1F1C] p-6 rounded-lg">
            <h3 className="text-xl font-extralight text-[#B8D8D0] mb-4">Having Self Awareness & Realism</h3>
            <ul className="list-disc pl-6 text-[#729E8C] font-light mb-6">
              <li className="mb-2">Understand the tradeoffs you're making</li>
              <li className="mb-2">Understand when someone else is better suited for a given task, and delegate it to someone else</li>
            </ul>
            <p className="text-[#729E8C]/80 font-light italic text-sm">
              Tradeoff: We don't tell everyone "we're all equally effective at everything", which is considered impolite in most places. We acknowledge that facing our weaknesses will hurt feelings
            </p>
          </div>

          {/* Value 3 */}
          <div className="border border-[#0A1F1C] p-6 rounded-lg">
            <h3 className="text-xl font-extralight text-[#B8D8D0] mb-4">Having a Sense of Urgency</h3>
            <ul className="list-disc pl-6 text-[#729E8C] font-light mb-6">
              <li className="mb-2">Constantly asking "how can we achieve the same outcome with less work"</li>
              <li className="mb-2">Prioritizing getting it right over getting it scalable</li>
            </ul>
            <p className="text-[#729E8C]/80 font-light italic text-sm">
              Tradeoff: When we build something for the first time - we expect duct tape on it. We acknowledge the debt we take on
            </p>
          </div>

          {/* Value 4 */}
          <div className="border border-[#0A1F1C] p-6 rounded-lg">
            <h3 className="text-xl font-extralight text-[#B8D8D0] mb-4">Having Integrity</h3>
            <ul className="list-disc pl-6 text-[#729E8C] font-light mb-6">
              <li className="mb-2">We trust you to act in the best interests of the team over yourself</li>
              <li className="mb-2">We don't have admin policies to stop you from rent-seeking our HR policies</li>
            </ul>
            <p className="text-[#729E8C]/80 font-light italic text-sm">
              Tradeoff: We won't be able to maintain strong controls, if we start losing trust in each other, it all comes toppling down. Don't be the person who makes HR necessary.
            </p>
          </div>

          {/* Value 5 */}
          <div className="border border-[#0A1F1C] p-6 rounded-lg">
            <h3 className="text-xl font-extralight text-[#B8D8D0] mb-4">Having Drive & Aggression</h3>
            <ul className="list-disc pl-6 text-[#729E8C] font-light mb-6">
              <li className="mb-2">Winning does matter, and you're always striving for more</li>
              <li className="mb-2">Always push for the extra mile, always looking at the next highest peak</li>
            </ul>
            <p className="text-[#729E8C]/80 font-light italic text-sm">
              Tradeoff: We acknowledge it might cause someone to inflate their achievements, and it comes at the cost of comfort
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 mt-6">
            <a
              href="https://www.notion.so/textql/work-with-textql-26363a9652824b1a8ed6ba63fbd6b1ac?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#B8D8D0] hover:text-[#729E8C] font-light transition-colors duration-200"
            >
              Check out our employee handbook →
            </a>
            <a 
              href="https://mandate.beehiiv.com/p/the-next-trillion-dollar-company" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-[#B8D8D0] hover:text-[#729E8C] font-light transition-colors duration-200"
            >
              Read how we want to build a trillion-dollar company →
            </a>
            <a 
              href="https://mandate.beehiiv.com/p/how-do-you-give-a-players-exposure" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-[#B8D8D0] hover:text-[#729E8C] font-light transition-colors duration-200"
            >
              Read how we want to give our team exposure →
            </a>
          </div>

      </div>
    </section>
  );
}

export default ValuesBlock; 