import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import * as FeatherIcons from 'react-icons/fi';
import * as HeroIcons from 'react-icons/hi2';

const ServicesManager = () => {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const initialFormState = { title: '', description: '', icon: 'FiLayers', features: '' };
  const [formData, setFormData] = useState(initialFormState);

  const renderIcon = (iconName) => {
    let Icon = FeatherIcons[iconName];
    if (!Icon) Icon = HeroIcons[iconName];
    if (!Icon) Icon = FeatherIcons.FiBox;
    return <Icon size={24} />;
  };

  const handleEdit = (item) => {
    setCurrentItem(item.id);
    setFormData({
      ...item,
      features: item.features ? item.features.join(', ') : ''
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    setFormData(initialFormState);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteItem('services', id);
      toast.success('Service deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    if (currentItem) {
      updateItem('services', currentItem, itemData);
      toast.success('Service updated successfully');
    } else {
      addItem('services', itemData);
      toast.success('Service added successfully');
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Services</h2>
          <p className="text-slate-500">Add, edit, or remove services.</p>
        </div>
        {!isEditing && (
          <button onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
            <FiPlus className="mr-2" /> Add Service
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 max-w-3xl">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">{currentItem ? 'Edit Service' : 'Add New Service'}</h3>
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Icon Name (Feather/Hero)</label>
                <div className="flex space-x-2">
                  <div className="flex-grow">
                    <input type="text" required value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="e.g. FiCode" />
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    {renderIcon(formData.icon)}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea required rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Features (comma-separated)</label>
              <input type="text" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="Feature 1, Feature 2..." />
            </div>
            <div className="pt-4 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Save</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-4 px-6 font-semibold text-slate-700">Service</th>
                  <th className="py-4 px-6 font-semibold text-slate-700">Description</th>
                  <th className="py-4 px-6 font-semibold text-slate-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.services.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
                          {renderIcon(item.icon)}
                        </div>
                        <span className="font-bold text-slate-800">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-sm max-w-md truncate">
                      {item.description?.substring(0, 60)}...
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><FiEdit2 size={18} /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><FiTrash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
