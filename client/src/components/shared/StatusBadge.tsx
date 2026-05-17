import type { LeadStatus } from '../../types';

const STATUS_STYLES: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  new:       { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  contacted: { bg: '#f0fdf4', text: '#15803d', dot: '#22c55e' },
  qualified: { bg: '#faf5ff', text: '#7e22ce', dot: '#a855f7' },
  lost:      { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444' },
  won:       { bg: '#ecfdf5', text: '#065f46', dot: '#10b981' },
};

interface StatusBadgeProps {
  status: LeadStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.new;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
      style={{ background: style.bg, color: style.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: style.dot }}
      />
      {status}
    </span>
  );
};
