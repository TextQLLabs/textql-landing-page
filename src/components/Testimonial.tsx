import React from 'react';
import { Text } from './ui';

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Testimonial({ quote, author, title, ctaText = "Read the case study", ctaHref = "#" }: TestimonialProps) {
  return (
    <section className="bg-transparent py-24 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 relative">
        <div className="bg-black border border-[#729E8C]/20 rounded-xl p-12 relative opacity-0 animate-slide-up animation-delay-800">
          <div className="text-[#729E8C] text-[150px] font-bold leading-none absolute -top-10 -left-6">
            "
          </div>
          <div className="text-[#729E8C] text-[150px] font-bold leading-none absolute -bottom-[15%] -right-6 rotate-180">
          "
          </div>
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-extralight text-[#B8D8D0] tracking-tight uppercase">
                {/* TESTIMONIALS */}
              </h2>
              <Text color="primary" className="text-2xl md:text-3xl font-light leading-relaxed italics opacity-0 animate-slide-up animation-delay-800">
                {quote}
              </Text>
            </div>
            
            <div className="space-y-2 opacity-0 animate-slide-up animation-delay-800">
              <Text color="primary" className="font-medium italic">
                — {author}
              </Text>
              <Text color="muted" className="font-light">
                {title}
              </Text>
            </div>

            {/* {ctaText && ctaHref && (
              <a
                href={ctaHref}
                className="inline-flex px-6 py-3 bg-[#FF4D8D] hover:bg-[#FF4D8D]/90 text-white rounded-full font-medium transition-colors duration-200"
              >
                {ctaText}
              </a>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
