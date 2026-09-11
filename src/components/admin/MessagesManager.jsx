import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';
import { FiTrash2, FiMail, FiCheck, FiInbox } from 'react-icons/fi';

const MessagesManager = () => {
  const { messages, deleteMessage, markMessageAsRead } = useData();
  const [selectedMsgId, setSelectedMsgId] = useState(null);

  const selectedMsg = messages?.find(m => m.id === selectedMsgId);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
      if (selectedMsgId === id) setSelectedMsgId(null);
      toast.success('Message deleted successfully');
    }
  };

  const handleMarkAsRead = (id) => {
    markMessageAsRead(id);
    toast.success('Marked as read');
  };

  if (!messages || messages.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiInbox size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No messages yet</h3>
        <p className="text-slate-500">When people contact you through the website, their messages will appear here.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Left side: Message List */}
      <div className="w-1/3 border-r border-slate-100 overflow-y-auto">
        <div className="p-4 border-b border-slate-100 bg-slate-50 sticky top-0">
          <h2 className="font-bold text-slate-800">Inbox ({messages.filter(m => !m.read).length} unread)</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              onClick={() => {
                setSelectedMsgId(msg.id);
                if (!msg.read) markMessageAsRead(msg.id);
              }}
              className={`p-4 cursor-pointer transition-colors ${selectedMsgId === msg.id ? 'bg-blue-50' : 'hover:bg-slate-50'} ${!msg.read ? 'border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-medium ${!msg.read ? 'text-slate-900' : 'text-slate-600'}`}>{msg.name}</h4>
                <span className="text-xs text-slate-400">{new Date(msg.date).toLocaleDateString()}</span>
              </div>
              <p className={`text-sm mb-1 ${!msg.read ? 'font-medium text-slate-800' : 'text-slate-500'} truncate`}>{msg.subject}</p>
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${!msg.read ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                  {!msg.read ? 'New' : 'Read'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Message Details */}
      <div className="w-2/3 flex flex-col bg-white">
        {selectedMsg ? (
          <>
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedMsg.subject}</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {selectedMsg.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{selectedMsg.name}</p>
                      <p className="text-sm text-slate-500">{selectedMsg.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400 border-l border-slate-200 pl-4">{new Date(selectedMsg.date).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {!selectedMsg.read && (
                  <button onClick={() => handleMarkAsRead(selectedMsg.id)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Mark as read">
                    <FiCheck size={20} />
                  </button>
                )}
                <button onClick={() => handleDelete(selectedMsg.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete message">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 flex-grow overflow-y-auto">
              <div className="prose max-w-none text-slate-700 whitespace-pre-wrap">
                {selectedMsg.message}
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <a href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`} className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <FiMail />
                <span>Reply to Message</span>
              </a>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-slate-400">
            <FiMail size={48} className="mb-4 text-slate-300" />
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
