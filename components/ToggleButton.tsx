'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="px-3 flex space-x-3 items-center"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      <div className="size-10 rounded-lg flex items-center justify-center bg-secondaryDark dark:bg-secondary">
        <MoonIcon className="size-6 text-white hidden dark:flex" />
        <SunIcon className="size-6 text-white dark:hidden flex" />
      </div>

      <p className="text-primary dark:text-white hidden md:flex">
        Switch to {theme === 'light' ? 'Dark' : 'Light'}
      </p>
    </button>
  );
};

export default ToggleButton;

