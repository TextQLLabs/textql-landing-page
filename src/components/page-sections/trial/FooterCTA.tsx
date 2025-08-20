import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import { useGlobalTheme } from "../../GlobalThemeProvider";
import { getThemeClasses } from "../../../utils/theme-utils";
import { abTestManager } from "../../../utils/ab-testing";

export default function FooterCTA() {
  const { isLightMode } = useGlobalTheme();
  const navigate = useNavigate();
  const themeClasses = getThemeClasses(isLightMode);

  const handleDemoClick = () => {
    navigate("/demo");
  };

  const onDemoRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Track A/B test conversion for footer CTA section
    const currentVariant = abTestManager.getVariant('trial_headline_test', 'variant_a');
    abTestManager.trackConversion('trial_headline_test', currentVariant, 'trial_signup_click', {
      button_text: 'Try now',
      location: 'footer_cta_section'
    });
    
    window.location.href = "https://buy.stripe.com/eVq14n4q7gpH5M1gcfcEw03";
  };

  return (
    <section className={`py-16 ${themeClasses.bgSecondary}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className={`text-3xl md:text-4xl font-display mb-8 ${themeClasses.textPrimary}`}
        >
          See TextQL in action with your data
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            theme={!isLightMode ? "dark" : "light"}
            size="md"
            className="min-w-[200px] transition-all duration-300 ease-out hover:scale-105"
            onClick={onDemoRequest}
          >
            Try now
          </Button>

          <Button
            variant="secondary"
            theme={!isLightMode ? "dark" : "light"}
            size="md"
            className="min-w-[200px] transition-all duration-300 ease-out hover:scale-105"
            onClick={handleDemoClick}
          >
            Get a demo
          </Button>

          {/* <Button variant="primary" theme="light">Try Now</Button> */}
        </div>
      </div>
    </section>
  );
}
