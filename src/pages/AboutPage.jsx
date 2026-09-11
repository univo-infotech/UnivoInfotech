import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FiTarget, FiEye, FiHeart, FiAward, FiArrowRight, FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const AboutPage = () => {
  const { data } = useData();
  const aboutData = data?.about || {};
  const stats = data?.stats || [];
  const team = data?.team || [];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const getIcon = (name) => {
    if (name.includes('Target') || name.includes('Innovation')) return <FiTarget className="w-8 h-8 text-primary" />;
    if (name.includes('Eye') || name.includes('Vision')) return <FiEye className="w-8 h-8 text-primary" />;
    if (name.includes('Heart') || name.includes('Empathy')) return <FiHeart className="w-8 h-8 text-primary" />;
    return <FiAward className="w-8 h-8 text-primary" />;
  };

  return (
    <div className="pt-24 min-h-screen bg-transparent relative z-10">
      {/* Hero Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-space font-bold text-secondary mb-6">
              Our <span className="text-primary">Story</span>
            </h1>
            <p className="text-lg text-gray-600 font-inter leading-relaxed">
              {aboutData.story}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50/40 backdrop-blur-sm" ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <FiTarget className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-space font-bold text-secondary mb-4">Our Mission</h2>
              <p className="text-gray-600 font-inter leading-relaxed">
                {aboutData.mission}
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <FiEye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-space font-bold text-secondary mb-4">Our Vision</h2>
              <p className="text-gray-600 font-inter leading-relaxed">
                {aboutData.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.id || idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6"
              >
                <div className="text-4xl md:text-5xl font-space font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 font-inter text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-space font-bold text-secondary mb-4">Core Values</h2>
            <p className="text-gray-600 font-inter">The principles that guide our every decision and line of code.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.values && aboutData.values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="mb-6">{getIcon(value.title)}</div>
                <h3 className="text-xl font-space font-bold text-secondary mb-3">{value.title}</h3>
                <p className="text-gray-600 font-inter text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-space font-bold text-secondary mb-4">Meet the Team</h2>
            <p className="text-gray-600 font-inter">The talented people behind our successful projects.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <motion.div 
                key={member.id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
              >
                <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-space text-2xl">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-space font-bold text-secondary mb-1">{member.name}</h3>
                  <p className="text-primary font-inter text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-gray-500 font-inter text-sm mb-6 line-clamp-2">{member.bio}</p>
                  
                  <div className="flex justify-center gap-4 text-gray-400">
                    {member.social && Object.entries(member.social).map(([platform, url]) => {
                      if (!url) return null;
                      let Icon = null;
                      if (platform === 'linkedin') Icon = FiLinkedin;
                      if (platform === 'twitter') Icon = FiTwitter;
                      if (platform === 'github') Icon = FiGithub;
                      return Icon ? (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          <Icon size={18} />
                        </a>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-secondary to-blue-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-space font-bold mb-6">Ready to work with us?</h2>
              <p className="text-gray-300 font-inter mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help your business grow through technology.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-primary/30">
                Start a Project <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
