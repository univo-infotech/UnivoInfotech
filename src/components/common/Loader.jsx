import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ loading = true }) => {
  const [text, setText] = useState('');
  const fullText = 'Loading...';

  useEffect(() => {
    if (!loading) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute w-24 h-24 rounded-full border-4 border-t-[#0066FF] border-r-[#00B4D8] border-b-transparent border-l-transparent opacity-70"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 z-10 p-2"
            >
              <img src="/logo.png" alt="CodeVia" className="w-12 h-12 object-contain" />
            </motion.div>
          </div>
          
          <div className="h-6">
            <span className="font-space-grotesk font-medium text-slate-800 tracking-wider">
              {text}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
