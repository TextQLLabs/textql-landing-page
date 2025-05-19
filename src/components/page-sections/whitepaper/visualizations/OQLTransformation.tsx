import { useState, useEffect, useRef } from 'react';
import { Text } from '../../../ui';
import { ArrowRight } from 'lucide-react';

// Simplified OQL example with proper syntax highlighting
const OQLSyntax = () => (
  <div className="font-mono text-sm">
    <div>
      <span className="text-[#0F8A7A]">METRICS</span>
      <span className="text-[#2A3B35]"> NetRevenue, CAC</span>
    </div>
    <div>
      <span className="text-[#0F8A7A]">DIMENSIONS</span>
      <span className="text-[#2A3B35]"> ProductLine (QUARTER)</span>
    </div>
    <div>
      <span className="text-[#0F8A7A]">FILTER</span>
      <span className="text-[#2A3B35]"> FiscalYear=2023 AND Region="NA"</span>
    </div>
  </div>
);

// SQL with syntax highlighting
const SQLSyntax = () => (
  <div className="font-mono text-sm overflow-x-auto">
    <div className="whitespace-pre-wrap">
      <div><span className="text-[#0F8A7A]">SELECT</span> <span className="text-[#2A3B35]">p.product_line,</span></div>
      <div><span className="text-[#0F8A7A]">      DATE_TRUNC</span><span className="text-[#2A3B35]">('quarter', o.order_date) as quarter,</span></div>
      <div><span className="text-[#0F8A7A]">      SUM</span><span className="text-[#2A3B35]">(</span><span className="text-[#0F8A7A]">CASE</span></div>
      <div><span className="text-[#0F8A7A]">          WHEN</span> <span className="text-[#2A3B35]">o.status = 'completed'</span></div>
      <div><span className="text-[#0F8A7A]">          THEN</span> <span className="text-[#2A3B35]">o.revenue - o.returns - o.discounts</span></div>
      <div><span className="text-[#0F8A7A]">          ELSE</span> <span className="text-[#2A3B35]">0</span></div>
      <div><span className="text-[#2A3B35]">      END) as net_revenue,</span></div>
      <div><span className="text-[#0F8A7A]">      AVG</span><span className="text-[#2A3B35]">(c.acquisition_cost) as cac</span></div>
      <div><span className="text-[#0F8A7A]">FROM</span> <span className="text-[#2A3B35]">orders o</span></div>
      <div><span className="text-[#0F8A7A]">JOIN</span> <span className="text-[#2A3B35]">products p ON o.product_id = p.id</span></div>
      <div><span className="text-[#0F8A7A]">JOIN</span> <span className="text-[#2A3B35]">customer_acquisition c ON o.customer_id = c.customer_id</span></div>
      <div><span className="text-[#0F8A7A]">WHERE</span> <span className="text-[#0F8A7A]">EXTRACT</span><span className="text-[#2A3B35]">(YEAR FROM o.order_date) = 2023</span></div>
      <div><span className="text-[#0F8A7A]">  AND</span> <span className="text-[#2A3B35]">o.region = 'NA'</span></div>
      <div><span className="text-[#0F8A7A]">GROUP BY</span> <span className="text-[#2A3B35]">p.product_line,</span></div>
      <div><span className="text-[#0F8A7A]">        DATE_TRUNC</span><span className="text-[#2A3B35]">('quarter', o.order_date)</span></div>
    </div>
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
    <div ref={transformationRef} className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Text variant="header" className="text-2xl mb-3 text-[#0F8A7A]">
          Ontology Query Language
        </Text>
        <Text color="secondary" className="max-w-2xl mx-auto text-[#2A3B35]">
          OQL decouples logical intent from physical execution, enabling deterministic SQL generation
        </Text>
      </div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
        {/* OQL Card */}
        <div 
          className={`
            md:col-span-3 p-5 bg-white border border-[#E5E5E5] shadow-sm
            transition-all duration-700 ease-out
            ${animate ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-8'}
          `}
        >
          <div className="flex items-center justify-between mb-3 bg-[#F7F7F7] -m-5 mb-5 p-3 border-b border-[#E5E5E5]">
            <Text variant="header" className="text-md text-[#0F8A7A]">
              OQL Query
            </Text>
            <div className="px-2 py-1 bg-[#B8D8D0]/10 text-xs text-[#2A3B35]">3 lines</div>
          </div>
          <OQLSyntax />
        </div>
        
        {/* Arrow indicator */}
        <div 
          className={`
            hidden md:flex justify-center md:col-span-1 text-[#0F8A7A]
            transition-all duration-500 delay-500
            ${animate ? 'opacity-100 transform-none' : 'opacity-0'}
          `}
        >
          <ArrowRight size={24} className="animate-pulse" />
        </div>
        
        {/* SQL Card */}
        <div 
          className={`
            md:col-span-3 p-5 bg-white border border-[#E5E5E5] shadow-sm overflow-hidden
            transition-all duration-700 delay-700 ease-out
            ${showSQL ? 'opacity-100 transform-none' : 'opacity-0 translate-x-8'}
          `}
        >
          <div className="flex items-center justify-between mb-3 bg-[#F7F7F7] -m-5 mb-5 p-3 border-b border-[#E5E5E5]">
            <Text variant="header" className="text-md text-[#0F8A7A]">
              Generated SQL
            </Text>
            <div className="px-2 py-1 bg-[#B8D8D0]/10 text-xs text-[#2A3B35]">7 lines</div>
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
            <div className="w-2 h-2 bg-[#0F8A7A] mr-2"></div>
            <span className="text-[#2A3B35]">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Text color="secondary" className="text-sm mx-auto text-[#2A3B35]">
          The graph structure enables provable correctness. Joins are path-constrained; metrics are formulaically deterministic.
        </Text>
      </div>
    </div>
  );
} 
