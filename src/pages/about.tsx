import React from "react";
import Head from "next/head";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Alfredo Luis Lagamon | Full Stack Developer Story & Experience</title>
        <meta
          name="description"
          content="Learn about Alfredo Luis Lagamon's journey as a full-stack developer, his expertise in modern web technologies like React, Vue.js, Node.js, and his passion for creating innovative digital solutions."
        />
        <meta 
          name="keywords" 
          content="About Alfredo Luis Lagamon, Developer Story, Full Stack Experience, React Vue Node.js Expert, Xavier University Computer Science, Web Developer Journey" 
        />
        <link rel="icon" href="/images/Logo_light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/images/Logo_dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/images/Logo_light.png" />
        <link rel="canonical" href="https://alfredolagamon.com/about" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://alfredolagamon.com/about" />
        <meta property="og:site_name" content="Alfredo Luis Lagamon Portfolio" />
        <meta
          property="og:title"
          content="About Alfredo Luis Lagamon | Full Stack Developer Story & Experience"
        />
        <meta
          property="og:description"
          content="Discover the journey of a passionate full-stack developer with expertise in React, Vue.js, Node.js, and modern web technologies. Learn about his experience and approach to web development."
        />
        <meta
          property="og:image"
          content="https://alfredolagamon.com/images/Profile-Photo.jpg"
        />
        <meta property="og:image:alt" content="Alfredo Luis Lagamon - About Page" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@alfredolagamon" />
        <meta
          name="twitter:title"
          content="About Alfredo Luis Lagamon | Full Stack Developer Story"
        />
        <meta
          name="twitter:description"
          content="Learn about Alfredo's journey as a full-stack developer and his expertise in modern web technologies"
        />
        <meta
          name="twitter:image"
          content="https://alfredolagamon.com/images/Profile-Photo.jpg"
        />
      </Head>

      <>
        {/* About Me section */}
        <AboutSection />

        {/* Experience section */}
        <ExperienceSection />
      </>
    </>
  );
};

export default AboutPage; 