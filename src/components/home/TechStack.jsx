import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiPython, SiDocker, 
  SiTypescript, SiNextdotjs, SiFlutter, SiPostgresql, 
  SiRedis, SiKubernetes 
} from 'react-icons/si';
import { FiCloud } from 'react-icons/fi';

const iconMap = {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiDocker,
  SiTypescript,
  SiNextdotjs,
  SiFlutter,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  FiCloud
};

const TechStack = () => {
  const { data } = useData();
  const techStack = data?.techStack || [];

  return (
    <section id="tech-stack" className="py-16 sm:py-24 bg-white/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-[#081830] mb-3 sm:mb-4">
            Technologies We Master
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
            We use the latest and most robust technologies to build scalable solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {techStack.map((tech, idx) => {
            const IconComponent = iconMap[tech.icon] || FiCloud;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="flex flex-col items-center justify-center p-4 sm:p-6 bg-[#EFF7FF]/70 rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-[#0044DD]/20 group relative z-10"
              >
                <div className="text-3xl sm:text-4xl text-gray-400 group-hover:text-[#0044DD] transition-colors mb-2 sm:mb-3">
                  <IconComponent />
                </div>
                <span className="font-semibold text-[#081830] text-xs sm:text-sm text-center">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
