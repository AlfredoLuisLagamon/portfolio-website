import React from 'react';
import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import DemoRenderer from '../../components/demos/DemoRenderer';
import { demoRegistry, isDemoSlug } from '../../data/demos';
import type { DemoMeta } from '../../data/demos';
import { OG_IMAGE_PATH, SITE_NAME } from '../../data/site';
import { absoluteUrl, getSoftwareApplicationJsonLd } from '../../lib/seo';
import type { DemoSlug } from '../../types/demo';

type DemoPageProps = {
  slug: DemoSlug;
  demo: DemoMeta;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (Object.keys(demoRegistry) as DemoSlug[]).map((slug) => ({
    params: { slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<DemoPageProps> = async (context) => {
  const slug = context.params?.slug;

  if (typeof slug !== 'string' || !isDemoSlug(slug)) {
    return { notFound: true };
  }

  return {
    props: {
      slug,
      demo: demoRegistry[slug],
    },
  };
};

export default function DemoPage({
  slug,
  demo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pageTitle = `${demo.title} | Interactive Demo | ${SITE_NAME}`;
  const canonical = absoluteUrl(`/demos/${slug}`);
  const ogImage = absoluteUrl(OG_IMAGE_PATH);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={demo.tagline} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content={`${SITE_NAME} Portfolio`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={demo.tagline} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={demo.title} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={demo.tagline} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={demo.title} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSoftwareApplicationJsonLd(demo)),
          }}
        />
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
              Back to Projects
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
