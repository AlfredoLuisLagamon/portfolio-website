import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../utils/useReducedMotion';
import { DiReact, DiNodejs, DiMongodb, DiGit } from 'react-icons/di';
import {
  SiTypescript,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiVite,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const TechStackMarquee: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const technologies = [
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'React', icon: DiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Vue.js', icon: SiVuedotjs },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'Node.js', icon: DiNodejs },
    { name: 'Express', icon: SiExpress },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: DiMongodb },
    { name: 'REST API', icon: TbApi },
    { name: 'Firebase', icon: SiFirebase },
    { name: 'Git', icon: DiGit },
    { name: 'Vite', icon: SiVite },
    { name: 'Redux', icon: SiRedux },
  ];

  const row1 = technologies.slice(0, 7);
  const row2 = technologies.slice(7, 14);

  const TechBadge: React.FC<{ tech: { name: string; icon: React.ComponentType<{ className?: string }> } }> = React.memo(({ tech }) => {
    const IconComponent = tech.icon;
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full dark:bg-transparent dark:border-transparent text-gray-800 dark:text-gray-200 font-medium whitespace-nowrap mx-1.5 transition-none opacity-transition">
        <IconComponent className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <span>{tech.name}</span>
      </div>
    );
  });
  TechBadge.displayName = 'TechBadge';

  const MarqueeRow: React.FC<{
    technologies: { name: string; icon: React.ComponentType<{ className?: string }> }[];
    direction: 'left' | 'right';
    duration: number;
    prefersReducedMotion: boolean;
  }> = ({ technologies, direction, duration, prefersReducedMotion }) => {
    const badgeWidth = 130;
    const setWidth = badgeWidth * technologies.length;

    return (
      <div className="flex overflow-hidden">
        <motion.div
          className="flex items-center"
          style={{ willChange: 'transform' }}
          initial={{
            x: direction === 'left' ? 0 : -setWidth,
          }}
          animate={{
            x: direction === 'left' ? -setWidth : 0,
          }}
          transition={{
            x: {
              repeat: prefersReducedMotion ? 0 : Infinity,
              repeatType: 'loop',
              duration: prefersReducedMotion ? 0.01 : duration,
              ease: 'linear',
            },
          }}
        >
          {[...Array(2)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              {technologies.map((tech, index) => (
                <TechBadge key={`${tech.name}-${setIndex}-${index}`} tech={tech} />
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-4 md:py-6 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-page mx-auto mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Core stack</h2>
        </div>

        <div className="relative max-w-page mx-auto">
          <div
            className="space-y-2"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)',
            }}
          >
            <MarqueeRow technologies={row1} direction="left" duration={40} prefersReducedMotion={prefersReducedMotion} />
            <MarqueeRow technologies={row2} direction="right" duration={45} prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackMarquee;
