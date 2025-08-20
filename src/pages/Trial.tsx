import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SEO } from "../components/SEO";
import { ReusableHero } from "../components/ui/ReusableHero";
import { default as Logos3 } from "../components/page-sections/trial/logos3";
import { default as IntegrationsSection } from "../components/page-sections/trial/integrations-section";
import { FeatureSection } from "../components/page-sections/trial/feature-section";
import { default as Testimonials } from "../components/page-sections/trial/Testimonials";
import { default as FAQ } from "../components/page-sections/trial/FAQ";
import { default as FooterCTA } from "../components/page-sections/trial/FooterCTA";
import { Button } from "../components/ui";
import { TextLogo } from "../components/Logo";
import { NavItem } from "../components/Navbar/NavItem";
import { navigation } from "../components/Navbar/types";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useGlobalTheme } from "../components/GlobalThemeProvider";
import { getThemeClasses } from "../utils/theme-utils";
import { COLORS } from "../styles/constants";
import Footer from "../components/Footer";
import { useABTest } from "../utils/ab-testing";

// A/B Test: Trial Page Headlines
// Test name: "trial_headline_test"
// Variants: variant_a, variant_b, variant_c, variant_d
// 
// SETUP INSTRUCTIONS:
// 1. In PostHog, create a new feature flag called "trial_headline_test"
// 2. Set it to "Release condition" type with these variants:
//    - variant_a (25% traffic)
//    - variant_b (25% traffic) 
//    - variant_c (25% traffic)
//    - variant_d (25% traffic)
// 
// ANALYTICS:
// - Exposure events: "ab_test_exposure" with test_name: "trial_headline_test"
// - Conversion events: "ab_test_conversion" with conversion_type: "trial_signup_click" or "meeting_booking_click"
const HEADLINE_VARIANTS = {
  variant_a: {
    title: '200 Queries And 50 Visualizations For <span class="">$5</span>',
    subtitle: "Get $500 worth of queries and visualizations for $5. Connect your data source and try it now."
  },
  variant_b: {
    title: 'Never Write SQL Again.',
    subtitle: "Connect your data source to try it out and get $500 worth of queries and visualizations for $5."
  },
  variant_c: {
    title: 'AI Chat With Your Data',
    subtitle: "Connect your data source to try it out and get $500 worth of queries and visualizations for $5."
  },
} as const;

const transformFeatures = [
  {
    title: "Intelligent Analysis",
    description:
      "Advanced algorithms process your data to identify key patterns and opportunities",
  },
  {
    title: "Contextual Insights",
    description:
      "Get specific, actionable recommendations tailored to your business goals",
  },
  {
    title: "Automated Actions",
    description:
      "Implement suggestions seamlessly with one-click execution and tracking",
  },
];

const analyticsFeatures = [
  {
    title: "Scalable Processing",
    description:
      "Handle massive datasets with enterprise-grade processing power",
  },
  {
    title: "Real-time Analysis",
    description: "Get instant insights as your data changes and evolves",
  },
  {
    title: "Smart Recommendations",
    description:
      "Receive intelligent suggestions based on comprehensive data analysis",
  },
];

