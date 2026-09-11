import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowRight, FiLinkedin, FiTwitter, FiGithub, FiInstagram } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

const Footer = () => {
  const { data } = useData();
  const company = data?.company || {};
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Successfully subscribed to newsletter!');
    setEmail('');
  };

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'linkedin': return <FiLinkedin size={18} />;
      case 'twitter': return <FiTwitter size={18} />;
      case 'github': return <FiGithub size={18} />;
      case 'instagram': return <FiInstagram size={18} />;
      default: return null;
    }
  };

  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4 sm:space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={company.logo || '/logo.png'} 
                alt={company.name || 'Univo Infotech'} 
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain bg-white/90 p-1 rounded-xl shrink-0" 
              />
              <div>
                <span className="block text-lg sm:text-xl font-space font-bold text-white">
                  {company.name || 'Univo Infotech'}
                </span>
                <span className="text-xs text-gray-400">{company.tagline || 'Ideas | Technology | Growth'}</span>
              </div>
            </Link>
            <p className="text-gray-400 font-inter text-xs sm:text-sm leading-relaxed max-w-sm">
              Transforming ideas into exceptional digital experiences. We build scalable, modern, and high-performance applications.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {company.social && Object.entries(company.social).map(([platform, url]) => (
                <a 
                  key={platform} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label={platform}
                >
                  {getSocialIcon(platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-space font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2.5 sm:space-y-3 font-inter text-xs sm:text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-accent transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-space font-semibold mb-4 sm:mb-6">Contact Us</h4>
            <ul className="space-y-3 font-inter text-xs sm:text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 text-accent shrink-0 text-sm sm:text-base" />
                <span className="leading-snug">{company.address || 'Tech Hub, Sector 62, Noida, UP, India'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-accent shrink-0 text-sm sm:text-base" />
                <a href={`tel:${company.phone || '+91 98765 43210'}`} className="hover:text-accent transition-colors">
                  {company.phone || '+91 98765 43210'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-accent shrink-0 text-sm sm:text-base" />
                <a href={`mailto:${company.email || 'univoinfotech@gmail.com'}`} className="hover:text-accent transition-colors break-all">
                  {company.email || 'univoinfotech@gmail.com'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-base sm:text-lg font-space font-semibold mb-4 sm:mb-6">Newsletter</h4>
            <p className="text-gray-400 font-inter text-xs sm:text-sm mb-4">
              Subscribe to get the latest insights and updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 flex items-center justify-center bg-gradient-to-r from-[#0044DD] to-[#00BBDD] rounded-lg text-white hover:opacity-90 transition-opacity"
                aria-label="Subscribe"
              >
                <FiArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-inter text-xs sm:text-sm text-gray-500 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} {company.name || 'Univo Infotech'}. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
