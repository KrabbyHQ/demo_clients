'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockChats } from '../../../mocks';
import { formatTime, getInitials } from '../../../utils';
import {
  CallScreenMicIcon,
  BackIcon,
  MicOffIcon,
  SpeakerIcon,
  EndCallIcon,
  SettingsIcon,
} from '../../../../../Icons';

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
    const getDevices = async () => {
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
    };
    getDevices();
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    return () => navigator.mediaDevices.removeEventListener('devicechange', getDevices);
  }, []); // Only run once on mount, selectedDevice check is sufficient inside.

  useEffect(() => {
    let canceled = false;
    const cleanup = () => {
      canceled = true;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
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

        if (canceled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as Window & { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const audioContext = new AudioContextClass();

        if (canceled) {
          audioContext.close().catch(() => {});
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

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
          if (canceled || !canvasRef.current || !analyzerRef.current || !dataArrayRef.current)
            return;
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
              <p className="text-[10px] font-bold tracking-widest uppercase text-black/40 mb-3">
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
          {muted ? <MicOffIcon /> : <CallScreenMicIcon />}
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
