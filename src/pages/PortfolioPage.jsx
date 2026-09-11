import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const PortfolioPage = () => {
  const { data } = useData();
  const portfolio = data?.portfolio || [];
  
  // Extract unique categories
  const categories = ['All', ...new Set(portfolio.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? portfolio 
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen bg-transparent relative z-10">
      {/* Header */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-space font-bold text-secondary mb-6"
          >
            Our <span className="text-primary">Work</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-inter"
          >
            A showcase of our recent projects. We take pride in building scalable and beautiful digital experiences.
          </motion.p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-inter text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
                >
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:scale-110 transition-transform">
                          <FiExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-space font-bold text-secondary mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 font-inter text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies && project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-space font-bold text-secondary mb-6">Have a project in mind?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow">
            Start a Conversation <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
