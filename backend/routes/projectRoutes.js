import express from 'express';
import {
  getProjects,
  getProject,
  getProjectBySlug,
  getCategories,
  adminGetProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect, admin } from '../middleware/auth.js';
import { projectValidator, idParamValidator } from '../middleware/validation.js';

const router = express.Router();

// Admin routes (must be before public routes to avoid conflicts)
router.route('/admin')
  .get(protect, admin, adminGetProjects)
  .post(protect, admin, projectValidator, createProject);

router.route('/admin/:id')
  .put(protect, admin, idParamValidator, updateProject)
  .delete(protect, admin, idParamValidator, deleteProject);

// Public routes
router.get('/categories', getCategories);
router.get('/slug/:slug', getProjectBySlug);
router.get('/:id', getProject);
router.get('/', getProjects);

export default router;
