import Project from '../models/Project.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const { category, featured, search, limit = 10, page = 1 } = req.query;

  const query = { isPublished: true };

  if (category) query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const projects = await Project.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await Project.countDocuments(query);

  res.status(200).json({
    success: true,
    count: projects.length,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    data: projects
  });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  // Increment views
  project.stats.views += 1;
  await project.save();

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Get project by slug
// @route   GET /api/projects/slug/:slug
// @access  Public
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Get all categories
// @route   GET /api/projects/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Project.distinct('category');

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
});

// Admin routes

// @desc    Get all projects (admin)
// @route   GET /api/admin/projects
// @access  Private/Admin
export const adminGetProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

// @desc    Create project
// @route   POST /api/admin/projects
// @access  Private/Admin
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project
  });
});

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private/Admin
export const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: project
  });
});

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private/Admin
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
});
