import AuthLayout from '../components/AuthLayout';
import BrandHeaderArea from '../components/BrandHeaderArea';
import FormCard from '../components/FormCard';
import Link from 'next/link';

function Login() {
  return (
    <AuthLayout>
      <BrandHeaderArea
        title="Sign in"
        subtitle="Welcome back. Enter your credentials to continue."
      />

      <FormCard title="Authentication">
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
              href="#" // TODO: Implement forgot password flow
              className="text-[12px] font-semibold tracking-widest uppercase text-black/50 hover:text-black transition-colors duration-150 underline underline-offset-2"
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
      </FormCard>

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

      {/* Fine print */}
      <p className="mt-4 text-[11px] text-black/50 tracking-wide text-center leading-relaxed">
        By signing in, you agree to our{' '}
        <Link
          href="#" // TODO: Link to real Terms of Service
          className="underline underline-offset-2 hover:text-black/60 transition-colors"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="#" // TODO: Link to real Privacy Policy
          className="underline underline-offset-2 hover:text-black/60 transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </AuthLayout>
  );
}

export default Login;
