import React from 'react';
import { experienceData } from '../data/experience';

const ExperienceSection: React.FC = () => {
  const workExperience = experienceData.filter((item) => item.type === 'work');

  return (
    <section id="experience" className="py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-page mx-auto mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Experience</h2>
        </div>

        <div className="relative max-w-page mx-auto">
          <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

          {workExperience.map((experience) => (
            <div key={experience.id} className="relative pb-12 last:pb-0">
              <div className="absolute left-[17px] top-6 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-blue-500 rounded-full z-10"></div>

              <div className="ml-16">
                <p className="text-secondary font-medium mb-1">{experience.company}</p>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{experience.title}</h3>
                <p className="text-secondary text-sm mb-4">{experience.period}</p>

                <div className="space-y-2">
                  {experience.description.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 group">
                      <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2.5 flex-shrink-0"></div>
                      <p className="text-secondary leading-relaxed">{bullet}</p>
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
