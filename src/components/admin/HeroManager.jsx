import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

const HeroManager = () => {
  const { data, updateSection } = useData();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaPrimary: '',
    ctaSecondary: ''
  });

  useEffect(() => {
    if (data?.hero) {
      setFormData({
        title: data.hero.title || '',
        subtitle: data.hero.subtitle || '',
        ctaPrimary: data.hero.ctaPrimary || data.hero.cta?.primary || '',
        ctaSecondary: data.hero.ctaSecondary || data.hero.cta?.secondary || ''
      });
    }
  }, [data?.hero]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('hero', formData);
    toast.success('Hero section updated successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 max-w-3xl">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Manage Hero Section</h2>
        <p className="text-slate-500">Update the main content of your homepage hero section.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Main Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="e.g. Code. Innovate. Elevate."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle / Description</label>
          <textarea
            required
            rows="3"
            value={formData.subtitle}
            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="A short description under the main title."
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Primary CTA Button Text</label>
            <input
              type="text"
              required
              value={formData.ctaPrimary}
              onChange={(e) => setFormData({...formData, ctaPrimary: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="e.g. Get Started"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Secondary CTA Button Text</label>
            <input
              type="text"
              required
              value={formData.ctaSecondary}
              onChange={(e) => setFormData({...formData, ctaSecondary: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="e.g. View Portfolio"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroManager;
