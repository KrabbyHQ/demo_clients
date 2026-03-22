import {
  BackIcon,
  PhoneIcon,
  VideoIcon,
  SearchIcon,
  DotsIcon,
} from '../../../../../../trash/Icons';
import Link from 'next/link';
import { mockChats } from '../../../mocks';
import { getInitials } from '../../../utils';

type Chat = (typeof mockChats)[0];

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
        <Link
          href={`/${activeChat.id}/audio`}
          title="Voice call"
          className="w-8 h-8 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <PhoneIcon />
        </Link>
        <Link
          href={`/${activeChat.id}/video`}
          title="Video call"
          className="w-8 h-8 flex items-center justify-center text-black/35 hover:text-black hover:bg-black/5 transition-colors duration-150 cursor-pointer"
        >
          <VideoIcon />
        </Link>
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

export default ChatHeader;
