import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { IoArrowDownOutline } from 'react-icons/io5';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { InView } from 'react-intersection-observer';

import { trackEvent } from '@/lib/analytics';
import { getAllFilesFrontmatter, getFeatured } from '@/lib/mdx.server';
import { generateRss } from '@/lib/rss';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import ContributionGraph from '@/components/content/ContributionGraph';
import ProjectCard from '@/components/content/projects/ProjectCard';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import TC from '@/components/TC';

export default function IndexPage({
  featuredPosts,
  featuredProjects,
  introPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const populatedPosts = useInjectContentMeta('blog', featuredPosts);
  const populatedIntro = useInjectContentMeta('blog', introPosts);
  const populatedProjects = useInjectContentMeta('projects', featuredProjects);

  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'min-h-main mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <article className='layout'>
            <div className='mt-4 flex flex-col justify-center md:mt-0'>
              <h1 className='text-5xl md:text-5xl 5xl:text-6xl' data-fade='1'>
                <Accent>Elliot Mackinnon</Accent>
              </h1>
              <h6
                className='mt-10 text-4xl md:text-4xl 4xl:text-5xl'
                data-fade='2'
              >
                With great power comes a <Accent>huge electric bill</Accent>.
              </h6>
              <p
                className='mt-3 max-w-4xl text-gray-700 dark:text-gray-200 md:text-lg 2xl:text-xl'
                data-fade='3'
              >
                Full-time Engineer. Rest-Of-The-Time Tinkerer.
              </p>
              <p
                className='mt-2 max-w-6xl text-gray-700 dark:text-gray-200 md:text-md 2xl:text-md'
                data-fade='3'
              >
                Rather than shouting my thoughts at the pigeons in local public
                parks, I decided to put them on this website.
                <br />
                Remains to be seen if the pigeons will visit it.
              </p>
              <div data-fade='4' className='mt-8 flex flex-wrap gap-4'>
                <div className='group relative'>
                  <div
                    className={clsx(
                      'absolute -inset-0.5 animate-tilt rounded blur',
                      'bg-gradient-to-r from-primary-300 to-primary-400',
                      'dark:from-primary-200 dark:via-primary-300',
                      'opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200'
                    )}
                  />
                  <ButtonLink href='/projects'>
                    See my projects
                    <FiArrowRight className='ml-1 text-xs' />
                  </ButtonLink>
                </div>
                <ButtonLink href='/blog' variant='default'>
                  Read my blog
                  <FiArrowRight className='ml-1 text-xs' />
                </ButtonLink>
                <ButtonLink href='/about' variant='default'>
                  More about me
                  <FiArrowRight className='ml-1 text-xs' />
                </ButtonLink>
              </div>
              <div
                data-fade='5'
                className='mt-8 flex flex-wrap gap-4 gap-y-2 md:mt-8'
              >
                <UnstyledLink
                  href='https://github.com/emackinnon1'
                  className={clsx(
                    'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                    'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                    'transition-colors'
                  )}
                  onClick={() => {
                    trackEvent('Social Link: Github', { type: 'link' });
                  }}
                >
                  <SiGithub className='shrink-0 text-lg md:text-xl' />
                  <span className='border-b border-dotted border-dark hover:border-black dark:border-light dark:hover:border-white'>
                    emackinnon1
                  </span>
                </UnstyledLink>
                <UnstyledLink
                  href='https://www.linkedin.com/in/elliot-mackinnon-34b02194/'
                  className={clsx(
                    'inline-flex items-center gap-1 text-sm font-medium md:text-base',
                    'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                    'transition-colors'
                  )}
                  onClick={() => {
                    trackEvent('Social Link: LinkedIn', { type: 'link' });
                  }}
                >
                  <SiLinkedin className='shrink-0 text-lg md:text-xl' />
                  <span className='border-b border-dotted border-dark hover:border-black dark:border-light dark:hover:border-white'>
                    Elliot Mackinnon
                  </span>
                </UnstyledLink>
              </div>
            </div>

            <div className='mt-16'>
              <h3 className='text-xl font-bold dark:text-white md:text-2xl'>
                Recent Contributions
              </h3>
              <div className='h-full w-full mt-4'>
                <ContributionGraph />
              </div>
            </div>
          </article>
          <UnstyledLink
            href='#intro'
            className={clsx(
              'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
              'cursor-pointer rounded-md transition-colors',
              'hover:text-primary-300 focus-visible:text-primary-300'
            )}
          >
            <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
          </UnstyledLink>
          <TC
            className={clsx(
              'absolute bottom-0 right-6',
              'translate-y-[37%] transform-gpu',
              'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
              'z-[-1] opacity-70 dark:opacity-30'
            )}
          />
        </section>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              id='intro'
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article
                className={clsx(
                  'layout flex flex-col-reverse items-center md:flex-row md:justify-between',
                  'md:gap-4'
                )}
                data-fade='0'
              >
                <div className='mt-8 h-full w-full md:mt-0'>
                  <h2 className='text-4xl md:text-6xl'>
                    <Accent className='inline decoration-clone leading-snug dark:leading-none'>
                      I do a bunch of random stuff
                    </Accent>
                  </h2>
                  <p className='mt-4 text-base text-gray-600 dark:text-gray-300 md:text-lg'>
                    and sometimes I write about it. Check it out by heading over
                    to the blog or project sections!
                  </p>
                  <ButtonLink href='/projects' className='mt-4'>
                    Check out my projects
                    <FiArrowRight className='ml-1 text-xs' />
                  </ButtonLink>
                </div>
                <div className='h-full w-full'>
                  <ul className='relative h-full'>
                    <BlogCard
                      className={clsx(
                        'absolute max-w-[350px] transform-gpu',
                        'top-1/2 translate-y-[-55%] md:translate-y-[-50%] lg:translate-y-[-60%]',
                        'left-1/2 -translate-x-1/2 md:translate-x-[-50%] lg:translate-x-[-30%]',
                        'rotate-3 md:rotate-6 lg:rotate-12',
                        'pointer-events-none md:pointer-events-auto'
                      )}
                      post={populatedIntro[1]}
                    />
                    <BlogCard
                      className='mx-auto max-w-[350px]'
                      post={populatedIntro[0]}
                    />
                  </ul>
                </div>
              </article>
            </section>
          )}
        </InView>
        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='blog'>
                  <Accent>Featured Posts</Accent>
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  I write about web development, technology, and my projects
                </p>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedPosts.map((post, i) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/blog'
                  variant='default'
                  onClick={() =>
                    trackEvent('Home: See more posts', { type: 'navigate' })
                  }
                >
                  See more posts
                  <FiArrowRight className='ml-1 text-xs' />
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>

        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              className={clsx('py-20', inView && 'fade-in-start')}
            >
              <article className='layout' data-fade='0'>
                <h2 className='text-2xl md:text-4xl' id='projects'>
                  <Accent>Featured Projects</Accent>
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  Some projects that I'm proud of
                </p>
                <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                  {populatedProjects.map((project, i) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      className={clsx(i > 2 && 'hidden sm:block')}
                    />
                  ))}
                </ul>
                <ButtonLink
                  className='mt-4'
                  href='/projects'
                  variant='default'
                  onClick={() =>
                    trackEvent('Home: See more project', { type: 'navigate' })
                  }
                >
                  See more projects
                  <FiArrowRight className='ml-1 text-xs' />
                </ButtonLink>
              </article>
            </section>
          )}
        </InView>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRss();

  const blogs = await getAllFilesFrontmatter('blog');
  const projects = await getAllFilesFrontmatter('projects');

  const featuredPosts = getFeatured(blogs, [
    'carnivorous',
    'photography',
    'tattoos',
  ]);
  const featuredProjects = getFeatured(projects, [
    'lightning-lamp',
    'table-motor',
    'watering-system',
  ]);

  const introPosts = getFeatured(blogs, ['carnivorous', 'photography']);

  return {
    props: {
      featuredPosts,
      featuredProjects,
      introPosts,
    },
  };
}
