import { DemoRequestForm } from '../ui';
import { WaveGrid } from '../animations';
import { Text } from '../ui';
import { Section, sectionPresets } from '../ui/Section';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';
import { DemoRequestButton } from '../ui/Button/DemoRequestButton';
import { useComponentTheme } from '../../hooks/useComponentTheme';
import { themeBackgroundSecondary, themeBackground } from '../../utils/theme-utils';

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
  theme,
  showWave = true,
  useSimpleButton = false,
  buttonText = 'Request Demo'
}: CTAProps) {
  const componentTheme = useComponentTheme();
  const effectiveTheme = theme || componentTheme;
  const bgColor = effectiveTheme === 'dark' ? themeBackgroundSecondary(componentTheme) : (componentTheme === 'light' ? 'bg-[#F0F5F3]' : 'bg-[#0F1712]');
  const minHeight = 'min-h-[250px] md:min-h-[300px]';
  const textColor = effectiveTheme === 'dark' ? (componentTheme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]') : (componentTheme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]');
    const navigate = useNavigate();

  const handleDemoRequest = () => {
    navigate('/request-demo');
  };

  return (
    <Section
      {...sectionPresets.cta}
      background={effectiveTheme === 'dark' ? 'secondary' : 'primary'}
      overflow="hidden"
      className="cta-section relative"
    >
      {showWave && <WaveGrid />}
      
      <div className="relative z-10 text-center space-y-12">
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
                  theme={effectiveTheme}
                  className="text-lg md:text-xl font-light"
                >
                  {subheader}
                </Text>
              )}
            </div>

            {/* Form or Button Section */}
            <div className="flex justify-center items-center w-full">
              <div className="hidden md:flex justify-center w-full max-w-md">
                <DemoRequestForm theme={effectiveTheme} />
              </div>
              <div className="md:hidden flex justify-center">
                <DemoRequestButton theme={effectiveTheme} buttonText={buttonText} />
              </div>
            </div>
      </div>
    </Section>
  );
}

export default CTA