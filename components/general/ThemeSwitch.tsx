import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeSwitch({ className }: { className: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  // https://framermotionplayground.com/tutorial/switch-button good improvement
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDefault: boolean = theme === 'system';
  const isDark: boolean = theme === 'dark' || (isDefault && systemTheme === 'dark');
  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? (
        <SunIcon title="Use Light Mode" className={`text-yellow-200 ${className}`} />
      ) : (
        <MoonIcon title="Use Dark Mode" className={`text-blue-900 ${className}`} />
      )}
    </button>
  );
}
