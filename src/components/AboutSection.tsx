import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative">
      {/* Background elements - using opacity to allow animations to show through */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 bg-opacity-70 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 bg-opacity-70 rounded-full translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="section-heading pb-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          className="py-16 px-6 max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-start"
        >
          {/* Who I Am */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Who I Am</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                I’m Alfred, a front-end developer passionate about building
                clean, responsive, and engaging user interfaces. I specialize in
                working with modern frameworks like React and Vue, and I take
                pride in crafting experiences that feel intuitive and polished.
                From design implementation to smooth interactions, I focus on
                the details that turn a functional website into something truly
                enjoyable to use.
              </p>
              <p>
                My journey into front-end development started with curiosity and
                a love for creating things that just work. Over time, I’ve grown
                my skill set by exploring tools like TypeScript, Next.js,
                Tailwind CSS, and Vite, while also diving into design systems,
                animations, and performance optimization. I'm always
                learning—whether it's building better UI components,
                experimenting with Framer Motion, or refining my workflow with
                tools like Storybook and Git.
              </p>
              <p>
                At the core of my work is a strong focus on user experience and
                seamless collaboration. I enjoy working closely with designers,
                product teams, and fellow developers to bring ideas to life
                through code that’s clean, scalable, and thoughtfully built. I
                believe that great front-end development is more than just
                visual polish—it’s about clarity, efficiency, and building
                interfaces that just feel right.
              </p>
            </div>
          </div>

          {/* My Skills */}
          <div>
            <h2 className="text-3xl font-bold mb-4">My Skills</h2>
            <p className="text-gray-600 mb-6">
              Here's my current toolbox—always growing, always evolving.
            </p>

            <div className="grid gap-6">
              {/* Frontend */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Frontend</h3>
                <ul className="flex flex-wrap gap-3">
                  {[
                    "React",
                    "Vue",
                    "Next.js",
                    "JavaScript",
                    "TypeScript",
                    "HTML",
                    "CSS",
                  ].map((skill) => (
                    <li
                      key={skill}
                      className="bg-blue-100 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-all duration-300 font-medium"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Workflow */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Tools & Workflow</h3>
                <ul className="flex flex-wrap gap-3">
                  {[
                    "Node.js",
                    "Tailwind",
                    "Vite",
                    "Git",
                    "GitHub",
                    "VS Code",
                    "Figma",
                  ].map((tool) => (
                    <li
                      key={tool}
                      className="bg-green-100 text-sm px-3 py-1 rounded-full hover:bg-green-200 transition-all duration-300 font-medium"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Soft Skills</h3>
                <ul className="flex flex-wrap gap-3">
                  {[
                    "Team Collaboration",
                    "Effective Communication",
                    "Problem Solving",
                    "Time Management",
                    "Adaptability",
                    "Creative Thinking",
                    "Attention to Detail",
                  ].map((skill) => (
                    <li
                      key={skill}
                      className="bg-purple-100 text-sm px-3 py-1 rounded-full hover:bg-purple-200 transition-all duration-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Currently Exploring */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Currently Exploring
                </h3>
                <ul className="flex flex-wrap gap-3">
                  {["Framer Motion", "Storybook"].map((item) => (
                    <li
                      key={item}
                      className="bg-yellow-100 text-sm px-3 py-1 rounded-full hover:bg-yellow-200 transition-all duration-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
