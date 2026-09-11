import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiPython, SiDocker, 
  SiTypescript, SiNextdotjs, SiFlutter, SiPostgresql, 
  SiRedis, SiKubernetes 
} from 'react-icons/si';
import { FiCloud } from 'react-icons/fi'; // Used for AWS as requested

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
  FiCloud // Fallback/AWS
};

const TechStack = () => {
  const { data } = useData();
  const techStack = data?.techStack || [];

  return (
    <section id="tech-stack" className="py-24 bg-white/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-[#1A2B4A] mb-4">Technologies We Master</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We use the latest and most robust technologies to build scalable solutions.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {techStack.map((tech, idx) => {
            const IconComponent = iconMap[tech.icon] || FiCloud;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col items-center justify-center p-6 bg-[#F8FAFF] rounded-2xl hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-[#0066FF]/20 group relative z-10"
              >
                <div className="text-4xl text-gray-400 group-hover:text-[#0066FF] transition-colors mb-3">
                  <IconComponent />
                </div>
                <span className="font-semibold text-[#1A2B4A] text-sm">{tech.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
