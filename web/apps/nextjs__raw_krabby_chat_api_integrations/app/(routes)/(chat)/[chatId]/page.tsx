'use client';

import ChatList from './components/ChatList';
import Sidebar from './components/SideBar';
import MessageInput from './components/MessageInput';
import ChatHeader from './components/ChatHeader';
import ContactInfoPanel from './components/ContactInfoPanel';
import MobileBottomNav from '../components/MobileBottomNav';
import { mockChats } from '../mocks';
import MessageThread from './components/MessageThread';

export default function ChatScreen({ params }: { params: { chatId: string } }) {
  const activeChat = mockChats.find((c) => c.id === params.chatId) ?? mockChats[0];

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      {/* ── Desktop / Tablet horizontal layout ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Col 1 · Sidebar — desktop & tablet only */}
        <Sidebar />

        {/* Col 2 · Chat list — tablet & desktop only */}
        <ChatList activeChat={activeChat} />

        {/* Col 3 · Main area */}
        {/* Mobile: full-screen chat view */}
        {/* Tablet: chat area fills remaining space (no info panel) */}
        {/* Desktop: chat area + right info panel */}
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
  );
}
