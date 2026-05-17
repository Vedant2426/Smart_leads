import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { X, User, Mail, Tag, Globe } from 'lucide-react';
import { useLeadMutations } from '../../hooks/useLeads';
import type { Lead, LeadUpdateRequest } from '../../types';

const editLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'won', 'lost']).optional(),
  source: z.enum(['website', 'referral', 'social', 'email', 'phone', 'other']).optional(),
});

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export const EditLeadModal: React.FC<EditLeadModalProps> = ({ isOpen, onClose, lead }) => {
  const { updateLead, isUpdating } = useLeadMutations();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadUpdateRequest>({
    resolver: zodResolver(editLeadSchema),
  });

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      });
    }
  }, [lead, reset]);

  const onSubmit = (data: LeadUpdateRequest) => {
    if (!lead) return;
    updateLead(
      { id: lead._id, data },
      { onSuccess: () => onClose() }
    );
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 backdrop-blur-sm"
        style={{ background: 'rgb(0 0 0 / 0.5)' }}
        onClick={onClose}
      />

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
              Edit Lead
            </h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
              Update lead information
            </p>
          </div>
          <button
            onClick={onClose}
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
              htmlFor="edit-name"
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
              <input id="edit-name" {...register('name')} className="input pl-9" />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit-email"
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
                id="edit-email"
                type="email"
                {...register('email')}
                className="input pl-9"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="edit-status"
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
                  id="edit-status"
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
                htmlFor="edit-source"
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
                  id="edit-source"
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
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
