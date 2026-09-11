import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const TeamManager = () => {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const initialFormState = { 
    name: '', 
    role: '', 
    bio: '', 
    avatar: '', 
    linkedin: '', 
    twitter: '', 
    github: '' 
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const handleEdit = (item) => {
    setCurrentItem(item.id);
    setFormData({
      name: item.name || '',
      role: item.role || '',
      bio: item.bio || '',
      avatar: item.avatar || '',
      linkedin: item.social?.linkedin || '',
      twitter: item.social?.twitter || '',
      github: item.social?.github || ''
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    setFormData(initialFormState);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      deleteItem('team', id);
      toast.success('Team member removed successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      name: formData.name,
      role: formData.role,
      bio: formData.bio,
      avatar: formData.avatar,
      social: {
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        github: formData.github
      }
    };

    if (currentItem) {
      updateItem('team', currentItem, itemData);
      toast.success('Team member updated successfully');
    } else {
      addItem('team', itemData);
      toast.success('Team member added successfully');
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Team</h2>
          <p className="text-slate-500">Add or edit team members.</p>
        </div>
        {!isEditing && (
          <button onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
            <FiPlus className="mr-2" /> Add Member
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 max-w-4xl">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">{currentItem ? 'Edit Team Member' : 'Add New Team Member'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <FiX size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role / Position</label>
                <input type="text" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
              <textarea required rows="3" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Avatar Image URL</label>
              <input type="text" value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              {formData.avatar && (
                <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border border-slate-200">
                  <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src='https://via.placeholder.com/150'} />
                </div>
              )}
            </div>
            
            <h4 className="font-semibold text-slate-800 pt-2 border-t border-slate-100">Social Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                <input type="text" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Twitter URL</label>
                <input type="text" value={formData.twitter} onChange={(e) => setFormData({...formData, twitter: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">GitHub URL</label>
                <input type="text" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Save Member</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
          {data.team.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden relative group">
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => handleEdit(item)} className="bg-white p-2 rounded shadow text-blue-600 hover:bg-blue-50"><FiEdit2 size={16} /></button>
                <button onClick={() => handleDelete(item.id)} className="bg-white p-2 rounded shadow text-red-600 hover:bg-red-50"><FiTrash2 size={16} /></button>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-50">
                  <img src={item.avatar || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">{item.role}</p>
                <p className="text-slate-500 text-sm line-clamp-3">{item.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamManager;
