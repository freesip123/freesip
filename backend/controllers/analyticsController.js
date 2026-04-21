import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import JobListing from '../models/JobListing.js';
import ContactMessage from '../models/ContactMessage.js';
import TeamMember from '../models/TeamMember.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
export const getAnalytics = asyncHandler(async (req, res) => {
  // Get counts
  const projectsCount = await Project.countDocuments();
  const servicesCount = await Service.countDocuments();
  const testimonialsCount = await Testimonial.countDocuments();
  const jobsCount = await JobListing.countDocuments({ isActive: true });
  const teamCount = await TeamMember.countDocuments({ isActive: true });
  const messagesCount = await ContactMessage.countDocuments();
  const newMessagesCount = await ContactMessage.countDocuments({ status: 'new' });

  // Get recent projects
  const recentProjects = await Project.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('title category isPublished createdAt');

  // Get recent messages
  const recentMessages = await ContactMessage.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name email subject status createdAt');

  // Get featured content
  const featuredProjects = await Project.countDocuments({ isFeatured: true });
  const featuredTestimonials = await Testimonial.countDocuments({ isFeatured: true });
  const popularServices = await Service.countDocuments({ isPopular: true });

  // Messages trend (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const messagesLast7Days = await ContactMessage.aggregate([
    {
      $match: { createdAt: { $gte: sevenDaysAgo } }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      overview: {
        projects: projectsCount,
        services: servicesCount,
        testimonials: testimonialsCount,
        activeJobs: jobsCount,
        teamMembers: teamCount,
        totalMessages: messagesCount,
        newMessages: newMessagesCount
      },
      featured: {
        projects: featuredProjects,
        testimonials: featuredTestimonials,
        popularServices
      },
      recent: {
        projects: recentProjects,
        messages: recentMessages
      },
      trends: {
        messagesLast7Days
      }
    }
  });
});

// @desc    Get public stats
// @route   GET /api/stats
// @access  Public
export const getPublicStats = asyncHandler(async (req, res) => {
  const projectsCount = await Project.countDocuments({ isPublished: true });
  const testimonialsCount = await Testimonial.countDocuments({ isPublished: true });

  // Count unique clients from projects
  const projects = await Project.find({ isPublished: true }).select('client');
  const uniqueClients = new Set(
    projects.filter(p => p.client?.name).map(p => p.client.name)
  ).size;

  // Years of experience (hardcoded or from config)
  const yearsExperience = 5;
  const completedProjects = projectsCount;

  res.status(200).json({
    success: true,
    data: {
      projectsCompleted: completedProjects,
      happyClients: uniqueClients || Math.floor(completedProjects * 0.8),
      yearsExperience,
      testimonialsCount
    }
  });
});
