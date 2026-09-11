import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const PortfolioManager = () => {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [filter, setFilter] = useState('All');
  
  const initialFormState = { title: '', category: '', description: '', image: '', tags: '', link: '' };
  const [formData, setFormData] = useState(initialFormState);

  const categories = ['All', ...new Set((data.portfolio || []).map(p => p.category))];
  const filteredPortfolio = filter === 'All' ? data.portfolio : (data.portfolio || []).filter(p => p.category === filter);

  const handleEdit = (item) => {
    setCurrentItem(item.id);
    setFormData({
      ...item,
      tags: item.tags ? item.tags.join(', ') : ''
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    setFormData(initialFormState);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteItem('portfolio', id);
      toast.success('Project deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    if (currentItem) {
      updateItem('portfolio', currentItem, itemData);
      toast.success('Project updated successfully');
    } else {
      addItem('portfolio', itemData);
      toast.success('Project added successfully');
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Portfolio</h2>
          <p className="text-slate-500">Showcase your best work.</p>
        </div>
        {!isEditing && (
          <button onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
            <FiPlus className="mr-2" /> Add Project
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 max-w-4xl">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">{currentItem ? 'Edit Project' : 'Add New Project'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <FiX size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea required rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
              <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              {formData.image && (
                <div className="mt-2 h-32 w-48 rounded overflow-hidden border border-slate-200">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src='https://via.placeholder.com/300?text=Invalid+Image'} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma-separated)</label>
                <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">External Link</label>
                <input type="text" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>
            <div className="pt-4 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Save</button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="flex space-x-2 mb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${filter === cat ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredPortfolio || []).map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group">
                <div className="h-48 relative">
                  <img src={item.image || 'https://via.placeholder.com/400'} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="bg-white p-2 rounded shadow text-blue-600 hover:bg-blue-50"><FiEdit2 size={16} /></button>
                    <button onClick={() => handleDelete(item.id)} className="bg-white p-2 rounded shadow text-red-600 hover:bg-red-50"><FiTrash2 size={16} /></button>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">{item.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PortfolioManager;
