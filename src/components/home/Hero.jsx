import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const Hero = () => {
  const { data } = useData();
  const rawHeroData = data?.hero || {};
  
  // Clean any old cached CodeVia strings seamlessly
  const heroTitle = (rawHeroData.title || 'We Build Digital Solutions That Drive Growth').replace(/CodeVia/g, 'Univo Infotech');
  const heroSubtitle = (rawHeroData.subtitle || 'Univo Infotech transforms your ideas into powerful, scalable software solutions. From web apps to mobile platforms — Ideas | Technology | Growth.').replace(/CodeVia/g, 'Univo Infotech');

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      animationFrameId = requestAnimationFrame(() => setMousePosition({ x: x - 0.5, y: y - 0.5 }));
    };
    const container = containerRef.current;
    if (container) container.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (container) container.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <section id="hero" ref={containerRef} className="relative w-full overflow-hidden bg-gradient-to-br from-white/60 to-[#EFF7FF]/60 pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
      {/* Subtle Background Blobs */}
      <motion.div 
        className="absolute top-10 left-4 sm:left-10 w-36 sm:w-64 h-36 sm:h-64 rounded-full bg-[#0044DD] mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
        animate={{ x: mousePosition.x * -40, y: mousePosition.y * -40 }} 
      />
      <motion.div 
        className="absolute bottom-10 right-4 sm:right-10 w-36 sm:w-72 h-36 sm:h-72 rounded-full bg-[#00BBDD] mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"
        animate={{ x: mousePosition.x * 40, y: mousePosition.y * 40 }} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        
        {/* Left Content */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-left max-w-xl mx-auto lg:mx-0">
          
          {/* Badge */}
          <motion.div variants={item} className="mb-4 inline-flex items-center gap-2 bg-white/90 rounded-full px-3.5 py-1.5 border border-[#0044DD]/20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00BBDD] animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold text-[#081830] tracking-wide">Innovating the Future</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={item} 
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-space text-[#081830] mb-3 sm:mb-5 leading-[1.25] sm:leading-tight"
          >
            {heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={item} 
            className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg"
          >
            {heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5">
            <Link 
              to="/contact"
              className="group flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:shadow-[#0044DD]/20 transition-all duration-300 text-xs sm:text-sm active:scale-98"
            >
              <span>{rawHeroData?.ctaPrimary || 'Start Your Project'}</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/portfolio"
              className="flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-[#081830] font-semibold rounded-xl shadow-xs border border-gray-200 hover:border-[#00BBDD]/40 hover:shadow-md transition-all duration-300 text-xs sm:text-sm active:scale-98"
            >
              <span>{rawHeroData?.ctaSecondary || 'View Our Work'}</span>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div variants={item} className="mt-6 sm:mt-8 flex flex-wrap gap-x-4 gap-y-2 text-[11px] sm:text-xs text-gray-500 font-medium">
            <div className="flex items-center"><FiCheckCircle className="text-[#22DD88] mr-1 shrink-0" />No hidden fees</div>
            <div className="flex items-center"><FiCheckCircle className="text-[#22DD88] mr-1 shrink-0" />Dedicated support</div>
            <div className="flex items-center"><FiCheckCircle className="text-[#22DD88] mr-1 shrink-0" />Fast delivery</div>
          </motion.div>
        </motion.div>

        {/* Right Code Visual & Trusted Badge — NOW FULLY RESPONSIVE ON ALL SCREENS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-4 lg:mt-0 pb-6 sm:pb-4"
        >
          {/* Outer glow background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0044DD]/15 via-[#00BBDD]/20 to-[#22DD88]/15 rounded-3xl transform rotate-1 sm:rotate-2 scale-102 sm:scale-105 pointer-events-none filter blur-xs" />
          
          {/* Main IDE Window */}
          <div className="relative bg-[#081830] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/10 overflow-hidden text-white font-mono text-[11px] sm:text-xs md:text-sm">
            {/* Top Mac-style dots */}
            <div className="flex items-center space-x-2 mb-3.5 sm:mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-gray-400 font-sans ml-2 opacity-60">univo-core.js</span>
            </div>

            {/* Code lines */}
            <div className="space-y-1.5 sm:space-y-2 opacity-90 leading-relaxed">
              <p>
                <span className="text-pink-400">const</span>{' '}
                <span className="text-blue-400">vision</span>{' '}
                <span className="text-pink-400">=</span>{' '}
                <span className="text-green-400">'limitless'</span>;
              </p>
              <p>
                <span className="text-pink-400">function</span>{' '}
                <span className="text-blue-400">buildFuture</span>() {'{'}
              </p>
              <p className="pl-3 sm:pl-4">
                <span className="text-pink-400">return</span>{' '}
                <span className="text-yellow-400">new</span>{' '}
                <span className="text-blue-400">Masterpiece</span>(vision);
              </p>
              <p>{'}'}</p>
              <p className="pt-0.5">
                <span className="text-blue-400">buildFuture</span>();
              </p>
            </div>
          </div>

          {/* Floating 'Trusted by 500+ Clients' badge */}
          <motion.div
            className="absolute -bottom-2 sm:-bottom-4 left-3 sm:-left-4 bg-white/95 backdrop-blur-md p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-2.5 sm:space-x-3 z-20"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="client" 
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover shadow-xs" 
                />
              ))}
            </div>
            <div>
              <p className="text-[#081830] font-bold text-[11px] sm:text-xs leading-none">Trusted by</p>
              <p className="text-gray-500 text-[9px] sm:text-[10px] mt-0.5 font-medium">500+ Clients</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
