import React from 'react';
import { Section } from '../../ui/Section.enhanced';
import { Button } from '../../ui/Button';
import { ArrowRight } from 'lucide-react';

/**
 * Example of HomeHero refactored to use the Section component
 * 
 * Before: Used direct className with max-w-7xl, custom padding, and manual theme handling
 * After: Uses Section component with consistent patterns
 */
export function RefactoredHomeHero() {
  return (
    <Section
      variant="wide"
      height="hero"
      padding="hero"
      hasNavbarOffset
      background="primary"
      overflow="hidden"
      animate
      dataTestId="home-hero"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Modern Data Analytics
            <span className="text-green-600"> Made Simple</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your data into actionable insights with our powerful analytics platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <feature.icon className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const features = [
  {
    icon: () => <div className="w-8 h-8 bg-green-600 rounded" />,
    title: 'Real-time Analytics',
    description: 'Monitor your data as it happens with live dashboards.',
  },
  {
    icon: () => <div className="w-8 h-8 bg-green-600 rounded" />,
    title: 'AI-Powered Insights',
    description: 'Let machine learning uncover hidden patterns in your data.',
  },
  {
    icon: () => <div className="w-8 h-8 bg-green-600 rounded" />,
    title: 'Seamless Integration',
    description: 'Connect to your existing tools and workflows effortlessly.',
  },
];