function TrialNavbar({
  onDemoRequest,
}: {
  onDemoRequest: (e?: React.MouseEvent) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const { isLightMode } = useGlobalTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Animate navbar in after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedSections([]);
  }, [location.pathname]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const themeClasses = getThemeClasses(isLightMode);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={`w-full ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        } transition-all duration-500 ease-out`}
      >
        <nav
          className={`w-full py-1.5 md:py-2.5 transition-all duration-300 ease-out border-b ${
            !isLightMode
              ? isScrolled
                ? "bg-black/90 backdrop-blur-md shadow-lg border-dark-100/20"
                : "bg-black/80 backdrop-blur-sm border-dark-100/20"
              : isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-lg border-light-100/20"
              : "bg-white/80 backdrop-blur-sm border-light-100/20"
          }`}
        >
          <div className={`mx-auto max-w-7xl px-4 md:px-6`}>
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className={`${themeClasses.textPrimary} hover:opacity-80 transition-opacity duration-300`}
              >
                <TextLogo
                  className="h-6 md:h-7 w-auto"
                  color={
                    !isLightMode ? COLORS.brand.mint : COLORS.brand.deepForest
                  }
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigation.map((item) => (
                  <NavItem key={item.label} item={item} />
                ))}
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="primary"
                  size="sm"
                  theme={!isLightMode ? "dark" : "light"}
                  onClick={onDemoRequest}
                >
                  Try Now
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2 ${themeClasses.textSecondary} hover:opacity-80 transition-colors duration-300`}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`
            lg:hidden overflow-hidden transition-all duration-500 ease-in-out
            ${isMenuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}
          `}
            >
              <div
                className={`px-4 py-1.5 space-y-1 ${
                  isMenuOpen
                    ? "overflow-y-auto scrollbar-hide max-h-[420px]"
                    : ""
                }`}
              >
                {navigation.map((item) => (
                  <div key={item.label}>
                    {/* Main navigation item */}
                    {item.href ? (
                      // Simple link items (like Pricing)
                      item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block py-2 transition-colors duration-300 ${themeClasses.textSecondary} hover:opacity-80`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className={`block py-2 transition-colors duration-300 ${themeClasses.textSecondary} hover:opacity-80`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    ) : (
                      // Items with megaMenu
                      <div>
                        <button
                          onClick={() => toggleSection(item.label)}
                          className={`flex items-center justify-between w-full py-2 transition-colors duration-300 ${themeClasses.textSecondary} hover:opacity-80`}
                        >
                          <span>{item.label}</span>
                          {expandedSections.includes(item.label) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>

                        {/* Expanded sub-items */}
                        {expandedSections.includes(item.label) &&
                          item.megaMenu && (
                            <div className="pl-4 pb-2 space-y-1">
                              {item.megaMenu.sections?.map(
                                (section, sectionIndex) => (
                                  <div key={sectionIndex}>
                                    {section.items.map((subItem) =>
                                      subItem.external ? (
                                        <a
                                          key={subItem.href}
                                          href={subItem.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`block py-2 text-sm transition-colors duration-300 ${themeClasses.textMuted} hover:opacity-100`}
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          {subItem.label}
                                        </a>
                                      ) : (
                                        <Link
                                          key={subItem.href}
                                          to={subItem.href}
                                          className={`block py-2 text-sm transition-colors duration-300 ${themeClasses.textMuted} hover:opacity-100`}
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          {subItem.label}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Actions */}
                <div
                  className={`pt-4 border-t space-y-3 ${themeClasses.borderMuted}`}
                >
                  <button
                    onClick={(e) => {
                      onDemoRequest(e);
                      setIsMenuOpen(false);
                    }}
                    className={`block transition-colors duration-300 ${themeClasses.textSecondary} hover:opacity-80`}
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default function Trial() {
  const navigate = useNavigate();
  
  // A/B Test for headlines
  const { variant, trackConversion } = useABTest('trial_headline_test', 'variant_a');
  
  // Get the headline content based on the A/B test variant
  const headlineContent = HEADLINE_VARIANTS[variant as keyof typeof HEADLINE_VARIANTS] || HEADLINE_VARIANTS.variant_a;

  const onDemoRequest = (e?: React.MouseEvent) => {
    e?.preventDefault();
    
    // Track conversion for A/B test
    trackConversion('trial_signup_click', {
      button_text: 'Try Now',
      location: 'hero_section'
    });
    
    window.location.href = "https://buy.stripe.com/eVq14n4q7gpH5M1gcfcEw03";
  };

  const onBookMeeting = () => {
    // Track conversion for A/B test
    trackConversion('meeting_booking_click', {
      button_text: 'Book a Meeting',
      location: 'hero_section'
    });
    
    navigate("/demo");
  };

  return (
    <div className="">
      <TrialNavbar onDemoRequest={onDemoRequest} />
      <SEO
        title="TextQL Trial - 200 Queries And 50 Visualizations For $5"
        description="Get $500 worth of queries and visualizations for $5. Connect your data source and try TextQL now."
        canonical="https://textql.com/trial"
        ogImage="https://textql.com/social-preview.png"
      />

      {/* LinkedIn Insight Tag (page-specific, guarded) */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push("6937250");
          `,
        }}
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(l) {
              if (!window.lintrk) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript"; b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              }
            })(window.lintrk);
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=6937250&fmt=gif"
        />
      </noscript>

      {/* Meta Pixel Code */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '809209304773829');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://www.facebook.com/tr?id=809209304773829&ev=PageView&noscript=1"
        />
      </noscript>


      <ReusableHero
        title={headlineContent.title}
        subtitle={headlineContent.subtitle}
        videoEmbedUrl="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/tql-demo.mp4"
        theme="light"
        layout="text-left"
        buttons={[
          { text: "Try Now", variant: "primary", onClick: onDemoRequest },
          {
            text: "Book a Meeting",
            variant: "secondary",
            onClick: onBookMeeting,
          },
        ]}
      />

      <Logos3 />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      <IntegrationsSection />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <FeatureSection
        badge="Advanced Analytics"
        title="Deep insights at scale"
        description="Unlock powerful analytics capabilities that scale with your data. Our advanced algorithms provide comprehensive analysis and actionable recommendations."
        features={analyticsFeatures}
        imageSrc="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform.svg"
        imageAlt="TextQL Advanced Analytics Process"
        layout="text-left"
      />

      <FeatureSection
        badge="How it Works"
        title="Transform insights into action"
        description="TextQL analyzes your data patterns and automatically generates actionable insights. Our AI understands context and delivers personalized recommendations that drive real results."
        features={transformFeatures}
        imageSrc="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform2.svg"
        imageAlt="TextQL Transform Process"
        layout="text-right"
      />

      <Testimonials />

      <FAQ />

      <FooterCTA />

      <Footer />
    </div>
  );
}
