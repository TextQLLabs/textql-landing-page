import { useState } from 'react';
import { WaveBackground } from '../../animations';
import { Button, Input, Text } from '../../ui';
import { WaitlistForm } from './WaitlistForm';
import { SuccessNotification } from './SuccessNotification';

const events = {
  'New York': [
    {
      title: 'AI in Finance Roundtable',
      host: 'Hosted by Sarah Chen',
      date: 'March 28, 2024',
      time: '6:00 PM EST',
      location: 'Rockefeller Center'
    },
    {
      title: 'Enterprise AI Meetup',
      host: 'Hosted by James Smith',
      date: 'April 15, 2024',
      time: '7:00 PM EST',
      location: 'WeWork Bryant Park'
    },
    {
      title: 'Data Science Happy Hour',
      host: 'Hosted by Mark Thompson',
      date: 'May 2, 2024',
      time: '5:30 PM EST',
      location: 'Flatiron District'
    }
  ],
  'San Francisco': [
    {
      title: 'Tech Founders Dinner',
      host: 'Hosted by Ethan Ding',
      date: 'April 5, 2024',
      time: '7:00 PM PST',
      location: 'SOMA District'
    },
    {
      title: 'AI Ethics Workshop',
      host: 'Hosted by Lisa Park',
      date: 'April 20, 2024',
      time: '6:30 PM PST',
      location: 'Mission District'
    },
    {
      title: 'ML Engineering Social',
      host: 'Hosted by David Lee',
      date: 'May 10, 2024',
      time: '6:00 PM PST',
      location: 'Hayes Valley'
    }
  ]
};

export function EventsHero() {
  const [email, setEmail] = useState('');
  const [activeCity, setActiveCity] = useState('New York');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit email in background
      fetch('https://7c7613ab8c59.ngrok.app/api/event/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      // Optimistically open modal
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email.trim()) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      <div className="relative z-10 flex items-center min-h-screen px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,600px] gap-16 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-8xl font-extralight text-[#B8D8D0] mb-6">
                Standard Social
              </h1>
              <h2 className="text-3xl font-light text-[#B8D8D0] mb-8">
                A private dining experience for
                <br />
                enterprise data leaders
              </h2>
              <p className="text-xl text-[#729E8C] mb-12">
                An invite-only dinner for top data executives to share candid insights and build connections-without the noise of conferences or sales pitches.
              </p>

              {/* Waitlist Form */}
              <form onSubmit={handleSubmit} className="flex gap-4 max-w-md relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  variant="primary"
                >
                  Join waitlist
                </Button>
              </form>
            </div>

            {/* Right Content - Events Table */}
            <div className="bg-[#0A1F1C]/40 backdrop-blur-sm border border-[#B8D8D0]/10 p-8">
              {/* City Tabs */}
              <div className="flex gap-8 mb-8 border-b border-[#B8D8D0]/10">
                {Object.keys(events).map((city) => (
                  <button
                    key={city}
                    onClick={() => setActiveCity(city)}
                    className={`pb-4 text-lg transition-colors relative ${
                      activeCity === city 
                        ? 'text-[#B8D8D0]' 
                        : 'text-[#B8D8D0]/60 hover:text-[#B8D8D0]/80'
                    }`}
                  >
                    {city}
                    {activeCity === city && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8D8D0]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Events List */}
              <div className="space-y-8">
                {events[activeCity as keyof typeof events].map((event, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <Text className="text-lg text-[#B8D8D0]">
                        {event.title} • {event.host}
                      </Text>
                    </div>
                    <Text color="muted">
                      {event.date} • {event.time} • {event.location}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEmail={email}
      />
    </section>
  );
}