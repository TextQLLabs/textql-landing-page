import { Section } from '../../ui/Section';

export function AllIntegrationsHeader() {
  return (
    <Section
      variant="wide"
      paddingTop="navbar"
      paddingBottom="lg"
      background="transparent"
      className="bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
          All Integrations
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          TextQL seamlessly connects with your entire data stack—from warehouses and BI tools to collaboration platforms
        </p>
      </div>
    </Section>
  );
}