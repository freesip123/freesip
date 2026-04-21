import express from 'express';
import { getAnalytics, getPublicStats } from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/stats', getPublicStats);

// Admin route
router.get('/', protect, admin, getAnalytics);

export default router;
