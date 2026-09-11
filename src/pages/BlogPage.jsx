import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const BlogPage = () => {
  const { data } = useData();
  const blogPosts = data?.blog || [];

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
            Our <span className="bg-gradient-to-r from-[#0044DD] to-[#00BBDD] bg-clip-text text-transparent">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 font-inter px-2"
          >
            Insights, thoughts, and trends on technology, design, and business.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={post.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[16/10] bg-gray-200 relative overflow-hidden">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-400 font-inter mb-3">
                      <span className="flex items-center gap-1">
                        <FiCalendar /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-space font-bold text-secondary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 font-inter text-xs sm:text-sm line-clamp-3 mb-5 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary text-xs font-bold">
                        <FiUser />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700 font-inter">
                        {post.author}
                      </span>
                    </div>

                    <span className="text-primary font-inter text-xs sm:text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read More <FiArrowRight />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
