import React from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { FiUsers, FiBriefcase, FiLayers, FiMessageSquare, FiArrowRight } from 'react-icons/fi';

const Dashboard = () => {
  const { data, messages, firebaseConnected } = useData();

  const stats = [
    { label: 'Total Services', value: data.services?.length || 0, icon: <FiLayers size={24} />, color: 'bg-blue-50 text-blue-600', link: '/admin/services' },
    { label: 'Portfolio Items', value: data.portfolio?.length || 0, icon: <FiBriefcase size={24} />, color: 'bg-indigo-50 text-indigo-600', link: '/admin/portfolio' },
    { label: 'Team Members', value: data.team?.length || 0, icon: <FiUsers size={24} />, color: 'bg-purple-50 text-purple-600', link: '/admin/team' },
    { label: 'Messages', value: messages?.length || 0, icon: <FiMessageSquare size={24} />, color: 'bg-pink-50 text-pink-600', link: '/admin/messages' },
  ];

  const recentMessages = [...(messages || [])].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening with your website.</p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-emerald-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Firebase Cloud DB Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-slate-500 text-sm font-medium mb-4">{stat.label}</p>
            <Link to={stat.link} className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center mt-auto">
              Manage <FiArrowRight className="ml-1" />
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Recent Messages</h3>
          <Link to="/admin/messages" className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</Link>
        </div>
        
        {recentMessages.length === 0 ? (
          <p className="text-slate-500 text-center py-4">No recent messages.</p>
        ) : (
          <div className="space-y-4">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex justify-between items-start p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{msg.name}</h4>
                  <p className="text-slate-500 text-xs mb-1">{msg.email}</p>
                  <p className="text-slate-600 text-sm line-clamp-1">{msg.subject}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-400 mb-2">
                    {new Date(msg.date).toLocaleDateString()}
                  </span>
                  {!msg.read && <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">New</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
