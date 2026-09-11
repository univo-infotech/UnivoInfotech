import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const Team = () => {
  const { data } = useData();
  const team = data?.team || [];

  return (
    <section id="team" className="py-16 sm:py-24 bg-[#EFF7FF]/50 backdrop-blur-sm relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-[#081830] mb-4">Meet the Experts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2">The brilliant minds behind our innovative solutions.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {team.map((member, index) => {
            const memberName = member?.name || 'Team Member';
            const avatarImg = member?.avatar || member?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&background=0044DD&color=fff`;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center shadow-lg hover:shadow-2xl transition-all border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-r from-[#0044DD]/10 to-[#00BBDD]/10 group-hover:h-full transition-all duration-500 -z-10" />
                <div className="relative inline-block mb-3 sm:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0044DD] to-[#22DD88] rounded-full scale-105 group-hover:rotate-180 transition-transform duration-700" />
                  <img src={avatarImg} alt={memberName}
                    className="relative w-20 h-20 sm:w-28 md:w-32 sm:h-28 md:h-32 rounded-full object-cover border-4 border-white" />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-[#081830] mb-0.5 sm:mb-1">{memberName}</h3>
                <p className="text-[#0044DD] font-medium text-xs sm:text-sm mb-2 sm:mb-4">{member?.role || 'Expert'}</p>
                <div className="flex justify-center space-x-2 sm:space-x-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {member?.social?.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#081830] hover:text-[#0044DD] hover:scale-110 transition-all"><FiLinkedin size={14} /></a>}
                  {member?.social?.twitter && <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#081830] hover:text-[#00BBDD] hover:scale-110 transition-all"><FiTwitter size={14} /></a>}
                  {member?.social?.github && <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#081830] hover:text-gray-800 hover:scale-110 transition-all"><FiGithub size={14} /></a>}
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
