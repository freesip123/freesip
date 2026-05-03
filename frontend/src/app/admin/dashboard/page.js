'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  Briefcase,
  Star,
  MessageSquare,
  Users,
  TrendingUp,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { adminApi } from '@/lib/api';
import toast from 'react-hot-toast';

const statCards = [
  { key: 'projects', label: 'Total Projects', icon: FolderOpen, color: 'from-blue-500 to-cyan-500' },
  { key: 'services', label: 'Active Services', icon: Briefcase, color: 'from-purple-500 to-pink-500' },
  { key: 'testimonials', label: 'Testimonials', icon: Star, color: 'from-orange-500 to-red-500' },
  { key: 'totalMessages', label: 'Total Messages', icon: MessageSquare, color: 'from-green-500 to-teal-500' },
  { key: 'newMessages', label: 'New Messages', icon: MessageSquare, color: 'from-indigo-500 to-blue-500' },
  { key: 'teamMembers', label: 'Team Members', icon: Users, color: 'from-pink-500 to-rose-500' },
];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await adminApi.getAnalytics();
        setAnalytics(response.data.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  const { overview, featured, recent, trends } = analytics || {};

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
         {"Welcome back! Here's what's happening with your content."}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {overview?.[stat.key] || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Featured content stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Featured Projects</h3>
            <FolderOpen className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {featured?.projects || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Projects highlighted on homepage
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Featured Testimonials</h3>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {featured?.testimonials || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Testimonials displayed on homepage
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Popular Services</h3>
            <Briefcase className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {featured?.popularServices || 0}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Services marked as most popular
          </p>
        </Card>
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent projects */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Recent Projects</h3>
            <a href="/admin/projects" className="text-sm text-blue-500 hover:text-blue-600">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {recent?.projects?.map((project, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{project.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{project.category}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  project.isPublished
                    ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {project.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
            {(!recent?.projects || recent.projects.length === 0) && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No projects yet</p>
            )}
          </div>
        </Card>

        {/* Recent messages */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Recent Messages</h3>
            <a href="/admin/messages" className="text-sm text-blue-500 hover:text-blue-600">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {recent?.messages?.map((message, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{message.subject}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{message.name}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                  message.status === 'new'
                    ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                    : message.status === 'replied'
                    ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {message.status}
                </span>
              </div>
            ))}
            {(!recent?.messages || recent.messages.length === 0) && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No messages yet</p>
            )}
          </div>
        </Card>
      </div>

      {/* Messages trend */}
      {trends?.messagesLast7Days && trends.messagesLast7Days.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white">Messages (Last 7 Days)</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-end justify-between h-32 gap-2">
            {trends.messagesLast7Days.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-300"
                  style={{ height: `${(day.count / Math.max(...trends.messagesLast7Days.map(d => d.count))) * 100}%` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(day._id).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
