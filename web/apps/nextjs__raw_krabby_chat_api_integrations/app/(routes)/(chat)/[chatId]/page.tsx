'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/app/rtk-base/hooks';
import ChatList from './components/ChatList';
import MessageInput from './components/MessageInput';
import Sidebar from '../components/SideBar';
import ChatHeader from './components/ChatHeader';
import ContactInfoPanel from './components/ContactInfoPanel';
import MobileBottomNav from '../components/MobileBottomNav';
import MessageThread from './components/MessageThread';
import NewChatModal from '../components/SideBar';

export default function ChatScreen() {
  const params = useParams();
  const chatId = params?.chatId as string;
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
          <main className="flex-1 flex overflow-hidden">
            {/* Chat column */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <ChatHeader activeChat={activeChat} showBack={true} />
              <MessageThread activeChat={activeChat} />
              <MessageInput />
            </div>

            {/* Right info panel — desktop only */}
            <ContactInfoPanel activeChat={activeChat} />
          </main>
        </div>

        {/* ── Mobile bottom nav bar ── */}
        <MobileBottomNav />
      </div>
    </>
  );
}
