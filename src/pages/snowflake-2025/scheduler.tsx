import { useEffect, useRef } from 'react';
import { WaveBackground } from '../../components/animations';
import { SEO } from '../../components/SEO';
import { Carousel } from '../../components/ui';

declare global {
  interface Window {
    tf?: any;
  }
}

const logos = [
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/88a86778-8d48-48a8-4404-a8dcde5c4600/public', alt: 'Redshift' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/8a216245-435b-4348-4b55-da402a698f00/public', alt: 'Snowflake' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/4dc2884d-6b94-49ab-1136-ab6fdc1d7c00/public', alt: 'Databricks' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/8a1285d4-97d4-4e98-b093-99300165cd00/public', alt: 'Power BI' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/fba5956d-3ad3-492a-8943-4fa48d463e00/public', alt: 'Tableau' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/ef3cd838-e421-4c6f-80d6-ff49d1c0ab00/public', alt: 'dbt' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/d79a1e91-1cd4-436c-db77-0d71ca6b2c00/public', alt: 'Salesforce' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/5d2c46cb-6a30-42a8-8132-0de8d3b1f600/public', alt: 'Azure' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/2e390190-cd5c-4e49-4dd4-647551ac1b00/public', alt: 'AWS' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/16d6a59b-1326-4bc5-9814-9b1ba007df00/public', alt: 'Google Cloud' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/fbf6cea7-3542-471d-6bb5-4a83ff53bc00/public', alt: 'Looker' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/71a636eb-eccd-4803-ee49-b73f5fa8d400/public', alt: 'Teams' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/d3e749b8-22b1-4e2f-a5af-f464174f7700/public', alt: 'Slack' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/ced403a9-d4a7-4605-2c2e-f074c3583500/public', alt: 'Alation' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/ae190ee0-b1d2-4926-3533-60907a475500/public', alt: 'SAP' },
  { src: 'https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/0915f386-644d-40ee-e1c7-ff814a3f6b00/public', alt: 'Oracle' }
];

// Days for the schedule grid
const days = [
  { day: "Monday", date: "May 19" },
  { day: "Tuesday", date: "May 20" },
  { day: "Wednesday", date: "May 21" }
];

// Session types
type SessionType = "industry" | "flex" | "all" | "executive";

