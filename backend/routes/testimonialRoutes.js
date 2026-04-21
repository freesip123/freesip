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

// Public routes
router.get('/:id', getTestimonial);
router.get('/', getTestimonials);

// Admin routes
router.use('/admin', protect, admin);

router.get('/', adminGetTestimonials);
router.post('/', testimonialValidator, createTestimonial);
router.put('/:id', idParamValidator, updateTestimonial);
router.delete('/:id', idParamValidator, deleteTestimonial);

export default router;
