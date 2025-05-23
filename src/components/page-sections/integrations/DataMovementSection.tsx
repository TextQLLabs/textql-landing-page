import { Database, RefreshCw, FileSpreadsheet, Settings } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import journey images
import setupImage from '/images/appjourneys/addconnector.png';
import syncImage from '/images/appjourneys/sync connector.png';
import previewImage from '/images/appjourneys/viewdata.png';
import adminImage from '/images/appjourneys/listconnectors.png';

const journeySteps = [
  {
    title: 'Simple Setup',
    description: 'Easy connector setup with intuitive forms and guided configuration for all supported data sources.',
    icon: Database,
    image: setupImage
  },
  {
    title: 'Automatic Sync',
    description: 'Seamlessly sync your data sources to keep TextQL updated with the latest schema changes.',
    icon: RefreshCw,
    image: syncImage
  },
  {
    title: 'Table Preview',
    description: 'Preview tables and assets previously connected to TextQL before running complex queries.',
    icon: FileSpreadsheet,
    image: previewImage
  },
  {
    title: 'Admin Controls',
    description: 'Comprehensive connector management with administrative tools for your organization.',
    icon: Settings,
    image: adminImage
  }
];

export function DataMovementSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 bg-white border-t border-[#2A3B35]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#2A3B35] font-extralight">
            Connector Management
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12">
            <div className="absolute top-8 left-[calc(8%+8px)] right-[calc(8%+8px)] h-[2px] bg-gray-200"></div>

            <div className="grid grid-cols-4 gap-4">
              {journeySteps.map((step, index) => (
                <div key={step.title} className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 flex items-center justify-center cursor-pointer z-10 transition-all duration-300
                      ${index === activeStep ? 'bg-[#2A3B35]' : 'bg-[#F0F5F3]'}`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <step.icon
                      className={`w-6 h-6 ${index === activeStep ? 'text-white' : 'text-[#2A3B35]'}`}
                    />
                  </div>

                  <div className="mt-4 text-center">
                    <p className={`font-medium transition-colors duration-300 
                      ${index === activeStep ? 'text-[#2A3B35]' : 'text-gray-500'}`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="aspect-[16/9] overflow-hidden border border-[#2A3B35]/20 shadow-lg mb-6">
                <img
                  src={journeySteps[activeStep].image}
                  alt={journeySteps[activeStep].title}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-[#4A665C] text-lg text-center">
                {journeySteps[activeStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 