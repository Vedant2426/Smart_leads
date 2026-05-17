import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Mail, Lock, Zap, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { extractErrorMessage } from '../utils/errorUtils';
import type { LoginCredentials } from '../types';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginPage: React.FC = () => {
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
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Welcome back!');
      navigate('/dashboard');
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error, 'Invalid credentials'));
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
        {/* Decorative circles */}
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

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Smart Leads
          </span>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <blockquote className="text-2xl font-semibold text-white leading-snug mb-6">
            "The best CRM is one your team actually uses."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold">
              SL
            </div>
            <div>
              <p className="text-white text-sm font-medium">Smart Leads Team</p>
              <p className="text-indigo-300 text-xs">Lead Management Platform</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-8 relative z-10">
          {(
            [
              ['2.4k+', 'Leads tracked'],
              ['98%', 'Uptime'],
              ['50+', 'Teams'],
            ] as const
          ).map(([val, label]) => (
            <div key={label}>
              <p className="text-white text-xl font-bold">{val}</p>
              <p className="text-indigo-300 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
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
              Welcome back
            </h2>
            <p style={{ color: 'var(--text-2)' }} className="text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <div className="card p-8">
            <form
              onSubmit={handleSubmit((d) => loginMutation.mutate(d))}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="login-email"
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
                    id="login-email"
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
                  htmlFor="login-password"
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
                    id="login-password"
                    type="password"
                    {...register('password')}
                    className="input pl-9"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="btn btn-primary w-full mt-2"
              >
                {loginMutation.isPending ? (
                  'Signing in…'
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--text-3)' }}>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-semibold"
              style={{ color: 'var(--brand)' }}
            >
              Create one
            </button>
          </p>

          <p className="text-center text-xs mt-8" style={{ color: 'var(--text-3)', opacity: 0.6 }}>
            © {new Date().getFullYear()} Smart Leads Dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
