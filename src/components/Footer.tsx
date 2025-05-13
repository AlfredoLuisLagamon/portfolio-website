import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
    >
      {/* Background animation elements */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Connect With Me
              </h2>
              <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-12">
              <motion.div
                className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Get In Touch
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-wrap items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 shadow-lg shadow-blue-500/20 flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm text-gray-400">Email</p>
                      <a
                        href="mailto:alfredoluis.lagamon@gmail.com"
                        className="text-blue-400 hover:text-blue-300 transition-colors hover:underline break-words"
                      >
                        alfredoluis.lagamon@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3 sm:mr-4 shadow-lg shadow-blue-500/20 flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-white">Cagayan de Oro, Philippines</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  Follow Me
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <a
                    href="https://github.com/AlfredoLuisLagamon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-2 sm:p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                      <svg
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm">GitHub</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/alfredo-luis-lagamon-a70065236/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-2 sm:p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                      <svg
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm">LinkedIn</span>
                  </a>

                  <a
                    href="https://www.facebook.com/alfredo.lagamon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-2 sm:p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                      <svg
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm">Facebook</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="py-4 sm:py-6 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-2 md:mb-0">
              © {currentYear} Alfredo Luis Lagamon
            </div>
            <div>
              <p className="text-gray-400 text-sm">
                Built with <span className="text-blue-400">React</span> and{" "}
                <span className="text-blue-400">Next.js</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
