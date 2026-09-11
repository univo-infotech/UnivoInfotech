import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiPlus, FiMinus } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const { data, addMessage } = useData();
  const company = data?.company || {};
  const faqs = data?.faqs || [
    { question: "How long does a typical project take?", answer: "Project timelines vary depending on scope and complexity. Small to medium web apps typically take 4-8 weeks, while larger enterprise solutions may take 3-6 months." },
    { question: "What technologies do you specialize in?", answer: "We specialize in React, Node.js, Next.js, Python, Flutter, cloud architectures (Firebase, AWS), and modern scalable web applications." },
    { question: "Do you provide post-launch support?", answer: "Yes, we offer ongoing maintenance, monitoring, and support packages to ensure your application runs smoothly and securely." },
    { question: "How do we get started?", answer: "Simply fill out our contact form or reach out directly. We will schedule a free discovery call to discuss your requirements and provide an estimate." }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (addMessage) {
        await addMessage(formData);
      }
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

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
            Get in <span className="bg-gradient-to-r from-[#0044DD] to-[#00BBDD] bg-clip-text text-transparent">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 font-inter px-2"
          >
            Have a question or want to discuss a project? We'd love to hear from you. Fill out the form below or reach out directly.
          </motion.p>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-gray-50/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-12 sm:mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3 sm:mb-4 text-primary">
                <FiMapPin size={22} />
              </div>
              <h3 className="text-lg sm:text-xl font-space font-bold text-secondary mb-1 sm:mb-2">Visit Us</h3>
              <p className="text-gray-600 font-inter text-xs sm:text-sm">{company.address || 'Tech Hub, Sector 62, Noida, UP, India'}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3 sm:mb-4 text-primary">
                <FiPhone size={22} />
              </div>
              <h3 className="text-lg sm:text-xl font-space font-bold text-secondary mb-1 sm:mb-2">Call Us</h3>
              <p className="text-gray-600 font-inter text-xs sm:text-sm">{company.phone || '+91 98765 43210'}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center sm:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3 sm:mb-4 text-primary">
                <FiMail size={22} />
              </div>
              <h3 className="text-lg sm:text-xl font-space font-bold text-secondary mb-1 sm:mb-2">Email Us</h3>
              <p className="text-gray-600 font-inter text-xs sm:text-sm break-all">{company.email || 'univoinfotech@gmail.com'}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="text-xl sm:text-2xl font-space font-bold text-secondary mb-5 sm:mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 font-inter">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0044DD] focus:border-transparent outline-none transition-all font-inter text-sm text-gray-800"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 font-inter">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0044DD] focus:border-transparent outline-none transition-all font-inter text-sm text-gray-800"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 font-inter">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0044DD] focus:border-transparent outline-none transition-all font-inter text-sm text-gray-800"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 font-inter">Message</label>
                  <textarea 
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0044DD] focus:border-transparent outline-none transition-all font-inter text-sm text-gray-800 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white font-medium rounded-xl hover:opacity-95 transition-opacity shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* FAQs */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-space font-bold text-secondary mb-5 sm:mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3 sm:space-y-4">
                  {faqs.map((faq, idx) => (
                    <div 
                      key={idx}
                      className="border border-gray-100 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 text-left font-space font-semibold text-secondary flex items-center justify-between gap-3 text-sm sm:text-base hover:bg-gray-50/80 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <span className="text-primary shrink-0">
                          {activeFaq === idx ? <FiMinus size={18} /> : <FiPlus size={18} />}
                        </span>
                      </button>
                      {activeFaq === idx && (
                        <div className="p-4 pt-0 font-inter text-xs sm:text-sm text-gray-600 border-t border-gray-50 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 sm:p-6 bg-blue-50/60 rounded-2xl border border-blue-100/50">
                <h4 className="font-space font-bold text-secondary text-sm sm:text-base mb-1">Need immediate assistance?</h4>
                <p className="font-inter text-xs sm:text-sm text-gray-600 mb-3">Reach us directly via email or call our direct office support number.</p>
                <a 
                  href={`mailto:${company.email || 'univoinfotech@gmail.com'}`}
                  className="text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors break-all"
                >
                  {company.email || 'univoinfotech@gmail.com'} →
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
