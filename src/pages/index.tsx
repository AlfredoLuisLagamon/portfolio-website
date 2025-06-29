import React from "react";
import Head from "next/head";
import { ProfileCard } from "../components/cards";
import TechStackMarquee from "../components/TechStackMarquee";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";

const Home = () => {
  return (
    <>
      <Head>
        <title>Alfredo Luis Lagamon | Full Stack Developer & Web Designer</title>
        <meta
          name="description"
          content="Welcome to the portfolio of Alfredo Luis Lagamon - a passionate full-stack developer specializing in React, Next.js, Vue.js, and Node.js. Creating modern web experiences with clean code and innovative solutions."
        />
        <meta 
          name="keywords" 
          content="Alfredo Luis Lagamon, Full Stack Developer, Web Developer, React Developer, Next.js, Vue.js, Node.js, JavaScript, TypeScript, Portfolio, Web Design" 
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://alfredolagamon.com" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alfredolagamon.com" />
        <meta property="og:site_name" content="Alfredo Luis Lagamon Portfolio" />
        <meta
          property="og:title"
          content="Alfredo Luis Lagamon | Full Stack Developer & Web Designer"
        />
        <meta
          property="og:description"
          content="Portfolio website showcasing modern web development projects, skills in React, Next.js, Vue.js, and innovative full-stack solutions."
        />
        <meta
          property="og:image"
          content="https://alfredolagamon.com/images/Profile-Photo.jpg"
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content="Alfredo Luis Lagamon - Full Stack Developer" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@alfredolagamon" />
        <meta name="twitter:site" content="@alfredolagamon" />
        <meta
          name="twitter:title"
          content="Alfredo Luis Lagamon | Full Stack Developer & Web Designer"
        />
        <meta
          name="twitter:description"
          content="Portfolio showcasing modern web development projects and full-stack solutions using React, Next.js, Vue.js, and Node.js"
        />
        <meta
          name="twitter:image"
          content="https://alfredolagamon.com/images/Profile-Photo.jpg"
        />
        <meta name="twitter:image:alt" content="Alfredo Luis Lagamon - Full Stack Developer" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="PH" />
        <meta name="geo.country" content="Philippines" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
      </Head>

      <>
        {/* Profile section with social media style layout */}
        <ProfileCard />

        {/* Tech Stack Marquee - What I work with */}
        <TechStackMarquee />

        {/* Experience section */}
        <ExperienceSection />

        {/* Projects section */}
        <ProjectsSection />
      </>
    </>
  );
};

export default Home;
