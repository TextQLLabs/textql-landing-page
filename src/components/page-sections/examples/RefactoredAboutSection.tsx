import React from 'react';
import { Section } from '../../ui/Section.enhanced';

/**
 * Example of About page sections refactored to use Section component
 * Shows narrow content sections and different background patterns
 */

// Hero section with narrow width
export function RefactoredAboutHero() {
  return (
    <Section
      variant="narrow"
      height="min-screen"
      paddingTop="navbar"
      paddingBottom="lg"
      background="secondary"
      className="flex items-center"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          We're Building the Future of Data Analytics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          TextQL was founded with a simple mission: make data analysis accessible to everyone, 
          regardless of technical expertise. We believe that insights should be instant, 
          intuitive, and impactful.
        </p>
      </div>
    </Section>
  );
}

// Mission section with alternating background
export function RefactoredMissionSection() {
  return (
    <Section
      variant="content"
      padding="lg"
      background="primary"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              We're on a mission to democratize data analysis. Too many valuable insights 
              remain locked away in databases, accessible only to those with specialized skills.
            </p>
            <p>
              TextQL breaks down these barriers by providing an intuitive interface that 
              transforms complex queries into simple conversations. Whether you're a data 
              scientist or a business analyst, our platform adapts to your needs.
            </p>
            <p>
              By combining cutting-edge AI with robust data infrastructure, we're creating 
              tools that not only analyze data but understand context, suggest insights, 
              and learn from your patterns.
            </p>
          </div>
        </div>
        <div className="relative h-96 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-lg">
          {/* Placeholder for image or graphic */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">Mission Graphic</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Values section with cards
export function RefactoredValuesSection() {
  return (
    <Section
      variant="content"
      padding="xl"
      background="secondary"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          These principles guide every decision we make and every line of code we write.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <value.icon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Team section with narrow width
export function RefactoredTeamSection() {
  return (
    <Section
      variant="narrower"
      padding="lg"
      background="primary"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Passionate people building tools that make a difference.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <h4 className="font-semibold">{member.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// Sample data
const values = [
  {
    icon: () => <div className="w-8 h-8 bg-green-600 rounded" />,
    title: 'Simplicity First',
    description: 'Complex problems don\'t require complex solutions. We obsess over making the sophisticated simple.',
  },
  {
    icon: () => <div className="w-8 h-8 bg-green-600 rounded" />,
    title: 'Data Privacy',
    description: 'Your data is yours. We implement industry-leading security and never compromise on privacy.',
  },
  {
    icon: () => <div className="w-8 h-8 bg-green-600 rounded" />,
    title: 'Continuous Innovation',
    description: 'The world of data is evolving rapidly. We stay ahead by constantly learning and improving.',
  },
];

const team = [
  { name: 'Sarah Chen', role: 'CEO & Co-founder' },
  { name: 'Michael Torres', role: 'CTO & Co-founder' },
  { name: 'Emily Johnson', role: 'Head of Product' },
  { name: 'David Kim', role: 'Head of Engineering' },
  { name: 'Lisa Anderson', role: 'Head of Design' },
  { name: 'James Wilson', role: 'Head of Sales' },
];