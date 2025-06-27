import React, { useState, useMemo } from 'react';
import { ArrowRight, Search, X, Building2, Users, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Badge } from '../components/ui/Badge';
import { DebugWrapper } from '../components/DebugWrapper';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const [selectedPainPoint, setSelectedPainPoint] = useState('All Pain Points');
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Customer Success Stories | TextQL"
        description="See how Fortune 500 companies transform their operations with TextQL's AI analytics platform"
        canonical="https://textql.com/customers/"
        ogImage="https://textql.com/social-preview.png"
      />
      
      {/* Hero Section with Logo Carousel */}
      <DebugWrapper label="Hero Section" color="blue">
        <section className="relative pt-24 pb-16 bg-[#F7F7F7] border-b">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4">
                Customer Success Stories
              </h1>
              <p className="text-xl text-gray-600">
                Join 500+ companies using TextQL to transform their data operations
              </p>
            </div>
            
            {/* Logo Carousel */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-x">
                {[...customerStories, ...customerStories].map((customer, idx) => (
                  <div key={`${customer.id}-${idx}`} className="flex-shrink-0 px-8">
                    <img 
                      src={customer.logo} 
                      alt={customer.company}
                      className="h-12 w-auto grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all"
                    />
                  </div>
                ))}
              </div>
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>
        </section>
      </DebugWrapper>

      {/* Search and Filters Bar */}
      <DebugWrapper label="Search & Filters" color="green">
        <section className="sticky top-0 z-40 bg-[#F7F7F7] border-b shadow-sm">
          <div className="container mx-auto px-8 lg:px-16 py-4">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by company, industry, or use case..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#729E8C]/20 focus:border-[#729E8C]"
                />
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  showFilters ? 'bg-[#729E8C] text-white border-[#729E8C]' : 'hover:bg-gray-50'
                }`}
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#F7F7F7] text-[#729E8C] text-xs rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>
      </DebugWrapper>

      {/* Main Content Area */}
      <div className="container mx-auto px-8 lg:px-16 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <DebugWrapper label="Filters Sidebar" color="purple">
              <aside className="w-64 flex-shrink-0">
                <div className="bg-[#F7F7F7] rounded-lg p-6 shadow-sm sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Filters</h3>
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
                        Clear all
                      </button>
                    )}
                  </div>
                  
                  {/* Industry Filter */}
                  <div className="mb-6">
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
                  <div className="mb-6">
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
                  <div className="mb-6">
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
              </aside>
            </DebugWrapper>
          )}
          
          {/* Customer Cards Grid */}
          <DebugWrapper label="Customer Grid" color="red">
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Showing {filteredCustomers.length} of {customerStories.length} customer stories
                </p>
              </div>
              
              {/* Customer Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers.map((customer) => (
                  <Link
                    key={customer.id}
                    to={`/customers/${customer.id}`}
                    className="group bg-[#F7F7F7] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Executive Image */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                      <img 
                        src={customer.executive.image} 
                        alt={customer.executive.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Company Logo Overlay */}
                      <div className="absolute bottom-4 left-4 bg-[#F7F7F7]/90 backdrop-blur-sm rounded-lg p-3">
                        <img 
                          src={customer.logo} 
                          alt={customer.company}
                          className="h-6 w-auto"
                        />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" size="sm">{customer.industry}</Badge>
                        <Badge variant="secondary" size="sm">{customer.size}</Badge>
                      </div>
                      
                      {/* Company Name */}
                      <h3 className="text-xl font-medium text-gray-900 mb-2">{customer.company}</h3>
                      
                      {/* Metric */}
                      <div className="mb-3">
                        <span className="text-3xl font-light text-[#729E8C]">{customer.metric}</span>
                        <span className="block text-sm text-gray-600">{customer.metricLabel}</span>
                      </div>
                      
                      {/* Summary */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {customer.summary}
                      </p>
                      
                      {/* Executive Info */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{customer.executive.name}</div>
                          <div className="text-xs text-gray-600">{customer.executive.role}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#729E8C] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Empty State */}
              {filteredCustomers.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 mb-4">No customer stories match your filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedIndustry('All Industries');
                      setSelectedSize('All Sizes');
                      setSelectedProduct('All Products');
                      setSelectedPainPoint('All Pain Points');
                    }}
                    className="text-[#729E8C] hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </DebugWrapper>
        </div>
      </div>

      {/* Stats Section */}
      <DebugWrapper label="Stats Section" color="yellow">
        <section className="py-16 bg-[#F7F7F7] border-t">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Building2 className="w-8 h-8 text-[#729E8C] mx-auto mb-3" />
                <div className="text-4xl font-light text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Enterprise Customers</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-[#729E8C] mx-auto mb-3" />
                <div className="text-4xl font-light text-gray-900 mb-1">2M+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-[#729E8C] mx-auto mb-3" />
                <div className="text-4xl font-light text-gray-900 mb-1">87%</div>
                <div className="text-sm text-gray-600">Avg. Efficiency Gain</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-[#729E8C] mx-auto mb-3" />
                <div className="text-4xl font-light text-gray-900 mb-1">4.9/5</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </section>
      </DebugWrapper>

      {/* CTA Section */}
      <DebugWrapper label="CTA Section" color="orange">
        <section className="py-16 bg-[#0A1F1C]">
          <div className="container mx-auto px-8 lg:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Ready to Transform Your Data Operations?
            </h2>
            <p className="text-lg text-[#B8D8D0] mb-8 max-w-2xl mx-auto">
              Join hundreds of companies achieving remarkable results with TextQL
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/demo" 
                className="px-6 py-3 bg-[#B8D8D0] text-[#0A1F1C] font-medium rounded-lg hover:bg-[#A5C5BD] transition-colors"
              >
                See Ana in Action
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 border border-[#B8D8D0] text-[#B8D8D0] font-medium rounded-lg hover:bg-[#B8D8D0]/10 transition-colors"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>
      </DebugWrapper>

    </div>
  );
}