import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMonitor, FiSmartphone, FiPenTool, FiCloud, FiCpu, FiSettings, FiCode } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const iconMap = {
  FiMonitor,
  FiSmartphone,
  FiPenTool,
  FiCloud,
  FiCpu,
  FiSettings,
};

const Services = () => {
  const { data } = useData();
  const services = data?.services || [];

  return (
    <section id="services" className="py-24 bg-[#F8FAFF]/40 backdrop-blur-sm relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-[#1A2B4A] mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive digital solutions tailored to elevate your brand and drive measurable growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FiCode;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 z-10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066FF] to-[#00B4D8] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-14 h-14 rounded-xl bg-[#F8FAFF] flex items-center justify-center text-[#0066FF] text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold text-[#1A2B4A] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <Link to="/services" className="inline-flex items-center text-[#0066FF] font-semibold hover:text-[#00B4D8] transition-colors">
                  Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
