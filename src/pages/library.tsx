import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { InView } from 'react-intersection-observer';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

// Define types for library items
type LibraryType = {
  title: string;
  description: string;
  tags: string[];
  url: string;
};

export default function LibraryPage({
  libraries,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredLibraries, setFilteredLibraries] =
    React.useState<LibraryType[]>(libraries);

  React.useEffect(() => {
    const filtered = libraries.filter((library) => {
      const searchContent =
        library.title + library.description + library.tags.join(' ');
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredLibraries(filtered);
  }, [libraries, searchValue]);

  return (
    <Layout>
      <Seo
        templateTitle='Library'
        description='Collection of code snippets, tools, and other resources'
      />

      <main>
        <section className='bg-white dark:bg-dark'>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl'>
              <Accent>Library</Accent>
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300'>
              Collection of code snippets, tools, and other resources that I
              find useful
            </p>

            <div className='mt-4 flex items-center gap-2'>
              <input
                type='text'
                className={clsx(
                  'w-full rounded-md border border-gray-300 p-2',
                  'dark:border-gray-600 dark:bg-dark',
                  'focus:border-primary-300 focus:outline-none focus:ring-0'
                )}
                placeholder='Search libraries...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <ul className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredLibraries.length > 0 ? (
                filteredLibraries.map((library) => (
                  <InView key={library.title} triggerOnce rootMargin='-20px'>
                    {({ ref, inView }) => (
                      <li
                        ref={ref}
                        className={clsx(
                          'rounded-md border border-gray-300 p-4 transition-opacity',
                          'dark:border-gray-600',
                          'transform-gpu scale-100 hover:scale-[1.02]',
                          'focus:outline-none focus-visible:ring',
                          inView ? 'opacity-100' : 'opacity-0'
                        )}
                      >
                        <a
                          href={library.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='block h-full'
                        >
                          <h3 className='font-medium text-gray-900 dark:text-white'>
                            {library.title}
                          </h3>
                          <p className='mt-1 text-sm text-gray-700 dark:text-gray-300'>
                            {library.description}
                          </p>
                          <div className='mt-2 flex flex-wrap gap-1'>
                            {library.tags.map((tag) => (
                              <span
                                key={tag}
                                className='inline-block rounded-md bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </a>
                      </li>
                    )}
                  </InView>
                ))
              ) : (
                <div className='col-span-full text-center text-gray-600 dark:text-gray-400'>
                  No libraries found.
                </div>
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  // Example library items - replace with your own or fetch from an API
  const libraries: LibraryType[] = [
    {
      title: 'Tailwind CSS',
      description:
        'A utility-first CSS framework for rapidly building custom user interfaces.',
      tags: ['css', 'framework', 'design'],
      url: 'https://tailwindcss.com',
    },
    {
      title: 'React Icons',
      description:
        'Include popular icons in your React projects easily with react-icons.',
      tags: ['react', 'icon', 'ui'],
      url: 'https://react-icons.github.io/react-icons/',
    },
    {
      title: 'Next.js',
      description: 'The React Framework for Production.',
      tags: ['react', 'framework', 'ssg', 'ssr'],
      url: 'https://nextjs.org',
    },
    {
      title: 'TypeScript',
      description:
        'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      tags: ['javascript', 'language', 'typed'],
      url: 'https://www.typescriptlang.org',
    },
    {
      title: 'Prisma',
      description: 'Next-generation ORM for Node.js and TypeScript.',
      tags: ['database', 'orm', 'typescript'],
      url: 'https://www.prisma.io',
    },
    {
      title: 'React Hook Form',
      description:
        'Performant, flexible and extensible forms with easy-to-use validation.',
      tags: ['react', 'form', 'validation'],
      url: 'https://react-hook-form.com',
    },
  ];

  return {
    props: {
      libraries,
    },
  };
}
