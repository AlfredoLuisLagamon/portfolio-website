import React from 'react';
import { experienceData } from '../data/experience';

const ExperienceSection: React.FC = () => {


  // Filter out education entries - only show work experience
  const workExperience = experienceData.filter(item => item.type === 'work');

  const getExperienceBullets = (id: string) => {
    switch (id) {
      case 'restore-masters-2025':
        return [
          'Building a real-time messaging app using React and Next.js',
          'Implementing WebSocket connections for instant message delivery',
          'Creating responsive chat interfaces that work on mobile and desktop',
          'Setting up user authentication and message encryption',
          'Building message history and search functionality'
        ];
      case 'ustp-programmer-1':
        return [
          'Developed websites using Vue.js and React frameworks',
          'Improved page loading speeds and mobile responsiveness',
          'Created user-friendly interfaces and interactive components',
          'Worked with databases to display dynamic content',
          'Collaborated with team members on various web projects'
        ];
      case 'ustp-programmer-2':
        return [
          'Built web applications supporting multiple active users',
          'Created reusable components to speed up development',
          'Helped modernize older websites with updated code',
          'Implemented features for better user experience',
          'Assisted in testing and debugging applications'
        ];
      default:
        return [];
    }
  };

  return (
    <section className="py-4 md:py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting Timeline Line */}
          <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
          
          {workExperience.map((experience, index) => (
            <div
              key={experience.id}
              className="relative pb-12 last:pb-0"
            >
              {/* Timeline Dot - Centered on the line */}
              <div className="absolute left-[17px] top-6 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-blue-500 rounded-full z-10"></div>
              
              {/* Content */}
              <div className="ml-16">
                {/* Company Name */}
                <p className="text-secondary font-medium mb-1">{experience.company}</p>
                
                {/* Job Title */}
                <h3 className="text-xl font-bold text-primary mb-2">{experience.title}</h3>
                
                {/* Date */}
                <p className="text-secondary text-sm mb-4">{experience.period}</p>
                
                {/* Achievements */}
                <div className="space-y-2">
                  {getExperienceBullets(experience.id).map((bullet, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 group"
                    >
                      {/* Bullet Dot */}
                      <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      {/* Bullet Text */}
                      <p className="text-secondary leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 