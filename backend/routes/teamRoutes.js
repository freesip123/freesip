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

// Admin routes (must be before public routes to avoid conflicts)
router.route('/admin')
  .get(protect, admin, adminGetTeamMembers)
  .post(protect, admin, teamMemberValidator, createTeamMember);

router.route('/admin/:id')
  .put(protect, admin, idParamValidator, updateTeamMember)
  .delete(protect, admin, idParamValidator, deleteTeamMember);

// Public routes
router.get('/:id', getTeamMember);
router.get('/', getTeamMembers);

export default router;
