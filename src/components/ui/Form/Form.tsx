import { useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { Text } from '../Typography';
import type { FormData, FormProps } from './types';

export function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    workEmail: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="
        bg-[#004D40]/10 backdrop-blur-md
        border border-[#B8D8D0]/20
        p-8 rounded-sm
        relative
        before:absolute before:inset-0
        before:border before:border-[#B8D8D0]/10
        before:scale-[1.01] before:-z-10
        before:rounded-sm
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="FIRST NAME"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          required
        />
        <Input
          label="LAST NAME"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          required
        />
        <Input
          label="WORK EMAIL"
          type="email"
          value={formData.workEmail}
          onChange={(e) => setFormData(prev => ({ ...prev, workEmail: e.target.value }))}
          required
          className="md:col-span-2"
        />
        <Input
          label="COMPANY"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          required
          className="md:col-span-2"
        />
        <div className="md:col-span-2">
          <Input
            label="WHAT WOULD BE HELPFUL FOR US TO KNOW BEFORE YOUR CALL?"
            as="textarea"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="mt-8">
        <Button type="submit" variant="primary" fullWidth>
          Submit
        </Button>
      </div>

      <Text color="muted" className="mt-4 text-xs">
        By submitting this form you agree to the processing of your personal data as described in our{' '}
        <a href="/terms" className="text-[#B8D8D0] hover:text-[#B8D8D0]/80 underline">
          Terms
        </a>
        {' '}and our{' '}
        <a href="/privacy" className="text-[#B8D8D0] hover:text-[#B8D8D0]/80 underline">
          Privacy policy
        </a>
      </Text>
    </form>
  );
}