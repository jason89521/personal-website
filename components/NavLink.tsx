import React from 'react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = { nextLink: LinkProps } & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>;

const NavLink = ({ nextLink, className, ...props }: Props) => {
  const { pathname } = useRouter();
  const href = typeof nextLink.href === 'string' ? nextLink.href : nextLink.href.pathname!;
  const activeClass = pathname.startsWith(href) ? 'text-primary' : '';

  return (
    <Link {...nextLink}>
      <a className={`${activeClass} ${className}`} {...props} />
    </Link>
  );
};

export default NavLink;
