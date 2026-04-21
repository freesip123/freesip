import Service from '../models/Service.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = asyncHandler(async (req, res) => {
  const { active, popular } = req.query;

  const query = { isActive: true };

  if (popular === 'true') query.isPopular = true;

  const services = await Service.find(query).sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    throw new AppError('Service not found', 404);
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Get service by slug
// @route   GET /api/services/slug/:slug
// @access  Public
export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });

  if (!service) {
    throw new AppError('Service not found', 404);
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// Admin routes

// @desc    Get all services (admin)
// @route   GET /api/admin/services
// @access  Private/Admin
export const adminGetServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
});

// @desc    Create service
// @route   POST /api/admin/services
// @access  Private/Admin
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    data: service
  });
});

// @desc    Update service
// @route   PUT /api/admin/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req, res) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    throw new AppError('Service not found', 404);
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Delete service
// @route   DELETE /api/admin/services/:id
// @access  Private/Admin
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    throw new AppError('Service not found', 404);
  }

  await service.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully'
  });
});
