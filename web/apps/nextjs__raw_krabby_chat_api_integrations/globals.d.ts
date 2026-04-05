// global.d.ts

// Allow importing CSS files
declare module '*.css';
declare module '*.scss';
declare module '*.sass';

// Allow importing image files
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.avif';
declare module '*.svg' {
  import React from 'react';
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

// Optional: other assets
declare module '*.ico';
declare module '*.bmp';
