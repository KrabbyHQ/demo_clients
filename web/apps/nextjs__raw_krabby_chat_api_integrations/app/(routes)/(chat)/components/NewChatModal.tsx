'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/hooks';
import { closeModal } from '@/app/rtk-base/slices/new_chat_modal_slice';
import { addChat } from '@/app/rtk-base/slices/chat_home_slice';
import { mockUsers } from '../mocks';
import { getInitials } from '../utils';
import { PlusIcon, SearchIcon } from './Icons';

const NewChatModal = () => {
  const { isOpen } = useAppSelector((state) => state.newChatModal);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const chatId = crypto.randomUUID();

  const handleStartChat = (user: { id: string; name: string }) => {
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
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/15 shrink-0">
          <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-black">
            New Conversation
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors"
          >
            <PlusIcon size={16} className="transform rotate-45" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-black/10 shrink-0">
          <div className="border border-black/20 flex items-center gap-2 px-3 py-2 focus-within:border-black transition-colors duration-150">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search users..."
              className="flex-1 text-sm text-black placeholder:text-black/30 bg-transparent outline-none font-mono min-w-0"
            />
          </div>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 border-b border-black/8"
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 border border-black/20 flex items-center justify-center bg-white">
                    <span className="text-[11px] font-semibold text-black/70 tracking-wide">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  {user.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-black border-2 border-white" />
                  )}
                </div>
                <span className="text-sm font-semibold text-black">{user.name}</span>
              </div>
              <button
                onClick={() => handleStartChat(user)}
                className="border border-black/20 px-4 py-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-black hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer"
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
