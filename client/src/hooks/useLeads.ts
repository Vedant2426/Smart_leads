import { useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { leadService } from '../services/leadService';
import { useDebounce } from './useDebounce';
import { extractErrorMessage } from '../utils/errorUtils';
import type { Lead, LeadQuery, LeadCreateRequest, LeadUpdateRequest } from '../types';

/** Centralized query key factory for leads */
export const leadKeys = {
  all: ['leads'] as const,
  list: (query: LeadQuery) => ['leads', query] as const,
};

/** Hook for fetching paginated leads with debounced filtering */
export const useLeads = (initialQuery?: Partial<LeadQuery>) => {
  const [query, setQuery] = useState<LeadQuery>({
    page: 1,
    limit: 10,
    ...initialQuery,
  });

  const debouncedQuery = useDebounce(query, 300);

  const result = useQuery({
    queryKey: leadKeys.list(debouncedQuery),
    queryFn: () => leadService.getAll(debouncedQuery),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });

  const setPage = useCallback(
    (page: number) => setQuery((prev) => ({ ...prev, page })),
    []
  );

  const updateFilters = useCallback(
    (filters: Partial<LeadQuery>) => setQuery((prev) => ({ ...prev, ...filters, page: 1 })),
    []
  );

  const resetFilters = useCallback(
    () => setQuery({ page: 1, limit: 10 }),
    []
  );

  return {
    ...result,
    query,
    setQuery,
    setPage,
    updateFilters,
    resetFilters,
    leads: result.data?.data ?? [],
    pagination: result.data?.pagination,
  };
};

/** Hook for lead CRUD mutations */
export const useLeadMutations = () => {
  const queryClient = useQueryClient();

  const invalidateLeads = () =>
    queryClient.invalidateQueries({ queryKey: leadKeys.all });

  const createMutation = useMutation({
    mutationFn: leadService.create,
    onSuccess: () => {
      toast.success('Lead created successfully');
      invalidateLeads();
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error, 'Failed to create lead'));
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: LeadUpdateRequest }) =>
      leadService.update(id, data),
    onSuccess: () => {
      toast.success('Lead updated successfully');
      invalidateLeads();
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error, 'Failed to update lead'));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: leadService.delete,
    onSuccess: () => {
      toast.success('Lead deleted successfully');
      invalidateLeads();
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error, 'Failed to delete lead'));
    },
  });

  return {
    createLead: createMutation.mutate,
    updateLead: updateMutation.mutate,
    deleteLead: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

/** Hook for CSV export */
export const useLeadExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportCsv = useCallback(async (query: LeadQuery) => {
    setIsExporting(true);
    try {
      const blob = await leadService.exportCsv(query);
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
      anchor.click();
      window.URL.revokeObjectURL(url);
      toast.success('CSV exported successfully');
    } catch (error: unknown) {
      toast.error(extractErrorMessage(error, 'Failed to export CSV'));
    } finally {
      setIsExporting(false);
    }
  }, []);

  return { exportCsv, isExporting };
};
