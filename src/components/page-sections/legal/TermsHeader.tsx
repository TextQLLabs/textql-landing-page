import { Text } from '../../ui';

export function TermsHeader() {
  return (
    <div className="navbar-offset pb-16 bg-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-extralight mb-6 text-[#B8D8D0]">
          Terms and Conditions
        </h1>
        <Text color="secondary" className="text-xl">
          Last updated: {new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </Text>
      </div>
    </div>
  );
}