import { Badge, Text } from '../../ui';

export function EnterpriseHero() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      <div className="relative z-10 h-full mx-auto max-w-site px-6 flex items-center">
        <div className="grid grid-cols-[1.5fr,1fr] gap-24 items-center">
          {/* Left Content */}
          <div>
            <Badge
              variant="default"
              className="inline-flex items-center bg-[#B8D8D0]/10 px-3 py-1 mb-12 backdrop-blur-sm border border-[#B8D8D0]/20"
            >
              <div className="h-2 w-2 bg-[#B8D8D0] animate-pulse mr-2" />
              <span>Enterprise Security</span>
            </Badge>

            <h1 className="text-[6rem] leading-[1] font-extralight mb-12 text-[#B8D8D0]">
              Your Data,
              <br />
              Your Cloud
            </h1>

            <Text color="muted" className="text-2xl font-light mb-12 max-w-2xl">
              Deploy TextQL's LLMs directly in your Virtual Private Cloud. 
              Your data never leaves your infrastructure.
            </Text>
          </div>

          {/* Right Content - Cloud Providers */}
          <div className="space-y-8">
            <Text variant="header" className="mt-20 text-4xl font-extralight text-[#B8D8D0] mb-8">
              Deployed Into Your Cloud
            </Text>
            
            {[
              { name: 'AWS', logo: '/images/logos/aws-white.png' },
              { name: 'Azure', logo: '/images/logos/azure-white.png' },
              { name: 'GCP', logo: '/images/logos/gcp-white.png' }
            ].map((provider) => (
              <div 
                key={provider.name}
                className="p-12 border border-[#B8D8D0]/10 backdrop-blur-sm 
                  flex items-center gap-8 hover:border-[#B8D8D0]/20 transition-all
                  group"
              >
                <img 
                  src={provider.logo}
                  alt={provider.name}
                  className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                />
                <Text className="text-[#B8D8D0] text-2xl">{provider.name}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}