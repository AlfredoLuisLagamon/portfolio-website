import React from "react";
import Head from "next/head";
import ProjectsSection from "../components/ProjectsSection";

const ProjectsPage = () => {
  return (
    <>
      <Head>
        <title>Projects | Alfredo Luis Lagamon - Full Stack Development Portfolio</title>
        <meta
          name="description"
          content="Explore Alfredo Luis Lagamon's portfolio of full-stack web development projects including GIAMS, EduSync, evitePro, and HRIS systems built with React, Vue.js, Node.js, and modern technologies."
        />
        <meta 
          name="keywords" 
          content="Alfredo Luis Lagamon Projects, Full Stack Projects, React Projects, Vue.js Projects, GIAMS, EduSync, evitePro, HRIS, Web Development Portfolio, Node.js Projects" 
        />
        <link rel="icon" href="/images/Logo_light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/images/Logo_dark.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/images/Logo_light.png" />
        <link rel="canonical" href="https://alfredolagamon.com/projects" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alfredolagamon.com/projects" />
        <meta property="og:site_name" content="Alfredo Luis Lagamon Portfolio" />
        <meta
          property="og:title"
          content="Projects | Alfredo Luis Lagamon - Full Stack Development Portfolio"
        />
        <meta
          property="og:description"
          content="Discover innovative web development projects including government systems, educational platforms, and event management solutions built with modern technologies."
        />
        <meta
          property="og:image"
          content="https://alfredolagamon.com/images/GIAMS/Dashboard Light.png"
        />
        <meta property="og:image:alt" content="Alfredo Luis Lagamon - Development Projects" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@alfredolagamon" />
        <meta
          name="twitter:title"
          content="Projects | Alfredo Luis Lagamon - Full Stack Portfolio"
        />
        <meta
          name="twitter:description"
          content="Explore innovative web development projects built with React, Vue.js, Node.js, and modern technologies"
        />
        <meta
          name="twitter:image"
          content="https://alfredolagamon.com/images/GIAMS/Dashboard Light.png"
        />
        <meta name="twitter:image:alt" content="Full Stack Development Projects" />
      </Head>

      <>
        {/* Projects section */}
        <ProjectsSection />
      </>
    </>
  );
};

export default ProjectsPage;