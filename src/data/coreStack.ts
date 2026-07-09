import type { ComponentType } from 'react';
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
  SiSequelize,
  SiSocketdotio,
  SiJsonwebtokens,
  SiAmazonwebservices,
  SiZod,
  SiOpenai,
  SiRadixui,
  SiFramer,
} from 'react-icons/si';
import { TbApi, TbCloudUpload, TbCode, TbShieldLock } from 'react-icons/tb';
import { VscCode } from 'react-icons/vsc';
import { projects } from './projects';

export interface CoreStackTech {
  name: string;
  icon: ComponentType<{ className?: string }>;
}

const iconByName: Record<string, ComponentType<{ className?: string }>> = {
  TypeScript: SiTypescript,
  React: DiReact,
  'Next.js': SiNextdotjs,
  'Vue.js': SiVuedotjs,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': DiNodejs,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  MongoDB: DiMongodb,
  'REST API': TbApi,
  Firebase: SiFirebase,
  Git: DiGit,
  Vite: SiVite,
  Redux: SiRedux,
  Sequelize: SiSequelize,
  'Socket.io': SiSocketdotio,
  JWT: SiJsonwebtokens,
  UploadThing: TbCloudUpload,
  NextAuth: TbShieldLock,
  'AWS S3': SiAmazonwebservices,
  Zod: SiZod,
  'Monaco Editor': VscCode,
  'react-live': TbCode,
  'Radix UI': SiRadixui,
  'Framer Motion': SiFramer,
  OpenAI: SiOpenai,
};

const skipWhenPresent: Record<string, string> = {
  javascript: 'typescript',
};

const baseStackNames = [
  'TypeScript',
  'React',
  'Next.js',
  'Vue.js',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'REST API',
  'Firebase',
  'Git',
  'Vite',
  'Redux',
];

function normalizeTechName(name: string): string {
  return name.trim().toLowerCase();
}

function toCoreStackTech(name: string): CoreStackTech {
  return {
    name,
    icon: iconByName[name] ?? TbApi,
  };
}

const projectTechNames = projects.flatMap((project) => project.technologies);

const seen = new Set<string>();
const coreStack: CoreStackTech[] = [];

for (const name of [...baseStackNames, ...projectTechNames]) {
  const key = normalizeTechName(name);
  if (seen.has(key)) continue;

  const skipIfKey = skipWhenPresent[key];
  if (skipIfKey && seen.has(skipIfKey)) continue;

  seen.add(key);
  coreStack.push(toCoreStackTech(name));
}

export { coreStack };
