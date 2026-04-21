import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  getMe: '/auth/me',

  // Projects
  getProjects: '/projects',
  getProject: (id) => `/projects/${id}`,
  getProjectBySlug: (slug) => `/projects/slug/${slug}`,
  getCategories: '/projects/categories',

  // Services
  getServices: '/services',
  getService: (id) => `/services/${id}`,
  getServiceBySlug: (slug) => `/services/slug/${slug}`,

  // Testimonials
  getTestimonials: '/testimonials',

  // Jobs
  getJobs: '/jobs',
  getJob: (id) => `/jobs/${id}`,
  getJobBySlug: (slug) => `/jobs/slug/${slug}`,

  // Team
  getTeam: '/team',

  // Contact
  submitContact: '/contact',

  // Analytics
  getStats: '/analytics/stats',
};

// Public API methods
export const publicApi = {
  // Projects
  getProjects: (params) => api.get(apiEndpoints.getProjects(), { params }),
  getProjectBySlug: (slug) => api.get(apiEndpoints.getProjectBySlug(slug)),
  getCategories: () => api.get(apiEndpoints.getCategories()),

  // Services
  getServices: (params) => api.get(apiEndpoints.getServices(), { params }),
  getServiceBySlug: (slug) => api.get(apiEndpoints.getServiceBySlug(slug)),

  // Testimonials
  getTestimonials: (params) => api.get(apiEndpoints.getTestimonials(), { params }),

  // Jobs
  getJobs: (params) => api.get(apiEndpoints.getJobs(), { params }),
  getJobBySlug: (slug) => api.get(apiEndpoints.getJobBySlug(slug)),

  // Team
  getTeam: (params) => api.get(apiEndpoints.getTeam(), { params }),

  // Contact
  submitContact: (data) => api.post(apiEndpoints.submitContact, data),

  // Stats
  getStats: () => api.get(apiEndpoints.getStats()),
};

// Admin API methods
export const adminApi = {
  // Auth
  login: (credentials) => api.post(apiEndpoints.login, credentials),
  getMe: () => api.get(apiEndpoints.getMe),

  // Projects
  getProjects: () => api.get('/admin/projects'),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // Services
  getServices: () => api.get('/admin/services'),
  createService: (data) => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}`),

  // Testimonials
  getTestimonials: () => api.get('/admin/testimonials'),
  createTestimonial: (data) => api.post('/admin/testimonials', data),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),

  // Jobs
  getJobs: () => api.get('/admin/jobs'),
  createJob: (data) => api.post('/admin/jobs', data),
  updateJob: (id, data) => api.put(`/admin/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/admin/jobs/${id}`),

  // Team
  getTeam: () => api.get('/admin/team'),
  createTeamMember: (data) => api.post('/admin/team', data),
  updateTeamMember: (id, data) => api.put(`/admin/team/${id}`, data),
  deleteTeamMember: (id) => api.delete(`/admin/team/${id}`),

  // Contact
  getContactMessages: (params) => api.get('/contact', { params }),
  getContactMessage: (id) => api.get(`/contact/${id}`),
  updateContactMessage: (id, data) => api.put(`/contact/${id}`, data),
  deleteContactMessage: (id) => api.delete(`/contact/${id}`),
  getContactStats: () => api.get('/contact/stats'),

  // Analytics
  getAnalytics: () => api.get('/analytics'),
};

export default api;
