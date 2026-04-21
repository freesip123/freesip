import JobListing from '../models/JobListing.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all job listings
// @route   GET /api/jobs
// @access  Public
export const getJobs = asyncHandler(async (req, res) => {
  const { department, type, remote, search } = req.query;

  const query = { isActive: true };

  if (department) query.department = department;
  if (type) query.type = type;
  if (remote === 'true') query.isRemote = true;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const jobs = await JobListing.find(query).sort({ isFeatured: -1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs
  });
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = asyncHandler(async (req, res) => {
  const job = await JobListing.findById(req.params.id);

  if (!job) {
    throw new AppError('Job listing not found', 404);
  }

  res.status(200).json({
    success: true,
    data: job
  });
});

// @desc    Get job by slug
// @route   GET /api/jobs/slug/:slug
// @access  Public
export const getJobBySlug = asyncHandler(async (req, res) => {
  const job = await JobListing.findOne({ slug: req.params.slug });

  if (!job) {
    throw new AppError('Job listing not found', 404);
  }

  res.status(200).json({
    success: true,
    data: job
  });
});

// Admin routes

// @desc    Get all jobs (admin)
// @route   GET /api/admin/jobs
// @access  Private/Admin
export const adminGetJobs = asyncHandler(async (req, res) => {
  const jobs = await JobListing.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs
  });
});

// @desc    Create job
// @route   POST /api/admin/jobs
// @access  Private/Admin
export const createJob = asyncHandler(async (req, res) => {
  const job = await JobListing.create(req.body);

  res.status(201).json({
    success: true,
    data: job
  });
});

// @desc    Update job
// @route   PUT /api/admin/jobs/:id
// @access  Private/Admin
export const updateJob = asyncHandler(async (req, res) => {
  let job = await JobListing.findById(req.params.id);

  if (!job) {
    throw new AppError('Job listing not found', 404);
  }

  job = await JobListing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: job
  });
});

// @desc    Delete job
// @route   DELETE /api/admin/jobs/:id
// @access  Private/Admin
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await JobListing.findById(req.params.id);

  if (!job) {
    throw new AppError('Job listing not found', 404);
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Job listing deleted successfully'
  });
});
