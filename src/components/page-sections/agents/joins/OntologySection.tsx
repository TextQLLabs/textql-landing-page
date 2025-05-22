import { Text } from '../../../ui';

export function OntologySection() {
  return (
    <div className="bg-[#F0F5F3] p-6 rounded-lg">
      <Text variant="header" theme="light" className="text-xl mb-6">
        TextQL Ontology
      </Text>
      <div className="relative w-full h-[400px] overflow-hidden rounded-lg border border-[#2A3B35]/10">
        <img 
          src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/72fc7d25-5a18-497b-2bac-087c51cabf00/public"
          alt="TextQL Ontology Visualization"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}