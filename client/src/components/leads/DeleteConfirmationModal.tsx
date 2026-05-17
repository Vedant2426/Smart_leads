import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leadName: string;
  isDeleting?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  leadName,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 backdrop-blur-sm"
        style={{ background: 'rgb(0 0 0 / 0.5)' }}
        onClick={onClose}
      />
      <div
        className="relative rounded-2xl shadow-2xl max-w-md w-full p-6"
        style={{ background: 'var(--surface)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: '#fef2f2' }}
          >
            <AlertTriangle className="w-6 h-6" style={{ color: '#dc2626' }} />
          </div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            Delete Lead
          </h2>
        </div>

        <p className="mb-6" style={{ color: 'var(--text-2)' }}>
          Are you sure you want to delete{' '}
          <span className="font-semibold" style={{ color: 'var(--text)' }}>
            {leadName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="btn btn-danger flex-1"
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
