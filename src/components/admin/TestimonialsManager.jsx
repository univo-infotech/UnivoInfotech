import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiStar } from 'react-icons/fi';

const TestimonialsManager = () => {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const initialFormState = { name: '', role: '', company: '', content: '', avatar: '', rating: 5 };
  const [formData, setFormData] = useState(initialFormState);

  const handleEdit = (item) => {
    setCurrentItem(item.id);
    setFormData(item);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentItem(null);
    setFormData(initialFormState);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteItem('testimonials', id);
      toast.success('Testimonial deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      updateItem('testimonials', currentItem, formData);
      toast.success('Testimonial updated successfully');
    } else {
      addItem('testimonials', formData);
      toast.success('Testimonial added successfully');
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Testimonials</h2>
          <p className="text-slate-500">Client reviews and feedback.</p>
        </div>
        {!isEditing && (
          <button onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
            <FiPlus className="mr-2" /> Add Testimonial
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 max-w-3xl">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">{currentItem ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <FiX size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role / Position</label>
                <input type="text" required value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5)</label>
                <select value={formData.rating} onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600">
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num} Star{num !== 1 && 's'}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Testimonial Content</label>
              <textarea required rows="4" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Avatar URL (Optional)</label>
              <input type="text" value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <div className="pt-4 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Save</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data.testimonials || []).map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative group">
              <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(item)} className="bg-white p-2 rounded shadow text-blue-600 hover:bg-blue-50"><FiEdit2 size={14} /></button>
                <button onClick={() => handleDelete(item.id)} className="bg-white p-2 rounded shadow text-red-600 hover:bg-red-50"><FiTrash2 size={14} /></button>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} fill={i < (item.rating || 5) ? "currentColor" : "none"} className="mr-1" />
                ))}
              </div>
              <p className="text-slate-600 italic mb-6">"{item.content}"</p>
              <div className="flex items-center">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full mr-4" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mr-4">
                    {item.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-800">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.role}{item.company ? `, ${item.company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;
