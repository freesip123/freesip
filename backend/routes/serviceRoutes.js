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

// Public routes
router.get('/slug/:slug', getServiceBySlug);
router.get('/:id', getService);
router.get('/', getServices);

// Admin routes
router.use('/admin', protect, admin);

router.get('/', adminGetServices);
router.post('/', serviceValidator, createService);
router.put('/:id', idParamValidator, updateService);
router.delete('/:id', idParamValidator, deleteService);

export default router;
