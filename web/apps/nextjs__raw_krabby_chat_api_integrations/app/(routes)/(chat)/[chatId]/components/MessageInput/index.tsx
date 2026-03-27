'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { AttachIcon, MicIcon, EmojiIcon, TrashIcon, SendIcon } from '../../../components/Icons';

function MessageInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [levels, setLevels] = useState<number[]>(new Array(20).fill(0.1));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isStartingRef = useRef(false);

  const startRecording = async () => {
    if (isStartingRef.current || isRecording) return;
    isStartingRef.current = true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!isStartingRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as Window & { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const audioContext = new AudioContextClass();
      const analyzer = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyzer);
      analyzer.fftSize = 64;

      audioContextRef.current = audioContext;
      analyzerRef.current = analyzer;
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      const update = () => {
        if (!analyzerRef.current) return;
        animationFrameRef.current = requestAnimationFrame(update);
        analyzerRef.current.getByteFrequencyData(dataArray);

        // Take a subset of frequencies for the visualizer
        const newLevels = [];
        for (let i = 0; i < 20; i++) {
          const val = dataArray[i % dataArray.length] / 255;
          newLevels.push(Math.max(0.1, val));
        }
        setLevels(newLevels);
      };
      update();
    } catch (err) {
      console.error('Error starting recording:', err);
    } finally {
      isStartingRef.current = false;
    }
  };

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setLevels(new Array(20).fill(0.1));
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="border-t border-black/15 px-4 md:px-5 py-3 md:py-3.5 bg-white shrink-0">
      <div className="border border-black/20 flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 focus-within:border-black transition-colors duration-150">
        {!isRecording ? (
          <>
            <button
              title="Attach file"
              className="text-black/35 hover:text-black transition-colors duration-150 cursor-pointer shrink-0 mb-0.5"
            >
              <AttachIcon />
            </button>
            <button
              onClick={startRecording}
              title="Voice note"
              className="text-black/35 hover:text-black transition-colors duration-150 cursor-pointer shrink-0 mb-0.5"
            >
              <MicIcon />
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
          </>
        ) : (
          <>
            <button
              onClick={stopRecording}
              title="Discard recording"
              className="text-red-500 hover:text-red-600 transition-colors duration-150 cursor-pointer shrink-0 mb-0.5"
            >
              <TrashIcon />
            </button>
            <div className="flex-1 flex items-center gap-1.5 px-2 h-[22px] mb-0.5">
              <div className="flex items-center gap-0.5 h-full flex-1">
                {levels.map((lvl, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-black transition-all duration-75"
                    style={{ height: `${lvl * 100}%`, minHeight: '2px' }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono text-black/50 shrink-0">
                {formatTime(recordingTime)}
              </span>
            </div>
          </>
        )}
        <button
          onClick={() => {
            if (isRecording) stopRecording();
            // In a real app, send logic would go here
          }}
          title="Send message"
          className="w-8 h-8 bg-black flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-150 cursor-pointer shrink-0"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
