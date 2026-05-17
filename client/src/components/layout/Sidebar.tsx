import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, X, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/dashboard', icon: Users },
];

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}
        style={{ background: 'var(--sidebar-bg)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Smart Leads
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white/40 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {/* Section label */}
          <p
            className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--sidebar-text)', opacity: 0.4 }}
          >
            Menu
          </p>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-400 shadow-sm'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }
                `}
              >
                <Icon
                  className={`shrink-0 ${isActive ? 'text-indigo-400' : ''}`}
                  style={{ width: '1.125rem', height: '1.125rem' }}
                />
                {item.name}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </Link>
            );
          })}

          {/* Admin section */}
          {user?.role === 'admin' && (
            <div className="mt-6">
              <p
                className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--sidebar-text)', opacity: 0.4 }}
              >
                Admin
              </p>
              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all"
              >
                <Users
                  style={{ width: '1.125rem', height: '1.125rem' }}
                  className="shrink-0"
                />
                Manage Users
              </Link>
            </div>
          )}
        </nav>

        {/* User + Logout */}
        <div className="shrink-0 px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut
              style={{ width: '1.125rem', height: '1.125rem' }}
              className="shrink-0"
            />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
