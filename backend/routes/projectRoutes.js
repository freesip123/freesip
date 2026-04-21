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

// Public routes
router.get('/categories', getCategories);
router.get('/slug/:slug', getProjectBySlug);
router.get('/:id', getProject);
router.get('/', getProjects);

// Admin routes
router.use('/admin', protect, admin);

router.get('/', adminGetProjects);
router.post('/', projectValidator, createProject);
router.put('/:id', idParamValidator, updateProject);
router.delete('/:id', idParamValidator, deleteProject);

export default router;
