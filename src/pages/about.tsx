import clsx from 'clsx';
import * as React from 'react';
import { IoArrowDownOutline } from 'react-icons/io5';
import { InView } from 'react-intersection-observer';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Timeline from '@/components/content/Timeline';
import Img from '@/components/images/Img';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import TechStack from '@/components/TechStack';

export default function AboutPage() {
  const isLoaded = useLoaded();
  const today = new Date();
  const birthday = new Date('1990/10/03');
  const todayMonth = today.getMonth();
  const birthdayMonth = birthday.getMonth();
  const todayDate = today.getDate();
  const birthdayDate = birthday.getDate();
  let age = today.getFullYear() - birthday.getFullYear();
  if (birthdayMonth > todayMonth) age--;
  else {
    if (birthdayMonth == todayMonth) {
      if (birthdayDate > todayDate) age--;
    }
  }

  return (
    <Layout>
      <Seo
        templateTitle='About'
        description='Elliot is a full stack developer that started his career in 2020.'
      />

      <main>
        <section
          className={clsx('min-h-main py-1', isLoaded && 'fade-in-start')}
        >
          <div className='layout'>
            <div className='mt-12 grid grid-cols-1 gap-10 md:grid-cols-3'>
              {/* Column 1 - Image with animation */}
              <div>
                <InView triggerOnce threshold={0.2}>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={clsx(
                        'transition duration-500 delay-200',
                        inView
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-10'
                      )}
                    >
                      <div className='overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-xl group'>
                        <div className='relative'>
                          <Img
                            className='w-full transform transition duration-300 group-hover:scale-[1.03]'
                            publicId='https://folio-v2-images.s3.us-west-2.amazonaws.com/images/portrait.jpg'
                            width='1700'
                            height='1300'
                            alt='Portrait under greenhouse grow lights.'
                            preview={false}
                            aspect={{ width: 170, height: 115 }}
                            title=' '
                          />
                          <div className='absolute inset-0 bg-gradient-to-tr from-primary-300/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100'></div>
                        </div>
                      </div>
                    </div>
                  )}
                </InView>

                {/* TechStack moved here - under the image */}
                <InView triggerOnce threshold={0.2}>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={clsx(
                        'mt-8 transition duration-500 delay-800',
                        inView
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-10'
                      )}
                    >
                      <h3 className='text-xl font-bold md:text-2xl'>
                        <Accent>Tech Stack</Accent>
                      </h3>
                      <div className='mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800/50'>
                        <TechStack />
                      </div>
                    </div>
                  )}
                </InView>
              </div>

              {/* Column 2-3 - Text content with animations */}
              <div className='md:col-span-2'>
                <article className='prose max-w-none dark:prose-invert'>
                  {/* Your existing text content remains unchanged */}
                  <InView triggerOnce threshold={0.2}>
                    {({ inView, ref }) => (
                      <p
                        ref={ref}
                        className={clsx(
                          'transition duration-500 delay-300',
                          inView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        )}
                      >
                        Like most people my age, I am {age}. (That was a joke).
                      </p>
                    )}
                  </InView>

                  <InView triggerOnce threshold={0.2}>
                    {({ inView, ref }) => (
                      <p
                        ref={ref}
                        className={clsx(
                          'transition duration-500 delay-400',
                          inView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        )}
                      >
                        The journey to this point in my life has been… let's
                        call it "scenic."
                      </p>
                    )}
                  </InView>

                  <InView triggerOnce threshold={0.2}>
                    {({ inView, ref }) => (
                      <p
                        ref={ref}
                        className={clsx(
                          'transition duration-500 delay-500',
                          inView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        )}
                      >
                        I was bread and buttered in Atlanta, GA. I studied what
                        is now termed "neuropsych" at Georgia State University.
                        So yes, I can read minds. I kid, it is a fancy way of
                        saying I took a bunch of psychology and neuroscience
                        classes. After college, I bounced around a few sales
                        jobs but eventually, I decided life needed a plot twist:
                        I packed my bags and moved to Munich, Germany, so close
                        to the Oktoberfest grounds that I could throw a beer
                        glass and hit one of those famed, giant tents.
                      </p>
                    )}
                  </InView>

                  <InView triggerOnce threshold={0.2}>
                    {({ inView, ref }) => (
                      <p
                        ref={ref}
                        className={clsx(
                          'transition duration-500 delay-600',
                          inView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        )}
                      >
                        In Munich, I spent my days teaching English to
                        kindergarteners and quickly realized I had a lot in
                        common with them: I, too, dislike vegetables and see no
                        reason to wear socks indoors. Somewhere between
                        wrangling tiny humans and butchering German grammar in
                        online lessons, I picked up coding. Eager to level up, I
                        moved back to the States, completed a frontend program
                        at Turing School in Denver, and landed a full-stack gig
                        soon after.
                      </p>
                    )}
                  </InView>

                  <InView triggerOnce threshold={0.2}>
                    {({ inView, ref }) => (
                      <p
                        ref={ref}
                        className={clsx(
                          'transition duration-500 delay-700',
                          inView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        )}
                      >
                        Since then, I've been tinkering with firmware, puttering
                        around with Raspberry Pis, and generally sticking my
                        nose into all things software-related. These days,
                        building and experimenting isn't just my career—it's my
                        favorite way to procrastinate.
                      </p>
                    )}
                  </InView>
                  <InView triggerOnce threshold={0.2}>
                    {({ inView, ref }) => (
                      <p
                        ref={ref}
                        className={clsx(
                          'transition duration-500 delay-700',
                          inView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-10'
                        )}
                      >
                        Scroll down to "Career Journey" at the bottom of this
                        page to see my experience!
                      </p>
                    )}
                  </InView>
                </article>
                <UnstyledLink
                  href='#timeline'
                  className={clsx(
                    'absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-10',
                    'cursor-pointer rounded-md transition-colors',
                    'hover:text-primary-300 focus-visible:text-primary-300'
                  )}
                >
                  <IoArrowDownOutline className='h-8 w-8 animate-bounce md:h-10 md:w-10' />
                </UnstyledLink>
              </div>
            </div>
          </div>
        </section>
        <InView triggerOnce rootMargin='-40% 0px'>
          {({ ref, inView }) => (
            <section
              ref={ref}
              id='timeline'
              className={clsx(inView && 'fade-in-start')}
            >
              <Timeline />
            </section>
          )}
        </InView>
        <section id='timeline'>
          <Timeline />
        </section>
      </main>
    </Layout>
  );
}
