import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px",
  });

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "React",
        "Vue",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
      ],
      bgColor: "bg-blue-100/80",
      hoverColor: "hover:bg-blue-200",
      borderColor: "border-blue-200",
    },
    {
      title: "Tools & Workflow",
      skills: [
        "Node.js",
        "Tailwind",
        "Vite",
        "Git",
        "GitHub",
        "VS Code",
        "Figma",
      ],
      bgColor: "bg-green-100/80",
      hoverColor: "hover:bg-green-200",
      borderColor: "border-green-200",
    },
    {
      title: "Soft Skills",
      skills: [
        "Team Collaboration",
        "Effective Communication",
        "Problem Solving",
        "Time Management",
        "Adaptability",
      ],
      bgColor: "bg-purple-100/80",
      hoverColor: "hover:bg-purple-200",
      borderColor: "border-purple-200",
    },
    {
      title: "Currently Exploring",
      skills: ["Framer Motion", "Storybook", "Three.js", "GraphQL"],
      bgColor: "bg-yellow-100/80",
      hoverColor: "hover:bg-yellow-200",
      borderColor: "border-yellow-200",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <motion.div
        className="absolute left-1/4 top-1/3 w-60 h-60 rounded-full bg-blue-100 opacity-30 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut",
        }}
      />

      <div className="section-container relative z-10">
        <div className="flex justify-center mb-16">
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-6xl mx-auto grid gap-12 md:gap-16 lg:grid-cols-2 items-start"
        >
          {/* Who I Am */}
          <motion.div variants={fadeInUp}>
            <motion.div
              className="flex items-center space-x-3 mb-6"
              variants={fadeInUp}
            >
              <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">Who I Am</h2>
            </motion.div>

            <div className="space-y-5 text-gray-700 leading-relaxed">
              <motion.p variants={fadeInUp} className="text-lg">
                I'm Alfred, a front-end developer passionate about building
                clean, responsive, and engaging user interfaces. I specialize in
                using modern frameworks like React and Vue, and I take pride in
                crafting experiences that feel intuitive, polished, and built
                with purpose. I value thoughtful design and strive to bring
                clarity, structure, and attention to detail in every project I
                work on.
              </motion.p>

              <motion.p variants={fadeInUp}>
                My journey into front-end development started with curiosity and
                a love for creating things that just work—and work well. Over
                time, I’ve expanded my skill set through tools like TypeScript,
                Next.js, Tailwind CSS, and Vite, while also diving into design
                systems, animation libraries, and performance optimization. I
                enjoy solving UI problems, improving layout responsiveness, and
                creating reusable, maintainable components that scale.
              </motion.p>

              <motion.p variants={fadeInUp}>
                At the core of my work is a strong focus on user experience,
                consistency, and seamless collaboration. I enjoy working closely
                with designers, product teams, and fellow developers to turn
                ideas into well-built, user-focused interfaces. For me, great
                front-end development isn’t just about writing code—it’s about
                building digital experiences that feel effortless, perform
                smoothly, and leave a lasting impression.
              </motion.p>

              <motion.div variants={fadeInUp} className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 group"
                >
                  <span>Let's work together</span>
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* My Skills */}
          <motion.div variants={fadeInUp}>
            <motion.div
              className="flex items-center space-x-3 mb-6"
              variants={fadeInUp}
            >
              <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-800">My Skills</h2>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-gray-600 mb-8">
              Here's my current toolbox—always growing, always evolving.
            </motion.p>

            <motion.div className="grid gap-8" variants={staggerContainer}>
              {skillCategories.map((category, idx) => (
                <motion.div key={category.title} variants={fadeInUp}>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                    <span
                      className={`inline-block w-2 h-2 mr-2 rounded-full ${category.bgColor.replace(
                        "/80",
                        ""
                      )}`}
                    ></span>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className={`${category.bgColor} backdrop-blur-sm border ${category.borderColor} text-sm px-3 py-1.5 rounded-full ${category.hoverColor} transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md font-medium`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
