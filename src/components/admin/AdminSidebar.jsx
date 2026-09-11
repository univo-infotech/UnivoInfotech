import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiLayout, FiGrid, FiBriefcase, FiUsers, 
  FiMessageSquare, FiStar, FiFileText, FiSettings, FiX,
  FiBarChart2, FiInfo, FiCpu, FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const { data } = useData();
  const navigate = useNavigate();
  const companyName = data?.company?.name || 'Univo Infotech';
  const companyLogo = data?.company?.logo || '/logo.png';

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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/admin/login');
    } catch (e) {
      toast.error('Logout failed. Try again.');
    }
  };

  return (
    <>
      <div className={`fixed inset-0 bg-slate-900/50 z-20 md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
      
      <div className={`fixed md:static inset-y-0 left-0 w-64 text-white z-30 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ background: 'linear-gradient(160deg, #0A1A5C 0%, #0044DD 35%, #00BBDD 70%, #22DD88 100%)' }}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4" style={{ background: 'rgba(0,0,0,0.25)' }}>
          <div className="flex items-center space-x-2">
            <img src={companyLogo} alt={companyName} className="h-9 w-9 object-contain bg-white/90 p-1 rounded-lg" />
            <span className="text-sm font-bold text-white">{companyName}</span>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        
        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2.5 rounded-xl transition-all group text-sm ${
                    isActive 
                      ? 'bg-white text-[#0044DD] font-semibold shadow-md' 
                      : 'text-white/90 hover:bg-white/20 hover:text-white'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Info + Logout */}
        <div className="border-t border-white/20 p-4" style={{ background: 'rgba(0,0,0,0.20)' }}>
          {user && (
            <div className="mb-3 px-1">
              <p className="text-xs text-white/60">Signed in as</p>
              <p className="text-sm text-white font-medium truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
