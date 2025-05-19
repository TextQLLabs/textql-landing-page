import { useState } from 'react';
import { Button, Input, Select, Text } from '../../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface MeetingFormProps {
  selectedOptions: string[];
  showDemo?: boolean;
  onClose: () => void;
}

const TITLE_OPTIONS = [
  { value: 'cxo', label: 'CXO' },
  { value: 'vp_data_or_analytics', label: 'VP of Data / Analytics' },
  { value: 'data_team_lead', label: 'Data Team Lead' },
  { value: 'other', label: 'Other (please specify)' }
];

const COMPANY_SIZE_OPTIONS = [
  { value: '1-50', label: '1–50' },
  { value: '51-200', label: '51–200' },
  { value: '201-500', label: '201–500' },
  { value: '501-1000', label: '501–1,000' },
  { value: '1001-5000', label: '1,001–5,000' },
  { value: '5000+', label: '5,000+ employees' }
];

const BI_TOOLS = ['Tableau', 'PowerBI', 'Looker', 'Sigma', 'Hex', 'Other'];

export function MeetingForm({ selectedOptions, showDemo, onClose }: MeetingFormProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyEmail: '',
    title: '',
    otherTitle: '',
    companySize: '',
    biTools: new Set<string>(),
    otherBiTool: '',
    useCase: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    onClose();
  };

  const handleBiToolToggle = (tool: string) => {
    const newTools = new Set(formData.biTools);
    if (newTools.has(tool)) {
      newTools.delete(tool);
    } else {
      newTools.add(tool);
    }
    setFormData(prev => ({ ...prev, biTools: newTools }));
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage === 1 && isPage1Valid) {
      setCurrentPage(2);
    }
  };

  const handlePrevPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  const isPage1Valid = formData.firstName && 
                      formData.lastName && 
                      formData.companyName && 
                      formData.companyEmail &&
                      formData.title;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-8">
        <div className={`h-1 flex-1 rounded ${currentPage === 1 ? 'bg-[#B8D8D0]' : 'bg-[#B8D8D0]/20'}`} />
        <div className={`h-1 flex-1 rounded ${currentPage === 2 ? 'bg-[#B8D8D0]' : 'bg-[#B8D8D0]/20'}`} />
      </div>

      {currentPage === 1 ? (
        <>
          <Text variant="header" className="text-xl mb-6">
            Basic Information
          </Text>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>

          {/* Company Fields */}
          <Input
            label="Company Name"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            required
          />

          <Input
            label="Company Email"
            type="email"
            value={formData.companyEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, companyEmail: e.target.value }))}
            required
          />

          {/* Title Selection */}
          <Select
            label="Title"
            options={TITLE_OPTIONS}
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />

          {formData.title === 'other' && (
            <Input
              label="Please specify your title"
              value={formData.otherTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, otherTitle: e.target.value }))}
              required
            />
          )}
        </>
      ) : (
        <>
          <Text variant="header" className="text-xl mb-6">
            Company Details
          </Text>

          {/* Company Size */}
          <Select
            label="Company Size"
            options={COMPANY_SIZE_OPTIONS}
            value={formData.companySize}
            onChange={(e) => setFormData(prev => ({ ...prev, companySize: e.target.value }))}
            required
          />

          {/* BI Tools */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#B8D8D0]/80 mb-2">
              BI Tools Used
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BI_TOOLS.map(tool => (
                <div
                  key={tool}
                  onClick={() => handleBiToolToggle(tool)}
                  className={`
                    p-3 border cursor-pointer transition-all
                    ${formData.biTools.has(tool)
                      ? 'border-[#B8D8D0] bg-[#B8D8D0]/10 text-[#B8D8D0]'
                      : 'border-[#B8D8D0]/20 hover:border-[#B8D8D0]/40 text-[#B8D8D0]/60'
                    }
                  `}
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>

          {formData.biTools.has('Other') && (
            <Input
              label="Please specify other BI tools"
              value={formData.otherBiTool}
              onChange={(e) => setFormData(prev => ({ ...prev, otherBiTool: e.target.value }))}
              required
            />
          )}

          {/* Use Case */}
          <Input
            label="What problem are you hoping to solve with faster insights from your BI stack?"
            as="textarea"
            value={formData.useCase}
            onChange={(e) => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
            rows={4}
          />
        </>
      )}

      {/* Form Actions */}
      <div className="flex justify-between gap-4">
        {currentPage === 1 ? (
          <>
            <Button 
              variant="ghost" 
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleNextPage}
              disabled={!isPage1Valid}
              className="group"
              type="button"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={handlePrevPage}
              className="group"
              type="button"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>
            <Button 
              type="submit"
              variant="primary"
              loading={isSubmitting}
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </form>
  );
}