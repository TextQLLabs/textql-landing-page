import { Text } from '../../ui';

export function AboutHero() {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="relative z-10 flex items-center justify-center">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extralight text-[#B8D8D0] mb-6">
              We're building the last software company.
            </h1>
            <Text color="muted" className="text-xl lg:text-xl font-light">
              We're in the endgame now.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}