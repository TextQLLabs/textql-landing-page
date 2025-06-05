import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#729E8C]/30 last:border-b-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={onClick}
      >
        <span className="text-base lg:text-lg font-light text-[#B8D8D0]">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#B8D8D0] transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4 text-xs lg:text-lg text-[#729E8C] font-light">
          {content}
        </div>
      </div>
    </div>
  );
};

const DatabricksImageAndDropdownsInfo = () => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const accordionData = [
    {
      title: "Deep Research Agent Demo",
      content: (
        <div>
          <p className="mb-3">Experience how our AI agents conduct comprehensive market research and competitive analysis</p>
          <ul className="space-y-2 list-disc pl-4">
            <li>Watch agents analyze market trends in real-time</li>
            <li>See how agents synthesize insights from multiple data sources</li>
            <li>Understand agent reasoning and decision-making process</li>
            <li>Learn about agent collaboration and task delegation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Databricks-MCP Integration",
      content: (
        <div>
          <p className="mb-3">See our proprietary Mission Control Platform integrated with Databricks</p>
          <ul className="space-y-2 list-disc pl-4">
            <li>Explore synthetic Databricks environment setup</li>
            <li>Witness real-time data processing and analysis</li>
            <li>Learn about secure data handling and compliance</li>
            <li>See automated report generation and insights</li>
          </ul>
        </div>
      )
    },
    {
      title: "8-Week Project Simulation",
      content: (
        <div>
          <p className="mb-3">Watch our agents complete a full management consulting project</p>
          <ul className="space-y-2 list-disc pl-4">
            <li>Observe project scoping and planning phases</li>
            <li>See weekly deliverable generation</li>
            <li>Experience stakeholder communication simulation</li>
            <li>Review final recommendations and implementation plans</li>
          </ul>
        </div>
      )
    },
    {
      title: "Custom Use Case Workshop",
      content: (
        <div>
          <p className="mb-3">Work with our executives to design a demo for your specific needs</p>
          <ul className="space-y-2 list-disc pl-4">
            <li>Identify key business challenges and opportunities</li>
            <li>Customize agent behaviors for your industry</li>
            <li>Design specific data analysis workflows</li>
            <li>Create tailored reporting templates</li>
          </ul>
        </div>
      )
    }
  ];

  const handleClick = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <section className="relative z-10 py-16 bg-black ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl lg:text-4xl font-light text-center text-[#B8D8D0] mb-6 lg:mb-12">
          Executive Deep Dive Sessions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image */}
          <div className="relative">
            <img
              src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/6ba70508-6d55-4689-ddb5-9bb1b3b6ce00/public"
              alt="Exec Meeting"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-lg" />
          </div>

          {/* Right Column - Accordion */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-[#729E8C]/30">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                isOpen={openSection === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DatabricksImageAndDropdownsInfo; 