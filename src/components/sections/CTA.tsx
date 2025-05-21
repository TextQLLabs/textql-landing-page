import { DemoRequestForm } from '../ui';
import { WaveGrid } from '../animations';
import { Text } from '../ui';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';

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
  heading = 'Deploy Ana to find Insights in your Data today',
  subheader,
  theme = 'dark',
  showWave = true,
  isCompact = false,
  variant = 'default',
  useSimpleButton = false,
  buttonText = 'Request Demo'
}: CTAProps) {
  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-[#F0F5F3]';
  const minHeight = isCompact ? 'min-h-[400px]' : 'min-h-[600px]';
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
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h2 className={`
                ${isCompact ? 'text-5xl' : 'text-7xl'}
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
                  className="text-xl font-light"
                >
                  {subheader}
                </Text>
              )}
            </div>

            {/* Form or Button Section */}
            <div className="flex justify-center">
              {useSimpleButton ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDemoRequest}
                  theme={theme}
                >
                  {buttonText}
                </Button>
              ) : (
                <DemoRequestForm 
                  theme={theme} 
                  variant={variant}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA