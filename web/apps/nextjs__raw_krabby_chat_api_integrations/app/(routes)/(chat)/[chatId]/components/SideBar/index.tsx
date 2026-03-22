import Link from 'next/link';
import {
  ChatsIcon,
  ContactsIcon,
  CallsIcon,
  ArchiveIcon,
  SettingsIcon,
  ProfileIcon,
} from '../../../../../../trash/Icons';

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

export default Sidebar;
