import AuthLayout from '../components/AuthLayout';
import BrandHeaderArea from '../components/BrandHeaderArea';
import SignUpFormCard from '../components/SignUpFormCard';
import Link from 'next/link';

function SignUp() {
  return (
    <AuthLayout>
      <BrandHeaderArea
        title="Create account"
        subtitle="Fill in your details below to get started."
      />

      <SignUpFormCard title="Registration" />

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[12px] text-black/50 tracking-wide">Already have an account?</span>
        <Link
          href="/login"
          className="text-[12px] font-semibold tracking-[0.15em] uppercase text-black hover:text-black/60 transition-colors duration-150 border-b border-black/30 hover:border-black/60 pb-px"
        >
          Sign in
        </Link>
      </div>

      {/* Fine print */}
      <p className="mt-4 text-[11px] text-black/50 tracking-wide text-center leading-relaxed">
        By creating an account, you agree to our{' '}
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

export default SignUp;
