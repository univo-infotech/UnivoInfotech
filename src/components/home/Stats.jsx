import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useData } from '../../context/DataContext';

const Counter = ({ targetNumber = 0, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    let animationFrameId;
    let startTime;
    const duration = 2000;
    const endValue = Number(targetNumber) || 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentCount = Math.floor(endValue * (1 - Math.pow(1 - percentage, 3))); // easeOutCubic
      
      setCount(currentCount);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetNumber, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stats = () => {
  const { data } = useData();
  const stats = data?.stats || [];

  return (
    <section id="stats" className="py-12 sm:py-20 bg-white relative z-20 -mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            let num = stat?.number;
            let suf = stat?.suffix;
            if (num === undefined && stat?.value) {
              const valStr = String(stat.value);
              num = parseInt(valStr.replace(/[^0-9]/g, '')) || 0;
              suf = valStr.replace(/[0-9]/g, '') || '';
            }
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 text-center shadow-lg hover:shadow-xl transition-shadow relative z-10"
              >
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-[#0044DD] to-[#00BBDD] mb-1 sm:mb-2">
                  <Counter targetNumber={num || 0} suffix={suf || '+'} />
                </h3>
                <p className="text-[#081830] font-semibold text-xs sm:text-base">{stat?.label || ''}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
