import React from "react";
import { motion } from "framer-motion";

const AnimatedHero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 bg-gradient-to-br from-slate-50/80 to-blue-50/80 overflow-hidden"
    >
      {/* Enhanced background animations */}
      <motion.div
        className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-blue-200 opacity-20 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-200 opacity-30 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-purple-200 opacity-20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Additional animated backgrounds for visual interest */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-cyan-100 opacity-25 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 23,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Hero content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <motion.div
              className="inline-block mb-6 px-4 py-1 bg-blue-50 border border-blue-100 rounded-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-sm font-medium text-blue-600">
                Web Developer & Designer
              </p>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hello, I'm{" "}
              <span className="gradient-text">Alfredo Luis Lagamon</span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              I design and build modern, responsive web applications with a
              strong focus on user experience, performance, and clean, scalable
              code. My goal is to turn ideas into seamless digital experiences
              that not only look great—but feel intuitive and engaging.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>View My Work</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>
              <motion.a
                href="#contact"
                className="btn btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Get In Touch</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </motion.a>
            </motion.div>

            {/* Technology badges */}
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="px-3 py-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm text-sm font-medium text-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <motion.div
              className="w-[400px] h-[400px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-8 border-white shadow-xl relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image wrapper with gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent"></div>

              <img
                src="/images/Profile-Photo.jpg"
                alt="Alfredo Luis Lagamon"
                className="w-full h-full object-cover"
              />

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-12 h-12 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-16 h-16 bg-indigo-600 rounded-full"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
          <div className="w-8 h-12 border-2 border-blue-500 rounded-full flex justify-center">
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedHero;
