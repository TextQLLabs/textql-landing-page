import { IntegrationMarquee } from "./integration-marquee";
import { Button } from "../../ui/Button";

// Sample integration data for demo
const integrationRows = [
  [
    { name: "Snowflake", logo: "/images/integrations/all/snowflake.png" },
    { name: "Databricks", logo: "/images/integrations/all/databricks.png" },
    { name: "BigQuery", logo: "/images/integrations/all/bigquery.svg" },
  ],
  [
    { name: "Tableau", logo: "/images/integrations/all/tableau.png" },
    { name: "PowerBI", logo: "/images/integrations/all/PowerBI.png" },
    { name: "Looker", logo: "/images/integrations/all/looker.png" },
  ],
  [
    { name: "Redshift", logo: "/images/integrations/all/redshift.png" },
    { name: "Metabase", logo: "/images/integrations/all/metabase.png" },
    { name: "Jupyter", logo: "/images/integrations/all/jupyter.png" },
  ],
  [
    { name: "Salesforce", logo: "/images/integrations/all/salesforce.png" },
    { name: "Slack", logo: "/images/integrations/all/slack.webp" },
    { name: "Excel", logo: "/images/integrations/all/excel.png" },
  ]
];

export function IntegrationsSection() {
  return (
    <section className="py-16" style={{backgroundColor: 'var(--theme-bg-secondary)'}}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - Marquees */}
          <div className="flex-1 max-w-2xl">
            <IntegrationMarquee integrations={integrationRows[0]} />
            <IntegrationMarquee integrations={integrationRows[1]} direction="right" />
            <IntegrationMarquee integrations={integrationRows[2]} />
            <IntegrationMarquee integrations={integrationRows[3]} direction="right" />
          </div>

          {/* Right side - Content */}
          <div className="flex-1 max-w-xl ml-16">
            <div className="mb-4">
              <span className="text-sm font-medium uppercase tracking-wide" style={{color: 'var(--theme-accent)'}}>
                Integrations
              </span>
            </div>
            <h2 className="text-5xl font-semibold mb-6 leading-tight" style={{color: 'var(--theme-text-primary)'}}>
              Integrate your data stack
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{color: 'var(--theme-text-secondary)'}}>
              Integrate TextQL with your team's stack and create a single
              source of truth for every piece of data and insight.
            </p>
            <Button variant="primary" theme="light">Try Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntegrationsSection;
