import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiLayout, FiGrid, FiBriefcase, FiUsers, 
  FiMessageSquare, FiStar, FiFileText, FiSettings, FiX,
  FiBarChart2, FiInfo, FiCpu
} from 'react-icons/fi';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome />, end: true },
    { name: 'Hero Section', path: '/admin/hero', icon: <FiLayout /> },
    { name: 'Stat Counters', path: '/admin/stats', icon: <FiBarChart2 /> },
    { name: 'Services', path: '/admin/services', icon: <FiGrid /> },
    { name: 'About Section', path: '/admin/about', icon: <FiInfo /> },
    { name: 'Portfolio', path: '/admin/portfolio', icon: <FiBriefcase /> },
    { name: 'Tech Stack', path: '/admin/techstack', icon: <FiCpu /> },
    { name: 'Team', path: '/admin/team', icon: <FiUsers /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FiStar /> },
    { name: 'Messages', path: '/admin/messages', icon: <FiMessageSquare /> },
    { name: 'Blog Posts', path: '/admin/blog', icon: <FiFileText /> },
    { name: 'Company Settings', path: '/admin/settings', icon: <FiSettings /> },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/50 z-20 md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
      
      <div className={`fixed md:static inset-y-0 left-0 w-64 bg-[#1A2B4A] text-white z-30 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-6 bg-[#132038]">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="CodeVia" className="h-8 w-auto object-contain bg-white/90 p-1 rounded-lg" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">CodeVia</span>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2.5 rounded-lg transition-colors group text-sm ${isActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-[#233559] hover:text-white'}`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
