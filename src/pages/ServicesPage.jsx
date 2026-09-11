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
      case 'FiMonitor': return <FiMonitor className="w-8 h-8 text-primary" />;
      case 'FiSmartphone': return <FiSmartphone className="w-8 h-8 text-primary" />;
      case 'FiPenTool': return <FiPenTool className="w-8 h-8 text-primary" />;
      case 'FiCloud': return <FiCloud className="w-8 h-8 text-primary" />;
      case 'FiCpu': return <FiCpu className="w-8 h-8 text-primary" />;
      case 'FiSettings': return <FiSettings className="w-8 h-8 text-primary" />;
      default: return <FiMonitor className="w-8 h-8 text-primary" />;
    }
  };

  const processSteps = [
    { title: "Discovery", desc: "Understanding your needs and business goals." },
    { title: "Planning", desc: "Creating a roadmap and architecture design." },
    { title: "Execution", desc: "Agile development with regular updates." },
    { title: "Delivery", desc: "Testing, deployment, and ongoing support." }
  ];

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
            Our <span className="text-primary">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-inter"
          >
            Comprehensive digital solutions tailored to elevate your business. We combine cutting-edge technology with elegant design.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {React.cloneElement(getIcon(service.icon), {
                    className: "w-8 h-8 text-primary group-hover:text-white transition-colors"
                  })}
                </div>
                <h3 className="text-2xl font-space font-bold text-secondary mb-4">{service.title}</h3>
                <p className="text-gray-600 font-inter mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features && service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-inter text-gray-700">
                      <FiCheckCircle className="text-primary mt-1 shrink-0" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-space font-bold text-secondary mb-4">How We Work</h2>
            <p className="text-gray-600 font-inter">A transparent and collaborative process from start to finish.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center relative z-10"
              >
                <div className="w-16 h-16 bg-white border-4 border-primary text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-space font-bold text-secondary mb-3">{step.title}</h3>
                <p className="text-gray-600 font-inter text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-space font-bold mb-6">Need a custom solution?</h2>
          <p className="text-blue-100 font-inter mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your specific requirements and see how we can help.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors shadow-lg">
            Get in Touch <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
