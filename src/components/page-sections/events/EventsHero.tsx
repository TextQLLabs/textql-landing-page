import { useState, useEffect } from 'react';
import { WaveBackground } from '../../animations';
import { Button, Input, Text } from '../../ui';
import { WaitlistForm } from './WaitlistForm';

interface Event {
  name: string;
  description: string;
  time: string;
  formattedTime: string;
  timezone: string;
  city: string;
}

export function EventsHero() {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://7c7613ab8c59.ngrok.app/api/event');
        const data = await response.json();
        if (data.success) {
          setEvents(data.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

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

  // Format date to be human readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Trim description to 70 characters
  const trimDescription = (description: string) => {
    if (description.length <= 70) return description;
    return `${description.substring(0, 70)}...`;
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      <div className="relative z-10 flex items-center min-h-screen px-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className={`${events.length > 0 ? 'grid grid-cols-1 lg:grid-cols-[1fr,600px]' : ''} gap-16 items-center`}>
            {/* Left Content */}
            <div className={events.length === 0 ? 'max-w-2xl mx-auto text-center' : ''}>
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
              <form onSubmit={handleSubmit} className={`flex gap-4 ${events.length === 0 ? 'max-w-md mx-auto' : 'max-w-md'} relative`}>
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

            {/* Right Content - Events List */}
            {events && events.length > 0 && (
            <div className="bg-[#0A1F1C]/40 backdrop-blur-sm border border-[#B8D8D0]/10 p-8">
              <div className="border-b border-[#B8D8D0]/20 pb-4 mb-8">
                <Text variant="header" className="text-2xl font-light text-[#B8D8D0]">
                  Events
                </Text>
              </div>
              <div className="space-y-8">
                {events.map((event, index) => (
                  <div key={index} className="space-y-2">
                    <Text className="text-lg font-medium text-[#B8D8D0]">
                      {event.name}
                    </Text>
                    {event.description && (
                      <Text color="muted" className="text-sm">
                        {trimDescription(event.description)}
                      </Text>
                    )}
                    <Text color="muted" className="text-sm">
                      {formatDate(event.time)} • {event.formattedTime} {event.city && `• ${event.city}`}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
            )}
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