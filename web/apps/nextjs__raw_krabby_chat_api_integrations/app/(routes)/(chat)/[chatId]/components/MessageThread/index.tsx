import { mockMessages, mockChats } from '../../../mocks';
import { getInitials } from '../../../utils';

type Chat = (typeof mockChats)[0];

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

export default MessageThread;
