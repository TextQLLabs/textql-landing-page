import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Text, Heading } from "../../ui";
import { useComponentTheme } from "../../../hooks/useComponentTheme";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  valuation?: string;
  image: string;
  logo: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  autoAdvanceInterval?: number; // in milliseconds
  pauseDuration?: number; // in milliseconds
  className?: string;
}

export default function Testimonials({
  testimonials,
  title = "Here's What Our Users Say",
  autoAdvanceInterval = 6000,
  pauseDuration = 8000,
  className = ""
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useComponentTheme();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    // Pause auto-advance after manual interaction
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), pauseDuration);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    // Pause auto-advance after manual interaction
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), pauseDuration);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    // Pause auto-advance after manual interaction
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), pauseDuration);
  };

  // Auto-advance testimonials (but pause when user interacts or hovers)
  useEffect(() => {
    if (isPaused || isHovered || testimonials.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoAdvanceInterval);
    return () => clearInterval(intervalId);
  }, [isPaused, isHovered, autoAdvanceInterval, testimonials.length]);

  // Don't render if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className={`py-12 md:py-16 ${className}`}
      style={{ backgroundColor: "var(--theme-bg-secondary)" }}
    >
      {/* Match width with other sections on the page */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header with Navigation */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <Heading level={2} theme={theme} className="text-2xl md:text-3xl lg:text-4xl font-extralight text-center sm:text-left">
            {title}
          </Heading>

          {/* Navigation Arrows - Only show if multiple testimonials */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center sm:justify-end space-x-2">
              <button
                onClick={prevTestimonial}
                type="button"
                className="p-2 transition-colors hover:bg-[var(--theme-bg-secondary)]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft
                  className="w-4 h-4"
                  style={{ color: "var(--theme-text-secondary)" }}
                />
              </button>
              <button
                onClick={nextTestimonial}
                type="button"
                className="p-2 transition-colors hover:bg-[var(--theme-bg-secondary)]"
                aria-label="Next testimonial"
              >
                <ChevronRight
                  className="w-4 h-4"
                  style={{ color: "var(--theme-text-secondary)" }}
                />
              </button>
            </div>
          )}
        </div>

        {/* Fixed Height Testimonial Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="p-4 md:p-6 lg:p-8 border h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden"
            style={{
              backgroundColor: "var(--theme-bg-secondary)",
              borderColor: "var(--theme-accent-secondary)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="h-full flex flex-col"
              >
                {/* Mobile Layout (< lg) */}
                <div className="flex flex-col h-full lg:hidden">
                  {/* Company Logo - Centered on mobile */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={testimonials[currentIndex].logo}
                      alt={`${testimonials[currentIndex].company} logo`}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>

                  {/* Quote - Centered and responsive */}
                  <div className="flex-1 flex items-center justify-center text-center px-2">
                    <Text color="primary" theme={theme} className="text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed">
                      "{testimonials[currentIndex].quote}"
                    </Text>
                  </div>

                  {/* Bottom Section: Author info and headshot - Better mobile layout */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 mt-4">
                    {/* Person Image - Centered on mobile */}
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 order-1 sm:order-2">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    
                    {/* Author info - Centered on mobile */}
                    <div className="flex-1 text-center sm:text-left order-2 sm:order-1">
                      <Text color="primary" theme={theme} className="font-medium text-sm sm:text-base md:text-lg mb-1">
                        {testimonials[currentIndex].name}
                      </Text>
                      <Text color="muted" theme={theme} className="text-xs sm:text-sm md:text-base">
                        {testimonials[currentIndex].title},{" "}
                        {testimonials[currentIndex].company}
                      </Text>
                      {testimonials[currentIndex].valuation && (
                        <Text color="muted" theme={theme} className="text-xs sm:text-sm mt-1">
                          {testimonials[currentIndex].valuation}
                        </Text>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop Layout (lg+) */}
                <div className="hidden lg:flex items-center h-full gap-12">
                  {/* Left: Large Person Image - Fixed size */}
                  <div className="flex-shrink-0 w-80 h-96">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover "
                    />
                  </div>

                  {/* Right: Content - Fixed height container */}
                  <div className="flex-1 flex flex-col justify-center h-full py-8">
                    {/* Company Logo */}
                    <div className=" -mt-8">
                      <img
                        src={testimonials[currentIndex].logo}
                        alt={`${testimonials[currentIndex].company} logo`}
                        className="w-24 h-24 object-contain"
                      />
                    </div>

                    {/* Quote - Fixed height */}
                    <div className="flex-1 flex items-center mb-12 -mt-4">
                      <Text color="primary" theme={theme} className="text-3xl xl:text-4xl font-light italic leading-relaxed">
                        "{testimonials[currentIndex].quote}"
                      </Text>
                    </div>

                    {/* Author info */}
                    <div>
                      <Text color="primary" theme={theme} className="font-medium text-xl xl:text-2xl mb-2">
                        {testimonials[currentIndex].name}
                      </Text>
                      <Text color="muted" theme={theme} className="text-sm xl:text-base">
                        {testimonials[currentIndex].title},{" "}
                        {testimonials[currentIndex].company}
                      </Text>
                      {testimonials[currentIndex].valuation && (
                        <Text color="muted" theme={theme} className="text-sm xl:text-base mt-2">
                          {testimonials[currentIndex].valuation}
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Dashes - Only show if multiple testimonials */}
          {testimonials.length > 1 && (
            <div className="flex justify-center space-x-3 mt-6 md:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="h-0.5 w-8 sm:w-12 transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor:
                      index === currentIndex
                        ? "var(--theme-accent)"
                        : "var(--theme-text-secondary)",
                    opacity: index === currentIndex ? 1 : 0.4,
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Export the interface for use in other components
export type { Testimonial, TestimonialsProps };