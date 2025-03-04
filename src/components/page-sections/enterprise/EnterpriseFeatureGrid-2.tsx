import { Shield } from 'lucide-react';
import { Badge, Text } from '../../ui';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface EnterpriseFeatureGrid2Props {
  theme?: 'dark' | 'light';
}

const certificationFeatures: Feature[] = [
  {
    icon: Shield,
    title: 'SOC 2 Type II',
    description: 'Security & privacy controls for service organizations'
  },
  {
    icon: Shield,
    title: 'HIPAA',
    description: 'Healthcare data protection and privacy compliance'
  },
  {
    icon: Shield,
    title: 'GDPR',
    description: 'European Union data privacy and protection standards'
  },
  {
    icon: Shield,
    title: 'ISO 27001',
    description: 'International information security management'
  }
];

const auditFeatures: Feature[] = [
  {
    icon: Shield,
    title: 'Annual Security Audits',
    description: 'Comprehensive third-party security assessments'
  },
  {
    icon: Shield,
    title: 'Penetration Testing',
    description: 'Regular security testing and vulnerability assessments'
  },
  {
    icon: Shield,
    title: 'Compliance Monitoring',
    description: 'Continuous automated compliance checks and reporting'
  },
  {
    icon: Shield,
    title: 'Privacy Assessments',
    description: 'Regular data privacy impact analysis and reviews'
  }
];

export function EnterpriseFeatureGrid2({ theme = 'dark' }: EnterpriseFeatureGrid2Props) {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const borderColor = theme === 'dark' ? 'border-[#B8D8D0]/10' : 'border-[#2A3B35]/10';
  const bgColor = theme === 'dark' ? 'bg-[#0A1F1C]/10' : 'bg-[#F0F5F3]';

  return (
    <div className="space-y-24">
      {/* Certifications Section */}
      <div className="space-y-12">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <Badge 
            variant="outline"
            theme={theme} 
            className="text-lg px-6 py-2"
          >
            Compliance & Certifications
          </Badge>

          <div className="space-y-4">
            <h2 className={`text-7xl font-extralight ${textColor}`}>
              Industry-Leading Standards
            </h2>
            
            <Text 
              color="muted" 
              theme={theme} 
              className="text-2xl font-light max-w-3xl mx-auto"
            >
              Certified compliance with major security frameworks and regulations
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {certificationFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`
                p-8 border ${borderColor} ${bgColor}
                backdrop-blur-sm
                hover:border-opacity-50 transition-all
                group
              `}
            >
              <div className="space-y-6">
                <feature.icon className={`w-8 h-8 ${textColor}`} />
                <Text 
                  theme={theme} 
                  className="text-xl font-medium"
                >
                  {feature.title}
                </Text>
                <Text 
                  color="muted" 
                  theme={theme}
                >
                  {feature.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Features Section */}
      <div className="space-y-12">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className={`text-7xl font-extralight ${textColor}`}>
            Continuous Security
          </h2>
          
          <Text 
            color="muted" 
            theme={theme} 
            className="text-2xl font-light max-w-3xl mx-auto"
          >
            Comprehensive security measures and regular assessments
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {auditFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`
                p-8 border ${borderColor} ${bgColor}
                backdrop-blur-sm
                hover:border-opacity-50 transition-all
                group
              `}
            >
              <div className="space-y-6">
                <feature.icon className={`w-8 h-8 ${textColor}`} />
                <Text 
                  theme={theme} 
                  className="text-xl font-medium"
                >
                  {feature.title}
                </Text>
                <Text 
                  color="muted" 
                  theme={theme}
                >
                  {feature.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}