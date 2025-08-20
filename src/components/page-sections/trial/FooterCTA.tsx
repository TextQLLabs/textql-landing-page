import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button';

export default function FooterCTA() {
  return (
    <section className="py-16" style={{backgroundColor: 'var(--theme-bg-dark)'}}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-8" style={{color: 'var(--theme-text-dark)'}}>
          See TextQL in action with your data
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" theme="dark" size="md" className="min-w-[200px]">
            <Link to="/demo">
              Get a demo
            </Link>
          </Button>
          
          <Button variant="secondary" theme="dark" size="md" className="min-w-[200px]">
            <Link to="/trial">
              Access $5 Trial
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