// Schedule data with specific sessions for each day
const scheduleData = {
  monday: [
    { time: "10:00 AM", title: "Insurance Deep Dive", type: "industry" as SessionType },
    { time: "10:45 AM", title: "Healthcare Deep Dive", type: "industry" as SessionType },
    { time: "11:30 AM", title: "Financial Services Deep Dive", type: "industry" as SessionType },
    { time: "12:15 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "1:00 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "1:45 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "2:30-4:00 PM", title: "All Industries Deep Dive", type: "all" as SessionType, note: "(All Industries)" },
    { time: "4:00-4:45 PM", title: "Executive Deep Dive", type: "executive" as SessionType, note: "(Executive 1:1)" },
    { time: "4:45 PM", title: "Flex/Custom Session", type: "flex" as SessionType }
  ],
  tuesday: [
    { time: "10:00 AM", title: "Manufacturing Deep Dive", type: "industry" as SessionType },
    { time: "10:45 AM", title: "CPG Deep Dive", type: "industry" as SessionType },
    { time: "11:30 AM", title: "Logistics Deep Dive", type: "industry" as SessionType },
    { time: "12:15 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "1:00 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "1:45 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "2:30-4:00 PM", title: "All Industries Deep Dive", type: "all" as SessionType, note: "(All Industries)" },
    { time: "4:00-4:45 PM", title: "Executive Deep Dive", type: "executive" as SessionType, note: "(Executive 1:1)" },
    { time: "4:45 PM", title: "Flex/Custom Session", type: "flex" as SessionType }
  ],
  wednesday: [
    // Wednesday is open for custom sessions
    { time: "10:00 AM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "10:45 AM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "11:30 AM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "12:15 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "1:00 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "1:45 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "2:30 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "3:15 PM", title: "Flex/Custom Session", type: "flex" as SessionType },
    { time: "4:00 PM", title: "Flex/Custom Session", type: "flex" as SessionType }
  ]
};

// Calendar appointment URL
const calendarUrl = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3wxLWZbPsMP_iY1-_qAXKz3CN5qbe7t42d7FVeu_IlekHqhJQjh3twQrS4lu0s6S5pgkAZdYBj?gv=true&dates=20250521T160000Z/20250521T170000Z";

export default function SchedulerPage() {
  // Function to get the background color based on session type
  const getSessionStyles = (type: SessionType) => {
    switch(type) {
      case "industry":
        return {
          bg: "bg-[#729E8C]/20",
          border: "border-[#729E8C]/40",
          hoverBg: "hover:bg-[#729E8C]/30"
        };
      case "flex":
        return {
          bg: "bg-[#B8D8D0]/10",
          border: "border-[#B8D8D0]/30",
          hoverBg: "hover:bg-[#B8D8D0]/20" 
        };
      case "all":
        return {
          bg: "bg-[#90BBAD]/25",
          border: "border-[#90BBAD]/50",
          hoverBg: "hover:bg-[#90BBAD]/35"
        };
      case "executive":
        return {
          bg: "bg-[#608C7E]/30",
          border: "border-[#608C7E]/60",
          hoverBg: "hover:bg-[#608C7E]/40"
        };
      default:
        return {
          bg: "bg-[#B8D8D0]/10",
          border: "border-[#B8D8D0]/30",
          hoverBg: "hover:bg-[#B8D8D0]/20"
        };
    }
  };

  return (
    <main className="relative overflow-x-hidden min-h-screen">
      <SEO
        title="Scheduler | TextQL"
        description="TextQL Snowflake Summit 2025 Meeting Scheduler"
        canonical="https://textql.com/snowflake-2025/scheduler"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <WaveBackground />
      </div>
      
      <div className="relative w-full min-h-screen px-12 flex flex-col">
        {/* Hero Text Container - top */}
        <div className="mt-52 mb-16 pl-20">
          <h1 className="text-5xl font-light text-[#B8D8D0] mb-2">
            Meet the founders of TextQL.
          </h1>
          <p className="text-sm text-[#B8D8D0]/80">
            Private meeting hosted at the Palace Hotel, San Francisco.
          </p>
        </div>
        
        {/* Content Container - video and schedule side by side */}
        <div className="flex items-start gap-8 px-8">
          {/* Video area - left side */}
          <div className="w-[45%] flex items-center justify-center">
            <div className="w-[85%]">
              <video 
                className="w-full rounded-lg shadow-lg" 
                controls
                autoPlay
                muted
                loop
              >
                <source src="/videos/snowflake-meeting.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* Time slot grid - right side */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-3xl bg-black/20 backdrop-blur-sm rounded-lg p-4 overflow-y-auto max-h-[60vh] scale-75 origin-top-right">
              <h2 className="text-xl font-light text-[#B8D8D0] mb-4">
                Select a Meeting Time
              </h2>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#729E8C]/20 border border-[#729E8C]/40 rounded"></div>
                  <span className="text-[11px] text-[#B8D8D0]/80">Industry-Specific</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#B8D8D0]/10 border border-[#B8D8D0]/30 rounded"></div>
                  <span className="text-[11px] text-[#B8D8D0]/80">Flex/Custom</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#90BBAD]/25 border border-[#90BBAD]/50 rounded"></div>
                  <span className="text-[11px] text-[#B8D8D0]/80">All Industries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-[#608C7E]/30 border border-[#608C7E]/60 rounded"></div>
                  <span className="text-[11px] text-[#B8D8D0]/80">Executive</span>
                </div>
              </div>
              
              {/* Schedule Grid */}
              <div className="grid grid-cols-3 gap-x-3">
                {/* Column Headers - Days */}
                {days.map((day, index) => (
                  <div key={`day-${index}`} className="text-center mb-3">
                    <h3 className="text-[#B8D8D0] text-sm font-medium">{day.day}</h3>
                    <p className="text-[#B8D8D0]/70 text-xs">{day.date}, 2025</p>
                  </div>
                ))}
                
                {/* Time Slots */}
                <div className="space-y-1.5">
                  {scheduleData.monday.map((slot, index) => {
                    const styles = getSessionStyles(slot.type);
                    return (
                      <a 
                        key={`monday-slot-${index}`}
                        href={calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          block py-2 px-3 
                          ${styles.bg} ${styles.border} ${styles.hoverBg}
                          border rounded-md transition-all 
                          text-xs text-[#B8D8D0] 
                          hover:shadow-md
                        `}
                      >
                        <div className="font-medium mb-0.5">{slot.time} {slot.note && <span className="text-[10px] opacity-70">{slot.note}</span>}</div>
                        <div className="text-[#B8D8D0]/80 text-[11px]">{slot.title}</div>
                      </a>
                    );
                  })}
                </div>
                
                <div className="space-y-1.5">
                  {scheduleData.tuesday.map((slot, index) => {
                    const styles = getSessionStyles(slot.type);
                    return (
                      <a 
                        key={`tuesday-slot-${index}`}
                        href={calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          block py-2 px-3 
                          ${styles.bg} ${styles.border} ${styles.hoverBg}
                          border rounded-md transition-all 
                          text-xs text-[#B8D8D0] 
                          hover:shadow-md
                        `}
                      >
                        <div className="font-medium mb-0.5">{slot.time} {slot.note && <span className="text-[10px] opacity-70">{slot.note}</span>}</div>
                        <div className="text-[#B8D8D0]/80 text-[11px]">{slot.title}</div>
                      </a>
                    );
                  })}
                </div>
                
                <div className="space-y-1.5">
                  {scheduleData.wednesday.map((slot, index) => {
                    const styles = getSessionStyles(slot.type);
                    return (
                      <a 
                        key={`wednesday-slot-${index}`}
                        href={calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          block py-2 px-3 
                          ${styles.bg} ${styles.border} ${styles.hoverBg}
                          border rounded-md transition-all 
                          text-xs text-[#B8D8D0] 
                          hover:shadow-md
                        `}
                      >
                        <div className="font-medium mb-0.5">{slot.time}</div>
                        <div className="text-[#B8D8D0]/80 text-[11px]">{slot.title}</div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo Carousel and Venue Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm py-6">
        <div className="mx-auto max-w-7xl px-6">
          <Carousel items={logos} speed={0.05} />
          
          {/* Venue Information */}
          <div className="mt-6 border-t border-[#B8D8D0]/20 pt-4">
            <h3 className="text-2xl font-light text-[#B8D8D0] mb-2">
              Venue Address (Strategy Discussion)
            </h3>
            <p className="text-xs text-[#B8D8D0]/80">
              Palace Hotel, a Luxury Collection Hotel, San Francisco<br />
              2 New Montgomery St, San Francisco, CA 94105
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 