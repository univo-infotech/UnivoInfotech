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
  const companyName = activeTestimonial.company || 'CodeVia Client';
  const avatarUrl = activeTestimonial.avatar || activeTestimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0066FF&color=fff`;

  return (
    <section id="testimonials" className="py-24 bg-[#1A2B4A] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF] rounded-full filter blur-[100px] opacity-30" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00B4D8] rounded-full filter blur-[100px] opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">Client Success Stories</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">Don't just take our word for it. Hear what our partners have to say.</p>
        </div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center w-full"
              >
                <div className="flex space-x-1 text-yellow-400 mb-6">
                  {[...Array(activeTestimonial.rating || 5)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                </div>
                <p className="text-xl md:text-2xl font-light italic text-blue-50 mb-8 max-w-3xl leading-relaxed">
                  "{quoteText}"
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={avatarUrl} 
                    alt={authorName} 
                    className="w-14 h-14 rounded-full border-2 border-[#00B4D8] object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-lg">{authorName}</h4>
                    <p className="text-sm text-blue-300">{roleName} @ {companyName}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-[#00B4D8] w-8' : 'bg-white/30 hover:bg-white/50 w-3'}`}
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
