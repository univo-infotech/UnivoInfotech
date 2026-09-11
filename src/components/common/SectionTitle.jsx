import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionTitle = ({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`flex flex-col mb-12 ${alignStyles[align]} max-w-3xl`}
    >
      {subtitle && (
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
          <span className={`h-px w-8 ${light ? 'bg-white/50' : 'bg-[#0066FF]'}`}></span>
          <span className={`text-sm font-bold uppercase tracking-widest ${light ? 'text-white' : 'text-[#0066FF]'}`}>
            {subtitle}
          </span>
        </motion.div>
      )}
      
      <motion.h2 
        variants={itemVariants}
        className={`font-space-grotesk text-3xl md:text-5xl font-bold mb-6 leading-tight ${light ? 'text-white' : 'text-slate-900'}`}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          variants={itemVariants}
          className={`font-inter text-lg ${light ? 'text-slate-300' : 'text-slate-600'} ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
