import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const BlogPage = () => {
  const { data } = useData();
  const blogPosts = data?.blog || [];

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
            Our <span className="text-primary">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-inter"
          >
            Insights, thoughts, and trends on technology, design, and business.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={post.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group cursor-pointer"
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
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-inter mb-4">
                    <span className="flex items-center gap-1"><FiCalendar /> {post.date}</span>
                    <span className="flex items-center gap-1"><FiClock /> {post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-space font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 font-inter text-sm mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                      <FiUser className="text-primary" /> {post.author}
                    </div>
                    <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Read <FiArrowRight />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No blog posts available at the moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
