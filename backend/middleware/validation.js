import { body, param, query, validationResult } from 'express-validator';

// Validation result middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Auth validations
export const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

// Project validations
export const projectValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title too long'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('featuredImage').notEmpty().withMessage('Featured image is required'),
  validate
];

// Service validations
export const serviceValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
  body('fullDescription').notEmpty().withMessage('Full description is required'),
  body('icon').notEmpty().withMessage('Icon is required'),
  validate
];

// Testimonial validations
export const testimonialValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  validate
];

// Job listing validations
export const jobListingValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('type').notEmpty().withMessage('Job type is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('description').notEmpty().withMessage('Description is required'),
  validate
];

// Contact message validations
export const contactValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
  validate
];

// Team member validations
export const teamMemberValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('avatar').notEmpty().withMessage('Avatar is required'),
  validate
];

// ID param validator
export const idParamValidator = [
  param('id').isMongoId().withMessage('Invalid ID format'),
  validate
];
