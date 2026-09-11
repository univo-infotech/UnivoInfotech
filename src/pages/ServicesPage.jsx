import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMonitor, FiSmartphone, FiPenTool, FiCloud, FiCpu, FiSettings, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const ServicesPage = () => {
  const { data } = useData();
  const services = data?.services || [];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FiMonitor': return <FiMonitor className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
      case 'FiSmartphone': return <FiSmartphone className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
      case 'FiPenTool': return <FiPenTool className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
      case 'FiCloud': return <FiCloud className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
      case 'FiCpu': return <FiCpu className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
      case 'FiSettings': return <FiSettings className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
      default: return <FiMonitor className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
    }
  };

  const processSteps = [
    { title: "Discovery", desc: "Understanding your needs and business goals." },
    { title: "Planning", desc: "Creating a roadmap and architecture design." },
    { title: "Execution", desc: "Agile development with regular updates." },
    { title: "Delivery", desc: "Testing, deployment, and ongoing support." }
  ];

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
            Our <span className="bg-gradient-to-r from-[#0044DD] to-[#00BBDD] bg-clip-text text-transparent">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 font-inter px-2"
          >
            Comprehensive digital solutions tailored to elevate your business. We combine cutting-edge technology with elegant design.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-space font-bold text-secondary mb-3">{service.title}</h3>
                  <p className="text-gray-600 font-inter text-xs sm:text-sm leading-relaxed mb-5">{service.description}</p>
                  
                  {service.features && (
                    <ul className="space-y-2 mb-6 border-t border-gray-100 pt-4">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center text-xs sm:text-sm text-gray-600 font-inter">
                          <FiCheckCircle className="text-[#22DD88] mr-2 shrink-0 text-sm" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link to="/contact" className="inline-flex items-center text-primary font-inter font-medium text-xs sm:text-sm hover:text-accent transition-colors pt-2">
                  Get Started <FiArrowRight className="ml-1.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-secondary mb-3 sm:mb-4">How We Work</h2>
            <p className="text-gray-600 font-inter text-sm sm:text-base px-2">Our proven process ensures your project is delivered on time, within budget, and to the highest standard.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative p-6 sm:p-8 bg-gray-50/80 rounded-2xl border border-gray-100">
                <div className="text-3xl sm:text-4xl font-space font-bold bg-gradient-to-r from-[#0044DD] to-[#00BBDD] bg-clip-text text-transparent mb-3 sm:mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-space font-bold text-secondary mb-2">{step.title}</h3>
                <p className="text-gray-600 font-inter text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-secondary via-[#0044DD] to-[#00BBDD] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold mb-3 sm:mb-4">Have a project in mind?</h2>
            <p className="text-gray-200 font-inter mb-6 sm:mb-8 text-sm sm:text-base max-w-xl mx-auto">
              Let's turn your concept into a high-impact digital reality.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0044DD] font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-sm sm:text-base">
              Contact Us Today <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
