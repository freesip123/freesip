import express from 'express';
import {
  getServices,
  getService,
  getServiceBySlug,
  adminGetServices,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/auth.js';
import { serviceValidator, idParamValidator } from '../middleware/validation.js';

const router = express.Router();

// Admin routes (must be before public routes to avoid conflicts)
router.route('/admin')
  .get(protect, admin, adminGetServices)
  .post(protect, admin, serviceValidator, createService);

router.route('/admin/:id')
  .put(protect, admin, idParamValidator, updateService)
  .delete(protect, admin, idParamValidator, deleteService);

// Public routes
router.get('/slug/:slug', getServiceBySlug);
router.get('/:id', getService);
router.get('/', getServices);

export default router;
