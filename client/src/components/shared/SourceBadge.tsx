import type { LeadSource } from '../../types';

const SOURCE_ICONS: Record<LeadSource, string> = {
  website:  '🌐',
  referral: '🤝',
  social:   '📱',
  email:    '📧',
  phone:    '📞',
  other:    '📌',
};

interface SourceBadgeProps {
  source: LeadSource;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source }) => (
  <span className="flex items-center gap-1.5 capitalize" style={{ color: 'var(--text-2)' }}>
    <span>{SOURCE_ICONS[source] ?? '📌'}</span>
    {source}
  </span>
);
