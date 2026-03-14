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

const mockMessages = [
  { id: 'm1', from: 'them', text: 'Hey! Are you free to hop on a call later?', time: '10:38 AM' },
  { id: 'm2', from: 'me', text: 'Hey Amara! Yeah, what time works for you?', time: '10:39 AM' },
  {
    id: 'm3',
    from: 'them',
    text: 'Maybe around 3pm? I want to walk through the new API design with you.',
    time: '10:39 AM',
  },
  {
    id: 'm4',
    from: 'me',
    text: "3pm works perfectly. I'll send a calendar invite.",
    time: '10:40 AM',
  },
  {
    id: 'm5',
    from: 'them',
    text: 'Perfect. Also — did you get a chance to look at the auth flow I pushed yesterday?',
    time: '10:40 AM',
  },
  {
    id: 'm6',
    from: 'me',
    text: 'Yes! Looks really clean. I left a couple of minor comments but overall it is solid work.',
    time: '10:41 AM',
  },
  {
    id: 'm7',
    from: 'them',
    text: 'Thanks. I addressed most of them already. The token refresh logic was a bit tricky.',
    time: '10:41 AM',
  },
  {
    id: 'm8',
    from: 'me',
    text: 'Agreed. The sliding window approach you used is clever though.',
    time: '10:42 AM',
  },
  { id: 'm9', from: 'them', text: 'Are you free to hop on a call later?', time: '10:42 AM' },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ── Shared icon components ──────────────────────────────────────────────────

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

const PhoneIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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

const VideoIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const DotsIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="5" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="19" r="1" fill="currentColor" />
  </svg>
);

const AttachIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const EmojiIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const SendIcon = ({ size = 14 }: { size?: number }) => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BackIcon = ({ size = 18 }: { size?: number }) => (
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// ── Types ───────────────────────────────────────────────────────────────────

type Chat = (typeof mockChats)[0];

// ── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className="hidden md:flex w-16 border-r border-black/15 flex-col items-center py-4 shrink-0 bg-gray-100 z-10">
      <Link href="/">
        <div className="w-8 h-8 bg-black flex items-center justify-center mb-8 shrink-0 cursor-pointer">
          <span className="text-white text-xs font-bold tracking-widest">K</span>
        </div>
      </Link>

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
  );
}

// ── ChatList ─────────────────────────────────────────────────────────────────

