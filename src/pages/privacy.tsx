import * as React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { trackEvent } from '@/lib/analytics';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

// Privacy policy data
const privacyPolicies = [
  {
    id: 'undistract',
    title: 'Undistract App',
    description:
      'Privacy policy for the Undistract mobile application - a simple blocking app that allows you to bring your own NFC tags to reduce phone distraction.',
    href: '/privacy/undistract',
  },
];

export default function PrivacyPage() {
  return (
    <Layout>
      <Seo
        templateTitle='Privacy Policies'
        description='Privacy policies for various applications and services by Elliot Mackinnon'
      />

      <main>
        <section className=''>
          <div className='layout py-20'>
            <h1>
              <Accent>Privacy Policies</Accent>
            </h1>
            <p className='mt-2 text-gray-700 dark:text-gray-200'>
              Privacy policies for various applications and services
            </p>

            <div className='mt-8 space-y-6'>
              {privacyPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className='rounded-lg border border-gray-300 p-6 dark:border-gray-600'
                >
                  <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
                    <Accent>{policy.title}</Accent>
                  </h2>
                  <p className='mt-2 text-gray-600 dark:text-gray-300'>
                    {policy.description}
                  </p>
                  <div className='mt-4'>
                    <UnstyledLink
                      href={policy.href}
                      className='animated-underline inline-flex items-center gap-1 rounded-sm font-medium text-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
                      onClick={() => {
                        trackEvent(`Privacy Policy: ${policy.title}`, {
                          type: 'link',
                        });
                      }}
                    >
                      View {policy.title} Privacy Policy
                      <FiArrowRight className='h-4 w-4' />
                    </UnstyledLink>
                  </div>
                </div>
              ))}

              {/* Placeholder for future privacy policies */}
              <div className='rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50'>
                <h3 className='text-lg font-medium text-gray-500 dark:text-gray-400'>
                  More privacy policies will be added here as new applications
                  and services are developed.
                </h3>
              </div>
            </div>

            <div className='mt-12'>
              <UnstyledLink
                href='/'
                className='animated-underline inline-flex items-center gap-1 rounded-sm font-medium text-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
              >
                <FiArrowLeft className='h-4 w-4' />
                Back to Home
              </UnstyledLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
