import { EventsHero } from '../components/page-sections/events';
import { SEO } from '../components/SEO';

export default function Events() {
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="Events | TextQL"
        description="Join TextQL at upcoming events or watch past presentations. Learn about AI-powered data analysis from our experts."
        canonical="https://textql.com/events/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <EventsHero />
    </div>
  );
}