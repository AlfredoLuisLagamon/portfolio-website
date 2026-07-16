import { Html, Head, Main, NextScript } from "next/document";
import { SITE_URL } from "../data/site";
import { getSiteJsonLdGraph } from "../lib/seo";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/Logo_light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/images/Logo_dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/images/Logo_light.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {/* Theme color with media queries for light/dark mode */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href={SITE_URL} />
        <link rel="preconnect" href={SITE_URL} crossOrigin="anonymous" />
        {/* Add preload for critical assets */}
        <link rel="preload" as="image" href="/images/Profile-Photo.jpg" />
        {/* SEO and Social Media Optimization */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Alfredo Luis Lagamon" />
        <meta name="creator" content="Alfredo Luis Lagamon" />
        <meta name="publisher" content="Alfredo Luis Lagamon" />
        {/* Structured Data — page-specific canonical lives in each page Head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteJsonLdGraph()),
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
                  document.documentElement.classList.add('app-loading');
                  document.documentElement.style.colorScheme = resolvedTheme;
                } catch (e) {
                  // Fallback to light theme if there's an error
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.add('app-loading');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
        {/* Critical first-frame styles — matches LoadingOverlay handoff */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html.app-loading, html.app-loading body { overflow: hidden !important; }
              #app-boot-loader {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #ffffff;
                background-image: linear-gradient(to bottom, #ffffff, #f5f5f5);
                pointer-events: all;
                overflow: hidden;
              }
              html.dark #app-boot-loader {
                background-color: #0f172a;
                background-image: linear-gradient(to bottom, #0f172a, #020617);
              }
              #app-boot-loader .boot-glow {
                position: absolute;
                left: 50%;
                top: 42%;
                width: 16rem;
                height: 16rem;
                transform: translate(-50%, -50%);
                border-radius: 9999px;
                background: rgba(37, 99, 235, 0.18);
                filter: blur(48px);
                pointer-events: none;
              }
              html.dark #app-boot-loader .boot-glow {
                background: rgba(59, 130, 246, 0.16);
              }
              #app-boot-loader .boot-grid {
                position: absolute;
                inset: 0;
                opacity: 0.28;
                pointer-events: none;
                background-image:
                  linear-gradient(to right, rgba(37, 99, 235, 0.16) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(37, 99, 235, 0.16) 1px, transparent 1px);
                background-size: 48px 48px;
                -webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent 70%);
                mask-image: radial-gradient(ellipse at center, #000 20%, transparent 70%);
              }
              html.dark #app-boot-loader .boot-grid { opacity: 0.2; }
              #app-boot-loader .boot-inner {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                text-align: center;
                user-select: none;
              }
              #app-boot-loader .boot-initials {
                font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
                font-size: 3rem;
                font-weight: 700;
                letter-spacing: 0.18em;
                color: #0f172a;
              }
              html.dark #app-boot-loader .boot-initials { color: #f8fafc; }
              #app-boot-loader .boot-name {
                font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
                font-size: 0.875rem;
                font-weight: 500;
                letter-spacing: 0.04em;
                color: #334155;
              }
              html.dark #app-boot-loader .boot-name { color: #cbd5e1; }
              @media (min-width: 640px) {
                #app-boot-loader .boot-initials { font-size: 3.75rem; }
                #app-boot-loader .boot-name { font-size: 1rem; }
              }
              @media (min-width: 768px) {
                #app-boot-loader .boot-initials { font-size: 4.5rem; }
                #app-boot-loader .boot-glow { width: 18rem; height: 18rem; }
              }
              @media (prefers-reduced-motion: reduce) {
                #app-boot-loader .boot-grid,
                #app-boot-loader .boot-glow { display: none; }
              }
            `,
          }}
        />
      </Head>
      <body>
        {/* Immediate paint overlay — removed by LoadingOverlay on hydrate */}
        <div id="app-boot-loader" role="status" aria-live="polite" aria-busy="true" aria-label="Loading">
          <div className="boot-grid" aria-hidden="true" />
          <div className="boot-glow" aria-hidden="true" />
          <div className="boot-inner">
            <span className="boot-initials">AL</span>
            <p className="boot-name">Alfredo Luis Lagamon</p>
          </div>
        </div>
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                #app-boot-loader { display: none !important; }
                html.app-loading, html.app-loading body { overflow: auto !important; }
              `,
            }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
