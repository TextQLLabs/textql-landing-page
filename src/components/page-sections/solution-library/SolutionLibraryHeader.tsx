import { Text } from '../../ui';
import { DemoRequestForm } from '../../ui/DemoRequestForm/DemoRequestForm';
import { FunnelFlow } from '../../animations/FunnelFlow';

interface SolutionLibraryHeaderProps {
  headline?: string;
  description?: string;
}

export function SolutionLibraryHeader({ headline, description }: SolutionLibraryHeaderProps) {
  return (
    <div className="relative overflow-hidden min-h-[500px]" style={{ backgroundColor: '#000000' }}>
      {/* Background with gradient */}
      <div className="absolute inset-0" style={{ backgroundColor: '#000000' }} />

      {/* FunnelFlow Animation */}
      <div className="absolute inset-0 z-0 opacity-60 scale-125 translate-y-[-10%] md:translate-y-[-5%] lg:translate-y-[-10%] xl:translate-y-[-20%]">
        <FunnelFlow />
      </div>


      {/* Content */}
      <div className="relative z-10 navbar-offset pb-16 px-4 mt-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6">
            <h1 className="text-4xl lg:text-6xl font-extralight pb-6 text-[#B8D8D0]">
              {headline || 'Solution Library'}
            </h1>
            <p className="text-base lg:text-2xl text-[#729E8C] font-light max-w-3xl mx-auto mb-8">
              {description || 'Pre-built solutions to help you get started with TextQL. Each solution is designed to solve specific business problems and can be customized to your needs.'}
            </p>
          </div>
          
          {/* Demo Request Form */}
          <div className="max-w-lg mx-auto">
            <DemoRequestForm theme="dark" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
    </div>
  );
}