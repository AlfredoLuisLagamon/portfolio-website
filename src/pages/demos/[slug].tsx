import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DemoRenderer from '../../components/demos/DemoRenderer';
import { demoRegistry, isDemoSlug } from '../../data/demos';

export default function DemoPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';

  if (!router.isReady) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-secondary">
        Loading demo…
      </div>
    );
  }

  if (!isDemoSlug(slug)) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">Demo not found</h1>
        <p className="text-secondary mb-4">The requested interactive sample does not exist.</p>
        <a href="/#projects" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to Interactive Work Samples
        </a>
      </div>
    );
  }

  const demo = demoRegistry[slug];

  return (
    <>
      <Head>
        <title>{demo.title} | Interactive Demo</title>
        <meta name="description" content={demo.tagline} />
      </Head>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-page mx-auto">
          <div className="mb-6">
            <a
              href={`/#project-${slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Interactive Work Samples
            </a>
          </div>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">
              {demo.ecosystem.replace(/-/g, ' ')}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">{demo.title}</h1>
            <p className="text-secondary mt-2">{demo.tagline}</p>
          </div>
          <div className="rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden shadow-sm">
            <DemoRenderer slug={slug} />
          </div>
        </div>
      </div>
    </>
  );
}
