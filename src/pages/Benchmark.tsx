import { Text } from '../components/ui';
import { BenchmarkChart, ChatComparison, AccuracyDiagram } from '../components/page-sections/benchmark';

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
        <div>
          <Text variant="header" className="text-3xl md:text-5xl font-extralight mb-6">
            Engineered for Real Enterprise Complexity
          </Text>
          <Text color="muted" className="text-xl leading-relaxed max-w-4xl">
            Ana excels within intricate enterprise data environments, easily navigating extensive datasets featuring over 100 interconnected tables and thousands of metrics and dimensions. Built specifically to handle sophisticated logic and challenging analytical scenarios, Ana delivers precise, meaningful insights even under highly demanding conditions.
          </Text>
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
    </div>
  );
}