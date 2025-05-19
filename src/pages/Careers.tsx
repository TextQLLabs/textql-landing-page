import { SEO } from '../components/SEO';
import { CTA } from '../components/sections';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/JobData';

export default function Careers() {
  const rolesRef = useRef(null);

  const scrollToRoles = () => {
    rolesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Group jobs by department
  const jobsByDepartment = jobs.reduce((acc, job) => {
    if (!acc[job.department]) {
      acc[job.department] = [];
    }
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, typeof jobs>);

  // Convert to array of category objects
  const categories = Object.keys(jobsByDepartment).map(category => ({
    category,
    jobs: jobsByDepartment[category]
  }));

  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="Careers | TextQL"
        description="Join TextQL's team and help build the future of enterprise data analysis with AI."
        canonical="https://textql.com/careers/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[500px]">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F1C] to-black" />
        
        {/* Content */}
        <div className="relative z-10 pt-32 pb-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6">
              <h1 className="text-6xl font-extralight mb-6 text-[#B8D8D0]">
                Help us build the future of data
              </h1>
              <p className="text-2xl text-[#729E8C] font-light max-w-3xl mx-auto mb-8">
                Join our team and help reshape how organizations interact with their data
              </p>
              <button 
                onClick={scrollToRoles}
                className="inline-flex items-center bg-[#0A1F1C] hover:bg-[#0A1F1C]/80 text-[#B8D8D0] font-light py-3 px-6 rounded-md transition-colors duration-200"
              >
                See open roles
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
      </div>

      {/* Mission Block */}
      <section className="py-16 bg-[#0A1F1C]/30">
        <div className="mx-auto max-w-site px-6">
          <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4 uppercase tracking-wider">Mission-Driven</h2>
          <h3 className="text-3xl font-extralight text-[#B8D8D0] mb-6">TextQL's mission is to drive the cost of a data-driven decision to zero.</h3>
          
          <div className="text-[#729E8C] font-light text-lg max-w-3xl mb-8 leading-relaxed">
            <p className="mb-6">TextQL is building autonomous driving for the modern data stack. AI will soon feel more like a colleague and less like a tool - this will fundamentally change how people work, learn, and live. Starting with data analysts, TextQL aims to create a fully autonomous data organization, empowering everyone to spend their time using data instead of working with data.</p>
          </div>
        </div>
      </section>

      {/* Values Block */}
      <section className="py-16">
        <div className="mx-auto max-w-site px-6">
          <h2 className="text-xl font-extralight text-[#B8D8D0] mb-4 uppercase tracking-wider">Real Values</h2>
          
          <div className="text-[#729E8C] font-light mb-10">
            <p className="mb-4">Some meta about value-setting: We believe values don't mean anything if they don't have clear tradeoffs. If you try to have your cake and eat it too - you're just laying out a platitude.</p>
            <p className="mb-4">In other words, "<span className="text-[#B8D8D0] font-normal">move fast and break things</span>" is a good value, because it acknowledges that when in doubt, you should err on the side of speed.</p>
            <p className="mb-4">On the other side: "<span className="text-[#B8D8D0] font-normal">we work hard but maintain good WLB</span>" is a terrible value, it doesn't acknowledge that an emphasis on WLB comes at the cost of brutal and hard work.</p>
            <div className="flex items-center mt-6">
              <a href="/handbook" className="text-[#B8D8D0] hover:text-[#729E8C] font-light transition-colors duration-200">
                Check out our employee handbook <span className="ml-1">→</span>
              </a>
            </div>
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
        </div>
      </section>

      {/* Open Roles Section */}
      <section ref={rolesRef} className="py-16 bg-[#0A1F1C]/30">
        <div className="mx-auto max-w-site px-6">
          <h2 className="text-4xl font-extralight text-[#B8D8D0] mb-8">Open Roles</h2>
          {categories.map((category, index) => (
            <div key={index} className="mb-16">
              <h3 className="text-xl font-extralight text-[#B8D8D0] mb-8">{category.category}</h3>
              
              <div className="border-t border-[#0A1F1C]">
                {category.jobs.map((job, jobIndex) => (
                  <div key={jobIndex} className="py-6 border-b border-[#0A1F1C] flex justify-between items-center">
                    <div>
                      <h4 className="text-xl font-light text-[#B8D8D0]">{job.title}</h4>
                      <p className="text-[#729E8C] font-light mt-2">{job.location}</p>
                    </div>
                    <Link 
                      to={job.url} 
                      className="text-[#B8D8D0] hover:text-[#729E8C] font-light flex items-center transition-colors duration-200"
                    >
                      Apply <span className="ml-2">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTA 
        theme="dark"
        showWave={true}
        variant="wide"
        heading="Don't see the right role for you?"
        subheader="We're always looking for talented individuals. Send us your resume at careers@textql.com"
        useSimpleButton={true}
        buttonText="Contact Us"
      />
    </div>
  );
}