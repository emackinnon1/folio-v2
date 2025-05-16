import clsx from 'clsx';
import * as React from 'react';
import { InView } from 'react-intersection-observer';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Timeline from '@/components/content/Timeline';
import Img from '@/components/images/Img';
import Layout from '@/components/layout/Layout';
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
          className={clsx('min-h-main py-20', isLoaded && 'fade-in-start')}
        >
          <div className='layout'>
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
                    <Accent>Elliot Mackinnon</Accent>
                  </h1>
                  <h2 className='mt-1 text-xl text-gray-700 dark:text-gray-300 md:text-2xl'>
                    Who am I?
                  </h2>
                </div>
              )}
            </InView>

            <div className='mt-12 grid grid-cols-1 gap-12 md:grid-cols-3'>
              {/* Column 1 - Image with animation */}
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

              {/* Column 2-3 - Text content with animations */}
              <div className='md:col-span-2'>
                <article className='prose max-w-none dark:prose-invert'>
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
                        I grew up in Atlanta, GA, and stayed there through my
                        late twenties—except for a brief detour into the
                        sun-baked beauty of West Texas. I studied what we'd now
                        call "neuropsych" at Georgia State University (a fancy
                        way of saying a mix of psychology and neuroscience)
                        before bouncing between a few sales jobs. Eventually, I
                        decided life needed a plot twist. So, I packed my bags
                        and moved to Munich, Germany, where I lived just a
                        well-aimed beer stein away from the Oktoberfest grounds.
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
                </article>

                <InView triggerOnce threshold={0.2}>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={clsx(
                        'mt-12 transition duration-500 delay-800',
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

                <InView triggerOnce threshold={0.2}>
                  {({ inView, ref }) => (
                    <div
                      ref={ref}
                      className={clsx(
                        'mt-8 transition duration-500 delay-900',
                        inView
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-10'
                      )}
                    >
                      <h4 className='text-lg font-semibold md:text-xl'>
                        Currently working on:
                      </h4>
                      <div className='mt-2 rounded-lg bg-gradient-to-tr from-primary-200/20 via-primary-300/20 to-primary-400/20 p-4 dark:from-primary-200/10 dark:via-primary-300/10 dark:to-primary-400/10'>
                        <p className='text-gray-800 dark:text-gray-200'>
                          Currently I am learning firmware and working on
                          mastering microcontrollers in C and C++!
                        </p>
                      </div>
                    </div>
                  )}
                </InView>
              </div>
            </div>
          </div>
        </section>

        <Timeline />
      </main>
    </Layout>
  );
}
