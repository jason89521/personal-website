import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import SvgSprite from 'components/SvgSprite';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
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
    <div className="min-h-screen dark:bg-gray-700 dark:text-gray-200">
      <div className="mx-auto max-w-7xl 2xl:max-w-none 2xl:px-10 xl:px-5">
        <nav className="flex items-center gap-8 border-b py-4 capitalize xl:gap-4">
          <Link href="/">
            <a className="text-3xl xl:text-2xl">xuan</a>
          </Link>

          <Link href="/blog">
            <a className="text-lg transition-transform hover:-translate-y-1 xl:text-base">blog</a>
          </Link>

          <Link href="/portfolio">
            <a className="text-lg transition-transform hover:-translate-y-1 xl:text-base">portfolio</a>
          </Link>

          <a
            href="https://github.com/jason89521"
            target="_blank"
            rel="noreferrer"
            className="ml-auto transition-transform hover:-rotate-12 hover:scale-125"
          >
            <SvgSprite category="social" symbolId="github" className="h-8 w-8 dark:fill-slate-50 xl:h-6 xl:w-6" />
          </a>

          <label className="cursor-pointer transition-transform hover:-rotate-12 hover:scale-125">
            <SvgSprite
              category="theme"
              symbolId={themeToggle ? 'sun' : 'moon'}
              className="h-8 w-8 dark:fill-slate-50 xl:h-6 xl:w-6"
            />
            <input
              type="checkbox"
              className="hidden"
              onChange={() => setThemeToggle(!themeToggle)}
              checked={themeToggle}
              value="theme"
            />
          </label>
        </nav>

        {children}
      </div>
    </div>
  );
};

export default Layout;
