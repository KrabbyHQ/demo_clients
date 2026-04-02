import Link from 'next/link';
import { getInitials } from '../../../utils';
import { PhoneIcon, VideoIcon, SearchIcon } from '../../../../../icons';

interface Chat {
  id: string;
  name: string;
  online: boolean;
  email?: string;
  phone?: string;
  country?: string;
  memberSince?: string;
}

const contactDetailsByChatId: Record<
  string,
  { email: string; phone: string; country: string; memberSince: string }
> = {
  '1': {
    email: 'amara@example.com',
    phone: '+1 234 567 8900',
    country: 'Sierra Leone',
    memberSince: 'Jan 2024',
  },
  '2': {
    email: 'kofi@example.com',
    phone: '+1 345 678 9012',
    country: 'Ghana',
    memberSince: 'Mar 2023',
  },
  '3': {
    email: 'fatima@example.com',
    phone: '+971 50 123 4567',
    country: 'UAE',
    memberSince: 'Nov 2023',
  },
  '4': {
    email: 'luca@example.com',
    phone: '+39 02 1234 5678',
    country: 'Italy',
    memberSince: 'Feb 2024',
  },
  '5': {
    email: 'yuna@example.com',
    phone: '+82 10 1234 5678',
    country: 'South Korea',
    memberSince: 'Dec 2023',
  },
  '6': {
    email: 'dev-team@example.com',
    phone: 'N/A',
    country: 'Global',
    memberSince: 'Oct 2022',
  },
  '7': {
    email: 'omar@example.com',
    phone: '+33 1 23 45 67 89',
    country: 'France',
    memberSince: 'May 2023',
  },
  '8': {
    email: 'ingrid@example.com',
    phone: '+47 21 01 23 45',
    country: 'Norway',
    memberSince: 'Aug 2023',
  },
};

interface ContactInfoPanelProps {
  activeChat: Chat;
}

function ContactInfoPanel({ activeChat }: ContactInfoPanelProps) {
  const details = contactDetailsByChatId[activeChat.id] || {
    email: 'N/A',
    phone: 'N/A',
    country: 'N/A',
    memberSince: 'N/A',
  };

  const contactRows = [
    { label: 'Email', value: activeChat.email || details.email },
    { label: 'Phone', value: activeChat.phone || details.phone },
    { label: 'Country', value: activeChat.country || details.country },
    { label: 'Member since', value: activeChat.memberSince || details.memberSince },
  ];
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
          <span className="text-[9px] font-semibold tracking-widest uppercase">Call</span>
        </Link>
        <Link
          href={`/${activeChat.id}/video`}
          title="Video"
          className="flex flex-col items-center gap-1.5 py-3.5 text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <VideoIcon size={15} />
          <span className="text-[9px] font-semibold tracking-widest uppercase">Video</span>
        </Link>
        <button
          title="Search"
          className="flex flex-col items-center gap-1.5 py-3.5 text-black/40 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <SearchIcon size={15} />
          <span className="text-[9px] font-semibold tracking-widest uppercase">Search</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contactRows.map((row) => (
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
              <div key={i} className="aspect-square border border-black/10 bg-black/3" />
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
