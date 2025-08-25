"use client";

import { Button } from "../../ui/Button";

interface HeroProps {
  videoEmbedUrl?: string;
  className?: string;
}

const Hero = ({
  videoEmbedUrl = "https://www.youtube.com/watch?v=UvQ5Q63t1fM",
  className = "",
}: HeroProps) => {
  return (
    <section className={`py-24 lg:pt-32 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
                Unlimited queries and visualizations for free
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Get unlimited queries and visualizations for free.
              </p>
              <p>Connect your data source and try it now.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="md"
                className="text-lg px-8 py-3"
              >
                Try Now
              </Button>

              <Button
                variant="secondary"
                size="md"
                className="text-lg px-8 py-3"
              >
                Book a Meeting
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
              {videoEmbedUrl ? (
                <iframe
                  src={videoEmbedUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Product Demo"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto flex items-center justify-center">
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
                    <p className="text-gray-500 font-medium">Demo Video</p>
                    <p className="text-sm text-gray-400"></p>
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
