'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/hooks';
import { handleRegister, clearError } from '@/app/rtk-base/slices/auth_slice';
import toast from 'react-hot-toast';
import { EyeIcon, EyeOffIcon } from '@/app/Icons';

/**
 * SignUpForm component for user registration.
 * Includes comprehensive field validation and accessibility features.
 */
export default function SignUpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    country: '',
    phone_number: '',
  });

  // Handle redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Clear errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  /**
   * Validates password against the required criteria:
   * - Minimum 8 characters
   * - At least one uppercase letter
   * - At least one number
   * - At least one special character
   */
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!minLength) return 'Password must be at least 8 characters long.';
    if (!hasUppercase) return 'Password must include at least one uppercase letter.';
    if (!hasNumber) return 'Password must include at least one number.';
    if (!hasSpecialChar) return 'Password must include at least one special character.';

    return null;
  };

  const onHandleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { first_name, last_name, email, password, country, phone_number } = formData;

    // 1. Basic empty check
    if (!first_name || !last_name || !email || !password || !country || !phone_number) {
      toast.error('Please fill in all fields');
      return;
    }

    // 2. Client-side password validation (matching UI hint)
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // 3. Dispatch registration thunk
    const res = await dispatch(
      handleRegister({
        first_name,
        last_name,
        email,
        password,
        country,
        phone_number,
      }),
    );

    // Pattern for checking request successes before processing redirects
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Account created successfully!');
      router.push('/');
    } else if (res.meta.requestStatus === 'rejected') {
      toast.error(typeof res.payload === 'string' ? res.payload : 'Registration failed');
    }
  };

  return (
    <form onSubmit={onHandleSignUp} className="p-5 space-y-4" noValidate>
      {/* First name + Last name — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="first_name"
            className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 mb-2"
          >
            First name
          </label>
          <div className="border border-black/25 focus-within:border-black transition-colors duration-150 bg-white">
            <input
              id="first_name"
              type="text"
              autoComplete="given-name"
              placeholder="Kamara"
              value={formData.first_name}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              aria-required="true"
              className="w-full px-3 py-2.5 text-sm text-black placeholder:text-black/35 bg-transparent outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 mb-2"
          >
            Last name
          </label>
          <div className="border border-black/25 focus-within:border-black transition-colors duration-150 bg-white">
            <input
              id="last_name"
              type="text"
              autoComplete="family-name"
              placeholder="Laye"
              value={formData.last_name}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              aria-required="true"
              className="w-full px-3 py-2.5 text-sm text-black placeholder:text-black/35 bg-transparent outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 mb-2"
        >
          Email address
        </label>
        <div className="border border-black/25 focus-within:border-black transition-colors duration-150 bg-white">
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            aria-required="true"
            className="w-full px-3 py-2.5 text-sm text-black placeholder:text-black/35 bg-transparent outline-none font-mono"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 mb-2"
        >
          Password
        </label>
        <div className="border border-black/25 focus-within:border-black transition-colors duration-150 flex items-center pr-3 bg-white">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••••"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
            required
            aria-required="true"
            className="flex-1 px-3 py-2.5 text-sm text-black placeholder:text-black/35 bg-transparent outline-none font-mono"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-black/30 hover:text-black transition-colors cursor-pointer outline-none focus:text-black"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-black/45 tracking-wide leading-relaxed">
          Min. 8 chars — include uppercase, number & special character.
        </p>
      </div>

      {/* Country + Phone — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="country"
            className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 mb-2"
          >
            Country
          </label>
          <div className="border border-black/25 focus-within:border-black transition-colors duration-150 bg-white">
            <input
              id="country"
              type="text"
              autoComplete="country-name"
              placeholder="Yemen"
              value={formData.country}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              aria-required="true"
              className="w-full px-3 py-2.5 text-sm text-black placeholder:text-black/35 bg-transparent outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="block text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 mb-2"
          >
            Phone
          </label>
          <div className="border border-black/25 focus-within:border-black transition-colors duration-150 bg-white">
            <input
              id="phone_number"
              type="tel"
              autoComplete="tel"
              placeholder="+1234567890"
              value={formData.phone_number}
              onChange={handleInputChange}
              disabled={isLoading}
              required
              aria-required="true"
              className="w-full px-3 py-2.5 text-sm text-black placeholder:text-black/35 bg-transparent outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-black/15 my-1" role="presentation" />

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className={`w-full bg-black text-white text-sm font-semibold tracking-[0.15em] uppercase py-3 hover:bg-black/80 active:bg-black/90 transition-colors duration-150 cursor-pointer flex items-center justify-center ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Creating account...' : 'Create account →'}
      </button>
    </form>
  );
}
