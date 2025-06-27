import { Badge, Text } from '../../ui';

export function EnterpriseHero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
      <div className="relative min-h-screen z-10 px-6 flex items-center justify-center max-w-site mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-24 items-center w-full   py-16 lg:py-0">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Badge
              variant="default"
              className="inline-flex items-center bg-[#B8D8D0]/10 px-3 py-1 mb-8 lg:mb-12 backdrop-blur-sm border border-[#B8D8D0]/20"
            >
              <div className="h-2 w-2 bg-[#B8D8D0] animate-pulse mr-2" />
              <span>Enterprise Security</span>
            </Badge>

            <h1 className="text-5xl md:text-5xl lg:text-[6rem] leading-[1.1] lg:leading-[1] font-extralight mb-8 lg:mb-12 text-[#B8D8D0]">
              Your Data,
              <br />
              Your Cloud
            </h1>

            <Text color="muted" className="text-lg md:text-xl lg:text-2xl font-light mb-8 lg:mb-12 max-w-2xl mx-auto lg:mx-0">
              Deploy TextQL's LLMs directly in your Virtual Private Cloud. 
              Your data never leaves your infrastructure.
            </Text>
          </div>

          {/* Right Content - Cloud Providers */}
          <div className="space-y-6 lg:space-y-8">
            <Text variant="header" className="text-2xl md:text-3xl lg:text-4xl font-extralight text-[#B8D8D0] mb-6 lg:mb-8 text-center lg:text-left lg:mt-20">
              Deployed Into Your Cloud
            </Text>
            
            {[
              { name: 'AWS', logo: '/images/logos/aws-white.png' },
              { name: 'Azure', logo: '/images/logos/azure-white.png' },
              { name: 'GCP', logo: '/images/logos/gcp-white.png' }
            ].map((provider) => (
              <div 
                key={provider.name}
                className="p-6 md:p-8 lg:p-12 border border-[#B8D8D0]/10 backdrop-blur-sm 
                  flex items-center gap-4 md:gap-6 lg:gap-8 hover:border-[#B8D8D0]/20 transition-all
                  group justify-center lg:justify-start"
              >
                <img 
                  src={provider.logo}
                  alt={provider.name}
                  className="h-10 md:h-12 lg:h-16 w-auto object-contain transition-transform group-hover:scale-105"
                />
                <Text className="text-[#B8D8D0] text-lg md:text-xl lg:text-2xl">{provider.name}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}