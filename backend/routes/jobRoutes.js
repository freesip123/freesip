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

// Public routes
router.get('/slug/:slug', getJobBySlug);
router.get('/:id', getJob);
router.get('/', getJobs);

// Admin routes
router.use('/admin', protect, admin);

router.get('/', adminGetJobs);
router.post('/', jobListingValidator, createJob);
router.put('/:id', idParamValidator, updateJob);
router.delete('/:id', idParamValidator, deleteJob);

export default router;
