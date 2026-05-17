import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, User, Mail, Tag, Globe } from 'lucide-react';
import { useLeadMutations } from '../../hooks/useLeads';
import type { LeadCreateRequest } from '../../types';

const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: z.enum(['new', 'contacted', 'qualified', 'won', 'lost']).optional(),
  source: z.enum(['website', 'referral', 'social', 'email', 'phone', 'other']),
});

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateLeadModal: React.FC<CreateLeadModalProps> = ({ isOpen, onClose }) => {
  const { createLead, isCreating } = useLeadMutations();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadCreateRequest>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: { status: 'new', source: 'website' },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: LeadCreateRequest) => {
    createLead(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm"
        style={{ background: 'rgb(0 0 0 / 0.5)' }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: 'var(--surface)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <h2 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
              Create New Lead
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
              Add a new lead to the pipeline
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--text-3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="lead-name"
              className="block text-sm font-medium mb-1.5"
              style={{ color: 'var(--text-2)' }}
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: 'var(--text-3)' }}
              />
              <input
                id="lead-name"
                {...register('name')}
                className="input pl-9"
                placeholder="Jane Smith"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lead-email"
              className="block text-sm font-medium mb-1.5"
              style={{ color: 'var(--text-2)' }}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: 'var(--text-3)' }}
              />
              <input
                id="lead-email"
                type="email"
                {...register('email')}
                className="input pl-9"
                placeholder="jane@company.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lead-status"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--text-2)' }}
              >
                Status
              </label>
              <div className="relative">
                <Tag
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--text-3)' }}
                />
                <select
                  id="lead-status"
                  {...register('status')}
                  className="input pl-9 appearance-none"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="lead-source"
                className="block text-sm font-medium mb-1.5"
                style={{ color: 'var(--text-2)' }}
              >
                Source
              </label>
              <div className="relative">
                <Globe
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: 'var(--text-3)' }}
                />
                <select
                  id="lead-source"
                  {...register('source')}
                  className="input pl-9 appearance-none"
                >
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social">Social</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.source && (
                <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary flex-1"
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isCreating}
            >
              {isCreating ? 'Creating…' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
