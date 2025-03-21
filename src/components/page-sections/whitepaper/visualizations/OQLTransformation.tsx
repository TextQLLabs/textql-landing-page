import { useState, useEffect, useRef } from 'react';
import { Text } from '../../../ui';
import { ArrowRight } from 'lucide-react';

// Simplified OQL example with proper syntax highlighting
const OQLSyntax = () => (
  <div className="font-mono text-sm">
    <div>
      <span className="text-[#0f8a7a] font-medium">METRICS</span>
      <span className="text-[#B8D8D0]"> NetRevenue, CAC</span>
    </div>
    <div>
      <span className="text-[#0f8a7a] font-medium">DIMENSIONS</span>
      <span className="text-[#B8D8D0]"> ProductLine (QUARTER)</span>
    </div>
    <div>
      <span className="text-[#0f8a7a] font-medium">FILTER</span>
      <span className="text-[#B8D8D0]"> FiscalYear=2023 AND Region="NA"</span>
    </div>
  </div>
);

// SQL with syntax highlighting
const SQLSyntax = () => (
  <div className="font-mono text-xs leading-tight">
    <div><span className="text-[#729E8C]">SELECT</span></div>
    <div className="ml-4"><span className="text-[#B8D8D0]">p.product_line,</span></div>
    <div className="ml-4"><span className="text-[#729E8C]">DATE_TRUNC</span><span className="text-[#B8D8D0]">('quarter', o.order_date) as quarter,</span></div>
    <div className="ml-4"><span className="text-[#729E8C]">SUM</span><span className="text-[#B8D8D0]">(</span><span className="text-[#729E8C]">CASE</span></div>
    <div className="ml-8"><span className="text-[#729E8C]">WHEN</span><span className="text-[#B8D8D0]"> o.status = 'completed'</span></div>
    <div className="ml-8"><span className="text-[#729E8C]">THEN</span><span className="text-[#B8D8D0]"> o.revenue - o.returns - o.discounts</span></div>
    <div className="ml-8"><span className="text-[#729E8C]">ELSE</span><span className="text-[#B8D8D0]"> 0</span></div>
    <div className="ml-4"><span className="text-[#B8D8D0]">END) as net_revenue,</span></div>
    <div className="ml-4"><span className="text-[#729E8C]">AVG</span><span className="text-[#B8D8D0]">(c.acquisition_cost) as cac</span></div>
    <div><span className="text-[#729E8C]">FROM</span><span className="text-[#B8D8D0]"> orders o</span></div>
    <div><span className="text-[#729E8C]">JOIN</span><span className="text-[#B8D8D0]"> products p ON o.product_id = p.id</span></div>
    <div><span className="text-[#729E8C]">JOIN</span><span className="text-[#B8D8D0]"> customer_acquisition c ON o.customer_id = c.customer_id</span></div>
    <div><span className="text-[#729E8C]">WHERE</span></div>
    <div className="ml-4"><span className="text-[#729E8C]">EXTRACT</span><span className="text-[#B8D8D0]">(YEAR FROM o.order_date) = 2023</span></div>
    <div className="ml-4"><span className="text-[#729E8C]">AND</span><span className="text-[#B8D8D0]"> o.region = 'NA'</span></div>
    <div><span className="text-[#729E8C]">GROUP BY</span></div>
    <div className="ml-4"><span className="text-[#B8D8D0]">p.product_line,</span></div>
    <div className="ml-4"><span className="text-[#729E8C]">DATE_TRUNC</span><span className="text-[#B8D8D0]">('quarter', o.order_date)</span></div>
  </div>
);

export function OQLTransformation() {
  const [animate, setAnimate] = useState(false);
  const [showSQL, setShowSQL] = useState(false);
  const transformationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          setTimeout(() => setShowSQL(true), 800);
        }
      },
      { threshold: 0.3 }
    );

    if (transformationRef.current) {
      observer.observe(transformationRef.current);
    }

    return () => {
      if (transformationRef.current) {
        observer.unobserve(transformationRef.current);
      }
    };
  }, []);

  return (
    <div ref={transformationRef} className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Text variant="header" className="text-2xl mb-3">
          Ontology Query Language
        </Text>
        <Text color="secondary" theme="light" className="max-w-2xl mx-auto">
          OQL decouples logical intent from physical execution, enabling deterministic SQL generation
        </Text>
      </div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
        {/* OQL Card */}
        <div 
          className={`
            md:col-span-3 p-5 bg-[#0A1F1C] border border-[#729E8C]/20 shadow-md
            transition-all duration-700 ease-out
            ${animate ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-8'}
          `}
        >
          <div className="flex items-center justify-between mb-3">
            <Text variant="header" className="text-md text-[#B8D8D0]">
              OQL Query
            </Text>
            <div className="px-2 py-1 bg-black/20 text-xs text-[#B8D8D0]">3 lines</div>
          </div>
          <OQLSyntax />
        </div>
        
        {/* Arrow indicator */}
        <div 
          className={`
            hidden md:flex justify-center md:col-span-1 text-[#729E8C]
            transition-all duration-500 delay-500
            ${animate ? 'opacity-100 transform-none' : 'opacity-0'}
          `}
        >
          <ArrowRight size={24} className="animate-pulse" />
        </div>
        
        {/* SQL Card */}
        <div 
          className={`
            md:col-span-3 p-5 bg-[#0A1F1C] border border-[#729E8C]/20 shadow-md
            transition-all duration-700 delay-700 ease-out
            ${showSQL ? 'opacity-100 transform-none' : 'opacity-0 translate-x-8'}
          `}
        >
          <div className="flex items-center justify-between mb-3">
            <Text variant="header" className="text-md text-[#B8D8D0]">
              Generated SQL
            </Text>
            <div className="px-2 py-1 bg-black/20 text-xs text-[#B8D8D0]">18 lines</div>
          </div>
          <SQLSyntax />
        </div>
      </div>

      {/* Transformation indicators */}
      <div className="mt-8 flex justify-center space-x-8">
        {["Resolve metrics", "Enforce joins", "Inject permissions"].map((label, index) => (
          <div 
            key={index} 
            className={`
              flex items-center text-sm
              transition-all duration-500 ease-out delay-${(index + 1) * 300}
              ${showSQL ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}
            `}
          >
            <div className="w-2 h-2 bg-[#0f8a7a] mr-2"></div>
            <span className="text-[#729E8C]">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Text color="secondary" theme="light" className="text-sm mx-auto">
        The graph structure enables provable correctness. Joins are path-constrained; metrics are formulaically deterministic.
        </Text>
      </div>
    </div>
  );
} 
