import React from 'react';

interface BrandHeaderProps {
  title: string;
  subtitle: string;
}

export default function BrandHeader({ title, subtitle }: BrandHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-black flex items-center justify-center">
          <span className="text-white text-sm font-bold tracking-widest">K</span>
        </div>
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-black">Krach</span>
      </div>

      <h1 className="text-2xl font-semibold text-black tracking-tight leading-tight">{title}</h1>
      <p className="mt-1.5 text-sm text-black/60 tracking-wide">{subtitle}</p>
    </div>
  );
}
