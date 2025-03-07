import { Badge } from '../../ui';

export function IntegrationsHero() {
  return (
    <div className="relative overflow-hidden min-h-[500px] bg-black">
      {/* Content */}
      <div className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <Badge 
            variant="outline"
            theme="dark" 
            className="text-lg px-6 py-2 mb-8"
          >
            Deploy agents across your data stack
          </Badge>
          
          <h1 className="text-6xl font-extralight mb-10 text-[#B8D8D0]">
            TextQL Connectors
          </h1>
          
          <p className="text-2xl text-[#729E8C] font-light max-w-3xl mx-auto">
            Seamlessly connect TextQL to your data warehouses, visualization tools, and analytics
            platforms to enable natural language querying across your entire data ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
} 