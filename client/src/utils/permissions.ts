import { useAuthStore } from '../store/authStore';

export const usePermissions = () => {
  const { user } = useAuthStore();

  const isAdmin = user?.role === 'admin';
  const isSales = user?.role === 'sales';

  const canEditLeads = isAdmin || isSales;
  const canDeleteLeads = isAdmin;
  const canCreateLeads = isAdmin || isSales;
  const canExportLeads = isAdmin || isSales;
  const canManageUsers = isAdmin;

  return {
    isAdmin,
    isSales,
    canEditLeads,
    canDeleteLeads,
    canCreateLeads,
    canExportLeads,
    canManageUsers,
  };
};
