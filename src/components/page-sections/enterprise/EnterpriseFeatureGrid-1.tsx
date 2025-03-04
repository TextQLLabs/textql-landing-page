import { Shield, Lock, FileCheck, Users, Server, Bell } from 'lucide-react';
import { Badge, Text } from '../../ui';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface EnterpriseFeatureGrid1Props {
  theme?: 'dark' | 'light';
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'Data encrypted in transit and at rest using AES-256'
  },
  {
    icon: Lock,
    title: 'Access Controls',
    description: 'Role-based access control with SSO integration'
  },
  {
    icon: FileCheck,
    title: 'Audit Logging',
    description: 'Detailed audit trails for all system activities'
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Granular user permissions and team controls'
  },
  {
    icon: Server,
    title: 'Network Security',
    description: 'VPC peering and private endpoints'
  },
  {
    icon: Bell,
    title: 'Monitoring',
    description: '24/7 security monitoring and alerts'
  }
];

export function EnterpriseFeatureGrid1({ theme = 'dark' }: EnterpriseFeatureGrid1Props) {
  const textColor = theme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]';
  const borderColor = theme === 'dark' ? 'border-[#B8D8D0]/10' : 'border-[#2A3B35]/10';
  const bgColor = theme === 'dark' ? 'bg-[#0A1F1C]/10' : 'bg-[#F0F5F3]';

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <Badge 
          variant="outline"
          theme={theme} 
          className="text-lg px-6 py-2"
        >
          Enterprise Security
        </Badge>

        <div className="space-y-4">
          <h2 className={`text-7xl font-extralight ${textColor}`}>
            World-Class Security
          </h2>
          
          <Text 
            color="muted" 
            theme={theme} 
            className="text-2xl font-light max-w-3xl mx-auto"
          >
            Enterprise-grade security features protect your data at every layer
          </Text>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
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
  );
}