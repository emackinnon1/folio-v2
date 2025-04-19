import clsx from 'clsx';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

type ThemeButtonProps = React.ComponentPropsWithoutRef<'button'>;

export default function ThemeButton({ className, ...rest }: ThemeButtonProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <button
      className={clsx(
        'rounded-md p-2 transition-colors duration-200',
        'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
        'text-lg',
        className
      )}
      {...rest}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label='Toggle Dark Mode'
    >
      {mounted ? (
        theme === 'light' ? (
          <FiMoon className='animate-fade-in' />
        ) : (
          <FiSun className='animate-fade-in' />
        )
      ) : (
        <FiSun />
      )}
    </button>
  );
}
