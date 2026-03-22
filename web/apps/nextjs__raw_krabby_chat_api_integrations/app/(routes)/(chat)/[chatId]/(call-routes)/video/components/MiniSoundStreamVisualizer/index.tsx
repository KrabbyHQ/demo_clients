'use client';

import { useEffect, useRef } from 'react';

function MiniSoundStreamVisualizer({
  muted,
  selectedMic,
  levels,
  setLevels,
}: {
  muted: boolean;
  selectedMic: string;
  levels: number[];
  setLevels: React.Dispatch<React.SetStateAction<number[]>>;
}) {
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
  }, [muted, selectedMic, setLevels]);

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

export default MiniSoundStreamVisualizer;
