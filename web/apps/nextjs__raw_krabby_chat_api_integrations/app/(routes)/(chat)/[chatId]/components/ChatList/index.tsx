'use client';

import React from 'react';
import Link from 'next/link';
import { PlusIcon, SearchIcon } from '../../../components/Icons';
import { getInitials } from '../../../utils';
import { useAppDispatch, useAppSelector } from '@/app/rtk-base/hooks';
import { openModal } from '@/app/rtk-base/slices/new_chat_modal_slice';

interface ChatListProps {
  activeChat: {
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
  };
}

const ChatList: React.FC<ChatListProps> = ({ activeChat }) => {
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.chatHome);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="hidden md:flex w-72 lg:w-80 border-r border-black/15 flex-col shrink-0 bg-white">
      {/* Header */}
      <div className="border-b border-black/15 px-4 py-3 flex items-center justify-between shrink-0">
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50">
          Messages
        </span>
        <button
          onClick={handleOpenModal}
          title="New chat"
          className="w-7 h-7 flex items-center justify-center text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-black/10 shrink-0">
        <div className="border border-black/20 flex items-center gap-2 px-3 py-2 focus-within:border-black transition-colors duration-150">
          <span className="text-black/35 shrink-0">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search conversations..."
            className="flex-1 text-sm text-black placeholder:text-black/30 bg-transparent outline-none font-mono min-w-0"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((room) => {
          const roomId = String(room.id);
          const isActive = roomId === activeChat.id;
          const roomName = room.room_name || 'New Chat';

          return (
            <Link
              key={roomId}
              href={`/${roomId}`}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-black/8 transition-colors duration-150 ${
                isActive ? 'bg-black/[0.05]' : 'hover:bg-black/[0.03]'
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className={`w-9 h-9 flex items-center justify-center ${
                    isActive ? 'bg-black border border-black' : 'border border-black/20 bg-white'
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold tracking-wide ${
                      isActive ? 'text-white' : 'text-black/70'
                    }`}
                  >
                    {getInitials(roomName)}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold text-black truncate leading-none">
                    {roomName}
                  </span>
                  <span className="text-[10px] text-black/35 shrink-0 ml-2 font-mono">
                    {new Date(room.updated_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-black/45 truncate leading-none">
                    No messages yet
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
