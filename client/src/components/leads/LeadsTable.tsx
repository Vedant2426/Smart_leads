import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import type { Lead } from '../../types';
import { useLeads, useLeadMutations, useLeadExport } from '../../hooks/useLeads';
import { usePermissions } from '../../utils/permissions';
import { PageHeader } from './PageHeader';
import { LeadsFilters } from './LeadsFilters';
import { LeadTableHeader } from './LeadTableHeader';
import { LeadRow } from './LeadRow';
import { CreateLeadModal } from './CreateLeadModal';
import { EditLeadModal } from './EditLeadModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { LoadingState, ErrorState, EmptyState, Pagination } from '../shared';

const TABLE_COLUMNS = [
  { label: 'Name' },
  { label: 'Email', className: 'hidden sm:table-cell' },
  { label: 'Status' },
  { label: 'Source', className: 'hidden md:table-cell' },
  { label: 'Created', className: 'hidden lg:table-cell' },
  { label: 'Actions', className: 'text-right' },
];

export const LeadsTable: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { canCreateLeads, canEditLeads, canDeleteLeads, canExportLeads } = usePermissions();
  const { leads, pagination, query, setQuery, setPage, isLoading, error, refetch } = useLeads();
  const { deleteLead, isDeleting } = useLeadMutations();
  const { exportCsv, isExporting } = useLeadExport();

  const handleEdit = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteRequest = useCallback((lead: Lead) => {
    setSelectedLead(lead);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!selectedLead) return;
    deleteLead(selectedLead._id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedLead(null);
      },
    });
  }, [selectedLead, deleteLead]);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedLead(null);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedLead(null);
  }, []);

  return (
    <div className="space-y-5">
      <PageHeader
        pagination={pagination}
        canCreate={canCreateLeads}
        canExport={canExportLeads}
        isExporting={isExporting}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onExportClick={() => exportCsv(query)}
      />

      <LeadsFilters query={query} onQueryChange={setQuery} />

      <div className="card overflow-hidden">
        {isLoading ? (
          <LoadingState message="Loading leads…" />
        ) : error ? (
          <ErrorState message="Failed to load leads" onRetry={() => refetch()} />
        ) : leads.length === 0 ? (
          <EmptyState
            title="No leads yet"
            description='Click "Add Lead" to create your first lead'
            action={
              canCreateLeads ? (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="btn btn-primary mt-1"
                >
                  <Plus className="w-4 h-4" /> Add Lead
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <LeadTableHeader columns={TABLE_COLUMNS} />
              <tbody>
                {leads.map((lead, idx) => (
                  <LeadRow
                    key={lead._id}
                    lead={lead}
                    isLast={idx === leads.length - 1}
                    canEdit={canEditLeads}
                    canDelete={canDeleteLeads}
                    onEdit={handleEdit}
                    onDelete={handleDeleteRequest}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && (
          <Pagination pagination={pagination} onPageChange={setPage} />
        )}
      </div>

      {/* Modals */}
      <CreateLeadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditLeadModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        lead={selectedLead}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        leadName={selectedLead?.name ?? ''}
        isDeleting={isDeleting}
      />
    </div>
  );
};
