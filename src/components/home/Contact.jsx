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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (addMessage) {
      addMessage({ ...formData, date: new Date().toISOString() });
    }
    
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-white/50 backdrop-blur-sm relative">
      <Toaster position="bottom-right" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-[#1A2B4A] mb-6">Let's Build Something Great Together</h2>
            <p className="text-gray-600 mb-10 text-lg">Ready to transform your ideas into reality? Get in touch with us and let's start the conversation.</p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#F8FAFF] flex items-center justify-center text-[#0066FF] flex-shrink-0">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2B4A] text-lg">Email Us</h4>
                  <p className="text-gray-600">{company.email || 'hello@codevia.com'}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#F8FAFF] flex items-center justify-center text-[#0066FF] flex-shrink-0">
                  <FiPhone className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2B4A] text-lg">Call Us</h4>
                  <p className="text-gray-600">{company.phone || '+1 (555) 123-4567'}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#F8FAFF] flex items-center justify-center text-[#0066FF] flex-shrink-0">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2B4A] text-lg">Visit Us</h4>
                  <p className="text-gray-600 max-w-xs">{company.address || '123 Innovation Drive, Tech City, TC 10101'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1A2B4A] mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFF] border-none focus:ring-2 focus:ring-[#0066FF] outline-none transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A2B4A] mb-2">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8FAFF] border-none focus:ring-2 focus:ring-[#0066FF] outline-none transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#1A2B4A] mb-2">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFF] border-none focus:ring-2 focus:ring-[#0066FF] outline-none transition-shadow"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[#1A2B4A] mb-2">Message</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFF] border-none focus:ring-2 focus:ring-[#0066FF] outline-none transition-shadow resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#0066FF] to-[#00B4D8] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#0066FF]/30 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
