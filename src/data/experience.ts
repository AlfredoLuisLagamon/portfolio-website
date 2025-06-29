export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: 'work' | 'education';
  description: string[];
  technologies?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'restore-masters-2025',
    title: 'Full-Stack Web Developer',
    company: 'Restore Masters LLC',
    location: 'Remote',
    period: '2025 - Present',
    type: 'work',
    description: [
      'Developing custom web applications to digitalize and streamline business processes',
      'Building responsive interfaces and robust backend systems to modernize legacy workflows',
      'Implementing automated solutions to improve operational efficiency and data management',
      'Collaborating with stakeholders to translate business requirements into technical solutions'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'ustp-programmer-1',
    title: 'Computer Programmer II',
    company: 'University of Science and Technology of Southern Philippines',
    location: 'Cagayan de Oro, Philippines',
    period: '2022 - 2025',
    type: 'work',
    description: [
      'Developed and maintained web applications using modern JavaScript frameworks',
      'Contributed to UI/UX design and enhanced user engagement across multiple platforms',
      'Implemented performance optimizations and responsive design patterns',
      'Collaborated with cross-functional teams to deliver high-quality software solutions'
    ],
    technologies: ['Vue.js', 'React', 'JavaScript', 'CSS3', 'HTML5', 'MySQL']
  },
  {
    id: 'ustp-programmer-2',
    title: 'Computer Programmer II (Project-Based)',
    company: 'University of Science and Technology of Southern Philippines',
    location: 'Cagayan de Oro, Philippines',
    period: '2020 - 2022',
    type: 'work',
    description: [
      'Developed feature-rich web applications supporting active users and real-time interactions',
      'Built and optimized reusable UI components to improve development speed',
      'Reduced application load time through performance optimization and efficient data fetching',
      'Assisted in migrating legacy CSS to modern frameworks for better maintainability'
    ],
    technologies: ['JavaScript', 'jQuery', 'PHP', 'MySQL', 'Bootstrap']
  },
  {
    id: 'xavier-education',
    title: 'BS in Computer Science',
    company: 'Xavier University - Ateneo de Cagayan',
    location: 'Cagayan de Oro, Philippines',
    period: 'Graduated 2020',
    type: 'education',
    description: [
      'Completed comprehensive computer science curriculum with focus on software development',
      'Gained expertise in programming fundamentals, data structures, and algorithms',
      'Developed strong problem-solving skills and software engineering principles',
      'Participated in various programming projects and collaborative development initiatives'
    ],
    technologies: ['Java', 'C++', 'Python', 'Database Design', 'Software Engineering']
  }
]; 