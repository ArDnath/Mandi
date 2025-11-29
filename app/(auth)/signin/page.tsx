"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Container } from "@/components/layout/container";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    // Handle sign in logic here
  };

  return (
    <Container className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-neutral-100 border border-neutral-400 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-neutral-800 mb-2">Welcome back</h2>
        <p className="text-sm text-center text-neutral-500 mb-6">Sign in to continue shopping on Mandi.</p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5">Email address</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400"><Mail size={18} /></span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400"><Lock size={18} /></span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="mt-1 flex justify-end">
              <button type="button" className="text-xs text-neutral-500 hover:underline">Forgot password?</button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center rounded-full bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 transition disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : null}
            Sign in
          </button>
        </form>
        <p className="mt-6 text-xs text-center text-neutral-500">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-neutral-800 hover:underline">Create one</Link>
        </p>
      </div>
    </Container>
  );
}