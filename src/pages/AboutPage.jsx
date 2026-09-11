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

  const getIcon = (name = '') => {
    if (name.includes('Target') || name.includes('Innovation')) return <FiTarget className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
    if (name.includes('Eye') || name.includes('Vision')) return <FiEye className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
    if (name.includes('Heart') || name.includes('Empathy')) return <FiHeart className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
    return <FiAward className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />;
  };

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 min-h-screen bg-transparent relative z-10">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-space font-bold text-secondary mb-4 sm:mb-6">
              Our <span className="bg-gradient-to-r from-[#0044DD] to-[#00BBDD] bg-clip-text text-transparent">Story</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-inter leading-relaxed px-2">
              {aboutData.story || aboutData.description || 'Transforming ideas into exceptional digital experiences.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50/40 backdrop-blur-sm" ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-12">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                <FiTarget className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-space font-bold text-secondary mb-3">Our Mission</h2>
              <p className="text-gray-600 font-inter text-sm sm:text-base leading-relaxed">
                {aboutData.mission || 'Empowering businesses through cutting-edge technology and innovative design.'}
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                <FiEye className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-space font-bold text-secondary mb-3">Our Vision</h2>
              <p className="text-gray-600 font-inter text-sm sm:text-base leading-relaxed">
                {aboutData.vision || 'To become the world’s most trusted partner in digital innovation and transformation.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {stats.map((stat, idx) => {
              const displayVal = stat.value || (stat.number !== undefined ? `${stat.number}${stat.suffix || '+'}` : '100+');
              return (
                <motion.div 
                  key={stat.id || idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-3 sm:p-6"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-space font-bold mb-1 sm:mb-2">{displayVal}</div>
                  <div className="text-blue-100 font-inter text-xs sm:text-sm uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-secondary mb-3 sm:mb-4">Core Values</h2>
            <p className="text-gray-600 font-inter text-sm sm:text-base px-2">The principles that guide our every decision and line of code.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {aboutData.values && aboutData.values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-gray-50/80 p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="mb-4 sm:mb-5">{getIcon(value.title || '')}</div>
                <h3 className="text-lg sm:text-xl font-space font-bold text-secondary mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-gray-600 font-inter text-xs sm:text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold text-secondary mb-3 sm:mb-4">Meet the Team</h2>
            <p className="text-gray-600 font-inter text-sm sm:text-base px-2">The talented people behind our successful projects.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {team.map((member, idx) => {
              const memberName = member.name || 'Team Member';
              const avatar = member.avatar || member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&background=0044DD&color=fff`;
              return (
                <motion.div 
                  key={member.id || idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group flex flex-col"
                >
                  <div className="aspect-[4/4] bg-gray-100 relative overflow-hidden">
                    <img 
                      src={avatar} 
                      alt={memberName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5 sm:p-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-space font-bold text-secondary mb-1">{memberName}</h3>
                      <p className="text-primary font-inter text-xs sm:text-sm font-medium mb-3">{member.role}</p>
                      <p className="text-gray-500 font-inter text-xs sm:text-sm mb-4 line-clamp-2">{member.bio}</p>
                    </div>
                    
                    <div className="flex justify-center gap-3 text-gray-400">
                      {member.social && Object.entries(member.social).map(([platform, url]) => {
                        if (!url || url === '#') return null;
                        let Icon = null;
                        if (platform === 'linkedin') Icon = FiLinkedin;
                        if (platform === 'twitter') Icon = FiTwitter;
                        if (platform === 'github') Icon = FiGithub;
                        return Icon ? (
                          <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors p-1" aria-label={platform}>
                            <Icon size={16} />
                          </a>
                        ) : null;
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-secondary via-[#0044DD] to-[#00BBDD] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-space font-bold mb-3 sm:mb-4">Ready to work with us?</h2>
              <p className="text-gray-200 font-inter mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto">
                Let's discuss how we can help your business grow through technology.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#0044DD] font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-sm sm:text-base">
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
