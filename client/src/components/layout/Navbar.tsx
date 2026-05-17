import { Menu, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAuthStore();

  return (
    <header
      className="h-16 flex items-center justify-between px-4 lg:px-6 shrink-0"
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
      }}
    >
      {/* Left — mobile hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-3)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '')}
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <p className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>CRM Dashboard</p>
          <h1 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Leads Management</h1>
        </div>
      </div>

      {/* Right — notification + avatar */}
      <div className="flex items-center gap-2">
        <button
          className="relative p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-3)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '')}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: '#6366f1', border: '2px solid var(--surface)' }}
          />
        </button>

        <div className="flex items-center gap-2.5 pl-2 ml-1 border-l" style={{ borderColor: 'var(--border)' }}>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>{user?.name}</p>
            <p className="text-xs capitalize leading-tight" style={{ color: 'var(--text-3)' }}>{user?.role}</p>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            {user?.name?.charAt(0).toUpperCase() ?? 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};
