import fs from 'fs';
import path from 'path';
import * as React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

interface UndistractPrivacyPageProps {
  privacyPolicyHtml: string;
}

export default function UndistractPrivacyPage({
  privacyPolicyHtml,
}: UndistractPrivacyPageProps) {
  return (
    <Layout>
      <Seo
        templateTitle='Undistract - Privacy Policy'
        description='Privacy policy for the Undistract mobile application'
      />

      <main>
        <section className=''>
          <div className='layout py-20'>
            {/* Back navigation */}
            <div className='mb-8'>
              <UnstyledLink
                href='/privacy'
                className='animated-underline inline-flex items-center gap-1 rounded-sm font-medium text-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
              >
                <FiArrowLeft className='h-4 w-4' />
                Back to Privacy Policies
              </UnstyledLink>
            </div>

            {/* Privacy Policy Content - Rendered from HTML */}
            <div
              className='max-w-none lg:prose-lg bg-white p-6'
              dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const privacyPolicyPath = path.join(
    process.cwd(),
    'src/pages/privacy/undistract-privacy-policy.html'
  );
  const privacyPolicyHtml = fs.readFileSync(privacyPolicyPath, 'utf8');

  return {
    props: {
      privacyPolicyHtml,
    },
  };
}
