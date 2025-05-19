import { MeetHero } from '../components/page-sections/meet';
import { SEO } from '../components/SEO';

export default function Meet() {
  return (
    <div className="min-h-screen bg-black">
      <SEO 
        title="Meet With Us | TextQL"
        description="Schedule a meeting with TextQL's team to learn how we can help transform your data operations with AI."
        canonical="https://textql.com/meet"
        ogImage="https://textql.com/social-preview.png"
      />
      
      <MeetHero />
    </div>
  );
}