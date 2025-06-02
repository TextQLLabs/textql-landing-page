import { DemoRequestForm } from '../ui';
import { WaveGrid } from '../animations';
import { Text } from '../ui';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { DemoRequestButton } from '../ui/Button/DemoRequestButton';

interface CTAProps {
  heading?: string;
  subheader?: string;
  theme?: 'dark' | 'light';
  showWave?: boolean;
  isCompact?: boolean;
  variant?: 'default' | 'wide' | 'compact';
  useSimpleButton?: boolean;
  buttonText?: string;
}

export function CTA({ 
  heading = 'Watch Ana find deep insights in your data—in seconds.',
  subheader,
  theme = 'dark',
  showWave = true,
  useSimpleButton = false,
  buttonText = 'Request Demo'
}: CTAProps) {
  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-[#F0F5F3]';
  const minHeight = 'min-h-[400px] md:min-h-[500px]';
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
    const navigate = useNavigate();

  const handleDemoRequest = () => {
    navigate('/demo');
  };

  return (
    <section className={`relative ${minHeight} ${bgColor} overflow-hidden`}>
      {showWave && <WaveGrid />}
      
      <div className={`relative z-10 flex items-center ${minHeight}`}>
        <div className="mx-auto max-w-site px-6">
          <div className="max-w-2xl mx-auto text-center space-y-12">
            {/* Header Section */}
            <div className="space-y-4">
              <h2 className={`
                ${'text-4xl md:text-5xl'}
                font-extralight
                ${textColor}
                tracking-tight
                leading-tight
              `}>
                {heading}
              </h2>
              
              {subheader && (
                <Text 
                  color="muted" 
                  theme={theme}
                  className="text-lg md:text-xl font-light"
                >
                  {subheader}
                </Text>
              )}
            </div>

            {/* Form or Button Section */}
            <div className="flex justify-center items-center w-full">
              <div className="hidden md:block">
                <DemoRequestForm/>
              </div>
              <div className="md:hidden flex justify-center">
                <DemoRequestButton theme={theme} buttonText={buttonText} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA