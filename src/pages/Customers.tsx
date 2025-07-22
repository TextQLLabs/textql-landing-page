import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useStickyScroll } from '../hooks/useStickyScroll';
import { ArrowRight, Search, X, Building2, Users, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Badge } from '../components/ui/Badge';
import { DebugWrapper } from '../components/DebugWrapper';
import { PageDebugWrapper } from '../components/PageDebugWrapper';
import { CTA } from '../components/sections';
import { Carousel } from '../components/ui/Carousel';
import { Section } from '../components/ui/Section';
import { useComponentTheme } from '../hooks/useComponentTheme';

// Data source logos
const dataSourceLogos = [
  { src: '/images/logos/snowflake-white.png', alt: 'Snowflake' },
  { src: '/images/logos/databricks-nobg.png', alt: 'Databricks' },
  { src: '/images/logos/powerbi-white.png', alt: 'Power BI' },
  { src: '/images/logos/looker-white.png', alt: 'Looker' },
  { src: '/images/logos/tableau-white.png', alt: 'Tableau' },
  { src: '/images/logos/aws-white.png', alt: 'AWS' },
  { src: '/images/logos/gcp-white.png', alt: 'Google Cloud' },
  { src: '/images/logos/azure-white.png', alt: 'Microsoft Azure' }
];

// Customer data with enhanced structure
const customerStories = [
  {
    id: 'jpmorgan-chase',
    company: 'JPMorgan Chase',
    industry: 'Financial Services',
    size: 'Enterprise',
    products: ['Ana Analytics', 'AI Agents', 'Enterprise API'],
    painPoints: ['Risk Analysis', 'Fraud Detection', 'Compliance'],
    executive: {
      name: 'Sarah Chen',
      role: 'Chief Data Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400'
    },
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=200',
    metric: '87%',
    metricLabel: 'faster risk analysis',
    summary: 'Transformed risk analysis across millions of transactions with AI-powered insights.',
    featured: true
  },
  {
    id: 'walmart',
    company: 'Walmart',
    industry: 'Retail',
    size: 'Enterprise',
    products: ['Ana Analytics', 'Supply Chain AI', 'Predictive Analytics'],
    painPoints: ['Inventory Management', 'Supply Chain', 'Demand Forecasting'],
    executive: {
      name: 'Michael Rodriguez',
      role: 'VP of Supply Chain Analytics',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400'
    },
    logo: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=200',
    metric: '$2.1B',
    metricLabel: 'in cost savings',
    summary: 'Optimized inventory across 4,700 stores with real-time AI analytics.',
    featured: true
  },
  {
    id: 'unitedhealth',
    company: 'UnitedHealth Group',
    industry: 'Healthcare',
    size: 'Enterprise',
    products: ['Ana Analytics', 'Clinical AI', 'Patient Analytics'],
    painPoints: ['Patient Outcomes', 'Cost Reduction', 'Care Optimization'],
    executive: {
      name: 'Dr. Emily Watson',
      role: 'Director of Clinical Analytics',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400'
    },
    logo: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=200',
    metric: '45%',
    metricLabel: 'reduction in readmissions',
    summary: 'Predicted patient outcomes and optimized care pathways with AI.',
    featured: true
  },
  {
    id: 'amazon',
    company: 'Amazon',
    industry: 'E-commerce',
    size: 'Enterprise',
    products: ['Ana Analytics', 'Customer AI', 'Logistics AI'],
    painPoints: ['Customer Experience', 'Logistics', 'Personalization'],
    executive: {
      name: 'Lisa Park',
      role: 'VP of Data Science',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400'
    },
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=200',
    metric: '62%',
    metricLabel: 'improvement in delivery predictions',
    summary: 'Enhanced customer experience with AI-driven logistics optimization.',
    featured: false
  },
  {
    id: 'netflix',
    company: 'Netflix',
    industry: 'Media & Entertainment',
    size: 'Enterprise',
    products: ['Ana Analytics', 'Content AI', 'User Analytics'],
    painPoints: ['Content Recommendations', 'User Engagement', 'Churn Reduction'],
    executive: {
      name: 'David Kim',
      role: 'Director of Personalization',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400'
    },
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200',
    metric: '35%',
    metricLabel: 'increase in engagement',
    summary: 'Revolutionized content recommendations with advanced AI algorithms.',
    featured: false
  },
  {
    id: 'tesla',
    company: 'Tesla',
    industry: 'Manufacturing',
    size: 'Enterprise',
    products: ['Ana Analytics', 'Production AI', 'Quality Analytics'],
    painPoints: ['Production Efficiency', 'Quality Control', 'Predictive Maintenance'],
    executive: {
      name: 'Robert Chang',
      role: 'Head of Manufacturing Analytics',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'
    },
    logo: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=200',
    metric: '58%',
    metricLabel: 'reduction in downtime',
    summary: 'Optimized production lines with predictive analytics and AI.',
    featured: false
  },
  {
    id: 'stripe',
    company: 'Stripe',
    industry: 'Fintech',
    size: 'Mid-market',
    products: ['Ana Analytics', 'Fraud AI', 'Transaction Analytics'],
    painPoints: ['Fraud Prevention', 'Transaction Analysis', 'Risk Assessment'],
    executive: {
      name: 'Jennifer Wu',
      role: 'VP of Risk',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400'
    },
    logo: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?q=80&w=200',
    metric: '93%',
    metricLabel: 'fraud detection accuracy',
    summary: 'Built industry-leading fraud detection with AI-powered analytics.',
    featured: false
  },
  {
    id: 'airbnb',
    company: 'Airbnb',
    industry: 'Travel & Hospitality',
    size: 'Enterprise',
    products: ['Ana Analytics', 'Pricing AI', 'Market Analytics'],
    painPoints: ['Dynamic Pricing', 'Market Analysis', 'Host Success'],
    executive: {
      name: 'Carlos Mendez',
      role: 'Director of Pricing Strategy',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=400'
    },
    logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=200',
    metric: '41%',
    metricLabel: 'increase in host revenue',
    summary: 'Revolutionized dynamic pricing with AI market analysis.',
    featured: false
  }
];

