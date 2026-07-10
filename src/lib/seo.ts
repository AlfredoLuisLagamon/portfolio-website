import {
  OG_IMAGE_PATH,
  ROLE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '../data/site';

export function absoluteUrl(path = ''): string {
  if (!path) return SITE_URL;
  return path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getPersonJsonLd() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: SITE_NAME,
    givenName: 'Alfredo Luis',
    familyName: 'Lagamon',
    jobTitle: 'Full Stack Developer',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl(OG_IMAGE_PATH),
    sameAs: [
      'https://github.com/AlfredoLuisLagamon',
      'https://www.linkedin.com/in/alfredo-luis-lagamon-a70065236/',
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Vue.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Xavier University - Ateneo de Cagayan',
      description: 'Bachelor of Science in Computer Science',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Restore Masters LLC',
      description: 'Full-Stack Web Developer',
    },
  };
}

export function getWebsiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: `${SITE_NAME} Portfolio`,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en',
  };
}

export function getProfilePageJsonLd() {
  return {
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${SITE_NAME} | ${ROLE_TITLE}`,
    description: SITE_DESCRIPTION,
    mainEntity: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

export function getSiteJsonLdGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [getWebsiteJsonLd(), getPersonJsonLd(), getProfilePageJsonLd()],
  };
}

export function getSoftwareApplicationJsonLd(demo: {
  title: string;
  tagline: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: demo.title,
    description: demo.tagline,
    url: absoluteUrl(`/demos/${demo.slug}`),
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    author: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}
