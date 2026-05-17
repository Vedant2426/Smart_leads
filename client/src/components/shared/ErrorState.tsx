import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong',
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3" style={{ color: 'var(--text-3)' }}>
    <AlertCircle className="w-7 h-7 text-red-400" />
    <p className="text-sm text-red-500">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn btn-secondary text-xs mt-1">
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </button>
    )}
  </div>
);
