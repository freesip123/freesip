import express from 'express';
import {
  getTestimonials,
  getTestimonial,
  adminGetTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect, admin } from '../middleware/auth.js';
import { testimonialValidator, idParamValidator } from '../middleware/validation.js';

const router = express.Router();

// Admin routes (must be before public routes to avoid conflicts)
router.route('/admin')
  .get(protect, admin, adminGetTestimonials)
  .post(protect, admin, testimonialValidator, createTestimonial);

router.route('/admin/:id')
  .put(protect, admin, idParamValidator, updateTestimonial)
  .delete(protect, admin, idParamValidator, deleteTestimonial);

// Public routes
router.get('/:id', getTestimonial);
router.get('/', getTestimonials);

export default router;
