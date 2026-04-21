'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, Reply, Archive, Trash2, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { adminApi } from '@/lib/api';
import toast from 'react-hot-toast';

const statusColors = {
  new: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400',
  read: 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-400',
  replied: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400',
  archived: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
};

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await adminApi.getContactMessages();
      setMessages(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await adminApi.updateContactMessage(id, { status });
      toast.success(`Message marked as ${status}`);
      fetchMessages();
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await adminApi.deleteContactMessage(id);
      toast.success('Message deleted successfully');
      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = filter === 'all' || msg.status === filter;
    const matchesSearch = searchQuery === '' ||
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 dark:text-white">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and manage contact form submissions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-5 h-5" />}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'replied', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      ) : filteredMessages.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages sidebar */}
          <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredMessages.map((msg) => (
              <Card
                key={msg._id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedMessage?._id === msg._id ? 'ring-2 ring-blue-500' : ''
                } ${msg.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}`}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (msg.status === 'new') updateStatus(msg._id, 'read');
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate flex-1">
                    {msg.name}
                  </h4>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${statusColors[msg.status]}`}>
                    {msg.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-1">
                  {msg.subject}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>From: {selectedMessage.name}</span>
                      <span>&lt;{selectedMessage.email}&gt;</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${statusColors[selectedMessage.status]}`}>
                    {selectedMessage.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-dark-700 rounded-xl">
                  {selectedMessage.company && (
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Company</span>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedMessage.company}</p>
                    </div>
                  )}
                  {selectedMessage.phone && (
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Phone</span>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedMessage.phone}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Service</span>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedMessage.service}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Budget</span>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{selectedMessage.budget}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Message</h4>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-dark-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                    leftIcon={<Reply className="w-4 h-4" />}
                  >
                    Reply
                  </Button>
                  {selectedMessage.status !== 'archived' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(selectedMessage._id, 'archived')}
                      leftIcon={<Archive className="w-4 h-4" />}
                    >
                      Archive
                    </Button>
                  )}
                  {selectedMessage.status === 'archived' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(selectedMessage._id, 'new')}
                    >
                      Mark as New
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(selectedMessage._id)}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Mail className="w-16 h-16 text-gray-300 dark:text-dark-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Select a message
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click on a message from the list to view details
                </p>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Mail className="w-16 h-16 text-gray-300 dark:text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            No messages
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {filter === 'all' ? 'No messages yet' : `No ${filter} messages`}
          </p>
        </Card>
      )}
    </div>
  );
}
