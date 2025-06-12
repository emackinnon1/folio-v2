'use client';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  HiChevronDown,
  HiOutlineCalendar,
  HiOutlineExternalLink,
} from 'react-icons/hi';
import { InView } from 'react-intersection-observer';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';

import data from './career-data.json';

const Timeline = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section>
      <div className='layout'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8'>
          <h2 className='text-2xl font-bold md:text-4xl'>
            <Accent>Career Journey</Accent>
          </h2>

          <InView triggerOnce threshold={0.2}>
            {({ inView, ref }) => (
              <div
                ref={ref}
                className={clsx(
                  'mt-4 md:mt-0 transition duration-500 delay-750',
                  inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                )}
              >
                <a
                  href='https://folio-v2-images.s3.us-west-2.amazonaws.com/resources/ResumeElliotMackinnon.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center px-4 py-2 bg-primary-300 text-white rounded-md hover:bg-primary-500 hover:shadow-xl transition-colors shadow-sm'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4v12m0 0l-4-4m4 4l4-4M7 20h10'
                    />
                  </svg>
                  Download Full Resume
                </a>
              </div>
            )}
          </InView>
        </div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-8 top-0 h-full w-[2px] md:left-16'>
            <div className='h-full bg-gradient-to-b from-primary-300 via-primary-400 to-transparent' />
          </div>

          {/* Timeline items */}
          <div className='space-y-6'>
            {data.map((item, index) => (
              <InView
                triggerOnce
                threshold={0.1}
                key={`${item.company}-${index}`}
              >
                {({ inView, ref }) => (
                  <div
                    ref={ref}
                    className={clsx(
                      'relative pl-16 transition duration-300 md:pl-32',
                      inView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    )}
                  >
                    {/* Timeline dot */}
                    <div className='absolute left-[30px] top-10 h-1 w-3  bg-gradient-to-tr from-primary-300 to-primary-400 md:left-[62px]' />

                    <div className='group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-dark'>
                      {/* Date chip */}
                      <div className='absolute -top-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                        <span className='flex items-center gap-1'>
                          <HiOutlineCalendar className='text-primary-400' />
                          {item.date}
                        </span>
                      </div>

                      <div className='mb-4 flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                          {/* Company logo */}
                          <div className='relative h-12 w-12 overflow-hidden rounded-md border border-gray-100 bg-white p-1 dark:border-gray-700 dark:bg-gray-800'>
                            <Image
                              src={item.imageSrc}
                              alt={`${item.company} logo`}
                              height={90}
                              width={80}
                              // fill
                              className='object-contain'
                            />
                          </div>

                          {/* Title info */}
                          <div>
                            <h3 className='font-bold text-gray-900 dark:text-gray-100'>
                              {item.title}
                            </h3>
                            <UnstyledLink
                              href={item.link}
                              className='flex items-center gap-1 text-sm font-medium text-primary-500 dark:text-primary-300 hover:underline'
                            >
                              {item.company}
                              <HiOutlineExternalLink className='text-xs' />
                            </UnstyledLink>
                          </div>
                        </div>

                        {/* Toggle details button */}
                        {(item.description?.responsibilities ||
                          item.description?.accomplishments) && (
                          <button
                            onClick={() =>
                              toggleExpand(`${item.company}-${index}`)
                            }
                            className={clsx(
                              'rounded-full p-2 text-gray-400 transition-transform hover:bg-gray-100 hover:text-primary-500 dark:hover:bg-gray-800 dark:hover:text-primary-300',
                              expandedId === `${item.company}-${index}` &&
                                'rotate-180'
                            )}
                          >
                            <HiChevronDown />
                          </button>
                        )}
                      </div>

                      {/* Accomplishments (always visible) */}
                      {item.description?.accomplishments && (
                        <div className='mb-2'>
                          <ul className='ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-300'>
                            {item.description.accomplishments.map(
                              (accomplishment, i) => (
                                <li key={i} className='pl-1'>
                                  <span className='font-medium text-gray-900 dark:text-gray-100'>
                                    {accomplishment}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Expandable responsibilities */}
                      {item.description?.responsibilities && (
                        <div
                          className={clsx(
                            'overflow-hidden transition-all duration-300',
                            expandedId === `${item.company}-${index}`
                              ? 'max-h-[500px] opacity-100'
                              : 'max-h-0 opacity-0'
                          )}
                        >
                          <div className='border-t border-gray-100 pt-3 dark:border-gray-700'>
                            <h4 className='mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                              Responsibilities:
                            </h4>
                            <ul className='ml-5 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                              {item.description.responsibilities.map(
                                (responsibility, i) => (
                                  <li key={i} className='pl-1'>
                                    {responsibility}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </InView>
            ))}

            {/* Birth/Start event */}
            <InView triggerOnce threshold={0.1}>
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={clsx(
                    'relative pl-16 transition duration-300 md:pl-32',
                    inView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  )}
                >
                  <div className='absolute left-[30px] top-6 h-1 w-3 bg-gradient-to-tr from-primary-300 to-primary-400 md:left-[62px]' />

                  <div className='rounded-lg border border-primary-300/30 bg-primary-300/5 p-4 dark:border-primary-300/20 dark:bg-primary-300/10'>
                    <div className='absolute -top-3 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                      <span className='flex items-center gap-1'>
                        <HiOutlineCalendar className='text-primary-400' />
                        1990-10-03
                      </span>
                    </div>

                    <p className='text-sm font-medium text-gray-800 dark:text-gray-200'>
                      The spaceship that was carrying me as a baby crash-landed
                      on earth.
                    </p>
                  </div>
                </div>
              )}
            </InView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
