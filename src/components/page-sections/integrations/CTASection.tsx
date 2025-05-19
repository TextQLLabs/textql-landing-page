import { Button } from '../../ui';
import { useNavigate } from 'react-router-dom';

export function CTASection() {
  const navigate = useNavigate();

  const handleDemoRequest = () => {
    navigate('/demo');
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[#B8D8D0] text-4xl font-extralight mb-6">
            Ready to Connect Your Data?
          </h2>
          
          <p className="text-[#729E8C] text-xl mb-10">
            Get started with TextQL today and unlock the power of natural language querying across your entire data ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDemoRequest}
            >
              Book a demo
            </Button>
            
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open('https://docs.textql.com/core/datasources/the-connectors-page', '_blank')}
            >
              View documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 