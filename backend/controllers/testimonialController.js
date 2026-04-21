import Testimonial from '../models/Testimonial.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = asyncHandler(async (req, res) => {
  const { featured, limit } = req.query;

  const query = { isPublished: true };

  if (featured === 'true') query.isFeatured = true;

  let queryBuilder = Testimonial.find(query).sort({ order: 1, createdAt: -1 });

  if (limit) {
    queryBuilder = queryBuilder.limit(parseInt(limit));
  }

  const testimonials = await queryBuilder;

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
export const getTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// Admin routes

// @desc    Get all testimonials (admin)
// @route   GET /api/admin/testimonials
// @access  Private/Admin
export const adminGetTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

// @desc    Create testimonial
// @route   POST /api/admin/testimonials
// @access  Private/Admin
export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    success: true,
    data: testimonial
  });
});

// @desc    Update testimonial
// @route   PUT /api/admin/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = asyncHandler(async (req, res) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/admin/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  await testimonial.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Testimonial deleted successfully'
  });
});
