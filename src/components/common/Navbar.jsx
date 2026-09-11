import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi';
import { useData } from '../../context/DataContext';

const Navbar = () => {
  const { data } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const companyName = data?.company?.name || 'Univo Infotech';
  const companyLogo = data?.company?.logo || '/logo.png';
  const companyEmail = data?.company?.email || 'univoinfotech@gmail.com';
  const companyPhone = data?.company?.phone || '+91 98765 43210';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm py-2.5 sm:py-3' 
            : 'bg-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Name */}
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2 sm:gap-2.5">
              <img 
                src={companyLogo} 
                alt={companyName} 
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain shrink-0" 
              />
              <span className="text-base sm:text-xl font-bold font-space text-gray-900 tracking-tight">
                {companyName}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.slice(0, 5).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => 
                    `relative font-inter text-sm font-medium transition-colors ${
                      isActive ? 'text-[#0044DD]' : 'text-gray-600 hover:text-[#0044DD]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <Link 
                to="/contact" 
                className="px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-95"
              >
                Get Quote
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden p-2 text-gray-800 hover:text-[#0044DD] transition-colors focus:outline-none rounded-lg"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Rendered outside header to eliminate backdrop-blur clipping issues) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed inset-0 z-[9999] bg-white w-full h-full min-h-screen h-[100dvh] flex flex-col md:hidden shadow-2xl"
          >
            {/* Drawer Top Header Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
              <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5">
                <img src={companyLogo} alt={companyName} className="h-8 w-8 object-contain shrink-0" />
                <span className="text-lg font-bold font-space text-gray-900">{companyName}</span>
              </Link>
              <button 
                onClick={closeMenu} 
                className="p-2 text-gray-700 hover:text-[#0044DD] hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Scrollable Links Content */}
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-between bg-white">
              <nav className="flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) => 
                      `flex items-center justify-between px-4 py-3.5 rounded-xl font-space text-base font-semibold transition-all ${
                        isActive 
                          ? 'bg-[#EFF7FF] text-[#0044DD] border-l-4 border-[#0044DD]' 
                          : 'text-gray-800 hover:bg-gray-50'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <span className="text-gray-400 text-sm">→</span>
                  </NavLink>
                ))}
              </nav>

              {/* Bottom CTA & Contact info */}
              <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
                <Link 
                  to="/contact" 
                  onClick={closeMenu}
                  className="block w-full text-center py-3.5 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white rounded-xl font-semibold text-base shadow-md active:scale-98 transition-transform"
                >
                  Get Free Quote
                </Link>

                <div className="pt-2 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiMail className="text-[#0044DD] shrink-0" />
                    <span className="truncate">{companyEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-[#0044DD] shrink-0" />
                    <span>{companyPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
