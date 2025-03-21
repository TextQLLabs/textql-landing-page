import { useState, useEffect } from 'react';
import { Text } from '../../../ui';

const oqlExample = `METRICS NetRevenue, CAC
DIMENSIONS ProductLine (QUARTER)
FILTER FiscalYear=2023 AND Region="NA"`;

const sqlExample = `SELECT 
  p.product_line,
  DATE_TRUNC('quarter', o.order_date) as quarter,
  SUM(CASE 
    WHEN o.status = 'completed' 
    THEN o.revenue - o.returns - o.discounts 
    ELSE 0 
  END) as net_revenue,
  AVG(c.acquisition_cost) as cac
FROM orders o
JOIN products p ON o.product_id = p.id
JOIN customer_acquisition c ON o.customer_id = c.customer_id
WHERE 
  EXTRACT(YEAR FROM o.order_date) = 2023
  AND o.region = 'NA'
GROUP BY 
  p.product_line,
  DATE_TRUNC('quarter', o.order_date)`;

export function OQLTransformation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <Text variant="header" className="text-2xl text-center mb-8">
        OQL Query Transformation
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* OQL Side */}
        <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <div className="bg-[#0D4A42]/50 border border-[#B8D8D0]/10 rounded-lg p-6 backdrop-blur-sm">
            <Text variant="header" className="text-lg mb-4 text-[#B8D8D0]">
              OQL Query
            </Text>
            <pre className="font-mono text-[#B8D8D0] whitespace-pre-wrap">
              {oqlExample}
            </pre>
          </div>
        </div>

        {/* SQL Side */}
        <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <div className="bg-[#0D4A42]/50 border border-[#B8D8D0]/10 rounded-lg p-6 backdrop-blur-sm">
            <Text variant="header" className="text-lg mb-4 text-[#B8D8D0]">
              Generated SQL
            </Text>
            <pre className="font-mono text-[#B8D8D0] whitespace-pre-wrap text-sm">
              {sqlExample}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 