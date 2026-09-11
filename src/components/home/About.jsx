import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const About = () => {
  const { data } = useData();
  const about = data?.about || { description: '', values: [] };

  return (
    <section id="about" className="py-24 bg-white/50 backdrop-blur-sm relative overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF] to-[#00B4D8] rounded-3xl transform -rotate-3 scale-105 opacity-20" />
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="About CodeVia" 
            className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full"
          />
          <motion.div 
            className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-bold text-[#1A2B4A] text-lg mb-2">Our Mission</h4>
            <p className="text-gray-600 text-sm">Empowering businesses through cutting-edge technology and innovative design.</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-[#1A2B4A] mb-6">
            Building Digital Excellence Since 2018
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {about.description || 'We are a team of passionate creators, developers, and strategists dedicated to delivering exceptional digital experiences.'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {about.values?.map((value, i) => (
              <div key={i} className="flex items-center space-x-3">
                <FiCheckCircle className="text-[#00B4D8] text-xl flex-shrink-0" />
                <span className="text-[#1A2B4A] font-semibold">{value.title || value}</span>
              </div>
            ))}
          </div>

          <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 bg-[#1A2B4A] text-white font-semibold rounded-full shadow-lg hover:bg-[#0066FF] transition-colors duration-300">
            Discover Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