function ChatList({ activeChat }: { activeChat: Chat }) {
  return (
    <div className="hidden md:flex w-72 lg:w-80 border-r border-black/15 flex-col shrink-0 bg-white">
      <div className="border-b border-black/15 px-4 py-3 flex items-center justify-between shrink-0">
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

      <div className="flex-1 overflow-y-auto">
        {mockChats.map((chat) => {
          const isActive = chat.id === activeChat.id;
          return (
            <Link
              key={chat.id}
              href={`/${chat.id}`}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-black/8 transition-colors duration-150 ${isActive ? 'bg-black/[0.05]' : 'hover:bg-black/[0.03]'}`}
            >
              <div className="relative shrink-0">
                <div
                  className={`w-9 h-9 flex items-center justify-center ${isActive ? 'bg-black border border-black' : 'border border-black/20 bg-white'}`}
                >
                  <span
                    className={`text-[11px] font-semibold tracking-wide ${isActive ? 'text-white' : 'text-black/70'}`}
                  >
                    {getInitials(chat.name)}
                  </span>
                </div>
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-black border-2 border-white" />
                )}
              </div>
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
          );
        })}
      </div>
    </div>
  );
}

// ── MessageThread ─────────────────────────────────────────────────────────────

function MessageThread({ activeChat }: { activeChat: Chat }) {
  return (
    <div
      className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-3 bg-gray-100"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="flex items-center gap-3 py-2">
        <div className="flex-1 h-px bg-black/10" />
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/30 font-mono">
          Today
        </span>
        <div className="flex-1 h-px bg-black/10" />
      </div>

      {mockMessages.map((msg) => {
        const isMe = msg.from === 'me';
        return (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
          >
            {!isMe && (
              <div className="w-7 h-7 border border-black/20 bg-white flex items-center justify-center shrink-0 mb-0.5">
                <span className="text-[9px] font-semibold text-black/60">
                  {getInitials(activeChat.name)}
                </span>
              </div>
            )}
            <div
              className={`max-w-[75%] md:max-w-[65%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`px-4 py-2.5 text-sm leading-relaxed ${isMe ? 'bg-black text-white' : 'bg-white border border-black/15 text-black'}`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-black/30 font-mono mt-1 px-1">{msg.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── MessageInput ──────────────────────────────────────────────────────────────

function MessageInput() {
  return (
    <div className="border-t border-black/15 px-4 md:px-5 py-3 md:py-3.5 bg-white shrink-0">
      <div className="border border-black/20 flex items-end gap-3 px-3 md:px-4 py-2.5 md:py-3 focus-within:border-black transition-colors duration-150">
        <button
          title="Attach file"
          className="text-black/35 hover:text-black transition-colors duration-150 cursor-pointer shrink-0 mb-0.5"
        >
          <AttachIcon />
        </button>
        <textarea
          rows={1}
          placeholder="Type a message..."
          className="flex-1 text-sm text-black placeholder:text-black/30 bg-transparent outline-none font-mono resize-none leading-relaxed min-h-[22px] max-h-32"
        />
        <button
          title="Emoji"
          className="text-black/35 hover:text-black transition-colors duration-150 cursor-pointer shrink-0 mb-0.5 hidden sm:block"
        >
          <EmojiIcon />
        </button>
        <button
          title="Send message"
          className="w-8 h-8 bg-black flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-150 cursor-pointer shrink-0"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

// ── ChatHeader ────────────────────────────────────────────────────────────────

function ChatHeader({ activeChat, showBack = false }: { activeChat: Chat; showBack?: boolean }) {
  return (
    <div className="border-b border-black/15 px-4 md:px-5 py-3 flex items-center justify-between shrink-0 bg-white">
      <div className="flex items-center gap-2.5 md:gap-3">
        {/* Back button — mobile only */}
        {showBack && (
          <Link
            href="/"
            className="md:hidden text-black/50 hover:text-black transition-colors duration-150 mr-1 cursor-pointer"
          >
            <BackIcon />
          </Link>
        )}
        <div className="relative">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-black border border-black flex items-center justify-center">
            <span className="text-white text-[10px] md:text-[11px] font-semibold tracking-wide">
              {getInitials(activeChat.name)}
            </span>
          </div>
          {activeChat.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-black border-2 border-white" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-black leading-none">{activeChat.name}</p>
          <p className="text-[11px] text-black/40 mt-0.5 font-mono">
            {activeChat.online ? 'Online' : 'Last seen recently'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-0.5 md:gap-1">
        <button
          title="Voice call"
          className="w-8 h-8 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <PhoneIcon />
        </button>
        <button
          title="Video call"
          className="w-8 h-8 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <VideoIcon />
        </button>
        <button
          title="Search in chat"
          className="hidden sm:flex w-8 h-8 items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <SearchIcon size={16} />
        </button>
        <button
          title="More options"
          className="w-8 h-8 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <DotsIcon />
        </button>
      </div>
    </div>
  );
}

// ── ContactInfoPanel ──────────────────────────────────────────────────────────

function ContactInfoPanel({ activeChat }: { activeChat: Chat }) {
  return (
    <div className="hidden lg:flex w-64 border-l border-black/15 flex-col bg-white shrink-0">
      <div className="border-b border-black/15 px-4 py-3 shrink-0">
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-black/50">
          Contact Info
        </span>
      </div>

      <div className="flex flex-col items-center px-4 py-6 border-b border-black/10">
        <div className="w-16 h-16 bg-black flex items-center justify-center mb-3">
          <span className="text-white text-xl font-semibold tracking-wide">
            {getInitials(activeChat.name)}
          </span>
        </div>
        <p className="text-sm font-semibold text-black text-center leading-tight">
          {activeChat.name}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <div
            className={`w-1.5 h-1.5 ${activeChat.online ? 'bg-black' : 'border border-black/30'}`}
          />
          <span className="text-[11px] text-black/40 font-mono">
            {activeChat.online ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-black/10 border-b border-black/10 shrink-0">
        <button
          title="Call"
          className="flex flex-col items-center gap-1.5 py-3.5 text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <PhoneIcon size={15} />
          <span className="text-[9px] font-semibold tracking-[0.1em] uppercase">Call</span>
        </button>
        <button
          title="Video"
          className="flex flex-col items-center gap-1.5 py-3.5 text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <VideoIcon size={15} />
          <span className="text-[9px] font-semibold tracking-[0.1em] uppercase">Video</span>
        </button>
        <button
          title="Search"
          className="flex flex-col items-center gap-1.5 py-3.5 text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <SearchIcon size={15} />
          <span className="text-[9px] font-semibold tracking-[0.1em] uppercase">Search</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {[
          { label: 'Email', value: 'amara@example.com' },
          { label: 'Phone', value: '+1 234 567 8900' },
          { label: 'Country', value: 'Sierra Leone' },
          { label: 'Member since', value: 'Jan 2024' },
        ].map((row) => (
          <div key={row.label} className="px-4 py-4 border-b border-black/8">
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/35 mb-1">
              {row.label}
            </p>
            <p className="text-[12px] text-black/70 font-mono">{row.value}</p>
          </div>
        ))}
        <div className="px-4 py-4">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-black/35 mb-2">
            Shared media
          </p>
          <div className="grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square border border-black/10 bg-black/[0.03]" />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 px-4 py-3 shrink-0 space-y-1">
        <button className="w-full text-left text-[11px] font-semibold tracking-[0.12em] uppercase text-black/35 hover:text-black transition-colors duration-150 cursor-pointer py-1">
          Mute notifications
        </button>
        <button className="w-full text-left text-[11px] font-semibold tracking-[0.12em] uppercase text-black/60 hover:text-black transition-colors duration-150 cursor-pointer py-1">
          Block contact
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

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
      <nav className="md:hidden border-t border-black/15 bg-white shrink-0 flex items-center justify-around px-2 py-2">
        <Link href="/" className="flex flex-col items-center gap-1 px-4 py-1.5 cursor-pointer">
          <span className="text-black/35">
            <ChatsIcon />
          </span>
          <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-black/35">
            Chats
          </span>
        </Link>
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
