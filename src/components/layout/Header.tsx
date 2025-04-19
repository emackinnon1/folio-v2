import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FiExternalLink, FiMenu, FiX } from 'react-icons/fi';

import Accent from '@/components/Accent';
import ThemeButton from '@/components/buttons/ThemeButton';
import UnstyledLink from '@/components/links/UnstyledLink';

type HeaderProps = {
  large?: boolean;
};

export default function Header({ large = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  //#region  //*=========== Route Functionality ===========
  const router = useRouter();
  /** Ex: /projects/petrolida-2021 -> ['', 'projects', 'petrolida-2021'] */
  const arrOfRoute = router.route.split('/');
  const baseRoute = '/' + arrOfRoute[1];
  //#endregion  //*======== Route Functionality ===========

  //#region  //*=========== Scroll Shadow ===========
  const [onTop, setOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Scroll Shadow ===========

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 bg-white dark:bg-dark transition-shadow',
        !onTop && 'shadow-sm'
      )}
    >
      {/* Skip Navigation */}
      <a
        href='#skip-nav'
        className={clsx(
          'rounded-sm p-2 transition',
          'font-medium text-black dark:text-white',
          'bg-white dark:bg-dark',
          'group dark:hover:text-primary-300',
          'focus:outline-none focus:ring focus:ring-primary-300',
          'absolute left-4 top-4',
          '-translate-y-16 focus:translate-y-0'
        )}
      >
        <Accent>Skip to main content</Accent>
      </a>

      {/* Gradient Line */}
      <div className='h-1 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400' />

      <div className='bg-white transition-colors dark:bg-dark dark:text-white'>
        <nav
          className={clsx(
            'layout flex items-center justify-between py-4',
            large && 'lg:max-w-[68rem]'
          )}
        >
          {/* Logo */}
          <UnstyledLink
            href='/'
            className={clsx(
              'font-bold text-xl transition-colors',
              'hover:text-primary-500 dark:hover:text-primary-300',
              'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            )}
            onClick={handleMenuClose}
          >
            <Accent>EM.</Accent>
          </UnstyledLink>

          {/* Desktop navigation */}
          <ul className='hidden items-center justify-between space-x-3 md:flex md:space-x-4'>
            {links.map(({ href, label, external }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className={clsx(
                    'relative py-2 px-1 font-medium transition-colors',
                    'hover:text-primary-500 dark:hover:text-primary-300',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                  )}
                  {...(external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                >
                  <span className='relative'>
                    {label}
                    {external && (
                      <FiExternalLink className='ml-1 inline-block text-sm' />
                    )}
                    {/* Active indicator */}
                    {href === baseRoute && (
                      <span className='absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-tr from-primary-300 to-primary-400' />
                    )}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className='flex items-center justify-between space-x-3'>
            <ThemeButton />

            {/* Mobile menu button */}
            <button
              className='rounded-md p-2 text-lg focus:outline-none md:hidden'
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile navigation */}
        <div
          className={clsx(
            'fixed inset-0 z-50 flex items-start justify-center bg-white/80 backdrop-blur-sm dark:bg-dark/80 md:hidden',
            'transition-opacity duration-300',
            isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <div className='mt-16 w-full px-4'>
            <ul className='flex flex-col items-center space-y-4 rounded-md p-4'>
              {links.map(({ href, label, external }) => (
                <li key={`mobile-${href}${label}`} className='w-full'>
                  <UnstyledLink
                    href={href}
                    className={clsx(
                      'flex w-full items-center justify-center rounded-md py-4 font-medium',
                      href === baseRoute
                        ? 'bg-gradient-to-tr from-primary-300/20 to-primary-400/20 text-primary-500 dark:text-primary-300'
                        : 'text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-300',
                      'transition-colors'
                    )}
                    {...(external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    onClick={handleMenuClose}
                  >
                    {label}
                    {external && (
                      <FiExternalLink className='ml-1 inline-block text-sm' />
                    )}
                  </UnstyledLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/library', label: 'Library' },
  { href: 'https://github.com/emackinnon1', label: 'GitHub', external: true },
];
