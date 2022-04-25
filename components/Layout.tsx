import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SvgSprite from 'components/SvgSprite';
import NavLink from 'components/NavLink';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const [themeToggle, setThemeToggle] = useState(true);
  const { pathname } = useRouter();

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
    <div className="min-h-screen dark:bg-dark-800 dark:text-white">
      <nav className="flex items-center gap-8 px-10 py-4 text-xl font-medium capitalize shadow child:transition child:duration-200 child-hover:text-primary dark:bg-dark-700 dark:shadow-none xl:gap-4 xl:px-5">
        <Link href="/">
          <a className="font-semibold">xuan</a>
        </Link>

        <NavLink nextLink={{ href: '/blog' }} className="hover:-translate-y-1">
          blog
        </NavLink>

        {/* <Link href="/portfolio">
            <a className="text-lg transition-transform hover:-translate-y-1 xl:text-base">portfolio</a>
          </Link> */}

        <a
          href="https://github.com/jason89521"
          target="_blank"
          rel="noreferrer"
          className="ml-auto hover:-rotate-12 hover:scale-125"
        >
          <SvgSprite category="social" symbolId="github" className="h-8 w-8 dark:fill-white xl:h-6 xl:w-6" />
        </a>

        <label className="cursor-pointer hover:-rotate-12 hover:scale-125">
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
      </nav>

      {children}
    </div>
  );
}

export default Layout;
