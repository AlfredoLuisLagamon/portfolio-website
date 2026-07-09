import React from "react";

const ContactSection = () => {
  // Social media data with proper delay values
  const socialMedia = [
    {
      name: "GitHub",
      href: "https://github.com/AlfredoLuisLagamon",
      svg: (
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        ></path>
      ),
      color: "from-blue-600 to-blue-700",
      delay: 0.5,
      ariaLabel: "Visit Alfredo's GitHub profile to see code repositories and projects",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/alfredo-luis-lagamon-a70065236/",
      svg: (
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
      ),
      color: "from-blue-600 to-indigo-700",
      delay: 0.6,
      ariaLabel: "Connect with Alfredo on LinkedIn for professional networking",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/alfredo.lagamon",
      svg: (
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
      ),
      color: "from-indigo-600 to-purple-700",
      delay: 0.7,
      ariaLabel: "Follow Alfredo on Facebook for updates and personal insights",
    },
  ];

  return (
    <section id="contact" className="py-6 md:py-8" aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-page mx-auto">
          <h2
            id="contact-heading"
            className="text-2xl md:text-3xl font-bold text-primary mb-6"
          >
            Connect With Me
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Get In Touch section */}
            <div 
              className="glass-surface p-6 md:p-8 rounded-2xl"
              role="region"
              aria-labelledby="contact-info-heading"
            >
              <h3 
                id="contact-info-heading"
                className="text-xl md:text-2xl font-bold mb-6 text-primary"
              >
                Get In Touch
              </h3>
              <div className="space-y-6">
                {/* Email info */}
                <div className="flex items-start gap-3">
                  <div 
                    className="hidden sm:flex w-12 h-12 min-w-[3rem] bg-blue-600/80 rounded-lg items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5 inline sm:hidden"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      Email
                    </p>
                    <a
                      href="mailto:alfredoluis.lagamon@gmail.com"
                      className="text-lg text-primary hover:text-blue-600 transition-colors hover:underline break-words focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                      aria-label="Send email to Alfredo Luis Lagamon at alfredoluis.lagamon@gmail.com"
                    >
                      alfredoluis.lagamon@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location info */}
                <div className="flex items-start gap-3">
                  <div 
                    className="hidden sm:flex w-12 h-12 min-w-[3rem] bg-blue-600/80 rounded-lg items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5 inline sm:hidden"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Location
                    </p>
                    <p className="text-lg text-primary">
                      Cagayan de Oro, Philippines
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media section */}
            <div 
              className="glass-surface p-6 md:p-8 rounded-2xl"
              role="region"
              aria-labelledby="social-media-heading"
            >
              <h3 
                id="social-media-heading"
                className="text-xl md:text-2xl font-bold mb-6 text-primary"
              >
                Follow Me
              </h3>
              <div 
                className="grid grid-cols-3 gap-4"
                role="list"
                aria-label="Social media profiles"
              >
                {/* Social media links */}
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 glass-surface rounded-xl hover:glass-surface-strong transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={social.ariaLabel}
                    role="listitem"
                  >
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center mb-3`}
                      aria-hidden="true"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        {social.svg}
                      </svg>
                    </div>
                    <span className="text-primary font-medium">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 