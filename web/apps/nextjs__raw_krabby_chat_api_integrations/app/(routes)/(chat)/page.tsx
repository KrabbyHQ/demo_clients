import React from 'react';
import Link from 'next/link';
import {
  ChatsIcon,
  ContactsIcon,
  ArchiveIcon,
  CallsIcon,
  SettingsIcon,
  ProfileIcon,
  SearchIcon,
  PlusIcon,
} from '../../../trash/Icons';
import MobileBottomNav from './components/MobileBottomNav';
import { mockChats } from './mocks';
import { getInitials } from './utils';

export default function ChatHome() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      {/* ── Desktop/Tablet: horizontal layout ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Col 1 · Sidebar nav — hidden on mobile, icon-only on tablet, full on desktop ── */}
        <aside className="hidden md:flex w-16 border-r border-black/15 flex-col items-center py-4 shrink-0 z-10 bg-gray-100">
          {/* Logo */}
          <div className="w-8 h-8 bg-black flex items-center justify-center mb-8 shrink-0">
            <span className="text-white text-xs font-bold tracking-widest">K</span>
          </div>

          {/* Primary nav */}
          <nav className="flex flex-col items-center gap-1 flex-1">
            <button
              title="Chats"
              className="w-10 h-10 flex items-center justify-center bg-black text-white transition-colors duration-150 cursor-pointer"
            >
              <ChatsIcon />
            </button>
            <button
              title="Contacts"
              className="w-10 h-10 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
            >
              <ContactsIcon />
            </button>
            <button
              title="Calls"
              className="w-10 h-10 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
            >
              <CallsIcon />
            </button>
            <button
              title="Archived"
              className="w-10 h-10 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
            >
              <ArchiveIcon />
            </button>
          </nav>

          {/* Bottom nav */}
          <div className="flex flex-col items-center gap-1">
            <button
              title="Settings"
              className="w-10 h-10 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
            >
              <SettingsIcon />
            </button>
            <button
              title="Profile"
              className="w-10 h-10 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
            >
              <ProfileIcon />
            </button>
            <div className="w-8 h-8 bg-black flex items-center justify-center mt-3">
              <span className="text-white text-[10px] font-bold tracking-wide">KL</span>
            </div>
          </div>
        </aside>

        {/* ── Col 2 · Chat list ── */}
        {/* Mobile: full width. Tablet: fixed width alongside main. Desktop: fixed width. */}
        <div className="w-full md:w-72 lg:w-80 border-r border-black/15 flex flex-col shrink-0 bg-white">
          {/* Mobile top bar */}
          <div className="md:hidden border-b border-black/15 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-black flex items-center justify-center">
                <span className="text-white text-[10px] font-bold tracking-widest">K</span>
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
                title="New chat"
                className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black transition-colors duration-150 cursor-pointer"
              >
                <PlusIcon size={16} />
              </button>
            </div>
          </div>

          {/* Tablet/Desktop list header */}
          <div className="hidden md:flex border-b border-black/15 px-4 py-3 items-center justify-between shrink-0">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50">
              Messages
            </span>
            <button
              title="New chat"
              className="w-7 h-7 flex items-center justify-center text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
            >
              <PlusIcon />
            </button>
          </div>

          {/* Search bar — tablet/desktop */}
          <div className="hidden md:block px-4 py-3 border-b border-black/10 shrink-0">
            <div className="border border-black/20 flex items-center gap-2 px-3 py-2 focus-within:border-black transition-colors duration-150">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search conversations..."
                className="flex-1 text-sm text-black placeholder:text-black/30 bg-transparent outline-none font-mono min-w-0"
              />
            </div>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto">
            {mockChats.map((chat, i) => (
              <Link
                key={chat.id}
                href={`/${chat.id}`}
                className={`flex items-center gap-3 px-4 py-3.5 border-b border-black/8 hover:bg-black/[0.03] transition-colors duration-150 ${i === 0 ? 'bg-black/[0.03]' : ''}`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 md:w-9 md:h-9 border border-black/20 flex items-center justify-center bg-white">
                    <span className="text-[11px] font-semibold text-black/70 tracking-wide">
                      {getInitials(chat.name)}
                    </span>
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-black border-2 border-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold text-black truncate leading-none">
                      {chat.name}
                    </span>
                    <span className="text-[10px] text-black/35 shrink-0 ml-2 font-mono">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-black/45 truncate leading-none">
                      {chat.lastMessage}
                    </span>
                    {chat.unread > 0 && (
                      <span className="ml-2 shrink-0 min-w-[18px] h-[18px] bg-black text-white text-[9px] font-bold flex items-center justify-center px-1">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Col 3 · Empty state — hidden on mobile, hidden on tablet, visible on desktop ── */}
        <main className="hidden lg:flex flex-1 flex-col relative overflow-hidden bg-gray-100">
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Centered empty state */}
          <div className="relative flex-1 flex flex-col items-center justify-center px-8">
            <div className="w-20 h-20 border border-black/15 flex items-center justify-center mb-8">
              <span className="text-4xl font-bold text-black/10 tracking-widest select-none">
                K
              </span>
            </div>

            <div className="text-center mb-10 max-w-xs">
              <h2 className="text-xl font-semibold text-black tracking-tight mb-2">Krach</h2>
              <p className="text-sm text-black/45 leading-relaxed">
                Select a conversation from the list to start messaging, or start a new one.
              </p>
            </div>

            {/* Stat strip */}
            <div className="border border-black/15 grid border-r-0 grid-cols-3 mb-10">
              {[
                { label: 'Conversations', value: '8' },
                { label: 'Unread', value: '11' },
                { label: 'Online', value: '4' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="px-8 border-black/15 border-r py-4 flex flex-col items-center gap-1"
                >
                  <span className="text-xl font-semibold text-black">{stat.value}</span>
                  <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/35">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="flex items-center gap-2 border border-black/20 px-5 py-2.5 text-[12px] font-semibold tracking-[0.15em] uppercase text-black hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer">
              <PlusIcon size={13} />
              New conversation
            </button>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-black/15" />
            <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-black/15" />
            <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-black/15" />
            <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-black/15" />
          </div>

          {/* Bottom status bar */}
          <div className="relative border-t border-black/15 px-6 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/30">
                Krach
              </span>
              <div className="w-px h-3 bg-black/15" />
              <span className="text-[10px] text-black/25 font-mono">v0.1.0</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-black" />
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-black/35">
                Connected
              </span>
            </div>
          </div>
        </main>

        {/* ── Tablet empty state — shown only on md, hidden on lg+ ── */}
        <main className="hidden md:flex lg:hidden flex-1 flex-col relative overflow-hidden bg-gray-100">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-16 h-16 border border-black/15 flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-black/10 tracking-widest select-none">
                K
              </span>
            </div>
            <h2 className="text-lg font-semibold text-black tracking-tight mb-2">Krach</h2>
            <p className="text-sm text-black/45 leading-relaxed text-center max-w-[200px]">
              Select a conversation to start messaging.
            </p>
          </div>
        </main>
      </div>

      {/* ── Mobile bottom nav bar ── */}
      <MobileBottomNav />
    </div>
  );
}
