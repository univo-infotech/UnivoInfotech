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
    <section id="portfolio" className="py-24 bg-[#F8FAFF]/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-[#1A2B4A] mb-4"
          >
            Featured Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            A showcase of our recent projects and digital innovations.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${filter === cat ? 'bg-[#0066FF] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project?.id || index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 relative z-10"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={project?.image} alt={project?.title || 'Project'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href={project?.link || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0066FF] hover:bg-[#00B4D8] hover:text-white transition-colors">
                      <FiExternalLink className="text-xl" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm font-semibold text-[#00B4D8] uppercase tracking-wider">{project?.category || 'Project'}</span>
                  <h3 className="text-xl font-bold text-[#1A2B4A] mt-2 mb-2">{project?.title || ''}</h3>
                  <p className="text-gray-600 line-clamp-2">{project?.description || ''}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-16">
          <Link to="/portfolio" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1A2B4A] font-semibold rounded-full shadow-lg border border-gray-200 hover:border-[#0066FF] hover:text-[#0066FF] transition-all duration-300">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
