import Link from 'next/link';
import { PhoneIcon, VideoIcon, SearchIcon } from '../../../../../../trash/Icons';
import { getInitials } from '../../../utils';
import { mockChats } from '../../../mocks';

type Chat = (typeof mockChats)[0];

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
        <Link
          href={`/${activeChat.id}/audio`}
          title="Call"
          className="flex flex-col items-center gap-1.5 py-3.5 text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <PhoneIcon size={15} />
          <span className="text-[9px] font-semibold tracking-[0.1em] uppercase">Call</span>
        </Link>
        <Link
          href={`/${activeChat.id}/video`}
          title="Video"
          className="flex flex-col items-center gap-1.5 py-3.5 text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <VideoIcon size={15} />
          <span className="text-[9px] font-semibold tracking-[0.1em] uppercase">Video</span>
        </Link>
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

export default ContactInfoPanel;
