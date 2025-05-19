import { useState } from 'react';
import { Play, Calendar } from 'lucide-react';
import { Text } from '../../ui';
import { pastEvents } from '../../../data/events';

export function EventsList() {
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  
  const years = [...new Set(pastEvents.map(event => event.year))];
  const filteredEvents = pastEvents.filter(event => event.year === selectedYear);

  return (
    <section className="bg-[#F0F5F3] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <Text variant="header" theme="light" className="text-4xl mb-4">
            Past Events
          </Text>
          <Text theme="light" color="muted" className="text-xl">
            Watch recordings of our previous presentations and events
          </Text>
        </div>

        {/* Year Filter */}
        <div className="flex justify-center gap-4 mb-16">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`
                px-6 py-2 text-lg transition-colors
                ${selectedYear === year
                  ? 'bg-[#2A3B35] text-white'
                  : 'bg-white text-[#2A3B35] hover:bg-[#2A3B35]/5'
                }
              `}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.id}
              className="bg-white p-8 flex flex-col"
            >
              {/* Event Type & Date */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-[#2A3B35]/60">
                  {event.type}
                </span>
                <div className="flex items-center gap-2 text-[#4A665C]">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{event.date}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-light text-[#2A3B35] mb-4">
                {event.title}
              </h3>
              
              <Text theme="light" color="muted" className="mb-6">
                {event.description}
              </Text>

              {/* Recording Link */}
              {event.recordingUrl && (
                <a
                  href={event.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#2A3B35] hover:text-[#4A665C] transition-colors mt-auto group"
                >
                  <Play className="w-5 h-5" />
                  <span className="font-medium">Watch Recording</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}