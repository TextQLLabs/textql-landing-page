import { useState, useEffect } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { SuccessNotification } from './SuccessNotification';

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail: string;
}

export function WaitlistForm({ isOpen, onClose, initialEmail }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Update email when initialEmail prop changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      email: initialEmail
    }));
  }, [initialEmail]);

  // Auto-close modal after success
  useEffect(() => {
    if (showSuccess) {
      setIsLoading(false);
      const timer = setTimeout(() => {
        onClose();
        // Reset form state after closing
        setShowSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          linkedin: ''
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || showSuccess) return;
    
    setIsLoading(true);
    
    try {
      // Artificial delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = await fetch('https://7c7613ab8c59.ngrok.app/api/event/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phoneNumber: formData.phone,
          linkedin: formData.linkedin
        })
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only prevent Enter key if it's not in a textarea
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault(); // Prevent form submission
      
      // Find the next input field
      const inputs = Array.from(document.querySelectorAll('input:not([type="submit"])'));
      const currentIndex = inputs.indexOf(e.target as HTMLInputElement);
      const nextInput = inputs[currentIndex + 1];
      
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      } else {
        // If we're on the last input, submit the form
        handleSubmit(e);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join the Waitlist">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          onKeyDown={handleKeyDown}
          required
          theme="dark"
          disabled={isLoading || showSuccess}
        />
        
        <Input
          label="Work Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          onKeyDown={handleKeyDown}
          required
          theme="dark"
          disabled={isLoading || showSuccess}
        />
        
        <Input
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          onKeyDown={handleKeyDown}
          required
          theme="dark"
          disabled={isLoading || showSuccess}
        />
        
        <Input
          label="LinkedIn Profile URL"
          type="url"
          value={formData.linkedin}
          onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
          onKeyDown={handleKeyDown}
          placeholder="https://linkedin.com/in/username"
          required
          theme="dark"
          disabled={isLoading || showSuccess}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button 
            variant="ghost" 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            loading={isLoading}
            disabled={isLoading || showSuccess}
          >
            Submit
          </Button>
        </div>

        {/* Success Notification */}
        <SuccessNotification 
          show={showSuccess} 
          message="Registration complete! Thank you for joining."
        />
      </form>
    </Modal>
  );
}