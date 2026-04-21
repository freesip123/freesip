import express from 'express';
import {
  submitContact,
  getContactMessages,
  getContactMessage,
  updateContactMessage,
  deleteContactMessage,
  getContactStats
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/auth.js';
import { contactValidator, idParamValidator } from '../middleware/validation.js';

const router = express.Router();

// Public route
router.post('/', contactValidator, submitContact);

// Admin routes
router.use(protect, admin);

router.get('/stats', getContactStats);
router.get('/', getContactMessages);
router.get('/:id', idParamValidator, getContactMessage);
router.put('/:id', idParamValidator, updateContactMessage);
router.delete('/:id', idParamValidator, deleteContactMessage);

export default router;
