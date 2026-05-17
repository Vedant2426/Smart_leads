import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { LeadQuery } from '../../types';

interface LeadsFiltersProps {
  query: LeadQuery;
  onQueryChange: (query: LeadQuery) => void;
}

export const LeadsFilters: React.FC<LeadsFiltersProps> = ({ query, onQueryChange }) => {
  const hasActiveFilters =
    query.search || query.status || query.source || (query.sort && query.sort !== 'latest');

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: 'var(--text-3)' }}
          />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={query.search ?? ''}
            onChange={(e) =>
              onQueryChange({ ...query, search: e.target.value, page: 1 })
            }
            className="input pl-9 pr-9"
          />
          {query.search && (
            <button
              onClick={() => onQueryChange({ ...query, search: '', page: 1 })}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-3)' }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          {/* Divider — desktop only */}
          <div
            className="hidden sm:block w-px self-stretch"
            style={{ background: 'var(--border)' }}
          />

          {/* Status */}
          <div className="relative w-full sm:w-36">
            <SlidersHorizontal
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
              style={{ color: 'var(--text-3)' }}
            />
            <select
              value={query.status ?? ''}
              onChange={(e) =>
                onQueryChange({
                  ...query,
                  status: (e.target.value as LeadQuery['status']) || undefined,
                  page: 1,
                })
              }
              className="input pl-8 appearance-none cursor-pointer text-sm"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          {/* Source */}
          <div className="w-full sm:w-36">
            <select
              value={query.source ?? ''}
              onChange={(e) =>
                onQueryChange({
                  ...query,
                  source: (e.target.value as LeadQuery['source']) || undefined,
                  page: 1,
                })
              }
              className="input appearance-none cursor-pointer text-sm"
            >
              <option value="">All Sources</option>
              <option value="website">🌐 Website</option>
              <option value="referral">🤝 Referral</option>
              <option value="social">📱 Social</option>
              <option value="email">📧 Email</option>
              <option value="phone">📞 Phone</option>
              <option value="other">📌 Other</option>
            </select>
          </div>

          {/* Sort */}
          <div className="w-full sm:w-32">
            <select
              value={query.sort ?? 'latest'}
              onChange={(e) =>
                onQueryChange({
                  ...query,
                  sort: e.target.value as LeadQuery['sort'],
                  page: 1,
                })
              }
              className="input appearance-none cursor-pointer text-sm"
            >
              <option value="latest">↓ Latest</option>
              <option value="oldest">↑ Oldest</option>
            </select>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={() => onQueryChange({ page: 1, limit: 10 })}
              className="btn btn-secondary text-xs px-3 whitespace-nowrap"
              style={{ color: 'var(--brand)' }}
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
