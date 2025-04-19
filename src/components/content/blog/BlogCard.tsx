import clsx from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import * as React from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';

import Accent from '@/components/Accent';
import Tag from '@/components/content/Tag';
import UnstyledLink from '@/components/links/UnstyledLink';

import { BlogFrontmatter, InjectedMeta } from '@/types/frontmatters';

type BlogCardProps = {
  post: BlogFrontmatter & InjectedMeta;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

export default function BlogCard({
  post,
  className,
  checkTagged,
  onClick,
}: BlogCardProps) {
  // Prepare image path on the server side to avoid hydration mismatch
  const imagePath = post.banner.startsWith('/images')
    ? `https://folio-v2-images.s3.us-west-2.amazonaws.com${post.banner}`
    : post.banner;

  return (
    <li
      className={clsx(
        'group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-dark',
        'transform-gpu transition duration-300 hover:shadow-md',
        'motion-reduce:hover:scale-100',
        className
      )}
      onClick={onClick}
    >
      <UnstyledLink
        className='block h-full focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
        href={`/blog/${post.slug}`}
      >
        <div className='relative aspect-[1.9/1] overflow-hidden'>
          {/* Using Next.js Image with layout="fill" for Next.js 12 compatibility */}
          <Image
            src={imagePath}
            alt={`Cover for ${post.title}`}
            className='object-cover object-center transition duration-500 group-hover:scale-105'
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            priority={false}
            unoptimized
          />
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent' />

          {/* Tags */}
          <div className='absolute bottom-0 w-full p-4'>
            <div className='flex flex-wrap gap-2 text-xs'>
              {post.tags.split(',').map((tag) => (
                <Tag
                  tabIndex={-1}
                  className='bg-white/30 backdrop-blur-sm dark:bg-white/20 text-white'
                  key={tag}
                >
                  {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <div className='p-4 sm:p-5'>
          {/* Title */}
          <h4 className='text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-2 md:text-xl'>
            {post.title}
          </h4>

          {/* Description */}
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
            {post.description}
          </p>

          <div className='mt-3 flex items-center justify-between'>
            {/* Date */}
            <p className='text-xs text-gray-600 dark:text-gray-300'>
              {format(
                new Date(post.lastUpdated ?? post.publishedAt),
                'MMM dd, yyyy'
              )}
            </p>

            {/* Reading time & views */}
            <div className='flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300'>
              <div className='flex items-center gap-1'>
                <HiOutlineClock className='text-sm' />
                <span>{post.readingTime.text}</span>
              </div>
              <div className='flex items-center gap-1'>
                <HiOutlineEye className='text-sm' />
                <span>{post?.views?.toLocaleString() ?? '0'} views</span>
              </div>
            </div>
          </div>
        </div>
      </UnstyledLink>
    </li>
  );
}
