import type { PaginationMeta } from '../../types';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  if (pagination.pages <= 1) return null;

  const { page, pages, total, limit } = pagination;
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 gap-2 text-sm"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}
    >
      <span style={{ color: 'var(--text-3)' }}>
        Showing {start}–{end} of {total}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="btn btn-secondary py-1.5 px-3 text-xs"
        >
          ← Prev
        </button>
        <span className="text-xs font-medium px-2" style={{ color: 'var(--text-2)' }}>
          {page} / {pages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          className="btn btn-secondary py-1.5 px-3 text-xs"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
