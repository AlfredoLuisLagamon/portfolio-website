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

  const skills = [
    { name: "HTML/CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "TypeScript", level: 70 },
    { name: "UI/UX Design", level: 85 },
  ];

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
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Who I Am
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                I'm a passionate Web Developer with expertise in creating modern
                and intuitive web applications. With a strong foundation in both
                front-end and back-end technologies, I develop comprehensive
                solutions that address real-world problems.
              </p>
              <p>
                My approach combines technical expertise with creative
                problem-solving to deliver projects that exceed expectations.
                I'm constantly learning and adapting to new technologies to stay
                at the forefront of web development.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing my knowledge
                through blog posts and mentoring.
              </p>
            </div>

            <div className="mt-8">
              <a href="#projects" className="btn btn-primary">
                See My Work
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              My Skills
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-blue-600">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <motion.div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${skill.level}%` }}
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
