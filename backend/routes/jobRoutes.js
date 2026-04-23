import express from 'express';
import {
  getJobs,
  getJob,
  getJobBySlug,
  adminGetJobs,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import { protect, admin } from '../middleware/auth.js';
import { jobListingValidator, idParamValidator } from '../middleware/validation.js';

const router = express.Router();

// Admin routes (must be before public routes to avoid conflicts)
router.route('/admin')
  .get(protect, admin, adminGetJobs)
  .post(protect, admin, jobListingValidator, createJob);

router.route('/admin/:id')
  .put(protect, admin, idParamValidator, updateJob)
  .delete(protect, admin, idParamValidator, deleteJob);

// Public routes
router.get('/slug/:slug', getJobBySlug);
router.get('/:id', getJob);
router.get('/', getJobs);

export default router;
