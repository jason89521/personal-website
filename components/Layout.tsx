import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import SvgSprite from 'components/SvgSprite';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      return;
    }

    document.documentElement.classList.add('dark');
  }, [isLightMode]);

  return (
    <div className="min-h-screen dark:bg-gray-700 dark:text-gray-200">
      <div className="mx-auto max-w-7xl 2xl:max-w-none 2xl:px-10 xl:px-5">
        <nav className="flex items-center gap-8 border-b py-4 capitalize">
          <Link href="/">
            <a className="text-3xl">xuan</a>
          </Link>

          <Link href="/blog">
            <a className="text-lg transition-transform hover:-translate-y-1">blog</a>
          </Link>

          <Link href="/portfolio">
            <a className="text-lg transition-transform hover:-translate-y-1">portfolio</a>
          </Link>

          <label className="ml-auto cursor-pointer">
            <SvgSprite
              category="theme"
              symbolId={isLightMode ? 'sun' : 'moon'}
              className="h-8 w-8 fill-slate-500 transition-transform hover:scale-125 dark:fill-slate-50"
            />
            <input
              type="checkbox"
              className="hidden"
              onChange={() => setIsLightMode(!isLightMode)}
              checked={isLightMode}
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
