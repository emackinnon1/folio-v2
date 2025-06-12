import clsx from 'clsx';
import { motion, Transition, Variants } from 'framer-motion';
import {
  Book,
  GitPullRequestArrowIcon,
  Hammer,
  Home,
  Newspaper,
  User,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
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
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

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

  // Animation variants from NavBar component
  const itemVariants: Variants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
  };

  const backVariants: Variants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
  };

  const glowVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: 1,
      scale: 1.8,
      transition: {
        opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
      },
    },
  };

  const navGlowVariants: Variants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const sharedTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    duration: 0.5,
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
        <motion.nav
          className={clsx(
            'layout flex items-center justify-between py-4 relative',
            large && 'lg:max-w-[68rem]'
          )}
          initial='initial'
          whileHover='hover'
        >
          {/* Background glow effect */}
          <motion.div
            className={`absolute -inset-2 bg-gradient-radial from-transparent ${
              isDarkTheme
                ? 'via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%'
                : 'via-blue-400/10 via-30% via-purple-400/10 via-60% via-red-400/10 via-90%'
            } to-transparent rounded-3xl z-0 pointer-events-none opacity-0`}
            variants={navGlowVariants}
          />

          {/* Logo */}
          <motion.div
            className='relative group'
            whileHover='hover'
            initial='initial'
          >
            <motion.div
              className='absolute inset-0 z-0 pointer-events-none'
              variants={glowVariants}
              style={{
                background:
                  'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
                borderRadius: '16px',
              }}
            />
            <UnstyledLink
              href='/'
              className={clsx(
                'font-bold text-xl transition-colors relative z-10',
                'hover:text-primary-500 dark:hover:text-primary-300',
                'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
              )}
              onClick={handleMenuClose}
            >
              <Accent>EM.</Accent>
            </UnstyledLink>
          </motion.div>

          {/* Desktop navigation - with 3D flip animation */}
          <ul className='hidden items-center justify-between space-x-3 md:flex md:space-x-4 relative z-10'>
            {links.map(({ href, label, external, icon, iconColor }) => (
              <li key={`${href}${label}`}>
                <motion.div
                  className='block rounded-xl overflow-visible group'
                  style={{ perspective: '600px' }}
                  whileHover='hover'
                  initial='initial'
                >
                  <motion.div
                    className='absolute inset-0 z-0 pointer-events-none'
                    variants={glowVariants}
                    style={{
                      background:
                        href === '/about'
                          ? 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, rgba(234,88,12,0.12) 50%, rgba(194,65,12,0) 100%)' // orange for About
                          : href === '/blog'
                          ? 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(147,51,234,0.12) 50%, rgba(126,34,206,0) 100%)' // purple for Blog
                          : href === '/projects'
                          ? 'radial-gradient(circle, rgba(239,68,68,0.25) 0%, rgba(220,38,38,0.12) 50%, rgba(185,28,28,0) 100%)' // red for Projects
                          : href === '/library'
                          ? 'radial-gradient(circle, rgba(234,179,8,0.25) 0%, rgba(202,138,4,0.12) 50%, rgba(161,98,7,0) 100%)' // yellow for Library
                          : href === '/'
                          ? 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(37,99,235,0.12) 50%, rgba(29,78,216,0) 100%)' // blue for Home
                          : 'radial-gradient(circle, rgba(107,114,128,0.25) 0%, rgba(75,85,99,0.12) 50%, rgba(55,65,81,0) 100%)', // gray for GitHub/external
                      opacity: href === baseRoute ? 0.5 : 0,
                      borderRadius: '16px',
                    }}
                  />

                  {/* Front face of the 3D element */}
                  <motion.div
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center bottom',
                    }}
                    className='relative z-10'
                  >
                    <UnstyledLink
                      href={href}
                      className={clsx(
                        'flex items-center gap-2 px-4 py-2 relative font-medium transition-colors rounded-xl',
                        href === baseRoute
                          ? 'text-primary-500 dark:text-primary-300'
                          : 'text-muted-foreground group-hover:text-foreground',
                        'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                      )}
                      {...(external && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                    >
                      {icon && (
                        <span
                          className={clsx(
                            'transition-colors duration-300',
                            href === baseRoute
                              ? iconColor.replace('group-hover:', '')
                              : iconColor
                          )}
                        >
                          {icon}
                        </span>
                      )}
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
                  </motion.div>

                  {/* Back face of the 3D element */}
                  <motion.div
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center top',
                      position: 'absolute',
                      inset: 0,
                      rotateX: 90,
                    }}
                    className='z-10'
                  >
                    <UnstyledLink
                      href={href}
                      className={clsx(
                        'flex items-center gap-2 px-4 py-2 h-full w-full font-medium transition-colors rounded-xl',
                        href === baseRoute
                          ? 'text-primary-500 dark:text-primary-300'
                          : 'text-muted-foreground group-hover:text-foreground',
                        'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                      )}
                      {...(external && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                    >
                      {icon && (
                        <span
                          className={clsx(
                            'transition-colors duration-300',
                            href === baseRoute
                              ? iconColor.replace('group-hover:', '')
                              : iconColor
                          )}
                        >
                          {icon}
                        </span>
                      )}
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
                  </motion.div>
                </motion.div>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className='flex items-center justify-between space-x-3 relative z-10'>
            <ThemeButton />

            {/* Mobile menu button */}
            <button
              className='rounded-md p-2 text-lg focus:outline-none md:hidden'
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile navigation - with updated styling */}
        <div
          className={clsx(
            'fixed inset-0 z-50 flex items-start justify-center bg-white/80 backdrop-blur-sm dark:bg-dark/80 md:hidden',
            'transition-opacity duration-300',
            isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <div className='mt-16 w-full px-4'>
            <ul className='flex flex-col items-center space-y-4 rounded-md p-4'>
              {links.map(({ href, label, external, icon, iconColor }) => (
                <li key={`mobile-${href}${label}`} className='w-full'>
                  <motion.div
                    className='block rounded-xl overflow-visible group w-full'
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      className='absolute inset-0 z-0 pointer-events-none rounded-md'
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.3 }}
                      style={{
                        background:
                          href === '/about'
                            ? 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(234,88,12,0.2) 100%)' // orange for About
                            : href === '/blog'
                            ? 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(147,51,234,0.2) 100%)' // purple for Blog
                            : href === '/projects'
                            ? 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(220,38,38,0.2) 100%)' // red for Projects
                            : href === '/library'
                            ? 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, rgba(202,138,4,0.2) 100%)' // yellow for Library
                            : href === '/'
                            ? 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(37,99,235,0.2) 100%)' // blue for Home
                            : 'radial-gradient(circle, rgba(107,114,128,0.4) 0%, rgba(75,85,99,0.2) 100%)', // gray for GitHub/external
                        opacity: href === baseRoute ? 0.4 : 0,
                      }}
                    />
                    <UnstyledLink
                      href={href}
                      className={clsx(
                        'flex w-full items-center justify-center rounded-md py-4 font-medium gap-2 relative z-10',
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
                      {icon && (
                        <span
                          className={clsx(
                            'transition-colors duration-300',
                            href === baseRoute
                              ? iconColor.replace('group-hover:', '')
                              : iconColor
                          )}
                        >
                          {icon}
                        </span>
                      )}
                      {label}
                      {external && (
                        <FiExternalLink className='ml-1 inline-block text-sm' />
                      )}
                    </UnstyledLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

// Updated links array with icons and colors
const links = [
  {
    href: '/',
    label: 'Home',
    icon: <Home className='h-5 w-5' />,
    iconColor: 'group-hover:text-blue-500',
  },
  {
    href: '/about',
    label: 'About',
    icon: <User className='h-5 w-5' />,
    iconColor: 'group-hover:text-orange-500',
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: <Newspaper className='h-5 w-5' />,
    iconColor: 'group-hover:text-purple-500',
  },
  {
    href: '/projects',
    label: 'Projects',
    icon: <Hammer className='h-5 w-5' />,
    iconColor: 'group-hover:text-red-500',
  },
  {
    href: '/library',
    label: 'Library',
    icon: <Book className='h-5 w-5' />,
    iconColor: 'group-hover:text-yellow-500',
  },
  {
    href: 'https://github.com/emackinnon1',
    label: 'GitHub',
    external: true,
    icon: <GitPullRequestArrowIcon className='h-5 w-5' />,
    iconColor: 'group-hover:text-gray-500',
  },
];
