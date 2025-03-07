export function CTASection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[#B8D8D0] text-4xl font-extralight mb-6">
            Ready to Connect Your Data?
          </h2>
          
          <p className="text-[#729E8C] text-xl mb-10">
            Get started with TextQL today and unlock the power of natural language querying across your entire data ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/demo" 
              className="bg-transparent hover:bg-[#B8D8D0]/10 text-[#B8D8D0] py-3 px-6 border border-[#B8D8D0] transition-colors"
            >
              Book a demo
            </a>
            
            <a 
              href="https://docs.textql.com/connectors" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent hover:bg-[#B8D8D0]/10 text-[#B8D8D0] py-3 px-6 border border-[#B8D8D0] transition-colors"
            >
              View documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 