// Filter options
const industries = ['All Industries', 'Financial Services', 'Retail', 'Healthcare', 'E-commerce', 'Media & Entertainment', 'Manufacturing', 'Fintech', 'Travel & Hospitality'];
const companySizes = ['All Sizes', 'Enterprise', 'Mid-market', 'Small Business'];
const products = ['All Products', 'Ana Analytics', 'AI Agents', 'Enterprise API', 'Supply Chain AI', 'Clinical AI', 'Customer AI'];
const painPoints = ['All Pain Points', 'Risk Analysis', 'Fraud Detection', 'Inventory Management', 'Patient Outcomes', 'Customer Experience', 'Production Efficiency'];

export default function Customers() {
  const theme = useComponentTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const [selectedPainPoint, setSelectedPainPoint] = useState('All Pain Points');
  const [showFilters, setShowFilters] = useState(false);
  const [titleFontSize, setTitleFontSize] = useState('4rem');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Sticky scroll behavior for featured story
  const stickyScroll = useStickyScroll({
    topOffset: 60, // navbar height
    additionalScrollHeight: 400 // extra scroll distance while sticky
  });
  
  // Dynamic font sizing to fill container width
  useEffect(() => {
    const resizeTitle = () => {
      if (!containerRef.current || !titleRef.current) return;
      
      const container = containerRef.current;
      const title = titleRef.current;
      
      const containerWidth = container.clientWidth;
      let fontSize = 50; // Start with 50px
      
      // Binary search for optimal font size
      let minSize = 20;
      let maxSize = 500;
      
      while (maxSize - minSize > 1) {
        fontSize = Math.floor((minSize + maxSize) / 2);
        title.style.fontSize = `${fontSize}px`;
        
        if (title.scrollWidth <= containerWidth) {
          minSize = fontSize;
        } else {
          maxSize = fontSize;
        }
      }
      
      setTitleFontSize(`${minSize}px`);
    };
    
    // Initial resize
    resizeTitle();
    
    // Resize on window resize
    window.addEventListener('resize', resizeTitle);
    
    // Cleanup
    return () => window.removeEventListener('resize', resizeTitle);
  }, []);

  // Filter customers based on all criteria
  const filteredCustomers = useMemo(() => {
    return customerStories.filter(customer => {
      const matchesSearch = searchQuery === '' || 
        customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.executive.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesIndustry = selectedIndustry === 'All Industries' || customer.industry === selectedIndustry;
      const matchesSize = selectedSize === 'All Sizes' || customer.size === selectedSize;
      const matchesProduct = selectedProduct === 'All Products' || customer.products.includes(selectedProduct);
      const matchesPainPoint = selectedPainPoint === 'All Pain Points' || customer.painPoints.includes(selectedPainPoint);
      
      return matchesSearch && matchesIndustry && matchesSize && matchesProduct && matchesPainPoint;
    });
  }, [searchQuery, selectedIndustry, selectedSize, selectedProduct, selectedPainPoint]);

  // Count active filters
  const activeFilterCount = [selectedIndustry, selectedSize, selectedProduct, selectedPainPoint]
    .filter(filter => !filter.startsWith('All')).length;

  return (
    <PageDebugWrapper pageName="Customers">
      <div className="min-h-screen bg-gray-50">
        <SEO 
          title="Customer Success Stories | TextQL"
          description="See how Fortune 500 companies transform their operations with TextQL's AI analytics platform"
          canonical="https://textql.com/customers/"
          ogImage="https://textql.com/social-preview.png"
        />
      
      {/* Debug Viewport Box - Fixed to viewport, not scrolling content */}
      <div 
        className="fixed left-0 w-full pointer-events-none z-[45]"
        style={{
          top: '60px',
          height: 'calc(100vh - 60px)'
        }}
      >
        <DebugWrapper label="Viewport" color="red" className="w-full h-full">
          <div className="w-full h-full" />
        </DebugWrapper>
      </div>

      {/* Full-width Customer Stories Header - Matches navbar width */}
      <DebugWrapper label="Customer Stories Header" color="purple">
        <Section 
          variant="wide"
          paddingTop="navbar"
          paddingBottom="sm"
          background="white"
        >
            <div ref={containerRef} className="text-center w-full px-0">
              <h1 
                ref={titleRef}
                className="font-light text-gray-900 mb-4 leading-none whitespace-nowrap block" 
                style={{ 
                  fontSize: titleFontSize,
                  width: '100%',
                  letterSpacing: '-0.02em'
                }}
              >
                Customer Stories
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed mb-12">
                Join 500+ companies using TextQL to transform their data operations
              </p>
              
              {/* Logo Carousel - Moved from content section */}
              <DebugWrapper label="Header Carousel" color="orange">
                <div className="relative overflow-hidden">
                  <div className="flex animate-scroll-x">
                    {[...customerStories, ...customerStories].map((customer, idx) => (
                      <div key={`${customer.id}-${idx}`} className="flex-shrink-0 px-4">
                        <img 
                          src={customer.logo} 
                          alt={customer.company}
                          className="h-6 w-auto grayscale opacity-40 hover:opacity-60 hover:grayscale-0 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Gradient overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                </div>
              </DebugWrapper>
            </div>
        </Section>
      </DebugWrapper>

      {/* Customer Stories Section */}
      <Section 
        variant="wide"
        paddingTop="xs"
        paddingBottom="md"
        background="white"
      >
          <div className="mb-8">
            {/* Subheader and Carousel on same line */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="lg:w-1/2 lg:max-w-md">
                <Carousel 
                  items={dataSourceLogos} 
                  gradientColor="white"
                  className="h-8"
                  itemClassName="h-6 opacity-40 hover:opacity-70"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Side - NBA Featured Story */}
            <div>
              {/* Just the rounded image */}
              <div className="relative rounded-2xl overflow-hidden h-[40rem] bg-gray-100">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?q=80&w=1200')`
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50"></div>
                
                {/* Company Logo - Real NBA logo */}
                <div className="absolute top-6 left-6">
                  <img 
                    src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/73e2845d-8b6a-429d-7c90-6b79b8cf8800/public"
                    alt="NBA"
                    className="h-12 w-auto"
                    style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                  />
                </div>
                
                {/* Large Metric */}
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-8xl font-light mb-2">73%</div>
                  <div className="text-xl">improvement in player performance analytics</div>
                </div>
              </div>
              
              {/* Text below the image */}
              <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-900">National Basketball Association</h3>
              </div>
            </div>
            
            {/* Right Side - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Lumeris */}
              <div>
                {/* Just the rounded image */}
                <div className="relative rounded-2xl overflow-hidden h-[30rem] bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50"></div>
                  
                  {/* Company Logo - White text */}
                  <div className="absolute top-4 left-4">
                    <div className="text-white text-2xl font-bold">Lumeris</div>
                  </div>
                  
                  {/* Large Metric */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-4xl font-light mb-1">45%</div>
                    <div className="text-sm">faster claims processing</div>
                  </div>
                </div>
                
                {/* Text below the image */}
                <div className="mt-3">
                  <h4 className="text-lg font-medium text-gray-900">Healthcare Technology</h4>
                </div>
              </div>
              
              {/* Scale AI */}
              <div>
                {/* Just the rounded image */}
                <div className="relative rounded-2xl overflow-hidden h-[30rem] bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1720048171419-b515a96a73b8?q=80&w=800')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50"></div>
                  
                  {/* Company Logo - Real Scale AI logo */}
                  <div className="absolute top-4 left-4">
                    <img 
                      src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/0af61563-d6d9-49ff-b086-cc703757d600/public"
                      alt="Scale AI"
                      className="h-8 w-auto"
                      style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                    />
                  </div>
                  
                  {/* Large Metric */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-4xl font-light mb-1">89%</div>
                    <div className="text-sm">model training efficiency</div>
                  </div>
                </div>
                
                {/* Text below the image */}
                <div className="mt-3">
                  <h4 className="text-lg font-medium text-gray-900">AI Infrastructure</h4>
                </div>
              </div>
              
              {/* Anheuser-Busch */}
              <div>
                {/* Just the rounded image */}
                <div className="relative rounded-2xl overflow-hidden h-[30rem] bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=800')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50"></div>
                  
                  {/* Company Logo - White text */}
                  <div className="absolute top-4 left-4">
                    <div className="text-white text-2xl font-bold">Anheuser-Busch</div>
                  </div>
                  
                  {/* Large Metric */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-4xl font-light mb-1">$12M</div>
                    <div className="text-sm">supply chain savings</div>
                  </div>
                </div>
                
                {/* Text below the image */}
                <div className="mt-3">
                  <h4 className="text-lg font-medium text-gray-900">Beverage Manufacturing</h4>
                </div>
              </div>
              
              {/* CTA Card */}
              <div>
                {/* Just the rounded image */}
                <div className="relative rounded-2xl overflow-hidden h-[30rem] bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#729E8C]/80 to-[#5a8070]/90"></div>
                  
                  {/* Large Text */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-4xl font-light mb-1">Ready to</div>
                    <div className="text-sm">join them?</div>
                  </div>
                </div>
                
                {/* Text below the image */}
                <div className="mt-3">
                  <h4 className="text-lg font-medium text-gray-900">Get Started</h4>
                </div>
              </div>
              
            </div>
          </div>
      </Section>

      {/* Optional: Filters Section (Hidden by default, can be toggled) */}
      {showFilters && (
        <DebugWrapper label="Filters Section" color="purple">
          <Section 
            variant="narrow"
            padding="xs"
            className="bg-gray-50"
          >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Filter Customer Stories</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => {
                        setSelectedIndustry('All Industries');
                        setSelectedSize('All Sizes');
                        setSelectedProduct('All Products');
                        setSelectedPainPoint('All Pain Points');
                      }}
                      className="text-sm text-[#729E8C] hover:underline"
                    >
                      Clear all ({activeFilterCount})
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Industry Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#729E8C]/20"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Company Size Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#729E8C]/20"
                    >
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Product Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Products Used</label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#729E8C]/20"
                    >
                      {products.map(product => (
                        <option key={product} value={product}>{product}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Pain Point Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pain Points</label>
                    <select
                      value={selectedPainPoint}
                      onChange={(e) => setSelectedPainPoint(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#729E8C]/20"
                    >
                      {painPoints.map(painPoint => (
                        <option key={painPoint} value={painPoint}>{painPoint}</option>
                      ))}
                    </select>
                  </div>
                </div>
          </Section>
        </DebugWrapper>
      )}


      {/* CTA Section */}
      <DebugWrapper label="CTA Section" color="orange">
        <CTA 
          theme={theme}
          showWave={true}
          heading="Ready to Transform Your Data Operations?"
          subheader="Join hundreds of companies achieving remarkable results with TextQL"
        />
      </DebugWrapper>

      </div>
    </PageDebugWrapper>
  );
}