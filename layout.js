'use client';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      {/* 🟢 Sirf ye section add hua hai (Fonts ke liye) */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500&display=swap" rel="stylesheet" />
      </head>

      {/* ⚪ Ye pehle jaisa hi hai */}
      <body 
        style={{ margin: 0, padding: 0 }} 
        suppressHydrationWarning
      >
        {mounted ? children : null}
      </body>
    </html>
  );
}