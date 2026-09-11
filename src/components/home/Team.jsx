import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const Team = () => {
  const { data } = useData();
  const team = data?.team || [];

  return (
    <section id="team" className="py-24 bg-[#F8FAFF]/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-[#1A2B4A] mb-4">Meet the Experts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">The brilliant minds behind our innovative solutions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
            const memberName = member?.name || 'Team Member';
            const avatarImg = member?.avatar || member?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&background=0066FF&color=fff`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group bg-white rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#0066FF]/10 to-[#00B4D8]/10 group-hover:h-full transition-all duration-500 -z-10" />
                
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF] to-[#00B4D8] rounded-full scale-105 group-hover:rotate-180 transition-transform duration-700" />
                  <img 
                    src={avatarImg} 
                    alt={memberName} 
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-[#1A2B4A] mb-1">{memberName}</h3>
                <p className="text-[#0066FF] font-medium text-sm mb-4">{member?.role || 'Expert'}</p>
                
                <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {member?.social?.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1A2B4A] hover:text-[#0066FF] hover:scale-110 transition-all">
                      <FiLinkedin />
                    </a>
                  )}
                  {member?.social?.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1A2B4A] hover:text-[#00B4D8] hover:scale-110 transition-all">
                      <FiTwitter />
                    </a>
                  )}
                  {member?.social?.github && (
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#1A2B4A] hover:text-gray-800 hover:scale-110 transition-all">
                      <FiGithub />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
