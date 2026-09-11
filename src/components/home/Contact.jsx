import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useData } from '../../context/DataContext';

const Contact = () => {
  const { data, addMessage } = useData();
  const company = data?.company || {};
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (addMessage) addMessage({ ...formData, date: new Date().toISOString() });
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactItems = [
    { icon: <FiMail className="text-lg" />, title: 'Email Us', value: company.email || 'univoinfotech@gmail.com' },
    { icon: <FiPhone className="text-lg" />, title: 'Call Us', value: company.phone || '+91 98765 43210' },
    { icon: <FiMapPin className="text-lg" />, title: 'Visit Us', value: company.address || 'Tech Hub, Sector 62, Noida, UP' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white/50 backdrop-blur-sm relative">
      <Toaster position="bottom-right" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-[#081830] mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto px-2">
            Ready to transform your ideas into reality? Let's start the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-5 sm:space-y-6">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#EFF7FF] flex items-center justify-center text-[#0044DD] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#081830] text-base sm:text-lg">{item.title}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#081830] mb-2">Your Name</label>
                  <input type="text" required value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#EFF7FF] border-none focus:ring-2 focus:ring-[#0044DD] outline-none text-sm sm:text-base"
                    placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#081830] mb-2">Your Email</label>
                  <input type="email" required value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#EFF7FF] border-none focus:ring-2 focus:ring-[#0044DD] outline-none text-sm sm:text-base"
                    placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#081830] mb-2">Subject</label>
                <input type="text" required value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#EFF7FF] border-none focus:ring-2 focus:ring-[#0044DD] outline-none text-sm sm:text-base"
                  placeholder="Project Inquiry" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#081830] mb-2">Message</label>
                <textarea required rows="4" value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#EFF7FF] border-none focus:ring-2 focus:ring-[#0044DD] outline-none resize-none text-sm sm:text-base"
                  placeholder="Tell us about your project..." />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#0044DD]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm sm:text-base">
                {isSubmitting ? <span className="animate-pulse">Sending...</span> : <><span>Send Message</span><FiSend /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
