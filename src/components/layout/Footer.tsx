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
        <FooterLinks />

        {spotifyFlag && <Spotify className='mt-8' />}

        <p className='mt-12 font-medium text-gray-600 dark:text-gray-300'>
          Find me here
        </p>
        <SocialLinks />

        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
          © Elliot Mackinnon {new Date().getFullYear()}
          {/* {feedbackFlag && (
            <>
              {' • '}
              <FeedbackFish
                projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_ID || ''}
              >
                <button className='rounded-sm hover:text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:hover:text-gray-100'>
                  Got any feedback?
                </button>
              </FeedbackFish>
            </>
          )} */}
        </p>
      </main>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
      {footerLinks.map(({ href, text, tooltip }) => (
        <Tooltip interactive={false} key={href} tipChildren={tooltip}>
          <UnstyledLink
            className='animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
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
    <div className='mt-2 flex space-x-4'>
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
              copy('me@theodorusclarence.com').then(() => {
                setCopyStatus('copied');
                setTimeout(() => setCopyStatus('idle'), 1500);
              });
            }}
            className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
          >
            <FiMail className='h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
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
            className='inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            href={social.href}
            onClick={() => {
              trackEvent(`Footer Link: ${social.id}`, { type: 'link' });
            }}
          >
            <social.icon className='my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
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
    // {
    //   href: 'https://clarence.link/docs',
    //   text: 'Docs',
    //   tooltip: 'Personal documentation about my best practices on development',
    // },
    // {
    //   href: 'https://clarence.link/booknotes',
    //   text: 'Book Notes',
    //   tooltip: 'Note collection of books that I read',
    // },
    // {
    //   href: 'https://clarence.link/starters',
    //   text: 'Starter Templates',
    //   tooltip: 'Starter that I build and use throughout my projects',
    // },
    {
      href: 'https://cloud.umami.is/share/JUOTmj43Mo6lEoVo/emackinnon.io',
      text: 'Analytics',
      tooltip: 'elliotmackinnon.com views and visitors analytics',
    },
    {
      href: '/statistics',
      text: 'Statistics',
      tooltip: 'Blog, Projects, and Library Statistics',
    },
    // {
    //   href: '/guestbook',
    //   text: 'Guestbook',
    //   tooltip:
    //     'Leave whatever you like to say—message, appreciation, suggestions',
    // },
    // {
    //   href: '/subscribe',
    //   text: 'Subscribe',
    //   tooltip: 'Get an email whenever I post, no spam',
    // },
    // {
    //   href: 'https://theodorusclarence.com/rss.xml',
    //   text: 'RSS',
    //   tooltip: 'Add theodorusclarence.com blog to your feeds',
    // },
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
