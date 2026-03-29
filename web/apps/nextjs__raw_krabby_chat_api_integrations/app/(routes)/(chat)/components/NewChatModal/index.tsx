'use client';

import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/hooks';
import { closeModal } from '@/app/rtk-base/slices/new_chat_modal_slice';
import { addChat } from '@/app/rtk-base/slices/chat_home_slice';
import { mockUsers } from '../../mocks';
import { getInitials } from '../../utils';
import { PlusIcon, SearchIcon } from '../../../../Icons';

/**
 * NewChatModal component for starting a new conversation.
 * Enhanced with ARIA attributes and keyboard support (Escape to close, Focus management).
 */
const NewChatModal = () => {
  const { isOpen } = useAppSelector((state) => state.newChatModal);
  const dispatch = useAppDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isOpen) {
      // Manage Focus: focus the search input when modal opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);

      // Keyboard support: Close on Escape
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleStartChat = (user: { id: string; name: string }) => {
    const chatId = crypto.randomUUID();
    dispatch(
      addChat({
        id: chatId,
        room_name: user.name,
        is_group: false,
        co_members: [],
        bookmarked_by: [],
        archived_by: [],
        pinned_by: [],
        is_public: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }),
    );
    dispatch(closeModal());
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]"
      onClick={handleClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-chat-modal-title"
        className="bg-white w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl border border-black/10 animate-in fade-in zoom-in duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/15 shrink-0 bg-gray-50/50">
          <h2
            id="new-chat-modal-title"
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/60"
          >
            New Conversation
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close new conversation modal"
            className="w-8 h-8 flex items-center justify-center text-black/30 hover:text-black transition-colors cursor-pointer outline-none focus:text-black"
          >
            <PlusIcon size={18} className="transform rotate-45" aria-hidden="true" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-black/10 shrink-0">
          <div className="border border-black/20 flex items-center gap-2 px-3 py-2 focus-within:border-black transition-colors duration-150 bg-white">
            <SearchIcon size={16} className="text-black/40" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="text"
              aria-label="Search users to chat with"
              placeholder="Search users..."
              className="flex-1 text-sm text-black placeholder:text-black/30 bg-transparent outline-none font-mono min-w-0"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {mockUsers.length > 0 ? (
            mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border-b border-black/5 hover:bg-black/[0.01] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0" aria-hidden="true">
                    <div className="w-10 h-10 border border-black/20 flex items-center justify-center bg-white shadow-sm">
                      <span className="text-[11px] font-bold text-black/70 tracking-wide uppercase">
                        {getInitials(user.name)}
                      </span>
                    </div>
                    {user.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-black border-2 border-white rounded-full" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-black tracking-tight">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={() => handleStartChat(user)}
                  aria-label={`Start chat with ${user.name}`}
                  className="border border-black/20 px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer outline-none focus:bg-black focus:text-white"
                >
                  Chat
                </button>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-black/45 font-nunito italic">No users available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
