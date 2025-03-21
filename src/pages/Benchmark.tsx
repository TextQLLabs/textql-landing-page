import { Text } from '../components/ui';
import { BenchmarkChart, ChatComparison, AccuracyDiagram, EnterpriseStats } from '../components/page-sections/benchmark';

export default function Benchmark() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Text variant="header" className="text-4xl md:text-6xl mb-4">
            The Most Accurate AI for Your Data
          </Text>
          <Text color="muted" className="text-xl max-w-2xl">
            Ana delivers unmatched accuracy in answering business questions from your data—far surpassing other solutions in enterprise environments.
          </Text>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-32">
        {/* Benchmark Chart Section */}
        <div className="rounded-lg">
          <BenchmarkChart />
          <div className="mt-8 max-w-3xl">
            <Text color="muted" className="text-lg">
              The Conglomerate Benchmark features an extensive dataset with over 100 interconnected tables, designed to realistically represent the scale and complexity of a large enterprise data warehouse.{' '}
              <a href="https://github.com/TextQLLabs/conglomerate-benchmark" className="text-[#B8D8D0] hover:text-[#729E8C] transition-colors">
                See more details about the Conglomerate benchmark here
              </a>
            </Text>
          </div>
        </div>

        {/* Enterprise Complexity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-12">
          <div>
            <Text variant="header" className="text-3xl md:text-5xl font-extralight mb-6">
              Engineered for Real Enterprise Complexity
            </Text>
            <Text color="muted" className="text-xl leading-relaxed">
              Ana excels within intricate enterprise data environments, easily navigating extensive datasets featuring over 100 interconnected tables and thousands of metrics and dimensions. Built specifically to handle sophisticated logic and challenging analytical scenarios, Ana delivers precise, meaningful insights even under highly demanding conditions.
            </Text>
          </div>
          <EnterpriseStats />
        </div>

        {/* Real-world Comparison Section */}
        <div>
          <Text variant="header" className="text-3xl mb-6">
            Real-world Comparison
          </Text>
          <Text color="muted" className="text-xl mb-12">
            See exactly how Ana performs next to other popular solutions.
          </Text>
          <div className="rounded-lg">
            <ChatComparison />
          </div>
          <div className="text-right mt-2">
            <Text color="muted" className="text-sm italic">
              Disclaimer: Competitor responses shown are illustrative; actual wording varied but similarly indicated no correct answer available.
            </Text>
          </div>
        </div>

        {/* Accuracy by Design Section */}
        <div>
          <Text variant="header" className="text-3xl mb-6">
            Accuracy by Design
          </Text>
          <Text color="muted" className="text-xl mb-6">
            Ana's accuracy has been rigorously tested against realistic enterprise analytics scenarios, including complex multi-join queries and ambiguous requests commonly encountered in large-scale data environments. By consistently delivering precise, validated insights rather than merely retrieving raw data, Ana significantly reduces ambiguity and enhances clarity. This level of consistency and reliability directly supports informed, confident decision-making across your organization.
          </Text>
          <Text color="muted" className="text-xl mb-12">
            Ana uses structured options to prevent common mistakes and guarantee every answer makes sense within your business context.
          </Text>
          <AccuracyDiagram />
        </div>
      </div>
      {/* Demo CTA */}
      <div className="border-t border-[#B8D8D0]/10">
        <div className="max-w-7xl mx-auto px-6 py-16 flex items-center justify-center gap-8">
          <Text color="muted" className="text-xl">
            Learn how Ana can work for your business
          </Text>
          <a href="/demo" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0f8a7a] text-white hover:bg-[#0f8a7a]/90 transition-colors text-lg">
            Book a Demo
          </a>
        </div>
      </div>
    </div>
  );
}