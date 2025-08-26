import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SEO } from "../components/SEO";
import { FeatureSection } from "../components/page-sections/trial/feature-section.tsx";
import { default as Testimonials } from "../components/page-sections/trial/Testimonials";

import FaqSection from "../components/integrations/FaqSection";
import { CTA } from "../components/sections";
import { Button, HeroSection } from "../components/ui";
import { TextLogo } from "../components/Logo";
import { NavItem } from "../components/Navbar/NavItem";
import { navigation } from "../components/Navbar/types";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useGlobalTheme } from "../components/GlobalThemeProvider";
import { getThemeClasses } from "../utils/theme-utils";
import { COLORS } from "../styles/constants";
import Footer from "../components/Footer";
import { trackButtonClick } from "../utils/analytics";

// Trial page with fixed headline copy

// Removed unused transformFeatures array

const analyticsFeatures = [
  {
    title: "Connect your warehouse, BI, and semantic layer",
    description: "Works with Snowflake, BigQuery, Redshift, Looker, Power BI, dbt, and LookML",
    imageSrc: "https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform.svg"
  },
  {
    title: "Ask in plain English",
    description: "Get verified SQL/Python & charts. TextQL agent is fluent in SQL and Python, generating production-ready code that you can trust and deploy immediately.",
    details: [
      "Natural language to SQL translation",
      "Automatic chart generation",
      "Production-ready code output",
      "Multi-language support (SQL, Python, R)"
    ],
    imageSrc: "https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform2.svg"
  },
  {
    title: "Ship insights safely with guardrails",
    description: "Low warehouse overhead cost. Typically, every $1.00 of TextQL work ≈ ~$0.0001 in warehouse compute.",
    imageSrc: "https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform.svg"
  },
];

// Testimonials data
const trialTestimonials = [
  {
    quote:
      "TextQL is a lifesaver. It created these graphs and pulled stats instantly from our Snowflake warehouse right before an All Hands meeting.",
    name: "Dillon Woods",
    title: "Founder and CTO",
    company: "Tackle.io",
    valuation: "$1.25B Valuation",
    image: "/images/testimonial_logos/tackle_person.png",
    logo: "/images/testimonial_logos/TackleLogo.png",
  },
  {
    quote:
      "Shout out to this team and product. We use Ana as a de facto database engineer to help speed up development.",
    name: "Corbin Klett",
    title: "CTO",
    company: "Artifact",
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
    image: "/images/testimonial_logos/slash_person.png",
    logo: "/images/testimonial_logos/SlashLogo.png",
  }
];

// FAQ data for the FaqSection component
const trialFaqItems = [
  {
    question: "Will TextQL spike my warehouse costs?",
    answer: "No—our guardrails prevent excessive spend. Historically, every $1.00 of TextQL work costs approximately $0.0001 in warehouse compute, making it extremely cost-effective."
  },
  {
    question: "Which tools does TextQL work with?",
    answer: "TextQL integrates with warehouses (Snowflake, BigQuery, Redshift, Databricks), BI tools (Looker, Power BI, Tableau), and semantic layers (dbt, LookML). We are able to connect 100x more data sources than any other solution, helping you get insights regardless of how many databases your data lives in."
  },
  {
    question: "Is it secure and compliant?",
    answer: "Yes. Enterprise-grade security with configurable LLMs, anonymization guardrails, and compliance features. Deployed in your environment with full control over data access."
  },
  {
    question: "Can I keep the queries and dashboards?",
    answer: "Yes, you can export all generated SQL, Python code, and visualizations."
  },
  {
    question: "What if I need help?",
    answer: "Request a demo with our team or reach out at hello@textql.com."
  }
];

