import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const Testimonials = () => {
  const { data } = useData();
  const testimonials = data?.testimonials || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [testimonials.length, isHovered]);

  if (!testimonials || testimonials.length === 0) return null;

  const activeTestimonial = testimonials[currentIndex] || {};
  const quoteText = activeTestimonial.content || activeTestimonial.text || activeTestimonial.quote || '';
  const authorName = activeTestimonial.name || activeTestimonial.author || 'Client';
  const roleName = activeTestimonial.role || 'Partner';
  const companyName = activeTestimonial.company || 'Univo Client';
  const avatarUrl = activeTestimonial.avatar || activeTestimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0044DD&color=fff`;

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#081830] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0044DD] rounded-full filter blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00BBDD] rounded-full filter blur-[100px] opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space mb-3 sm:mb-4">
            Client Success Stories
          </h2>
          <p className="text-blue-200 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Don't just take our word for it. Hear what our partners have to say.
          </p>
        </div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative min-h-[260px] sm:min-h-[230px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center w-full px-2"
              >
                <div className="flex space-x-1 text-yellow-400 mb-4 sm:mb-6">
                  {[...Array(activeTestimonial.rating || 5)].map((_, i) => (
                    <FiStar key={i} className="fill-current text-sm sm:text-base" />
                  ))}
                </div>
                <p className="text-base sm:text-lg md:text-xl font-light italic text-blue-50 mb-6 sm:mb-8 max-w-3xl leading-relaxed">
                  "{quoteText}"
                </p>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <img 
                    src={avatarUrl} 
                    alt={authorName} 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#00BBDD] object-cover shrink-0"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-sm sm:text-base">{authorName}</h4>
                    <p className="text-xs sm:text-sm text-blue-300">{roleName} @ {companyName}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-[#00BBDD] w-6 sm:w-8' : 'bg-white/30 hover:bg-white/50 w-2.5 sm:w-3'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
