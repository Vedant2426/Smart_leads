import { Plus, Download, Users } from 'lucide-react';
import type { PaginationMeta } from '../../types';

interface PageHeaderProps {
  pagination: PaginationMeta | undefined;
  canCreate: boolean;
  canExport: boolean;
  isExporting: boolean;
  onCreateClick: () => void;
  onExportClick: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  pagination,
  canCreate,
  canExport,
  isExporting,
  onCreateClick,
  onExportClick,
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          boxShadow: '0 4px 12px rgb(99 102 241 / 0.3)',
        }}
      >
        <Users className="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
          Leads
        </h1>
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
          {pagination ? `${pagination.total} total leads` : 'Manage and track your leads'}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      {canExport && (
        <button
          onClick={onExportClick}
          disabled={isExporting}
          className="btn btn-secondary"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Exporting…' : 'Export CSV'}
        </button>
      )}
      {canCreate && (
        <button onClick={onCreateClick} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      )}
    </div>
  </div>
);
