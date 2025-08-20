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
    <section className="bg-transparent py-8 md:py-12 lg:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 md:px-8 lg:px-12 relative">
        <div className="bg-black border border-[#729E8C]/20 rounded-xl p-6 md:p-8 lg:p-12 relative opacity-0 animate-slideUp [animation-delay:200ms] [animation-fill-mode:forwards]">
          <div className="text-[#729E8C] text-[80px] md:text-[120px] lg:text-[150px] font-bold leading-none absolute -top-6 md:-top-8 lg:-top-10 -left-3 md:-left-4 lg:-left-6 opacity-0 animate-slideUp [animation-delay:400ms] [animation-fill-mode:forwards] transition-all duration-300">
            "
          </div>
          <div className="text-[#729E8C] text-[80px] md:text-[120px] lg:text-[150px] font-bold leading-none absolute -bottom-[10%] md:-bottom-[12%] lg:-bottom-[15%] -right-3 md:-right-4 lg:-right-6 rotate-180 opacity-0 animate-slideUp [animation-delay:600ms] [animation-fill-mode:forwards] transition-all duration-300">
            "
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl font-extralight text-[#B8D8D0] tracking-tight uppercase opacity-0 animate-slideUp [animation-delay:800ms] [animation-fill-mode:forwards]">
                {/* TESTIMONIALS */}
              </h2>
              <Text color="primary" className="text-lg md:text-2xl lg:text-3xl italic font-light leading-relaxed opacity-0 animate-slideUp [animation-delay:1000ms] [animation-fill-mode:forwards] transition-all duration-500 ease-out">
                {quote}
              </Text>
            </div>
            
            <div className="space-y-2 opacity-0 animate-slideUp [animation-delay:1200ms] [animation-fill-mode:forwards]">
              <Text color="primary" className="font-medium italic transition-all duration-300 ease-out">
                {author !== "" && <>— {author}</>}
              </Text>
              <Text color="muted" className="font-light transition-all duration-300 ease-out">
                {title}
              </Text>
            </div>

            {ctaText && ctaHref && (
              <div className="opacity-0 animate-slideUp [animation-delay:1400ms] [animation-fill-mode:forwards]">
                <a
                  href={ctaHref}
                  className="inline-flex px-6 py-3 bg-[#FF4D8D] hover:bg-[#FF4D8D]/90 text-white rounded-full font-medium transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg"
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
