import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { HiCalendar, HiEye, HiOutlineSearch } from 'react-icons/hi';
import { InView } from 'react-intersection-observer';

import { getFromSessionStorage } from '@/lib/helper.client';
import { getTags, sortByDate, sortDateFn } from '@/lib/mdx.client';
import { getAllFilesFrontmatter } from '@/lib/mdx.server';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import ContentPlaceholder from '@/components/content/ContentPlaceholder';
import Tag, { SkipNavTag } from '@/components/content/Tag';
import StyledInput from '@/components/form/StyledInput';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';

import { BlogFrontmatter, InjectedMeta } from '@/types/frontmatters';

const sortOptions: Array<SortOption> = [
  {
    id: 'date',
    name: 'Sort by date',
    icon: HiCalendar,
  },
  {
    id: 'views',
    name: 'Sort by views',
    icon: HiEye,
  },
];

export default function IndexPage({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  /** Lazy init from session storage to preserve preference on revisit */
  const [sortOrder, setSortOrder] = React.useState<SortOption>(
    () => sortOptions[Number(getFromSessionStorage('blog-sort')) || 0]
  );
  const isLoaded = useLoaded();

  const populatedPosts = useInjectContentMeta('blog', posts);

  //#region  //*=========== Search ===========
  const [search, setSearch] = React.useState<string>('');
  const [filteredPosts, setFilteredPosts] = React.useState<
    Array<BlogFrontmatter & InjectedMeta>
  >(() => [...posts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  //#endregion  //*======== Search ===========

  React.useEffect(() => {
    const results = populatedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(' ')
          .every((tag) => post.tags.includes(tag))
    );

    if (sortOrder.id === 'date') {
      results.sort(sortDateFn);
      sessionStorage.setItem('blog-sort', '0');
    } else if (sortOrder.id === 'views') {
      results.sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0));
      sessionStorage.setItem('blog-sort', '1');
    }

    setFilteredPosts(results);
  }, [search, sortOrder.id, populatedPosts]);

  //#region  //*=========== Post Language Splitter ===========
  const englishPosts = filteredPosts.filter((p) => !p.slug.startsWith('id-'));
  const currentPosts = englishPosts;
  //#endregion  //*======== Post Language Splitter ===========

  //#region  //*=========== Tag ===========
  const toggleTag = (tag: string) => {
    // If tag is already there, then remove
    if (search.includes(tag)) {
      setSearch((s) =>
        s
          .split(' ')
          .filter((t) => t !== tag)
          ?.join(' ')
      );
    } else {
      // append tag
      setSearch((s) => (s !== '' ? `${s.trim()} ${tag}` : tag));
    }
  };

  /** Currently available tags based on filtered posts */
  const filteredTags = getTags(currentPosts);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(' ').includes(tag)
    );
  };
  //#endregion  //*======== Tag ===========

  return (
    <Layout>
      <Seo templateTitle='Blog' description='Thoughts, musings and ' />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <InView triggerOnce threshold={0.2}>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={clsx(
                    'transition duration-500 delay-100',
                    inView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  )}
                >
                  <h1 className='text-3xl font-bold md:text-5xl'>
                    <Accent>Blog</Accent>
                  </h1>
                  <p className='mt-2 text-gray-600 dark:text-gray-300'>
                    Thoughts, musings and cogitations.
                  </p>
                </div>
              )}
            </InView>

            <InView triggerOnce threshold={0.2}>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={clsx(
                    'mt-8 transition duration-500 delay-200',
                    inView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  )}
                >
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <HiOutlineSearch className='text-gray-500 dark:text-gray-400' />
                    </div>
                    <StyledInput
                      className='pl-10'
                      placeholder='Search articles, tags...'
                      onChange={handleSearch}
                      value={search}
                      type='text'
                    />
                  </div>
                </div>
              )}
            </InView>

            <InView triggerOnce threshold={0.2}>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={clsx(
                    'mt-4 transition duration-500 delay-300',
                    inView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  )}
                >
                  <div className='flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300'>
                    <span className='font-medium'>Choose topic:</span>
                    <SkipNavTag>
                      {tags.map((tag) => (
                        <Tag
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          disabled={!filteredTags.includes(tag)}
                        >
                          {checkTagged(tag) ? <Accent>{tag}</Accent> : tag}
                        </Tag>
                      ))}
                    </SkipNavTag>
                  </div>
                </div>
              )}
            </InView>

            <InView triggerOnce threshold={0.2}>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={clsx(
                    'relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between',
                    'transition duration-500 delay-400',
                    inView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  )}
                >
                  <p className='text-sm font-medium'>
                    {currentPosts.length} article
                    {currentPosts.length > 1 ? 's' : ''}
                  </p>
                  <SortListbox
                    selected={sortOrder}
                    setSelected={setSortOrder}
                    options={sortOptions}
                  />
                </div>
              )}
            </InView>

            <ul className='mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <InView threshold={0.2} triggerOnce key={post.slug}>
                    {({ inView, ref }) => (
                      <li
                        ref={ref}
                        className={clsx(
                          'transition duration-500',
                          inView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10',
                          { 'delay-500': index < 3 },
                          { 'delay-600': index >= 3 && index < 6 },
                          { 'delay-700': index >= 6 }
                        )}
                      >
                        <BlogCard post={post} checkTagged={checkTagged} />
                      </li>
                    )}
                  </InView>
                ))
              ) : (
                <ContentPlaceholder />
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter('blog');
  const posts = sortByDate(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(posts);

  return { props: { posts, tags } };
}
