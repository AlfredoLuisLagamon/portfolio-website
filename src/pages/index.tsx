import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedHero from "../components/AnimatedHero";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";

const Home = () => {
  return (
    <>
      <Head>
        <title>Alfredo Luis Lagamon | Web Developer & Designer</title>
        <meta
          name="description"
          content="Portfolio website of Alfredo Luis Lagamon, a web developer and designer specializing in creating modern, responsive web applications."
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Social Media Meta Tags */}
        <meta
          property="og:title"
          content="Alfredo Luis Lagamon | Web Developer & Designer"
        />
        <meta
          property="og:description"
          content="Portfolio website showcasing modern web development projects and skills."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alfredolagamon.com" />
        <meta
          property="og:image"
          content="https://alfredolagamon.com/images/social-preview.jpg"
        />
      </Head>

      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        <main className="flex-grow">
          <AnimatedHero />
          <AboutSection />
          <ProjectsSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
