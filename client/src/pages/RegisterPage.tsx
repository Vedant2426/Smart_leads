import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Shield, Zap, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { extractErrorMessage } from '../utils/errorUtils';
import type { RegisterCredentials } from '../types';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'sales']),
});

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setAuth } = useAuthStore();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'sales' },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Account created!');
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error, 'Registration failed'));
    },
  });

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--surface-2)' }}>
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-2/5 p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #6366f1, transparent)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #818cf8, transparent)',
            transform: 'translate(-30%, 30%)',
          }}
        />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Smart Leads
          </span>
        </div>

        {/* Features */}
        <div className="space-y-5 relative z-10">
          <h2 className="text-2xl font-bold text-white">
            Everything you need to manage leads
          </h2>
          {(
            [
              [
                'Track every lead',
                'From first contact to closing — all in one place.',
              ],
              [
                'Team collaboration',
                'Role-based access for admins and sales reps.',
              ],
              [
                'Smart exports',
                'Download filtered lead lists as CSV anytime.',
              ],
            ] as const
          ).map(([title, desc]) => (
            <div key={title} className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-500/30 border border-indigo-500/50 flex items-center justify-center mt-0.5 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{title}</p>
                <p className="text-indigo-300 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-indigo-300/60 text-xs relative z-10">
          © {new Date().getFullYear()} Smart Leads Dashboard
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl" style={{ color: 'var(--text)' }}>
              Smart Leads
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
              Create an account
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              Get started with Smart Leads Dashboard
            </p>
          </div>

          <div className="card p-8">
            <form
              onSubmit={handleSubmit((d) => registerMutation.mutate(d))}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="reg-name"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--text-2)' }}
                >
                  Full name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: 'var(--text-3)' }}
                  />
                  <input
                    id="reg-name"
                    {...register('name')}
                    className="input pl-9"
                    placeholder="Jane Smith"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reg-email"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--text-2)' }}
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: 'var(--text-3)' }}
                  />
                  <input
                    id="reg-email"
                    type="email"
                    {...register('email')}
                    className="input pl-9"
                    placeholder="you@company.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reg-password"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--text-2)' }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: 'var(--text-3)' }}
                  />
                  <input
                    id="reg-password"
                    type="password"
                    {...register('password')}
                    className="input pl-9"
                    placeholder="Min. 6 characters"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="reg-role"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--text-2)' }}
                >
                  Role
                </label>
                <div className="relative">
                  <Shield
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: 'var(--text-3)' }}
                  />
                  <select
                    id="reg-role"
                    {...register('role')}
                    className="input pl-9 appearance-none"
                  >
                    <option value="sales">Sales Rep</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="btn btn-primary w-full mt-2"
              >
                {registerMutation.isPending ? (
                  'Creating account…'
                ) : (
                  <>
                    Create Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-3)' }}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-semibold"
              style={{ color: 'var(--brand)' }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
