import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    quote:
      "Shout out to this team and product. We use Ana as a de facto database engineer to help speed up development.",
    name: "Corbin Klett",
    title: "CTO",
    company: "Artifact",
    rating: 5,
    image: "/images/testimonial_logos/artifact_person.png",
    logo: "/images/testimonial_logos/ArtifactLogo.png",
  },
  {
    quote:
      "The value add of TextQL has been unquantifiable. But I had Ana quantify it. And It's a lot.",
    name: "Andy Jiang",
    title: "Product Manager",
    company: "Slash",
    valuation: "$370m Valuation",
    rating: 5,
    image: "/images/testimonial_logos/slash_person.png",
    logo: "/images/testimonial_logos/SlashLogo.png",
  },
  {
    quote:
      "TextQL is a lifesaver. It created these graphs and pulled stats instantly from our Snowflake warehouse right before an All Hands meeting.",
    name: "Dillon Woods",
    title: "Founder and CTO",
    company: "Tackle.io",
    valuation: "$1.25B Valuation",
    rating: 5,
    image: "/images/testimonial_logos/tackle_person.png",
    logo: "/images/testimonial_logos/TackleLogo.png",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      className="py-8 md:py-16"
      style={{ backgroundColor: "var(--theme-bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold"
            style={{ color: "var(--theme-text-primary)" }}
          >
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
              <ChevronLeft
                className="w-4 h-4"
                style={{ color: "var(--theme-text-secondary)" }}
              />
            </button>
            <button
              onClick={nextTestimonial}
              type="button"
              className="p-2 rounded-md transition-colors hover:bg-[var(--theme-bg-secondary)]"
              aria-label="Next testimonial"
            >
              <ChevronRight
                className="w-4 h-4"
                style={{ color: "var(--theme-text-secondary)" }}
              />
            </button>
          </div>
        </div>

        {/* Responsive Testimonial Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div
            className="p-4 md:p-6 lg:p-8 min-h-[250px] md:min-h-[300px] lg:min-h-[400px] border overflow-hidden"
            style={{
              backgroundColor: "var(--theme-bg-secondary)",
              borderColor: "var(--theme-accent-secondary)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  duration: 0.5,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
                className="h-full"
              >
                {/* Mobile Layout (< lg) */}
                <div className="flex flex-col h-full justify-between lg:hidden">
                  {/* Top Section: Company Logo and Quote */}
                  <div className="flex-1 mb-8">
                    {/* Company Logo */}
                    <motion.img
                      src={testimonials[currentIndex].logo}
                      alt={`${testimonials[currentIndex].company} logo`}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain mb-6"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                    />

                    {/* Quote */}
                    <motion.blockquote
                      className="text-base md:text-xl font-display leading-relaxed"
                      style={{ color: "var(--theme-text-primary)" }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      "{testimonials[currentIndex].quote}"
                    </motion.blockquote>
                  </div>

                  {/* Bottom Section: Author info and headshot */}
                  <div className="flex items-end">
                    {/* Author info - Left side */}
                    <motion.div
                      className="flex-1"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <div
                        className="font-semibold text-base md:text-lg"
                        style={{ color: "var(--theme-text-primary)" }}
                      >
                        {testimonials[currentIndex].name}
                      </div>
                      <div
                        className="text-sm md:text-base"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        {testimonials[currentIndex].title},{" "}
                        {testimonials[currentIndex].company}
                      </div>
                      {testimonials[currentIndex].valuation && (
                        <div
                          className="text-xs md:text-sm mt-1"
                          style={{ color: "var(--theme-text-secondary)" }}
                        >
                          {testimonials[currentIndex].valuation}
                        </div>
                      )}
                    </motion.div>

                    {/* Person Image - Bottom right corner */}
                    <motion.div
                      className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 ml-4"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Desktop Layout (lg+) */}
                <div className="hidden lg:flex items-center h-full gap-6 lg:gap-8">
                  {/* Left: Large Person Image */}
                  <motion.div
                    className="flex-shrink-0 w-64 h-80 xl:w-80 xl:h-96"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>

                  {/* Right: Content */}
                  <div className="flex-1 flex flex-col justify-center py-8">
                    {/* Company Logo */}
                    <motion.img
                      src={testimonials[currentIndex].logo}
                      alt={`${testimonials[currentIndex].company} logo`}
                      className="w-20 h-20 xl:w-24 xl:h-24 object-contain mb-8 xl:mb-12"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                    />

                    {/* Quote */}
                    <motion.blockquote
                      className="text-2xl xl:text-3xl 2xl:text-4xl font-display leading-relaxed mb-8 xl:mb-12"
                      style={{ color: "var(--theme-text-primary)" }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      "{testimonials[currentIndex].quote}"
                    </motion.blockquote>

                    {/* Author info */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <div
                        className="font-semibold text-xl xl:text-2xl mb-2"
                        style={{ color: "var(--theme-text-primary)" }}
                      >
                        {testimonials[currentIndex].name}
                      </div>
                      <div
                        className="text-lg xl:text-xl"
                        style={{ color: "var(--theme-text-secondary)" }}
                      >
                        {testimonials[currentIndex].title},{" "}
                        {testimonials[currentIndex].company}
                      </div>
                      {testimonials[currentIndex].valuation && (
                        <div
                          className="text-base xl:text-lg mt-2"
                          style={{ color: "var(--theme-text-secondary)" }}
                        >
                          {testimonials[currentIndex].valuation}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Dashes */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="h-0.5 w-12 transition-colors"
                style={{
                  backgroundColor:
                    index === currentIndex
                      ? "var(--theme-accent)"
                      : "var(--theme-text-secondary)",
                  opacity: index === currentIndex ? 1 : 0.3,
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
