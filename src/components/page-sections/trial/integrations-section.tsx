import { IntegrationMarquee } from "./integration-marquee";
import { Button } from "../../ui/Button";
import { Text, Heading } from "../../ui";
import { useComponentTheme } from "../../../hooks/useComponentTheme";
import { abTestManager } from "../../../utils/ab-testing";
import { trackButtonClick } from "../../../utils/analytics";

// All available integrations from the /public/images/integrations/all/ directory
const allIntegrations = [
  { name: "Snowflake", logo: "/images/integrations/all/snowflake.png" },
  { name: "Databricks", logo: "/images/integrations/all/databricks.png" },
  { name: "BigQuery", logo: "/images/integrations/all/bigquery.svg" },
  { name: "Tableau", logo: "/images/integrations/all/tableau.png" },
  { name: "PowerBI", logo: "/images/integrations/all/PowerBI.png" },
  { name: "Looker", logo: "/images/integrations/all/looker.png" },
  { name: "Redshift", logo: "/images/integrations/all/redshift.png" },
  { name: "Metabase", logo: "/images/integrations/all/metabase.png" },
  { name: "Jupyter", logo: "/images/integrations/all/jupyter.png" },
  { name: "Salesforce", logo: "/images/integrations/all/salesforce.png" },
  { name: "Slack", logo: "/images/integrations/all/slack.webp" },
  { name: "Excel", logo: "/images/integrations/all/excel.png" },
  { name: "AWS RDS", logo: "/images/integrations/all/AWS RDS.svg" },
  { name: "Cube", logo: "/images/integrations/all/Cube.png" },
  { name: "DataHub", logo: "/images/integrations/all/DataHub.png" },
  { name: "IBM Cognos", logo: "/images/integrations/all/IBM Cognos.png" },
  { name: "Informatica", logo: "/images/integrations/all/Informatica.png" },
  { name: "Lightdash", logo: "/images/integrations/all/Lightdash.png" },
  { name: "Quicksight", logo: "/images/integrations/all/Quicksight.png" },
  { name: "Secoda", logo: "/images/integrations/all/Secoda.png" },
  { name: "Select Star", logo: "/images/integrations/all/Select Star.png" },
  { name: "Sigma", logo: "/images/integrations/all/Sigma.png" },
  { name: "Airflow", logo: "/images/integrations/all/airflow.png" },
  { name: "Alation", logo: "/images/integrations/all/alation.png" },
  { name: "Atlan", logo: "/images/integrations/all/atlan.png" },
  { name: "Azure Synapse", logo: "/images/integrations/all/azure-synapse.png" },
  { name: "Azure", logo: "/images/integrations/all/azure.png" },
  { name: "Collibra", logo: "/images/integrations/all/collibra.png" },
  { name: "Confluence", logo: "/images/integrations/all/confluence.png" },
  { name: "dbt", logo: "/images/integrations/all/dbt.png" },
  { name: "Email", logo: "/images/integrations/all/email.png" },
  { name: "Firebolt", logo: "/images/integrations/all/firebolt.svg" },
  { name: "Google Drive", logo: "/images/integrations/all/google drive.png" },
  { name: "Google Sheets", logo: "/images/integrations/all/google sheets.png" },
  { name: "Google Docs", logo: "/images/integrations/all/google-docs.png" },
  { name: "Hex", logo: "/images/integrations/all/hex.png" },
  { name: "IBM DB2", logo: "/images/integrations/all/ibm-db2.png" },
  { name: "LookML", logo: "/images/integrations/all/lookML.png" },
  {
    name: "Microsoft Office",
    logo: "/images/integrations/all/microsoft-office.png",
  },
  { name: "Mode", logo: "/images/integrations/all/mode.png" },
  { name: "MotherDuck", logo: "/images/integrations/all/motherduck.png" },
  { name: "Notion", logo: "/images/integrations/all/notion.png" },
  { name: "Oracle", logo: "/images/integrations/all/oracle png.png" },
  {
    name: "SAP Business One",
    logo: "/images/integrations/all/sap-business-one.png",
  },
  { name: "SAP HANA", logo: "/images/integrations/all/saphana.png" },
  { name: "Sisense", logo: "/images/integrations/all/sisense.png" },
  { name: "SQL Mesh", logo: "/images/integrations/all/sql-mesh.png" },
  { name: "Superset", logo: "/images/integrations/all/superset.png" },
  { name: "Teams", logo: "/images/integrations/all/teams.png" },
  { name: "Linear", logo: "/images/integrations/all/linear.svg" },
  { name: "Notion", logo: "/images/integrations/all/notion.svg" },
  { name: "Supabase", logo: "/images/integrations/all/supabase.svg" },
  { name: "Browserase", logo: "/images/integrations/all/browserbase.svg" },
  { name: "Metabase", logo: "/images/integrations/all/metabase.svg" },
  { name: "Github", logo: "/images/integrations/all/github.svg" },
];

const totalIntegrations = allIntegrations.length;
const integrationsPerRow = Math.ceil(totalIntegrations / 4);

const integrationRows = [
  allIntegrations.slice(0, integrationsPerRow),
  allIntegrations.slice(integrationsPerRow, integrationsPerRow * 2),
  allIntegrations.slice(integrationsPerRow * 2, integrationsPerRow * 3),
  allIntegrations.slice(integrationsPerRow * 3),
];

const onDemoRequest = (e: React.MouseEvent) => {
  e.preventDefault();
  
  // Track PostHog button click
  trackButtonClick('Try Now', 'integrations_section', {
    page: 'trial',
    button_type: 'section_cta'
  });
  
  // Track A/B test conversion for integrations section
  const currentVariant = abTestManager.getVariant('trial_headline_test', 'variant_a');
  abTestManager.trackConversion('trial_headline_test', currentVariant, 'trial_signup_click', {
    button_text: 'Try Now',
    location: 'integrations_section'
  });
  
  window.location.href = "https://app.textql.com";
};

export function IntegrationsSection() {
  const theme = useComponentTheme();
  
  return (
    <section
      className="py-12 md:py-16 overflow-x-hidden"
      style={{ backgroundColor: "var(--theme-bg-secondary)" }}
    >
      <div className="container mx-auto px-4 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-7xl mx-auto overflow-x-hidden gap-8 lg:gap-12">
          {/* Content - Top on mobile, Right on desktop */}
          <div className="flex-1 max-w-xl lg:order-2 lg:ml-16 text-center lg:text-left">
            <div className="mb-4">
              <Text color="secondary" theme={theme} className="text-sm font-medium uppercase tracking-wide">
                Integrations
              </Text>
            </div>
            <Heading level={2} theme={theme} className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Integrate your data stack
            </Heading>
            <Text color="muted" theme={theme} className="text-base md:text-lg mb-8 leading-relaxed">
              Integrate TextQL with your team's stack and create a single source
              of truth for every piece of data and insight.
            </Text>
            <div className="flex justify-center lg:justify-start">
              <Button variant="primary" theme={theme} onClick={onDemoRequest} className="w-full sm:w-auto">
                Try Now
              </Button>
            </div>
          </div>

          {/* Marquees - Bottom on mobile, Left on desktop */}
          <div className="flex-1 max-w-2xl overflow-x-hidden lg:order-1">
            <IntegrationMarquee integrations={integrationRows[0]} />
            <IntegrationMarquee
              integrations={integrationRows[1]}
              direction="right"
            />
            <IntegrationMarquee integrations={integrationRows[2]} />
            <IntegrationMarquee
              integrations={integrationRows[3]}
              direction="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntegrationsSection;