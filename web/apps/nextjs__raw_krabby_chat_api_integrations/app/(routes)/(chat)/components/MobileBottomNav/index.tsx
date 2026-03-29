import Link from 'next/link';
import { ChatsIcon, CallsIcon, ContactsIcon, SettingsIcon } from '../../../../Icons';

function MobileBottomNav() {
  return (
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
      <button title="Calls" className="flex flex-col items-center gap-1 px-4 py-1.5 cursor-pointer">
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
  );
}

export default MobileBottomNav;
