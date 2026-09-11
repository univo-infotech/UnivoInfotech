import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';

const AboutManager = () => {
  const { data, updateSection } = useData();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mission: '',
    vision: '',
    values: []
  });

  const [newValueTitle, setNewValueTitle] = useState('');

  useEffect(() => {
    if (data?.about) {
      setFormData({
        title: data.about.title || 'Innovating the Digital Landscape',
        description: data.about.description || '',
        mission: data.about.mission || '',
        vision: data.about.vision || '',
        values: Array.isArray(data.about.values) ? data.about.values : []
      });
    }
  }, [data?.about]);

  const handleAddValue = (e) => {
    e.preventDefault();
    if (!newValueTitle.trim()) return;
    setFormData(prev => ({
      ...prev,
      values: [...prev.values, { title: newValueTitle.trim() }]
    }));
    setNewValueTitle('');
  };

  const handleRemoveValue = (idxToRemove) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter((_, idx) => idx !== idxToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSection('about', formData);
    toast.success('About section updated successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 max-w-3xl">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Manage About Section</h2>
        <p className="text-slate-500 text-sm">Update company narrative, mission statement, vision, and core values.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Heading Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Company Description / Narrative</label>
          <textarea
            required
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
            placeholder="Describe CodeVia's story and goals..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mission Statement</label>
            <textarea
              rows="3"
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              placeholder="Our mission..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Vision Statement</label>
            <textarea
              rows="3"
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
              placeholder="Our vision..."
            ></textarea>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Core Values List</label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newValueTitle}
              onChange={(e) => setNewValueTitle(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm"
              placeholder="e.g. Uncompromising Quality"
            />
            <button
              type="button"
              onClick={handleAddValue}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 text-sm flex items-center space-x-1"
            >
              <FiPlus /> <span>Add</span>
            </button>
          </div>

          <div className="space-y-2">
            {formData.values.map((val, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-sm font-medium text-slate-700">
                <span>{typeof val === 'string' ? val : val.title}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveValue(idx)}
                  className="text-slate-400 hover:text-red-600 p-1"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button type="submit" className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <FiSave /> <span>Save About Section</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManager;
