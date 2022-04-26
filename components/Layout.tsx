import { useState, useEffect } from 'react';
import Link from 'next/link';
import SvgSprite from 'components/SvgSprite';
import NavLink from 'components/NavLink';
import ThemeToggle from 'components/ThemeToggle';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="min-h-screen dark:bg-dark-800 dark:text-white">
      <nav className="sticky top-0 z-50 flex h-top-nav items-center gap-8 px-10 py-4 text-xl font-medium capitalize shadow child:transition child-hover:text-primary dark:bg-dark-700 dark:shadow-none xl:gap-4 xl:px-5">
        <Link href="/">
          <a className="font-semibold">xuan</a>
        </Link>

        <NavLink nextLink={{ href: '/blog' }} className="hover:-translate-y-1">
          blog
        </NavLink>

        <a
          href="https://github.com/jason89521"
          target="_blank"
          rel="noreferrer"
          className="ml-auto hover:-rotate-12 hover:scale-125"
        >
          <SvgSprite category="social" symbolId="github" className="h-8 w-8 dark:fill-white xl:h-6 xl:w-6" />
        </a>

        <ThemeToggle className="cursor-pointer hover:-rotate-12 hover:scale-125" />
      </nav>

      {children}
    </div>
  );
}

export default Layout;
