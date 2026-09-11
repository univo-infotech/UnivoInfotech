import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

const TechStackManager = () => {
  const { data, updateSection } = useData();
  const techList = data?.techStack || [];

  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: 'SiReact',
    color: '#0066FF'
  });

  const handleOpenAdd = () => {
    setFormData({ name: '', icon: 'SiReact', color: '#0066FF' });
    setCurrentIndex(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (tech, idx) => {
    setCurrentIndex(idx);
    setFormData({
      name: tech.name || '',
      icon: tech.icon?.name || tech.icon || 'SiReact',
      color: tech.color || '#0066FF'
    });
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentIndex !== null) {
      const updated = techList.map((item, idx) => idx === currentIndex ? { ...formData } : item);
      updateSection('techStack', updated);
      toast.success('Technology updated!');
    } else {
      updateSection('techStack', [...techList, { ...formData }]);
      toast.success('New technology added!');
    }
    setIsEditing(false);
  };

  const handleDelete = (idxToDelete) => {
    if (window.confirm('Delete this technology from Tech Arsenal?')) {
      const updated = techList.filter((_, idx) => idx !== idxToDelete);
      updateSection('techStack', updated);
      toast.success('Technology deleted!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manage Tech Arsenal</h2>
          <p className="text-slate-500 text-sm">Add or edit technologies shown in the Tech Stack section.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm"
        >
          <FiPlus /> <span>Add Tech</span>
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-blue-200 space-y-4">
          <div className="flex justify-between items-center border-b pb-3 border-slate-100">
            <h3 className="font-bold text-slate-800">{currentIndex !== null ? 'Edit Technology' : 'Add New Technology'}</h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <FiX size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tech Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                placeholder="e.g. React"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Icon Key (e.g. SiReact, SiNodedotjs, FiCloud)</label>
              <input
                type="text"
                required
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                placeholder="SiReact"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Brand Color Hex</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-10 h-9 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                  placeholder="#0066FF"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="flex items-center space-x-2 px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <FiSave /> <span>Save Tech</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {techList.map((tech, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between items-center text-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${tech.color || '#0066FF'}15`, color: tech.color || '#0066FF' }}>
              <span className="font-bold text-sm">{tech.name?.charAt(0)}</span>
            </div>
            <span className="font-bold text-slate-800 text-sm">{tech.name}</span>
            <div className="flex space-x-1 mt-3">
              <button onClick={() => handleOpenEdit(tech, idx)} className="p-1.5 text-slate-400 hover:text-blue-600">
                <FiEdit2 size={14} />
              </button>
              <button onClick={() => handleDelete(idx)} className="p-1.5 text-slate-400 hover:text-red-600">
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackManager;
