import AuthLayout from '../components/AuthLayout';
import BrandHeaderArea from '../components/BrandHeaderArea';
import LoginFormCard from '../components/LoginFormCard';
import Link from 'next/link';

function Login() {
  return (
    <AuthLayout>
      <BrandHeaderArea
        title="Sign in"
        subtitle="Welcome back. Enter your credentials to continue."
      />

      <LoginFormCard title="Authentication" />

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
    </AuthLayout>
  );
}

export default Login;
