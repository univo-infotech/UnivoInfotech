import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const Portfolio = () => {
  const { data } = useData();
  const projects = data?.portfolio || [];
  const [filter, setFilter] = useState('All');

  // Dynamically build categories safely
  const categories = ['All', ...new Set(projects.map(p => p?.category).filter(Boolean))];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p?.category === filter);
  const displayProjects = filteredProjects.slice(0, 6);

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-[#EFF7FF]/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-[#081830] mb-3 sm:mb-4"
          >
            Featured Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2"
          >
            A showcase of our recent projects and digital innovations.
          </motion.p>
        </div>

        {/* Filter Pills - scrollable/wrap on mobile */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                filter === cat 
                  ? 'bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {displayProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project?.id || index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative z-10 flex flex-col"
              >
                <div className="relative h-52 sm:h-60 md:h-64 overflow-hidden">
                  <img 
                    src={project?.image} 
                    alt={project?.title || 'Project'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href={project?.link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-[#0044DD] hover:bg-[#00BBDD] hover:text-white transition-colors"
                      aria-label="View Project Link"
                    >
                      <FiExternalLink className="text-lg sm:text-xl" />
                    </a>
                  </div>
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#00BBDD] uppercase tracking-wider">
                      {project?.category || 'Project'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#081830] mt-1 mb-2 line-clamp-1">
                      {project?.title || ''}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project?.description || ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Link */}
        <div className="text-center mt-10 sm:mt-16">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#081830] font-semibold rounded-full shadow-md border border-gray-200 hover:border-[#0044DD] hover:text-[#0044DD] transition-all duration-300 text-sm sm:text-base"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
