'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockChats } from '../../../mocks';
import { getInitials, formatTime } from '../../../utils';
import {
  BackIcon,
  MicIcon,
  MicOffIcon,
  CameraOffIcon,
  CameraIcon,
  EndCallIcon,
  SettingsIcon,
} from '../../../components/Icons';
import MiniSoundStreamVisualizer from './components/MiniSoundStreamVisualizer';
import RTCDebugOverlay from './components/RTCDebugOverlay';

export default function VideoCallPage() {
  const params = useParams();
  const chatId = params?.chatId as string;
  const chat = mockChats.find((c) => c.id === chatId) ?? mockChats[0];
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [soundLevels, setSoundoundLevels] = useState([0.1, 0.1, 0.1]);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMic, setSelectedMic] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
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

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden text-white">
      {/* RTC Debug Stats Overlay */}
      <RTCDebugOverlay peerConnection={peerConnection} />

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
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                Camera Off
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
          {!muted && (
            <MiniSoundStreamVisualizer
              muted={muted}
              selectedMic={selectedMic}
              levels={soundLevels}
              setLevels={setSoundoundLevels}
            />
          )}
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
