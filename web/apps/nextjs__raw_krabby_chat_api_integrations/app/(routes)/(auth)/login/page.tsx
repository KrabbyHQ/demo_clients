import React from 'react';
import Link from 'next/link';

function Login() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Top accent line */}
        <div className="h-px w-full bg-black mb-8" />

        {/* Logo / Brand */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-black flex items-center justify-center">
              <span className="text-white text-sm font-bold tracking-widest">K</span>
            </div>
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-black">
              Krach
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-black tracking-tight leading-tight">
            Sign in
          </h1>
          <p className="mt-1.5 text-sm text-black/60 tracking-wide">
            Welcome back. Enter your credentials to continue.
          </p>
        </div>

        {/* Form card */}
        <div className="border border-black/20 bg-white">
          {/* Card header bar */}
          <div className="border-b border-black/20 px-5 py-3 flex items-center justify-between">
            <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-black/50">
              Authentication
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full border border-black/40" />
              <div className="w-1.5 h-1.5 rounded-full border border-black/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 mb-2"
              >
                Email address
              </label>
              <div className="border border-black/25 focus-within:border-black transition-colors duration-150">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 text-sm text-black placeholder:text-black/35 bg-transparent outline-none font-mono"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[12px] font-semibold tracking-[0.1em] uppercase text-black/50 hover:text-black transition-colors duration-150 underline underline-offset-2"
                >
                  Forgot?
                </Link>
              </div>
              <div className="border border-black/25 focus-within:border-black transition-colors duration-150">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  className="w-full px-3 py-2.5 text-sm text-black placeholder:text-black/35 bg-transparent outline-none font-mono"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-black/15 my-1" />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white text-sm font-semibold tracking-[0.15em] uppercase py-3 hover:bg-black/80 active:bg-black/90 transition-colors duration-150 cursor-pointer"
            >
              Sign in →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[12px] text-black/50 tracking-wide">No account yet?</span>
          <Link
            href="/sign-up"
            className="text-[12px] font-semibold tracking-[0.15em] uppercase text-black hover:text-black/60 transition-colors duration-150 border-b border-black/30 hover:border-black/60 pb-px"
          >
            Create account
          </Link>
        </div>

        {/* Bottom accent line */}
        <div className="h-px w-full bg-black/20 mt-8" />

        {/* Fine print */}
        <p className="mt-4 text-[11px] text-black/50 tracking-wide text-center leading-relaxed">
          By signing in, you agree to our{' '}
          <Link
            href="#"
            className="underline underline-offset-2 hover:text-black/60 transition-colors"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="#"
            className="underline underline-offset-2 hover:text-black/60 transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

export default Login;
