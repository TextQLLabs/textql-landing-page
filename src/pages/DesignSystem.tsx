import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Button, Text, Badge, Card } from '../components/ui';
import { ArrowRight } from 'lucide-react';

// Define types for the components
type ComponentItem = {
  name: string;
  component?: React.ReactNode;
  preview?: string;
};

type Section = {
  title: string;
  components: ComponentItem[];
};

export default function DesignSystem() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sections: Section[] = [
    {
      title: 'UI Components',
      components: [
        { name: 'Button', component: <Button>Example Button</Button> },
        { name: 'Badge', component: <Badge>Example Badge</Badge> },
        { name: 'Card', component: <Card>Example Card Content</Card> },
        { name: 'Text', component: <Text>Example Text Component</Text> }
      ]
    },
    {
      title: 'Layout Components',
      components: [
        { name: 'Navbar', preview: 'Navigation bar component' },
        { name: 'Footer', preview: 'Footer component' },
        { name: 'Layout', preview: 'Main layout wrapper' }
      ]
    },
    {
      title: 'Feature Components',
      components: [
        { name: 'HeroSection', preview: 'Hero section with background' },
        { name: 'CTASection', preview: 'Call to action section' },
        { name: 'FeaturesSection', preview: 'Features grid layout' },
        { name: 'BlogSection', preview: 'Blog posts grid' }
      ]
    },
    {
      title: 'Form Components',
      components: [
        { name: 'DemoRequestForm', preview: 'Demo request form' },
        { name: 'Input', preview: 'Input field component' },
        { name: 'Select', preview: 'Select dropdown component' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Text variant="header" className="text-4xl mb-4">Design System</Text>
            <Text color="muted">A comprehensive list of all components used in the TextQL application.</Text>
          </div>

          <div className="grid grid-cols-[300px,1fr] gap-8">
            {/* Sidebar Navigation */}
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.title}>
                  <button
                    onClick={() => setSelectedSection(section.title)}
                    className={`
                      w-full text-left px-4 py-2 rounded
                      ${selectedSection === section.title
                        ? 'bg-[#B8D8D0]/10 text-[#B8D8D0]'
                        : 'text-[#B8D8D0]/60 hover:text-[#B8D8D0]/80'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{section.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Component Display */}
            <div className="bg-[#0A1F1C]/40 border border-[#B8D8D0]/10 p-8 rounded-lg">
              {selectedSection ? (
                <div>
                  <Text variant="header" className="text-2xl mb-8">{selectedSection}</Text>
                  <div className="grid gap-8">
                    {sections
                      .find(section => section.title === selectedSection)
                      ?.components.map((item) => (
                        <div
                          key={item.name}
                          className="border border-[#B8D8D0]/10 p-6 rounded-lg space-y-4"
                        >
                          <Text className="font-medium">{item.name}</Text>
                          <div className="pt-4">
                            {item.component || (
                              <Text color="muted">{item.preview}</Text>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <Text color="muted">Select a section to view components</Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}