// Logo definitions with theme variants (copied from HomeHero)
const logoData = [
  { 
    dark: '/images/logos/reshift-nobg.png', 
    light: '/images/logos/reshift-nobg.png',
    alt: 'Redshift' 
  },
  { 
    dark: '/images/logos/snowflake-white.png', 
    light: '/images/logos/snowflake-white.png',
    alt: 'Snowflake' 
  },
  { 
    dark: '/images/logos/databricks-nobg.png', 
    light: '/images/logos/databricks-nobg.png',
    alt: 'Databricks' 
  },
  { 
    dark: '/images/logos/looker-white.png', 
    light: '/images/logos/looker-white.png',
    alt: 'Looker' 
  },
  { 
    dark: '/images/logos/powerbi-white.png', 
    light: '/images/logos/powerbi-white.png',
    alt: 'Power BI' 
  },
  { 
    dark: '/images/logos/Tableau White.png', 
    light: '/images/logos/Tableau White.png',
    alt: 'Tableau' 
  },
  { 
    dark: '/images/logos/dbt-nobg.png', 
    light: '/images/logos/dbt-nobg.png',
    alt: 'dbt' 
  },
  { 
    dark: '/images/logos/azure-white.png', 
    light: '/images/logos/azure-white.png',
    alt: 'Azure' 
  },
  { 
    dark: '/images/logos/aws-white.png', 
    light: '/images/logos/aws-white.png',
    alt: 'AWS' 
  },
  { 
    dark: '/images/logos/salesforce-white.png', 
    light: '/images/logos/salesforce-white.png',
    alt: 'Salesforce' 
  },
  { 
    dark: '/images/logos/gcp-white.png', 
    light: '/images/logos/gcp-white.png',
    alt: 'Google Cloud' 
  },
  { 
    dark: '/images/logos/teams-white.png', 
    light: '/images/logos/teams-white.png',
    alt: 'Teams' 
  },
  { 
    dark: '/images/logos/slack-white.png', 
    light: '/images/logos/slack-white.png',
    alt: 'Slack' 
  },
  { 
    dark: '/images/logos/alation-white.png', 
    light: '/images/logos/alation-white.png',
    alt: 'Alation' 
  },
  { 
    dark: '/images/logos/sap-white.png', 
    light: '/images/logos/sap-white.png',
    alt: 'SAP' 
  },
  { 
    dark: '/images/logos/oracle.png', 
    light: '/images/logos/oracle.png',
    alt: 'Oracle' 
  }
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
  const { isLightMode } = useGlobalTheme();
  const themeClasses = getThemeClasses(isLightMode);
  
  // Dynamic logos based on theme
  const logos = logoData.map(logo => ({
    src: isLightMode ? logo.light : logo.dark,
    alt: logo.alt
  }));
  
  // Use fixed headline content - removed A/B test
  const headlineContent = {
    title: 'Unlimited queries and visualizations for free',
    subtitle: "Connect your data source to trial a month of unlimited queries and visualizations."
  };
  
  // Dummy trackConversion function for any existing tracking calls
  const trackConversion = (conversionType: string, data: any) => {
    // A/B test removed - conversion tracking disabled
    console.log('A/B test conversion would have tracked:', conversionType, data);
  };

  const onDemoRequest = (e?: React.MouseEvent, location: string = 'hero_section') => {
    e?.preventDefault();
    
    // Track PostHog button click
    trackButtonClick('Try Now', location, {
      page: 'trial',
      button_type: 'primary_cta',
      destination: 'app.textql.com',
      destination_type: 'external_app'
    });
    
    // Track conversion for A/B test
    trackConversion('trial_signup_click', {
      button_text: 'Try Now',
      location
    });
    
    window.location.href = "https://app.textql.com";
  };

  const onBookMeeting = (location: string = 'hero_section') => {
    // Track PostHog button click
    trackButtonClick('Book a Meeting', location, {
      page: 'trial',
      button_type: 'secondary_cta',
      destination: '/request-demo',
      destination_type: 'internal_page'
    });
    
    // Track conversion for A/B test
    trackConversion('meeting_booking_click', {
      button_text: 'Book a Meeting',
      location
    });
    
    navigate("/request-demo");
  };

  return (
    <div className="">
      <TrialNavbar onDemoRequest={onDemoRequest} />
      <SEO
        title="TextQL Trial - Unlimited queries and visualizations for free"
        description="Unlimited queries and visualizations for free. Connect your data source and try TextQL now."
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


      {/* Standardized Trial Hero */}
      <HeroSection
        layout="content-right"
        minHeight="screen"
        showWaveBackground={true}
        waveScale={0.8}
        waveCoverage={1.2}
        className="animate-fade-in animation-delay-400"
        showLogoCarousel={true}
        logoCarouselTitle="Ana finds insights in your existing data stack"
        logoItems={logos}
        mobileHideRight={true}
        leftContent={
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-light leading-tight ${themeClasses.textPrimary} animate-slide-up animation-delay-100`}
                dangerouslySetInnerHTML={{ __html: headlineContent.title }}
              />
              <p className={`text-xl leading-relaxed ${themeClasses.textSecondary} animate-slide-up animation-delay-200`}>
                {headlineContent.subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-300">
              <Button
                variant="primary"
                theme={isLightMode ? 'light' : 'dark'}
                onClick={(e) => onDemoRequest(e, 'hero_desktop')}
              >
                Try Now
              </Button>
              <Button
                variant="secondary"
                theme={isLightMode ? 'light' : 'dark'}
                onClick={() => onBookMeeting('hero_desktop')}
                className="bg-white border-2 border-[#2A3B35] hover:text-white"
              >
                Book a Meeting
              </Button>
            </div>
          </div>
        }
        rightContent={
          <div className="animate-slide-up animation-delay-400 flex items-center justify-center py-8">
            <div className="aspect-video overflow-hidden shadow-2xl">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/tql.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        }
      >
        {/* Mobile video - vertically centered between content and carousel */}
        <div className="lg:hidden w-full">
          <div className="aspect-video overflow-hidden shadow-2xl rounded-lg">
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/tql.mov" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </HeroSection>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      {/* <IntegrationsSection /> */}

      <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />


      <FeatureSection
        badge="How It Works"
        title="Three simple steps to AI-powered insights"
        description="Unlock powerful analytics capabilities that scale with your data. Our advanced algorithms provide comprehensive analysis and actionable recommendations."
        features={analyticsFeatures}
        defaultImageSrc="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform.svg"
        defaultImageAlt="TextQL How It Works Process"
        layout="text-left"
        onTryNow={(e) => onDemoRequest(e, 'feature_section_how_it_works')}
      />

      {/*       <FeatureSection
        badge="How it Works"
        title="Transform insights into action"
        description="TextQL analyzes your data patterns and automatically generates actionable insights. Our AI understands context and delivers personalized recommendations that drive real results."
        features={transformFeatures}
        defaultImageSrc="https://pub-8699413992d644f2b85a9b4cb11b2bc5.r2.dev/transform2.svg"
        defaultImageAlt="TextQL Transform Process"
        layout="text-right"
        onTryNow={onDemoRequest}
      /> */}

{/* <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" /> */}
      <Testimonials 
        testimonials={trialTestimonials}
        title="Here's What Our Users Say"
        autoAdvanceInterval={6000}
        pauseDuration={8000}
      />


      <FaqSection 
        rawText="FAQ"
        faqItems={trialFaqItems}
      />

      <CTA
        theme="dark"
        showWave={true}
        variant="wide"
        heading="Ready to try TextQL with your data?"
        subheader="Try unlimited queries and visualizations for free"
        useSimpleButton={false}
      />

      <Footer />
    </div>
  );
}
