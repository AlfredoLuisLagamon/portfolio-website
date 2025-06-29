import React from "react";
import Head from "next/head";
import ContactSection from "../components/ContactSection";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Alfredo Luis Lagamon | Full Stack Developer - Let's Connect</title>
        <meta
          name="description"
          content="Get in touch with Alfredo Luis Lagamon, a passionate full-stack developer. Available for freelance projects, collaboration, and full-time opportunities in React, Vue.js, Node.js development."
        />
        <meta 
          name="keywords" 
          content="Contact Alfredo Luis Lagamon, Hire Full Stack Developer, React Developer Contact, Vue.js Developer, Node.js Developer, Freelance Web Developer, Full Stack Collaboration" 
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://alfredolagamon.com/contact" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alfredolagamon.com/contact" />
        <meta property="og:site_name" content="Alfredo Luis Lagamon Portfolio" />
        <meta
          property="og:title"
          content="Contact Alfredo Luis Lagamon | Full Stack Developer - Let's Connect"
        />
        <meta
          property="og:description"
          content="Ready to collaborate? Connect with Alfredo for full-stack development projects, React/Vue.js solutions, and innovative web applications."
        />
        <meta
          property="og:image"
          content="https://alfredolagamon.com/images/Profile-Photo.jpg"
        />
        <meta property="og:image:alt" content="Contact Alfredo Luis Lagamon - Full Stack Developer" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@alfredolagamon" />
        <meta
          name="twitter:title"
          content="Contact Alfredo Luis Lagamon | Full Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Let's connect! Available for full-stack development projects and collaboration opportunities"
        />
        <meta
          name="twitter:image"
          content="https://alfredolagamon.com/images/Profile-Photo.jpg"
        />
        <meta name="twitter:image:alt" content="Contact Full Stack Developer" />
      </Head>

      <div className="pt-8 pb-6 md:pb-8">
        {/* Contact section */}
        <ContactSection />
      </div>
    </>
  );
};

export default ContactPage; 