import Link from 'next/link';
import { PlusIcon, SearchIcon } from '../../../../../../trash/Icons';
import { mockChats } from '../../../mocks';
import { getInitials } from '../../../utils';

type Chat = (typeof mockChats)[0];

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

export default ChatList;
