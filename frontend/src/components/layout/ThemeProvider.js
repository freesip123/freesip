'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store';

export function ThemeProvider({ children }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Update CSS variables for toast
    root.style.setProperty('--toast-bg', theme === 'dark' ? '#1e293b' : '#ffffff');
    root.style.setProperty('--toast-color', theme === 'dark' ? '#ffffff' : '#0f172a');
  }, [theme]);

  return children;
}
