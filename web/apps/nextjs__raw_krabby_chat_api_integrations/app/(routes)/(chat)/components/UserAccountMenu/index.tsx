'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/hooks';
import { openGlobalModal } from '@/app/rtk-base/slices/global_modal_slice';
import { getInitials } from '../../utils';
import { ProfileIcon } from '../../../../Icons';

interface UserAccountMenuProps {
  variant?: 'desktop' | 'mobile';
  trigger?: React.ReactNode;
}

/**
 * UserAccountMenu component providing access to profile and logout functionality.
 * Designed to fit seamlessly in the desktop sidebar bottom or mobile header top-right.
 */
const UserAccountMenu = ({ variant = 'desktop', trigger }: UserAccountMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleOpenLogoutModal = () => {
    setIsOpen(false);
    dispatch(
      openGlobalModal({
        title: 'Sign Out',
        message:
          'Are you sure you want to log out of your account? Your active session will be terminated.',
        confirmLabel: 'Logout',
        actionType: 'LOGOUT_USER',
      }),
    );
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    // Placeholder for profile navigation
    console.log('Navigate to profile');
  };

  const initials = getInitials(user?.full_name || 'User');

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={toggleMenu}
        className={`flex items-center justify-center transition-all duration-200 cursor-pointer rounded-sm ${
          variant === 'desktop'
            ? 'w-10 h-10 text-black/35 hover:text-black hover:bg-black/5'
            : 'w-8 h-8 flex items-center justify-center text-black/40 hover:text-black'
        }`}
      >
        {trigger ? trigger : <ProfileIcon size={20} />}
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div
          className={`absolute z-[110] bg-white border border-black/10 shadow-2xl min-w-[200px] py-1 animate-in fade-in zoom-in duration-150 ${
            variant === 'desktop'
              ? 'bottom-0 left-full ml-4 mb-0' // Appears to the right of the sidebar item
              : 'top-full right-0 mt-2' // Appears below the top-right mobile trigger
          }`}
        >
          {/* User Info Header */}
          <div className="px-4 py-4 border-b border-black/5 bg-gray-50/50 flex items-center gap-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center shrink-0">
              <span className="text-white text-[9px] font-bold tracking-widest">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-black truncate leading-tight">
                {user?.full_name || 'User Account'}
              </p>
              <p className="text-[10px] text-black/40 truncate font-mono mt-0.5">
                {user?.email || 'Logged In'}
              </p>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-black/60 hover:bg-black/5 hover:text-black transition-colors text-left"
            >
              <ProfileIcon size={14} className="opacity-50" />
              My Profile
            </button>
          </div>

          <div className="border-t border-black/5 py-1">
            <button
              onClick={handleOpenLogoutModal}
              className="w-full flex items-center px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 transition-colors text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountMenu;
