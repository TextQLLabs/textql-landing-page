import { useState } from 'react';
import { ArrowRight, Users, Clock, CheckCircle, Calendar } from 'lucide-react';
import { Button, Text, Card, Modal } from '../../ui';
import { WaveBackground } from '../../animations';
import { MeetingForm } from './MeetingForm';

const meetingOptions = [
  {
    id: 'strategy',
    title: '1:1 Strategy Discussion',
    description: "Let's discuss what's top of mind for you, and how TextQL solves the most complex Enterprise data challenges",
    duration: '30 min',
    icon: Clock,
    attendees: 'Your team is welcome',
    hasDemo: true
  },
  {
    id: 'dinner-june2',
    title: 'Private Dinner - June 2',
    description: 'Join us for an intimate dinner with fellow data leaders in San Francisco. Location shared upon acceptance.',
    duration: '2-3 hours',
    icon: Users,
    date: 'June 2, 2024'
  },
  {
    id: 'dinner-june3',
    title: 'Private Dinner - June 3',
    description: 'Join us for an intimate dinner with fellow data leaders in San Francisco. Location shared upon acceptance.',
    duration: '2-3 hours',
    icon: Users,
    date: 'June 3, 2024'
  }
];

export function MeetHero() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [showDemo, setShowDemo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(optionId)) {
        newSet.delete(optionId);
        if (optionId === 'strategy') {
          setShowDemo(false);
        }
      } else {
        newSet.add(optionId);
      }
      return newSet;
    });
  };

  const isStrategySelected = selectedOptions.has('strategy');

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Stronger gradient effect */}
              <h1 className="text-7xl font-extralight mb-6 bg-gradient-to-r from-[#B8D8D0] via-[#B8D8D0] via-[#729E8C] to-[#729E8C] bg-clip-text text-transparent">
                Meet with our founders 1:1
              </h1>
              <div className="max-w-xl text-[#B8D8D0]">
                <div className="flex items-center gap-4">
                  <div className="w-[2px] h-8 bg-[#B8D8D0]/40" />
                  <Text className="text-xl">
                    Meet the founders in a private session.
                  </Text>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-[2px] h-8 bg-[#B8D8D0]/40" />
                  <Text className="text-xl">
                    Fresh off a new funding round—announcement coming soon.
                  </Text>
                </div>
              </div>
            </div>

            {/* Right Content - Meeting Options */}
            <div className="space-y-4">
              {/* Selection Header */}
              <Text color="muted" className="text-sm font-medium">
                Select all meeting options that interest you
              </Text>

              {meetingOptions.map((option) => (
                <div key={option.id}>
                  <Card
                    className={`
                      transition-all cursor-pointer group relative overflow-hidden
                      ${selectedOptions.has(option.id) 
                        ? 'scale-[1.02] ring-2 ring-[#B8D8D0]' 
                        : 'hover:scale-[1.01]'
                      }
                    `}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    {/* Gradient background effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-[#B8D8D0]/5 to-transparent
                      transition-opacity duration-300
                      ${selectedOptions.has(option.id) ? 'opacity-100' : 'opacity-0'}
                    `} />
                    
                    <div className="relative p-2">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Text 
                            variant="header" 
                            className={`text-xl mb-2 transition-colors ${
                              selectedOptions.has(option.id) ? 'text-[#B8D8D0]' : ''
                            }`}
                          >
                            {option.title}
                          </Text>
                          <Text 
                            color="muted" 
                            className={`text-sm transition-colors ${
                              selectedOptions.has(option.id) ? 'text-[#B8D8D0]' : ''
                            }`}
                          >
                            {option.description}
                          </Text>
                        </div>
                        <CheckCircle 
                          className={`
                            w-6 h-6 transition-all
                            ${selectedOptions.has(option.id)
                              ? 'text-[#B8D8D0] scale-110' 
                              : 'text-[#B8D8D0]/20'
                            }
                          `} 
                        />
                      </div>
                      
                      <div className="flex items-center gap-4 text-[#729E8C]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs">{option.duration}</span>
                        </div>
                        {option.attendees && (
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span className="text-xs">{option.attendees}</span>
                          </div>
                        )}
                        {option.date && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <div className="text-xs">
                              {option.date}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Demo Checkbox - Slides down when strategy is selected */}
                  {option.hasDemo && (
                    <div 
                      className={`
                        pl-8 flex items-center gap-2 transition-all duration-300 origin-top
                        ${isStrategySelected 
                          ? 'cursor-pointer opacity-100 max-h-20 transform translate-y-2' 
                          : 'opacity-0 max-h-0 transform -translate-y-2 pointer-events-none'
                        }
                      `}
                      onClick={() => isStrategySelected && setShowDemo(!showDemo)}
                    >
                      <CheckCircle 
                        className={`
                          w-4 h-4 transition-all
                          ${showDemo && isStrategySelected
                            ? 'text-[#B8D8D0]' 
                            : 'text-[#B8D8D0]/50'
                          }
                        `}
                      />
                      <Text 
                        className={`
                          text-md transition-colors
                          ${showDemo && isStrategySelected ? 'text-[#B8D8D0]' : 'text-[#B8D8D0]/50'}
                        `}
                      >
                        I'm interested in seeing a customized demo based on my data
                      </Text>
                    </div>
                  )}
                </div>
              ))}

              {/* Apply Button - Always visible */}
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => setShowModal(true)}
                disabled={selectedOptions.size === 0}
                className={`
                  group w-full relative overflow-hidden
                  ${selectedOptions.size === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                  }
                `}
              >
                {/* Button gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B8D8D0] via-[#B8D8D0] to-[#729E8C] opacity-20" />
                <span className="relative flex-row flex">
                  Apply {selectedOptions.size > 0 && `(${selectedOptions.size} selected)`}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Schedule Your Meetings"
      >
        <MeetingForm
          selectedOptions={Array.from(selectedOptions)}
          showDemo={showDemo && isStrategySelected}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </section>
  );
}