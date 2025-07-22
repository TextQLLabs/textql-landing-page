import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useComponentTheme } from '../../../hooks/useComponentTheme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Modal({ isOpen, onClose, children, title, description }: ModalProps) {
  const theme = useComponentTheme();
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={`fixed inset-0 backdrop-blur-sm z-50 ${theme === 'light' ? 'bg-black/50' : 'bg-black/50'}`} />
        <Dialog.Content className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-8 z-50 shadow-xl ${theme === 'light' ? 'bg-white border border-[#2A3B35]/20' : 'bg-[#0A1F1C] border border-[#B8D8D0]/20'}`}>
          <div className="flex items-center justify-between mb-6">
            {title && (
              <Dialog.Title className={`text-2xl font-light ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>
                {title}
              </Dialog.Title>
            )}
            <Dialog.Close className={`transition-colors ${theme === 'light' ? 'text-[#2A3B35] hover:text-[#2A3B35]/80' : 'text-[#B8D8D0] hover:text-[#B8D8D0]/80'}`}>
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description className="sr-only">
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}