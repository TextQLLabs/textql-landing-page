import { Button } from '../../ui/Button';

interface HeroProps {
  videoEmbedUrl?: string;
  className?: string;
}

const Hero = ({
  videoEmbedUrl = "https://www.youtube.com/watch?v=UvQ5Q63t1fM",
  className = "",
}: HeroProps) => {
  return (
    <section className={`py-24 lg:pt-32 ${className} bg-white`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight" style={{color: 'var(--theme-text-primary)'}}>
                Unlimited queries and visualizations for free
              </h1>
              <p className="text-xl leading-relaxed" style={{color: 'var(--theme-text-secondary)'}}>
                Get unlimited queries and visualizations for free.
              </p>
              <p style={{color: 'var(--theme-text-secondary)'}}>Connect your data source and try it now.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" theme="light">Try Now</Button>
              <Button variant="secondary" theme="light">Book a Meeting</Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl" style={{backgroundColor: 'var(--theme-bg-secondary)'}}>
              {videoEmbedUrl ? (
                <iframe
                  src={videoEmbedUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Product Demo"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{backgroundColor: 'var(--theme-bg-secondary)'}}>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{backgroundColor: 'var(--theme-accent)'}}>
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="font-medium" style={{color: 'var(--theme-text-secondary)'}}>Demo Video</p>
                    <p className="text-sm" style={{color: 'var(--theme-text-secondary)'}}></p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
