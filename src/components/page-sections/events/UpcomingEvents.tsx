import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button, Text } from '../../ui';
import { upcomingEvents } from '../../../data/events';

export function UpcomingEvents() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <Text variant="header" theme="light" className="text-4xl mb-4">
            Upcoming Events
          </Text>
          <Text theme="light" color="muted" className="text-xl">
            Meet our team and learn about TextQL in person
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="group relative bg-[#F0F5F3] p-8 flex flex-col"
            >
              {/* Event Type Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-[#2A3B35]/10 text-[#2A3B35]">
                  {event.type}
                </span>
              </div>

              {/* Event Details */}
              <h3 className="text-2xl font-light text-[#2A3B35] mb-4">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-[#4A665C] mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{event.date}</span>
              </div>

              <div className="flex items-center gap-2 text-[#4A665C] mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{event.location}</span>
              </div>

              <Text theme="light" color="muted" className="mb-8 flex-grow">
                {event.description}
              </Text>

              {/* CTA Button */}
              <a 
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto"
              >
                <Button 
                  variant="primary"
                  theme="light"
                  className="w-full group"
                >
                  Register Now
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}