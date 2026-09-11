import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

const StatsManager = () => {
  const { data, updateSection, addItem, updateItem, deleteItem } = useData();
  const statsList = data?.stats || [];

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    number: '',
    suffix: '+',
    label: ''
  });

  const handleOpenAdd = () => {
    setFormData({ number: '', suffix: '+', label: '' });
    setCurrentId(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (stat, idx) => {
    setCurrentId(stat.id || idx);
    setFormData({
      number: stat.number || stat.value || '',
      suffix: stat.suffix || '',
      label: stat.label || ''
    });
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId !== null) {
      // If array has items with IDs
      const updatedList = statsList.map((item, idx) => {
        if (item.id === currentId || idx === currentId) {
          return { ...item, number: Number(formData.number) || formData.number, suffix: formData.suffix, label: formData.label };
        }
        return item;
      });
      updateSection('stats', updatedList);
      toast.success('Stat counter updated!');
    } else {
      const newItem = { id: Date.now().toString(), number: Number(formData.number) || formData.number, suffix: formData.suffix, label: formData.label };
      updateSection('stats', [...statsList, newItem]);
      toast.success('New stat counter added!');
    }
    setIsEditing(false);
  };

  const handleDelete = (idxToDelete) => {
    if (window.confirm('Are you sure you want to delete this stat counter?')) {
      const updatedList = statsList.filter((_, idx) => idx !== idxToDelete);
      updateSection('stats', updatedList);
      toast.success('Stat counter removed!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manage Stat Counters</h2>
          <p className="text-slate-500 text-sm">Add or edit the counter metrics shown on the homepage.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm"
        >
          <FiPlus /> <span>Add Stat Counter</span>
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-blue-200 space-y-4">
          <div className="flex justify-between items-center border-b pb-3 border-slate-100">
            <h3 className="font-bold text-slate-800">{currentId !== null ? 'Edit Stat Counter' : 'Add New Stat Counter'}</h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <FiX size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Number (e.g. 150)</label>
              <input
                type="text"
                required
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                placeholder="150"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Suffix (e.g. + or %)</label>
              <input
                type="text"
                value={formData.suffix}
                onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                placeholder="+"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Label / Metric Name</label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                placeholder="Projects Delivered"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="flex items-center space-x-2 px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <FiSave /> <span>Save Stat</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold text-blue-600 font-mono">
                {stat.number || stat.value || 0}{stat.suffix || ''}
              </h3>
              <p className="text-slate-700 font-medium mt-1">{stat.label}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-slate-50">
              <button onClick={() => handleOpenEdit(stat, idx)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <FiEdit2 size={16} />
              </button>
              <button onClick={() => handleDelete(idx)} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsManager;
