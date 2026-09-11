import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

const SettingsManager = () => {
  const { data, updateSection } = useData();
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    logo: '',
    email: '',
    phone: '',
    address: '',
    social: {
      linkedin: '',
      twitter: '',
      github: '',
      instagram: ''
    }
  });

  useEffect(() => {
    if (data.company) {
      setFormData({
        name: data.company.name || '',
        tagline: data.company.tagline || '',
        logo: data.company.logo || '/logo.png',
        email: data.company.email || '',
        phone: data.company.phone || '',
        address: data.company.address || '',
        social: {
          linkedin: data.company.social?.linkedin || '',
          twitter: data.company.social?.twitter || '',
          github: data.company.social?.github || '',
          instagram: data.company.social?.instagram || ''
        }
      });
    }
  }, [data.company]);

  const handleSocialChange = (network, value) => {
    setFormData({ ...formData, social: { ...formData.social, [network]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('company', formData);
    toast.success('Company settings updated successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 max-w-4xl">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Company Settings</h2>
        <p className="text-slate-500">Manage your company info, logo, and social links.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Logo Preview + URL */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">🖼️ Company Logo</h3>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden">
              {formData.logo ? (
                <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-contain p-2" onError={(e) => e.target.style.display = 'none'} />
              ) : (
                <span className="text-slate-400 text-xs text-center">No Logo</span>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL or Path</label>
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="/logo.png or https://..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Enter a URL or file path. Default: /logo.png</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Basic Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
              <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Office Address</label>
              <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows="2" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"></textarea>
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Social Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn URL</label>
              <input type="url" value={formData.social.linkedin} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Twitter URL</label>
              <input type="url" value={formData.social.twitter} onChange={(e) => handleSocialChange('twitter', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">GitHub URL</label>
              <input type="url" value={formData.social.github} onChange={(e) => handleSocialChange('github', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Instagram URL</label>
              <input type="url" value={formData.social.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white px-8 py-2.5 rounded-xl font-semibold hover:opacity-90 transition shadow-md">
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
