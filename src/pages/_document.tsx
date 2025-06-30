import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {" "}
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/Logo_light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/images/Logo_dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/images/Logo_light.png" />
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/* Theme color with media queries for light/dark mode */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="https://alfredolagamon.com" />
        <link
          rel="preconnect"
          href="https://alfredolagamon.com"
          crossOrigin="anonymous"
        />
        {/* Add preload for critical assets */}
        <link rel="preload" as="image" href="/images/Profile-Photo.jpg" />
        {/* SEO and Social Media Optimization */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Alfredo Luis Lagamon" />
        <meta name="creator" content="Alfredo Luis Lagamon" />
        <meta name="publisher" content="Alfredo Luis Lagamon" />
        {/* Canonical URL - will be overridden by page-specific meta tags */}
        <link rel="canonical" href="https://alfredolagamon.com" />
        {/* Structured Data for Person/Developer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://alfredolagamon.com/#person",
              "name": "Alfredo Luis Lagamon",
              "givenName": "Alfredo Luis",
              "familyName": "Lagamon",
              "jobTitle": "Full Stack Developer",
              "description": "Passionate full-stack developer creating modern web experiences with expertise in React, Next.js, Vue.js, and Node.js",
              "url": "https://alfredolagamon.com",
              "image": "https://alfredolagamon.com/images/Profile-Photo.jpg",
              "sameAs": [
                "https://github.com/alfredolagamon",
                "https://linkedin.com/in/alfredolagamon"
              ],
              "knowsAbout": [
                "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", 
                "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Tailwind CSS"
              ],
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Xavier University",
                "description": "Bachelor of Science in Computer Science"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Restore Masters LLC",
                "description": "Lead Developer"
              }
            }),
          }}
        />
        {/* Prevent theme flash by setting theme before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var resolvedTheme;
                  
                  if (theme === 'system') {
                    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  } else {
                    resolvedTheme = theme;
                  }
                  
                  document.documentElement.classList.add(resolvedTheme);
                  document.documentElement.style.colorScheme = resolvedTheme;
                } catch (e) {
                  // Fallback to light theme if there's an error
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
