import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0A1F1C] border border-[#B8D8D0]/20 p-8 z-50 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            {title && (
              <Dialog.Title className="text-2xl font-light text-[#B8D8D0]">
                {title}
              </Dialog.Title>
            )}
            <Dialog.Close className="text-[#B8D8D0] hover:text-[#B8D8D0]/80 transition-colors">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}