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
      case 'linkedin': return <FiLinkedin />;
      case 'twitter': return <FiTwitter />;
      case 'github': return <FiGithub />;
      case 'instagram': return <FiInstagram />;
      default: return null;
    }
  };

  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={company.logo || '/logo.png'} alt={company.name || 'Univo Infotech'} className="h-11 w-11 object-contain bg-white/90 p-1 rounded-xl" />
              <div>
                <span className="block text-xl font-space font-bold text-white">
                  {company.name || 'Univo Infotech'}
                </span>
                <span className="text-xs text-gray-400">{company.tagline || 'Ideas | Technology | Growth'}</span>
              </div>
            </Link>
            <p className="text-gray-400 font-inter text-sm leading-relaxed max-w-xs">
              Transforming ideas into exceptional digital experiences. We build scalable, modern, and high-performance applications.
            </p>
            <div className="flex items-center gap-4">
              {company.social && Object.entries(company.social).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors">
                  {getSocialIcon(platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-space font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 font-inter text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-space font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 font-inter text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-primary shrink-0" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary shrink-0" />
                <a href={`tel:${company.phone}`} className="hover:text-primary transition-colors">{company.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-primary transition-colors">{company.email}</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-space font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 font-inter text-sm mb-4">
              Subscribe to get the latest insights and updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 w-8 flex items-center justify-center bg-primary rounded-lg text-white hover:bg-primary/90 transition-colors"
                aria-label="Subscribe"
              >
                <FiArrowRight />
              </button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-inter text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {company.name || 'CodeVia'}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
