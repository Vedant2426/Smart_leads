import { InboxIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-20 gap-3" style={{ color: 'var(--text-3)' }}>
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center"
      style={{ background: 'var(--surface-3)' }}
    >
      {icon ?? <InboxIcon className="w-7 h-7" style={{ color: 'var(--text-3)' }} />}
    </div>
    <div className="text-center">
      <p className="font-medium text-sm mb-0.5" style={{ color: 'var(--text-2)' }}>
        {title}
      </p>
      {description && <p className="text-xs">{description}</p>}
    </div>
    {action}
  </div>
);
