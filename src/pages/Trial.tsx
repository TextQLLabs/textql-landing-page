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

  const onDemoRequest = (e?: React.MouseEvent) => {
    e?.preventDefault();
    window.location.href = "https://buy.stripe.com/eVq14n4q7gpH5M1gcfcEw03";
  };

  const onBookMeeting = () => {
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
      
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=6937250&conversionId=22637842&fmt=gif"
        />
      </noscript>


      <ReusableHero
        title='200 Queries And 50 Visualizations For <span class="">$5</span>'
        subtitle="Get $500 worth of queries and visualizations for $5."
        description="Connect your data source and try it now."
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
