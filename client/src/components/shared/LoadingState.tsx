import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading…',
}) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3" style={{ color: 'var(--text-3)' }}>
    <Loader2 className="w-7 h-7 animate-spin text-indigo-500" />
    <p className="text-sm">{message}</p>
  </div>
);
