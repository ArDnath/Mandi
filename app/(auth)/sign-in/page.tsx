"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/container";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password. Please try again.");
        setPassword("");
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/"});
    } catch (err) {
      setError("Google signin failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-neutral-100 border border-neutral-400 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-neutral-800 mb-2">Welcome back</h2>
        <p className="text-sm text-center text-neutral-500 mb-6">Sign in to continue shopping on Mandi.</p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Credentials Form */}
        <form className="space-y-5" onSubmit={handleCredentialsSubmit}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1.5">
              Email or Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-neutral-400">
                <Mail size={18} />
              </span>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="you@example.com or username"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 disabled:bg-neutral-50"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
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
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 disabled:bg-neutral-50"
                disabled={isLoading}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700 disabled:opacity-50"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="mt-1 flex justify-end">
              <button 
                type="button" 
                className="text-xs text-neutral-500 hover:underline"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center rounded-full bg-neutral-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 transition disabled:opacity-60"
            disabled={isLoading || !username || !password}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-300"></div>
          <span className="text-xs text-neutral-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-neutral-300"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-white border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#1F2937"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#1F2937"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#1F2937"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#1F2937"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <p className="mt-6 text-xs text-center text-neutral-500">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-medium text-neutral-800 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </Container>
  );
}