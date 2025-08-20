import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  valuation?: string;
  rating: number;
  image: string;
  logo: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Shout out to this team and product. We use Ana as a de facto database engineer to help speed up development.",
    name: "Corbin Klett",
    title: "CTO",
    company: "Artifact",
    rating: 5,
    image: "/images/testimonial_logos/artifact_person.png",
    logo: "/images/testimonial_logos/ArtifactLogo.png"
  },
  {
    quote: "The value add of TextQL has been unquantifiable. But I had Ana quantify it. And It's a lot.",
    name: "Andy Jiang",
    title: "Product Manager",
    company: "Slash",
    valuation: "$370m Valuation",
    rating: 5,
    image: "/images/testimonial_logos/slash_person.png",
    logo: "/images/testimonial_logos/SlashLogo.png"
  },
  {
    quote: "TextQL is a lifesaver. It created these graphs and pulled stats instantly from our Snowflake warehouse right before an All Hands meeting.",
    name: "Dillon Woods",
    title: "Founder and CTO",
    company: "Tackle.io",
    valuation: "$1.25B Valuation",
    rating: 5,
    image: "/images/testimonial_logos/tackle_person.png",
    logo: "/images/testimonial_logos/TackleLogo.png"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);



  return (
    <section className="py-16" style={{backgroundColor: 'var(--theme-bg-primary)'}}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-semibold" style={{color: 'var(--theme-text-primary)'}}>
            What Our Users Say
          </h2>
          
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={prevTestimonial}
              type="button"
              className="p-2 rounded-md transition-colors hover:bg-[var(--theme-bg-secondary)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" style={{color: 'var(--theme-text-secondary)'}} />
            </button>
            <button
              onClick={nextTestimonial}
              type="button"
              className="p-2 rounded-md transition-colors hover:bg-[var(--theme-bg-secondary)]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" style={{color: 'var(--theme-text-secondary)'}} />
            </button>
          </div>
        </div>

        {/* Full Width Testimonial Card */}
        <div className="relative">
          <div className="p-8 flex items-start gap-12 h-[400px] border" style={{backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-accent-secondary)'}}>
            {/* Left: Person Image */}
            <div className="flex-shrink-0 w-80 h-full">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Content */}
            <div className="flex-1 flex flex-col justify-between h-full py-2">
              {/* Company Logo */}
              <img
                src={testimonials[currentIndex].logo}
                alt={`${testimonials[currentIndex].company} logo`}
                className="w-16 h-16 object-contain"
              />

              
              {/* Quote */}
              <blockquote className="text-2xl font-display leading-relaxed mb-4 flex-1" style={{color: 'var(--theme-text-primary)'}}>
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              {/* Author */}
              <div>
                <div className="font-semibold text-lg" style={{color: 'var(--theme-text-primary)'}}>
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-base" style={{color: 'var(--theme-text-secondary)'}}>
                  {testimonials[currentIndex].title}, {testimonials[currentIndex].company}
                </div>
                {testimonials[currentIndex].valuation && (
                  <div className="text-sm mt-1" style={{color: 'var(--theme-text-secondary)'}}>
                    {testimonials[currentIndex].valuation}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Dashes */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="h-0.5 w-12 transition-colors"
                style={{
                  backgroundColor: index === currentIndex ? 'var(--theme-accent)' : 'var(--theme-text-secondary)',
                  opacity: index === currentIndex ? 1 : 0.3
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
