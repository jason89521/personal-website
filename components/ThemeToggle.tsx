import React, { useState, useEffect } from 'react';
import SvgSprite from 'components/SvgSprite';

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {
  const [themeToggle, setThemeToggle] = useState(true);

  // intialize theme
  useEffect(() => {
    const themePreference = localStorage.getItem('theme');
    if (themePreference === 'dark') setThemeToggle(false);
  }, []);

  useEffect(() => {
    if (themeToggle) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      return;
    }

    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, [themeToggle]);

  return (
    <label className={className}>
      <SvgSprite
        category="theme"
        symbolId={themeToggle ? 'sun' : 'moon'}
        className="h-8 w-8 dark:fill-white xl:h-6 xl:w-6"
      />
      <input
        type="checkbox"
        className="hidden"
        onChange={() => setThemeToggle(!themeToggle)}
        checked={themeToggle}
        value="theme"
      />
    </label>
  );
};

export default ThemeToggle;
