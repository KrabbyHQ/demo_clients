import Link from 'next/link';
import UserAccountMenu from '../UserAccountMenu';
import { ChatsIcon, ContactsIcon, CallsIcon, ArchiveIcon, SettingsIcon } from '../../../../icons';

function Sidebar() {
  return (
    <aside className="hidden md:flex w-16 border-r border-black/15 flex-col items-center py-4 shrink-0 bg-gray-100 z-10">
      <Link href="/">
        <div className="w-8 h-8 bg-black flex items-center justify-center mb-8 shrink-0 cursor-pointer">
          <span className="text-white text-[10px] font-bold tracking-widest">KR</span>
        </div>
      </Link>

      <nav className="flex flex-col items-center gap-1 flex-1">
        <Link
          href="/"
          title="Chats"
          className="w-10 h-10 flex items-center justify-center bg-black text-white transition-colors duration-150 cursor-pointer"
        >
          <ChatsIcon />
        </Link>
        <button
          title="Contacts"
          aria-disabled="true"
          className="w-10 h-10 flex items-center justify-center text-black/35 cursor-default transition-colors duration-150"
        >
          <ContactsIcon />
        </button>
        <button
          title="Calls"
          aria-disabled="true"
          className="w-10 h-10 flex items-center justify-center text-black/35 cursor-default transition-colors duration-150"
        >
          <CallsIcon />
        </button>
        <button
          title="Archived"
          aria-disabled="true"
          className="w-10 h-10 flex items-center justify-center text-black/35 cursor-default transition-colors duration-150"
        >
          <ArchiveIcon />
        </button>
      </nav>

      <div className="flex flex-col items-center gap-1 mt-auto">
        <button
          title="Settings"
          aria-disabled="true"
          className="w-10 h-10 flex items-center justify-center text-black/35 cursor-default transition-colors duration-150"
        >
          <SettingsIcon />
        </button>

        {/* User Account Menu with My Profile and Logout options */}
        <UserAccountMenu variant="desktop" />
      </div>
    </aside>
  );
}

export default Sidebar;
