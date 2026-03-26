import React from 'react';

interface FormCardProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export default function FormCard({ title, onSubmit, children }: FormCardProps) {
  return (
    <div className="border border-black/20 bg-white">
      <div className="border-b border-black/20 px-5 py-3 flex items-center justify-between">
        <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-black/50">
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full border border-black/40" />
          <div className="w-1.5 h-1.5 rounded-full border border-black/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-black" />
        </div>
      </div>
      <form onSubmit={onSubmit} className="p-5 space-y-4">
        {children}
      </form>
    </div>
  );
}
