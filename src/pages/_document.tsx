import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {" "}
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        {/* Theme color with media queries for light/dark mode */}
        <meta name="theme-color" content="#ffffff" />
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="https://alfredolagamon.com" />
        <link
          rel="preconnect"
          href="https://alfredolagamon.com"
          crossOrigin="anonymous"
        />
        {/* Add preload for critical assets */}
        <link rel="preload" as="image" href="/images/Profile-Photo.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
