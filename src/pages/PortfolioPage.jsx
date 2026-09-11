import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const PortfolioPage = () => {
  const { data } = useData();
  const portfolio = data?.portfolio || [];
  
  // Extract unique categories
  const categories = ['All', ...new Set(portfolio.map(p => p?.category).filter(Boolean))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? portfolio 
    : portfolio.filter(p => p?.category === activeCategory);

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 min-h-screen bg-transparent relative z-10">
      {/* Header */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-space font-bold text-secondary mb-4 sm:mb-6"
          >
            Our <span className="bg-gradient-to-r from-[#0044DD] to-[#00BBDD] bg-clip-text text-transparent">Work</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 font-inter px-2"
          >
            A showcase of our recent projects. We take pride in building scalable and beautiful digital experiences.
          </motion.p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-6 sm:py-8 bg-gray-50/70 border-b border-gray-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full font-inter text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id || idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                    <img 
                      src={project.image} 
                      alt={project.title || 'Project'} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                          aria-label="View Project"
                        >
                          <FiExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                        {project.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-space font-bold text-secondary mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 font-inter text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {project.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                        {project.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-inter">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-secondary via-[#0044DD] to-[#00BBDD] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold mb-3 sm:mb-4">Want a similar solution?</h2>
            <p className="text-gray-200 font-inter mb-6 sm:mb-8 text-sm sm:text-base max-w-xl mx-auto">
              We specialize in turning unique problems into elegant software solutions.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0044DD] font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-sm sm:text-base">
              Start Your Project <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
