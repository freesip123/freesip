import express from 'express';
import {
  getTeamMembers,
  getTeamMember,
  adminGetTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController.js';
import { protect, admin } from '../middleware/auth.js';
import { teamMemberValidator, idParamValidator } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/:id', getTeamMember);
router.get('/', getTeamMembers);

// Admin routes
router.use('/admin', protect, admin);

router.get('/', adminGetTeamMembers);
router.post('/', teamMemberValidator, createTeamMember);
router.put('/:id', idParamValidator, updateTeamMember);
router.delete('/:id', idParamValidator, deleteTeamMember);

export default router;
