import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { FiUploadCloud, FiImage, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const SettingsManager = () => {
  const { data, updateSection } = useData();
  const fileInputRef = useRef(null);
  const [converting, setConverting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    logo: '',
    email: '',
    phone: '',
    address: '',
    social: { linkedin: '', twitter: '', github: '', instagram: '' }
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

  // Convert image to base64 and store in Firestore
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, SVG)');
      return;
    }

    if (file.size > 500 * 1024) {
      toast.error('Image must be less than 500KB for Firestore storage.');
      return;
    }

    setConverting(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, logo: reader.result }));
      setConverting(false);
      toast.success('Logo ready! Click "Save All Settings" to apply.');
    };
    reader.onerror = () => {
      toast.error('Failed to read image. Please try again.');
      setConverting(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSocialChange = (network, value) => {
    setFormData({ ...formData, social: { ...formData.social, [network]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('company', formData);
    toast.success('Company settings saved to Firestore!');
  };

  const isBase64 = formData.logo?.startsWith('data:image');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 max-w-4xl">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Company Settings</h2>
        <p className="text-slate-500">Manage your company info, logo, and social links. Saved to Firestore.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">

        {/* Logo Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">🖼️ Company Logo</h3>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Preview */}
            <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden shrink-0">
              {formData.logo ? (
                <img
                  src={formData.logo}
                  alt="Logo Preview"
                  className="w-full h-full object-contain p-2"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <FiImage className="text-slate-300" size={36} />
              )}
            </div>

            {/* Controls */}
            <div className="flex-1 space-y-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={converting}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white rounded-xl font-medium hover:opacity-90 transition shadow-md disabled:opacity-60 text-sm"
              >
                <FiUploadCloud size={18} />
                {converting ? 'Processing...' : 'Upload Logo from Device'}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                className="hidden"
                onChange={handleLogoUpload}
              />

              <p className="text-xs text-slate-400">
                PNG, JPG, SVG, WebP · Max 500KB · Saved directly to Firestore
              </p>

              {/* Status */}
              {isBase64 && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <FiCheck size={13} />
                  <span>Image ready — will save to Firestore on submit</span>
                </div>
              )}

              {/* URL fallback */}
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Or paste a logo URL:</label>
                <input
                  type="text"
                  value={isBase64 ? '(Uploaded image — base64)' : formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  readOnly={isBase64}
                  placeholder="https://... or /logo.png"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                />
                {isBase64 && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, logo: '/logo.png' }))}
                    className="text-xs text-red-400 hover:text-red-600 mt-1"
                  >
                    ✕ Clear uploaded image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Basic Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
              <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Office Address</label>
              <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows="2" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"></textarea>
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Social Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['linkedin', 'twitter', 'github', 'instagram'].map((platform) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">{platform} URL</label>
                <input type="url" value={formData.social[platform]} onChange={(e) => handleSocialChange(platform, e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit"
            className="bg-gradient-to-r from-[#0044DD] to-[#00BBDD] text-white px-8 py-2.5 rounded-xl font-semibold hover:opacity-90 transition shadow-md">
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
