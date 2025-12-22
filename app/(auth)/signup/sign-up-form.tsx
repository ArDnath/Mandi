'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import axios from 'axios';

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ... imports

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/register', formData);

      // Redirect to sign-in page on successful registration
      router.push('/sign-in');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Registration failed. Please try again.');
      } else {
        setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-neutral-100 border border-neutral-400 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-neutral-800 mb-2">Create an account</h2>
      <p className="text-sm text-center text-neutral-500 mb-6">Join Mandi to start shopping today.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-neutral-400">
              <User size={18} />
            </span>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 disabled:bg-neutral-50"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-neutral-400">
              <Mail size={18} />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 disabled:bg-neutral-50"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-neutral-400">
              <Lock size={18} />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 disabled:bg-neutral-50"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-medium text-neutral-900 hover:text-neutral-800">
          Sign in
        </Link>
      </p>
    </div>
  );
}
