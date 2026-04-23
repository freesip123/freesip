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
  getProjects: () => api.get('/projects/admin'),
  createProject: (data) => api.post('/projects/admin', data),
  updateProject: (id, data) => api.put(`/projects/admin/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/admin/${id}`),

  // Services
  getServices: () => api.get('/services/admin'),
  createService: (data) => api.post('/services/admin', data),
  updateService: (id, data) => api.put(`/services/admin/${id}`, data),
  deleteService: (id) => api.delete(`/services/admin/${id}`),

  // Testimonials
  getTestimonials: () => api.get('/testimonials/admin'),
  createTestimonial: (data) => api.post('/testimonials/admin', data),
  updateTestimonial: (id, data) => api.put(`/testimonials/admin/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/testimonials/admin/${id}`),

  // Jobs
  getJobs: () => api.get('/jobs/admin'),
  createJob: (data) => api.post('/jobs/admin', data),
  updateJob: (id, data) => api.put(`/jobs/admin/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/admin/${id}`),

  // Team
  getTeam: () => api.get('/team/admin'),
  createTeamMember: (data) => api.post('/team/admin', data),
  updateTeamMember: (id, data) => api.put(`/team/admin/${id}`, data),
  deleteTeamMember: (id) => api.delete(`/team/admin/${id}`),

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
