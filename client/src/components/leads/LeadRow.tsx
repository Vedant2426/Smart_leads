import { Edit2, Trash2 } from 'lucide-react';
import type { Lead } from '../../types';
import { StatusBadge } from '../shared/StatusBadge';
import { SourceBadge } from '../shared/SourceBadge';

interface LeadRowProps {
  lead: Lead;
  isLast: boolean;
  canEdit: boolean;
  canDelete: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export const LeadRow: React.FC<LeadRowProps> = ({
  lead,
  isLast,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}) => (
  <tr
    className="group transition-colors"
    style={{
      borderBottom: isLast ? 'none' : '1px solid var(--border)',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-2)')}
    onMouseLeave={(e) => (e.currentTarget.style.background = '')}
  >
    {/* Name */}
    <td className="px-5 py-3.5">
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
        >
          {lead.name.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium" style={{ color: 'var(--text)' }}>
          {lead.name}
        </span>
      </div>
    </td>

    {/* Email */}
    <td className="px-5 py-3.5 hidden sm:table-cell" style={{ color: 'var(--text-2)' }}>
      {lead.email}
    </td>

    {/* Status */}
    <td className="px-5 py-3.5">
      <StatusBadge status={lead.status} />
    </td>

    {/* Source */}
    <td className="px-5 py-3.5 hidden md:table-cell">
      <SourceBadge source={lead.source} />
    </td>

    {/* Date */}
    <td className="px-5 py-3.5 text-xs hidden lg:table-cell" style={{ color: 'var(--text-3)' }}>
      {new Date(lead.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
    </td>

    {/* Actions */}
    <td className="px-5 py-3.5">
      <div className="flex items-center justify-end gap-1">
        {canEdit && (
          <button
            onClick={() => onEdit(lead)}
            className="p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 hover:bg-blue-50 hover:text-blue-700"
            style={{ color: 'var(--text-3)' }}
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        {canDelete && (
          <button
            onClick={() => onDelete(lead)}
            className="p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-700"
            style={{ color: 'var(--text-3)' }}
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </td>
  </tr>
);
