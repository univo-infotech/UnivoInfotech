import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const BlogManager = () => {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const initialFormState = { title: '', excerpt: '', content: '', author: '', category: '', image: '', readTime: '' };
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
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteItem('blog', id);
      toast.success('Blog post deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      ...formData,
      date: formData.date || new Date().toISOString().split('T')[0] // keep original date or add new one
    };

    if (currentItem) {
      updateItem('blog', currentItem, itemData);
      toast.success('Blog post updated successfully');
    } else {
      addItem('blog', itemData);
      toast.success('Blog post added successfully');
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Blog</h2>
          <p className="text-slate-500">Create and edit your blog posts.</p>
        </div>
        {!isEditing && (
          <button onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
            <FiPlus className="mr-2" /> Add Post
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 max-w-4xl">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">{currentItem ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <FiX size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                <input type="text" required value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Read Time</label>
                <input type="text" required value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: e.target.value})} placeholder="e.g. 5 min read" className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
              <textarea required rows="2" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Content (Markdown supported)</label>
              <textarea required rows="8" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image URL</label>
              <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" />
              {formData.image && (
                <div className="mt-2 h-40 w-full md:w-1/2 rounded overflow-hidden border border-slate-200">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src='https://via.placeholder.com/600x400?text=Invalid+Image'} />
                </div>
              )}
            </div>
            <div className="pt-4 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Save Post</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="py-4 px-6 font-semibold text-slate-700">Title</th>
                  <th className="py-4 px-6 font-semibold text-slate-700">Category</th>
                  <th className="py-4 px-6 font-semibold text-slate-700">Author</th>
                  <th className="py-4 px-6 font-semibold text-slate-700">Date</th>
                  <th className="py-4 px-6 font-semibold text-slate-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(data.blog || []).length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-500">No blog posts found. Add one!</td>
                  </tr>
                ) : (
                  (data.blog || []).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-800">{item.title}</td>
                      <td className="py-4 px-6 text-slate-600">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{item.category}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 text-sm">{item.author}</td>
                      <td className="py-4 px-6 text-slate-600 text-sm">{item.date}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><FiEdit2 size={18} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><FiTrash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
