import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoadingState } from '../components/shared/LoadingState';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'sales')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  // Zustand persist rehydrates asynchronously — wait for it
  const hasHydrated = useAuthStore.persist.hasHydrated();

  if (!hasHydrated) {
    return <LoadingState message="Restoring session…" />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
