import TeamMember from '../models/TeamMember.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getTeamMembers = asyncHandler(async (req, res) => {
  const { featured } = req.query;

  const query = { isActive: true };

  if (featured === 'true') query.isFeatured = true;

  const members = await TeamMember.find(query).sort({ order: 1, name: 1 });

  res.status(200).json({
    success: true,
    count: members.length,
    data: members
  });
});

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
export const getTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    throw new AppError('Team member not found', 404);
  }

  res.status(200).json({
    success: true,
    data: member
  });
});

// Admin routes

// @desc    Get all team members (admin)
// @route   GET /api/admin/team
// @access  Private/Admin
export const adminGetTeamMembers = asyncHandler(async (req, res) => {
  const members = await TeamMember.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: members.length,
    data: members
  });
});

// @desc    Create team member
// @route   POST /api/admin/team
// @access  Private/Admin
export const createTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.create(req.body);

  res.status(201).json({
    success: true,
    data: member
  });
});

// @desc    Update team member
// @route   PUT /api/admin/team/:id
// @access  Private/Admin
export const updateTeamMember = asyncHandler(async (req, res) => {
  let member = await TeamMember.findById(req.params.id);

  if (!member) {
    throw new AppError('Team member not found', 404);
  }

  member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: member
  });
});

// @desc    Delete team member
// @route   DELETE /api/admin/team/:id
// @access  Private/Admin
export const deleteTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    throw new AppError('Team member not found', 404);
  }

  await member.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Team member deleted successfully'
  });
});
