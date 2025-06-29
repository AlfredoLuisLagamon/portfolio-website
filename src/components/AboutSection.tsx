import React from "react";
import { ContentCard } from "./cards";

const AboutSection = () => {
  return (
    <>
      {/* About Me Summary */}
      <section id="about" className="py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <ContentCard
              title="About Me"
              titleIcon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              variant="strong"
              hover={false}
            >
              <div className="space-y-4 text-secondary">
                <p>
                  I'm Alfred, a front-end developer based in the Philippines. With over 5 years of experience in web development, I've worked with React, Vue, and TypeScript to build fast, modular, and user-focused applications.
                </p>
                <p>
                  I enjoy designing clean UIs, optimizing performance, and making products that feel good to use. Outside of coding, I play games, read manga, and hang out with my dog.
                </p>
                <p>
                  Currently open to roles or collaborations that involve modern front-end stacks, UI/UX work, or projects with strong design and interaction needs.
                </p>
              </div>
            </ContentCard>
          </div>
        </div>
      </section>


    </>
  );
};

export default AboutSection;
