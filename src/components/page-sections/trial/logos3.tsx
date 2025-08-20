"use client";

import Marquee from "react-fast-marquee";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by:",
  logos = [
    {
      id: "bmg",
      description: "BMG",
      image: "/images/customers/bmg.png",
      className: "h-12 w-auto",
    },
    {
      id: "dandy",
      description: "Dandy",
      image: "/images/customers/dandy.svg",
      className: "h-12 w-auto",
    },
    {
      id: "lumeris",
      description: "Lumeris",
      image: "/images/customers/lumeris.jpg",
      className: "h-12 w-auto",
    },
    {
      id: "quicknode",
      description: "QuickNode",
      image: "/images/customers/quicknode.png",
      className: "h-12 w-auto",
    },
    {
      id: "tackle",
      description: "Tackle",
      image: "/images/customers/tackle.jpg",
      className: "h-12 w-auto",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h2 className="mb-12 text-2xl font-semibold text-pretty lg:text-3xl">
          {heading}
        </h2>
      </div>
      <div className="relative mx-auto flex items-center justify-center max-w-6xl">
        <Marquee
          autoFill={true}
          pauseOnHover={false}
          speed={30}
          gradient={true}
          gradientColor="white"
          gradientWidth={80}
        >
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="mx-16 flex items-center justify-center"
            >
              <img
                src={logo.image}
                alt={logo.description}
                className={logo.className}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Logos3;
