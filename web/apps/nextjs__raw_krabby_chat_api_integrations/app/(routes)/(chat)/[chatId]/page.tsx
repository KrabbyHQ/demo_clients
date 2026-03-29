'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/rtk-base/hooks';
import ChatList from './components/ChatList';
import MessageInput from './components/MessageInput';
import Sidebar from '../components/SideBar';
import ChatHeader from './components/ChatHeader';
import ContactInfoPanel from './components/ContactInfoPanel';
import MessageThread from './components/MessageThread';
import NewChatModal from '../components/NewChatModal';
import UserAccountMenu from '../components/UserAccountMenu';
import { openModal } from '@/app/rtk-base/slices/new_chat_modal_slice';
import { LayoutGridIcon, SearchIcon, PlusIcon } from '../../../Icons';

export default function ChatScreen() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.chatHome);

  if (chats.length === 0) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center">
        <p className="text-black/45 font-mono">No conversations found.</p>
      </div>
    );
  }

  const activeRoom = chats.find((c) => String(c.id) === chatId) || null;

  if (!activeRoom) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center">
        <p className="text-black/45 font-mono">Chat not found.</p>
      </div>
    );
  }

  // Map Room back to the format components expect from mock data
  const activeChat = {
    ...activeRoom,
    id: String(activeRoom.id),
    name: activeRoom.room_name || 'New Chat',
    lastMessage: 'No messages yet',
    time: new Date(activeRoom.updated_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    unread: 0,
    online: false,
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <>
      <NewChatModal />
      <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
        {/* ── Desktop / Tablet horizontal layout ── */}
        <div className="flex-1 flex overflow-hidden">
          {/* Col 1 · Sidebar — desktop & tablet only */}
          <Sidebar />

          {/* Col 2 · Chat list — tablet & desktop only */}
          <ChatList activeChat={activeChat} />

          {/* Col 3 · Main area */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Header with User Menu — Consistent with ChatHome */}
            <div className="md:hidden border-b border-black/15 px-4 py-3 flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-black flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold tracking-widest">KR</span>
                </div>
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-black">
                  Krach
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  title="Search"
                  className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors duration-150 cursor-pointer"
                >
                  <SearchIcon size={16} />
                </button>
                <button
                  onClick={handleOpenModal}
                  title="New chat"
                  className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors duration-150 cursor-pointer"
                >
                  <PlusIcon size={16} />
                </button>
                <div className="w-[1px] h-4 bg-black/10 mx-0.5" />
                {/* Mobile User Menu Trigger (Top Right) */}
                <UserAccountMenu variant="mobile" trigger={<LayoutGridIcon size={18} />} />
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Chat column */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <ChatHeader activeChat={activeChat} showBack={true} />
                <MessageThread activeChat={activeChat} />
                <MessageInput />
              </div>

              {/* Right info panel — desktop only */}
              <ContactInfoPanel activeChat={activeChat} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
