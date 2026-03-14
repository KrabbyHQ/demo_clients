import React from 'react';
import Link from 'next/link';

const mockChats = [
  {
    id: '1',
    name: 'Amara Diallo',
    lastMessage: 'Are you free to hop on a call later?',
    time: '10:42 AM',
    unread: 3,
    online: true,
  },
  {
    id: '2',
    name: 'Kofi Mensah',
    lastMessage: 'The build is passing now, finally.',
    time: '9:17 AM',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Fatima Al-Rashid',
    lastMessage: 'Send me the updated docs when ready.',
    time: 'Yesterday',
    unread: 1,
    online: true,
  },
  {
    id: '4',
    name: 'Luca Ferretti',
    lastMessage: 'Looks good to me. Ship it.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: '5',
    name: 'Yuna Park',
    lastMessage: 'I left a comment on the PR.',
    time: 'Mon',
    unread: 0,
    online: true,
  },
  {
    id: '6',
    name: 'Dev — Backend',
    lastMessage: 'Kofi: migrations ran clean ✓',
    time: 'Mon',
    unread: 7,
    online: false,
  },
  {
    id: '7',
    name: 'Omar Sy',
    lastMessage: 'Will ping you in the morning.',
    time: 'Sun',
    unread: 0,
    online: false,
  },
  {
    id: '8',
    name: 'Ingrid Holm',
    lastMessage: 'Done. Closing the ticket.',
    time: 'Sun',
    unread: 0,
    online: true,
  },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const ChatsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ContactsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CallsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ArchiveIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ProfileIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PlusIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

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
      <nav className="md:hidden border-t border-black/15 bg-white shrink-0 flex items-center justify-around px-2 py-2 safe-b">
        <button
          title="Chats"
          className="flex flex-col items-center gap-1 px-4 py-1.5 cursor-pointer"
        >
          <span className="text-black">
            <ChatsIcon />
          </span>
          <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-black">
            Chats
          </span>
        </button>
        <button
          title="Contacts"
          className="flex flex-col items-center gap-1 px-4 py-1.5 cursor-pointer"
        >
          <span className="text-black/35">
            <ContactsIcon />
          </span>
          <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-black/35">
            Contacts
          </span>
        </button>
        <button
          title="Calls"
          className="flex flex-col items-center gap-1 px-4 py-1.5 cursor-pointer"
        >
          <span className="text-black/35">
            <CallsIcon />
          </span>
          <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-black/35">
            Calls
          </span>
        </button>
        <button
          title="Settings"
          className="flex flex-col items-center gap-1 px-4 py-1.5 cursor-pointer"
        >
          <span className="text-black/35">
            <SettingsIcon />
          </span>
          <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-black/35">
            Settings
          </span>
        </button>
      </nav>
    </div>
  );
}
