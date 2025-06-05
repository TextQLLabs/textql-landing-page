import { Text } from '../../ui';
import { FunnelFlow } from '../../animations/FunnelFlow';

export function WorkflowLibraryHeader() {
  return (
    <div className="relative overflow-hidden min-h-[500px]">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-black" />

      {/* FunnelFlow Animation */}
      <div className="absolute inset-0 z-0 opacity-60 scale-125 translate-y-[-10%] md:translate-y-[-5%] lg:translate-y-[-10%] xl:translate-y-[-20%]">
        <FunnelFlow />
      </div>


      {/* Content */}
      <div className="relative z-10 pt-32 pb-16 px-4 mt-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6">
            <h1 className="text-4xl lg:text-6xl font-extralight pb-6 text-[#B8D8D0]">
              Workflow Library
            </h1>
            <p className="text-base lg:text-2xl text-[#729E8C] font-light max-w-3xl mx-auto">
              Pre-built workflows to help you get started with TextQL. Each workflow is designed to solve specific business problems and can be customized to your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
    </div>
  );
}