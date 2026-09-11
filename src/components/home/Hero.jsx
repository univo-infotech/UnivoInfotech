import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const Hero = () => {
  const { data } = useData();
  const heroData = data?.hero || { title: '', subtitle: '', ctaPrimary: '', ctaSecondary: '' };
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: x - 0.5, y: y - 0.5 });
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/60 to-[#F8FAFF]/60">
      {/* Background Shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#0066FF] mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: mousePosition.x * -50, y: mousePosition.y * -50 }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[#00B4D8] mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ x: mousePosition.x * 50, y: mousePosition.y * 50 }}
      />

      <div className="container mx-auto px-6 py-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-left"
        >
          <motion.div variants={item} className="mb-4 inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 border border-[#0066FF]/20 shadow-sm relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse" />
            <span className="text-sm font-semibold text-[#1A2B4A]">Innovating the Future</span>
          </motion.div>
          
          <motion.h1 variants={item} className="text-5xl lg:text-7xl font-bold font-['Space_Grotesk'] leading-tight text-[#1A2B4A] mb-6">
            {heroData.title}
          </motion.h1>
          
          <motion.p variants={item} className="text-lg text-gray-600 mb-8 max-w-xl font-['Inter']">
            {heroData.subtitle}
          </motion.p>
          
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Link to="/contact" className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#00B4D8] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-300">
              {heroData?.ctaPrimary || heroData?.cta?.primary || 'Start Your Project'}
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio" className="flex items-center justify-center px-8 py-4 bg-white text-[#1A2B4A] font-semibold rounded-full shadow-lg border border-gray-100 hover:border-[#00B4D8]/30 hover:shadow-xl transition-all duration-300">
              {heroData?.ctaSecondary || heroData?.cta?.secondary || 'View Our Work'}
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex items-center space-x-6 text-sm text-gray-500 font-semibold">
            <div className="flex items-center"><FiCheckCircle className="text-[#00B4D8] mr-2" /> No hidden fees</div>
            <div className="flex items-center"><FiCheckCircle className="text-[#00B4D8] mr-2" /> Dedicated support</div>
            <div className="flex items-center"><FiCheckCircle className="text-[#00B4D8] mr-2" /> Fast delivery</div>
          </motion.div>
        </motion.div>

        {/* Right side Visuals */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/20 to-[#00B4D8]/20 rounded-3xl transform rotate-3 scale-105" />
          <div className="relative bg-[#1A2B4A] rounded-2xl p-6 shadow-2xl border border-white/10 overflow-hidden text-white font-mono text-sm">
            <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-2 opacity-80">
              <p><span className="text-pink-400">const</span> <span className="text-blue-400">vision</span> <span className="text-pink-400">=</span> <span className="text-green-400">'limitless'</span>;</p>
              <p><span className="text-pink-400">function</span> <span className="text-blue-400">buildFuture</span>() {'{'}</p>
              <p className="pl-4"><span className="text-pink-400">return</span> <span className="text-yellow-400">new</span> <span className="text-blue-400">Masterpiece</span>(vision);</p>
              <p>{'}'}</p>
              <p><span className="text-blue-400">buildFuture</span>();</p>
            </div>
          </div>
          
          <motion.div 
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-4 z-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              ))}
            </div>
            <div>
              <p className="text-[#1A2B4A] font-bold text-sm">Trusted by</p>
              <p className="text-gray-500 text-xs">500+ Clients</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
