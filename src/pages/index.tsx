import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedHero from "../components/AnimatedHero";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import BackgroundAnimator from "../components/BackgroundAnimator";
import { motion } from "framer-motion";

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

        {/* Google Fonts - Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        <main className="flex-grow">
          {/* Hero section with its own background animations */}
          <AnimatedHero />

          {/* About section with subtle background animations */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Render BackgroundAnimator without wrapping it in fade in animation */}
            <BackgroundAnimator variant="light" intensity="medium" />
            <AboutSection />
          </motion.div>

          {/* Projects section with medium intensity background animations */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Render BackgroundAnimator with dark variant for contrast */}
            <BackgroundAnimator variant="dark" intensity="medium" />
            <ProjectsSection />
          </motion.div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
