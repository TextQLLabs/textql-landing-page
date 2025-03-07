import { useState } from 'react';
import { WaveBackground } from '../../animations';
import { Button, Input } from '../../ui';
import { WaitlistForm } from './WaitlistForm';

export function EventsHero() {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit email in background
      fetch('https://social.ahaym.workers.dev/signup', {
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
          <div className="gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-2xl mx-auto text-center">
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
              <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto relative">
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