import { ThemeTestComponent } from '../components/ThemeTestComponent';
import { SEO } from '../components/SEO';

export default function ThemeTest() {
  return (
    <>
      <SEO 
        title="Theme Test" 
        description="Test page for UI component theme system"
        noIndex={true}
      />
      <ThemeTestComponent />
    </>
  );
}