'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const mockChats = [
  { id: '1', name: 'Amara Diallo' },
  { id: '2', name: 'Kofi Mensah' },
  { id: '3', name: 'Fatima Al-Rashid' },
  { id: '4', name: 'Luca Ferretti' },
  { id: '5', name: 'Yuna Park' },
  { id: '6', name: 'Dev — Backend' },
  { id: '7', name: 'Omar Sy' },
  { id: '8', name: 'Ingrid Holm' },
];

const SettingsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const BackIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const MicIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const MicOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const EndCallIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91" />
    <line x1="23" y1="1" x2="1" y2="23" />
  </svg>
);

const SpeakerIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

export default function AudioCallPage() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const chat = mockChats.find((c) => c.id === chatId) ?? mockChats[0];
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function getDevices() {
      try {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const audioIn = allDevices.filter((d) => d.kind === 'audioinput');
        setDevices(audioIn);
        if (audioIn.length > 0 && !selectedDevice) {
          setSelectedDevice(audioIn[0].deviceId);
        }
      } catch (err) {
        console.error('Error enumerating devices:', err);
      }
    }
    getDevices();
  }, [selectedDevice]);

  useEffect(() => {
    const cleanup = () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };

    if (muted) {
      cleanup();
      return;
    }

    async function setupAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: selectedDevice ? { deviceId: { exact: selectedDevice } } : true,
        });
        streamRef.current = stream;
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as Window & { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const audioContext = new AudioContextClass();
        const analyzer = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyzer);
        analyzer.fftSize = 256;
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        audioContextRef.current = audioContext;
        analyzerRef.current = analyzer;
        dataArrayRef.current = dataArray;

        const draw = () => {
          if (!canvasRef.current || !analyzerRef.current || !dataArrayRef.current) return;
          animationFrameRef.current = requestAnimationFrame(draw);
          analyzerRef.current.getByteFrequencyData(
            dataArrayRef.current as unknown as Uint8Array<ArrayBuffer>,
          );

          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const width = canvas.width;
          const height = canvas.height;
          ctx.clearRect(0, 0, width, height);

          const centerX = width / 2;
          const centerY = height / 2;
          const radius = 60;

          // Outer pulse
          let sum = 0;
          for (let i = 0; i < dataArrayRef.current.length; i++) {
            sum += dataArrayRef.current[i];
          }
          const average = sum / dataArrayRef.current.length;
          const pulseRadius = radius + average * 0.8;

          ctx.beginPath();
          ctx.arc(centerX, centerY, pulseRadius, 0, 2 * Math.PI);
          ctx.strokeStyle = 'rgba(0, 0, 0, ' + (0.1 + average / 255) + ')';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Visualization bars
          const barCount = 64;
          for (let i = 0; i < barCount; i++) {
            const angle = (i / barCount) * Math.PI * 2;
            const value = dataArrayRef.current[i % dataArrayRef.current.length];
            const barHeight = (value / 255) * 100;

            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + barHeight);
            const y2 = centerY + Math.sin(angle) * (radius + barHeight);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'rgba(0, 0, 0, ' + (0.5 + value / 255) + ')';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        };
        draw();
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    }

    setupAudio();

    return cleanup;
  }, [muted, selectedDevice]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return '' + mins + ':' + secs.toString().padStart(2, '0');
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-black/10 shrink-0">
        <Link
          href={'/' + chatId}
          className="text-black/50 hover:text-black transition-colors duration-150 p-2 -ml-2"
        >
          <BackIcon />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/30 mb-0.5">
            End-to-end encrypted
          </span>
          <span className="text-sm font-semibold text-black">{chat.name}</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 flex items-center justify-center text-black/35 hover:text-black transition-colors duration-150 cursor-pointer"
          >
            <SettingsIcon />
          </button>
          {showSettings && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-black/10 shadow-xl z-50 p-4">
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-black/40 mb-3">
                Microphone
              </p>
              <div className="space-y-2">
                {devices.map((device) => (
                  <button
                    key={device.deviceId}
                    onClick={() => {
                      setSelectedDevice(device.deviceId);
                      setShowSettings(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                      selectedDevice === device.deviceId
                        ? 'bg-black text-white'
                        : 'hover:bg-black/5 text-black'
                    }`}
                  >
                    {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="mb-12 text-center z-10">
          <div className="w-24 h-24 bg-black/5 border border-black/10 flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl font-bold text-black/80">{getInitials(chat.name)}</span>
          </div>
          <h1 className="text-2xl font-bold text-black tracking-tight mb-2">{chat.name}</h1>
          <p className="text-sm font-mono text-black/40">{formatTime(seconds)}</p>
        </div>

        {/* Visualizer Canvas */}
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
          <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
          {/* Static center element */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full border border-black/5 bg-white flex items-center justify-center shadow-sm">
              <span className="text-3xl">🎙️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Strip */}
      <div className="px-6 py-10 md:py-16 flex items-center justify-center gap-8 md:gap-12 border-t border-black/5 bg-white z-10">
        <button
          onClick={() => setMuted(!muted)}
          className={
            'w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border transition-all duration-200 ' +
            (muted
              ? 'bg-black text-white border-black'
              : 'bg-white text-black/40 border-black/10 hover:border-black/30 hover:text-black')
          }
        >
          {muted ? <MicOffIcon /> : <MicIcon />}
        </button>

        <Link
          href={'/' + chatId}
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-black text-white hover:bg-black/80 transition-all duration-200 shadow-xl shadow-black/20"
        >
          <EndCallIcon />
        </Link>

        <button
          onClick={() => setSpeakerOn(!speakerOn)}
          className={
            'w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border transition-all duration-200 ' +
            (!speakerOn
              ? 'bg-black text-white border-black'
              : 'bg-white text-black/40 border-black/10 hover:border-black/30 hover:text-black')
          }
        >
          <SpeakerIcon />
        </button>
      </div>

      <div className="h-4 bg-white md:hidden" />
    </div>
  );
}
