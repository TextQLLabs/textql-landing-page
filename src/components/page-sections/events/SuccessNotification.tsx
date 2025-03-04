import { Check } from 'lucide-react';

interface SuccessNotificationProps {
  show: boolean;
  message: string;
}

export function SuccessNotification({ show, message }: SuccessNotificationProps) {
  if (!show) return null;

  return (
    <div className="absolute left-0 right-0 -bottom-12 flex items-center gap-2 text-emerald-400 bg-emerald-400/10 backdrop-blur-sm py-2 px-3 rounded animate-fade-in">
      <Check className="w-4 h-4" />
      <span className="text-sm">{message}</span>
    </div>
  );
}