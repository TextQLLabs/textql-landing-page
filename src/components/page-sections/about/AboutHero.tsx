import { Text } from '../../ui';

export function AboutHero() {
  return (
    <section className="relative overflow-hidden min-h-[400px]" style={{ backgroundColor: '#000000' }}>
      <div className="relative z-10 flex items-center justify-center min-h-[400px] pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-2xl lg:text-3xl font-extralight text-[#B8D8D0] mb-6">
              We're building the last software company.
            </h1>
            <Text color="muted" className="text-base lg:text-lg font-light">
              We're in the endgame now.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}