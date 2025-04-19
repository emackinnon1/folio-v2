import * as React from 'react';
import { FiMail } from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import {
  SiFacebook,
  SiGithub,
  SiGoodreads,
  SiInstagram,
  SiLetterboxd,
  SiLinkedin,
  SiMedium,
  SiSubstack,
} from 'react-icons/si';

import { trackEvent } from '@/lib/analytics';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

import Accent from '@/components/Accent';
import Spotify from '@/components/layout/Spotify';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/Tooltip';

import {
  // feedbackFlag,
  spotifyFlag,
} from '@/constants/env';

export default function Footer() {
  return (
    <footer className='mt-4 pb-2'>
      <main className='layout flex flex-col items-center border-t pt-6 dark:border-gray-600'>
        <section className='flex w-full flex-col items-center justify-between gap-4 md:flex-row'>
          <div>
            <UnstyledLink
              href='/'
              className='flex items-center gap-1 font-bold hover:text-primary-500 dark:hover:text-primary-300'
            >
              <Accent className='font-bold text-xl md:text-2xl'>EM.</Accent>
            </UnstyledLink>
            <p className='mt-1 max-w-md text-sm text-gray-600 dark:text-gray-300'>
              A portfolio and blog by Elliot Mackinnon, sharing web development
              insights and projects.
            </p>
          </div>
          <div className='flex flex-col items-end gap-2'>
            <FooterLinks />
            {spotifyFlag && <Spotify className='mt-4' />}
          </div>
        </section>

        <div className='mt-8 flex flex-col items-center gap-4'>
          <p className='font-medium text-gray-600 dark:text-gray-300'>
            Connect with me
          </p>
          <SocialLinks />
        </div>

        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
          © Elliot Mackinnon {new Date().getFullYear()} • Built with{' '}
          <UnstyledLink
            href='https://nextjs.org/'
            className='animated-underline rounded-sm font-medium text-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
            onClick={() => {
              trackEvent('Footer Link: Next.js', { type: 'link' });
            }}
          >
            Next.js
          </UnstyledLink>{' '}
          and{' '}
          <UnstyledLink
            href='https://tailwindcss.com/'
            className='animated-underline rounded-sm font-medium text-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
            onClick={() => {
              trackEvent('Footer Link: Tailwind', { type: 'link' });
            }}
          >
            Tailwind CSS
          </UnstyledLink>
        </p>
      </main>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className='flex flex-wrap justify-end gap-x-4 gap-y-2 md:gap-x-8'>
      {footerLinks.map(({ href, text, tooltip }) => (
        <Tooltip interactive={false} key={href} tipChildren={tooltip}>
          <UnstyledLink
            className='animated-underline text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            href={href}
            onClick={() => {
              trackEvent(`Footer Link: ${text}`, { type: 'link' });
            }}
          >
            {text}
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

function SocialLinks() {
  const [copyStatus, setCopyStatus] = React.useState<'idle' | 'copied'>('idle');

  const [copy] = useCopyToClipboard();

  return (
    <div className='flex space-x-4'>
      <div className='flex items-center justify-center'>
        <Tooltip
          trigger='mouseenter'
          hideOnClick={false}
          interactive
          html={
            <div className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-gray-600 dark:bg-dark dark:text-gray-200'>
              {copyStatus === 'idle'
                ? 'Click the mail logo to copy'
                : 'Copied to clipboard 🥳'}
              <Accent className='inline-block font-medium'>
                emackinnon100390@gmail.com
              </Accent>
            </div>
          }
        >
          <button
            onClick={() => {
              copy('emackinnon100390@gmail.com').then(() => {
                setCopyStatus('copied');
                setTimeout(() => setCopyStatus('idle'), 1500);
              });
            }}
            className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
          >
            <FiMail className='h-6 w-6 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
          </button>
        </Tooltip>
      </div>
      {socials.map((social) => (
        <Tooltip
          interactive={false}
          key={social.href}
          tipChildren={social.text}
        >
          <UnstyledLink
            className='inline-flex items-center justify-center rounded-sm hover:text-primary-300 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            href={social.href}
            onClick={() => {
              trackEvent(`Footer Link: ${social.id}`, { type: 'link' });
            }}
          >
            <social.icon className='my-auto h-5 w-5 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

const footerLinks: { href: string; text: string; tooltip: React.ReactNode }[] =
  [
    {
      href: '/design',
      text: 'Design',
      tooltip: 'website color palette',
    },
    {
      href: 'https://us.umami.is/share/ESzFFWN1lFieRVkb/emackinnon.io',
      text: 'Analytics',
      tooltip: 'elliotmackinnon.com views and visitors analytics',
    },
    {
      href: '/statistics',
      text: 'Statistics',
      tooltip: 'Blog, Projects, and Library Statistics',
    },
    {
      href: '/subscribe',
      text: 'Subscribe',
      tooltip: 'Get an email whenever I post, no spam',
    },
    {
      href: 'https://emackinnon.io/rss.xml',
      text: 'RSS',
      tooltip: 'Add emackinnon.io blog to your feeds',
    },
  ];

type Social = {
  href: string;
  icon: IconType;
  id: string;
  text: React.ReactNode;
};
const socials: Social[] = [
  {
    href: 'https://github.com/emackinnon1',
    icon: SiGithub,
    id: 'Github',
    text: (
      <>
        See my projects on <Accent className='font-medium'>Github</Accent>
      </>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/elliot-mackinnon-34b02194/',
    icon: SiLinkedin,
    id: 'LinkedIn',
    text: (
      <>
        Find me on <Accent className='font-medium'>Linkedin</Accent>
      </>
    ),
  },
  {
    href: 'https://www.instagram.com/emackinnon1/',
    icon: SiInstagram,
    id: 'Instagram',
    text: (
      <>
        I post some fancy pics sometimes. Follow me on{' '}
        <Accent className='font-medium'>Instagram</Accent>!
      </>
    ),
  },
  {
    href: 'https://substack.com/@elliotmackinnon',
    icon: SiSubstack,
    id: 'Substack',
    text: (
      <>
        If you like my articles, I am also on{' '}
        <Accent className='font-medium'>Substack</Accent>!
      </>
    ),
  },
  {
    href: 'https://medium.com/@emackinnon100390',
    icon: SiMedium,
    id: 'Medium',
    text: (
      <>
        If you like my articles, I am also on{' '}
        <Accent className='font-medium'>Medium</Accent>!
      </>
    ),
  },
  {
    href: 'https://letterboxd.com/emackinnon1/',
    icon: SiLetterboxd,
    id: 'Letterboxd',
    text: (
      <>
        I am a huge cinephile Follow me on{' '}
        <Accent className='font-medium'>Letterboxd</Accent>!
      </>
    ),
  },
  {
    href: 'https://www.goodreads.com/user/show/77635448-elliot-mackinnon',
    icon: SiGoodreads,
    id: 'Goodreads',
    text: (
      <>
        "The reading of all good books is like a conversation with the finest
        minds of past centuries." (Rene Descartes) My{' '}
        <Accent className='font-medium'>Goodreads</Accent> is ever-growing!
      </>
    ),
  },
  {
    href: 'https://www.facebook.com/elliot.mackinnon/',
    icon: SiFacebook,
    id: 'Facebook',
    text: (
      <>
        If you still have it, find me on{' '}
        <Accent className='font-medium'>Facebook</Accent>!
      </>
    ),
  },
];
