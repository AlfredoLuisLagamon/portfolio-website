import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ProfileCard } from "../components/cards";
import TechStackMarquee from "../components/TechStackMarquee";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import {
  OG_IMAGE_PATH,
  ROLE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "../data/site";
import { absoluteUrl } from "../lib/seo";
import { scrollToSection } from "../utils/scrollToSection";

const Home = () => {
  const router = useRouter();
  const pageTitle = `${SITE_NAME} | ${ROLE_TITLE}`;
  const ogImage = absoluteUrl(OG_IMAGE_PATH);

  useEffect(() => {
    if (!router.isReady) return;

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash, "auto"));
    }
  }, [router.isReady, router.asPath]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta
          name="keywords"
          content="Alfredo Luis Lagamon, Front-End Developer, Full Stack Developer, React, Next.js, Vue.js, TypeScript, Node.js, Dashboard Developer, Internal Tools"
        />
        <link rel="icon" href="/images/Logo_light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/images/Logo_dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/images/Logo_light.png" />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content={`${SITE_NAME} Portfolio`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content={`${SITE_NAME} - ${ROLE_TITLE}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@alfredolagamon" />
        <meta name="twitter:site" content="@alfredolagamon" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={`${SITE_NAME} - ${ROLE_TITLE}`} />

        <meta name="geo.region" content="PH" />
        <meta name="geo.country" content="Philippines" />
        <meta name="language" content="English" />
      </Head>

      <>
        <ProfileCard />
        <TechStackMarquee />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </>
    </>
  );
};

export default Home;
