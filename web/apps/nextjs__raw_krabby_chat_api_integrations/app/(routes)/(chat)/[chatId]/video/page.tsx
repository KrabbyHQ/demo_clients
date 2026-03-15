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

const CameraIcon = () => (
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
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CameraOffIcon = () => (
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
    <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1m5-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
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

function MiniVisualizer({ muted, selectedMic }: { muted: boolean; selectedMic: string }) {
  const [levels, setLevels] = useState([0.1, 0.1, 0.1]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
      setLevels([0.1, 0.1, 0.1]);
      cleanup();
      return;
    }

    async function setupVisualizer() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: selectedMic ? { deviceId: { exact: selectedMic } } : true,
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
        analyzer.fftSize = 32;
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        audioContextRef.current = audioContext;
        analyzerRef.current = analyzer;

        const update = () => {
          if (!analyzerRef.current) return;
          animationFrameRef.current = requestAnimationFrame(update);
          analyzerRef.current.getByteFrequencyData(dataArray);

          // Get 3 sample points for the mini bars
          const b1 = dataArray[2] / 255;
          const b2 = dataArray[5] / 255;
          const b3 = dataArray[8] / 255;
          setLevels([Math.max(0.1, b1), Math.max(0.1, b2), Math.max(0.1, b3)]);
        };
        update();
      } catch (err) {
        console.error('Error in mini visualizer:', err);
      }
    }

    setupVisualizer();

    return cleanup;
  }, [muted, selectedMic]);

  return (
    <div className="flex items-end gap-0.5 h-3 w-4">
      {levels.map((lvl, i) => (
        <div
          key={i}
          className="w-1 bg-current transition-all duration-75"
          style={{ height: '' + lvl * 100 + '%' }}
        />
      ))}
    </div>
  );
}

export default function VideoCallPage() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const chat = mockChats.find((c) => c.id === chatId) ?? mockChats[0];
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMic, setSelectedMic] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const selfVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function getDevices() {
      try {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        setDevices(allDevices);
        const audioIn = allDevices.filter((d) => d.kind === 'audioinput');
        const videoIn = allDevices.filter((d) => d.kind === 'videoinput');
        if (audioIn.length > 0 && !selectedMic) {
          setSelectedMic(audioIn[0].deviceId);
        }
        if (videoIn.length > 0 && !selectedCamera) {
          setSelectedCamera(videoIn[0].deviceId);
        }
      } catch (err) {
        console.error('Error enumerating devices:', err);
      }
    }
    getDevices();
  }, [selectedMic, selectedCamera]);

  useEffect(() => {
    async function setupCamera() {
      if (cameraOff) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        if (selfVideoRef.current) {
          selfVideoRef.current.srcObject = null;
        }
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
          audio: selectedMic ? { deviceId: { exact: selectedMic } } : true,
        });
        streamRef.current = stream;
        if (selfVideoRef.current) {
          selfVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    }
    setupCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [cameraOff, selectedMic, selectedCamera]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return '' + mins + ':' + secs.toString().padStart(2, '0');
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden text-white">
      {/* Top Overlay */}
      <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-20">
        <Link
          href={'/' + chatId}
          className="text-white/70 hover:text-white transition-colors duration-150 p-2 -ml-2"
        >
          <BackIcon />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-0.5">
            Live Video
          </span>
          <span className="text-sm font-semibold">{chat.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-[11px] font-mono">{formatTime(seconds)}</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white/20 transition-all duration-150 cursor-pointer"
            >
              <SettingsIcon />
            </button>
            {showSettings && (
              <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-white/10 shadow-2xl z-50 p-4 rounded-xl">
                <div className="mb-4">
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/40 mb-3">
                    Camera
                  </p>
                  <div className="space-y-1.5">
                    {devices
                      .filter((d) => d.kind === 'videoinput')
                      .map((device) => (
                        <button
                          key={device.deviceId}
                          onClick={() => {
                            setSelectedCamera(device.deviceId);
                            setShowSettings(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-[11px] rounded transition-colors ${
                            selectedCamera === device.deviceId
                              ? 'bg-white text-black font-semibold'
                              : 'hover:bg-white/5 text-white/60'
                          }`}
                        >
                          {device.label || `Camera ${device.deviceId.slice(0, 5)}`}
                        </button>
                      ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/40 mb-3">
                    Microphone
                  </p>
                  <div className="space-y-1.5">
                    {devices
                      .filter((d) => d.kind === 'audioinput')
                      .map((device) => (
                        <button
                          key={device.deviceId}
                          onClick={() => {
                            setSelectedMic(device.deviceId);
                            setShowSettings(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-[11px] rounded transition-colors ${
                            selectedMic === device.deviceId
                              ? 'bg-white text-black font-semibold'
                              : 'hover:bg-white/5 text-white/60'
                          }`}
                        >
                          {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Video View */}
      <div className="flex-1 relative flex items-center justify-center bg-zinc-900">
        {/* Remote Video Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white/5 border border-white/10 flex items-center justify-center mb-4 rounded-full">
              <span className="text-2xl font-bold text-white/20">{getInitials(chat.name)}</span>
            </div>
            <p className="text-white/20 font-medium">Waiting for {chat.name}...</p>
          </div>
        </div>

        {/* Potential Remote Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
          onLoadedMetadata={(e) =>
            (e.currentTarget.className = 'w-full h-full object-cover opacity-100')
          }
        />

        {/* Self Preview */}
        <div className="absolute bottom-28 right-6 w-32 md:w-48 aspect-[3/4] md:aspect-video bg-zinc-800 border border-white/20 rounded-xl overflow-hidden shadow-2xl z-10">
          {cameraOff ? (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
              <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">
                Off
              </span>
            </div>
          ) : (
            <video
              ref={selfVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover -scale-x-100"
            />
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 flex items-center justify-center gap-6 md:gap-10 bg-gradient-to-t from-black/80 to-transparent z-20">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setMuted(!muted)}
            className={
              'w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ' +
              (muted
                ? 'bg-white text-black border-white'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40')
            }
          >
            {muted ? <MicOffIcon /> : <MicIcon />}
          </button>
          {!muted && <MiniVisualizer muted={muted} selectedMic={selectedMic} />}
        </div>

        <Link
          href={'/' + chatId}
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-500 transition-all duration-200 shadow-xl shadow-red-900/40"
        >
          <EndCallIcon />
        </Link>

        <button
          onClick={() => setCameraOff(!cameraOff)}
          className={
            'w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-200 ' +
            (cameraOff
              ? 'bg-white text-black border-white'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40')
          }
        >
          {cameraOff ? <CameraOffIcon /> : <CameraIcon />}
        </button>
      </div>
    </div>
  );
}
