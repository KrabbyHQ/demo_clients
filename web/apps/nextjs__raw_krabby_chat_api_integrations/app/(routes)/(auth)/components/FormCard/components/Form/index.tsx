'use client';

import React from 'react';

interface FormProps {
  children: React.ReactNode;
}

export default function Form({ children }: FormProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="p-5 space-y-4">
      {children}
    </form>
  );
}
