import ContactMessage from '../models/ContactMessage.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { sendContactEmail, sendContactConfirmation } from '../utils/emailService.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, company, subject, message, service, budget } = req.body;

  // Create contact message
  const contactMessage = await ContactMessage.create({
    name,
    email,
    phone,
    company,
    subject,
    message,
    service,
    budget,
    ipAddress: req.ip,
    userAgent: req.get('user-agent')
  });

  // Send emails (non-blocking)
  try {
    await Promise.all([
      sendContactEmail(contactMessage),
      sendContactConfirmation(contactMessage)
    ]);
  } catch (emailError) {
    console.error('Email sending failed:', emailError);
    // Don't fail the request if email fails
  }

  res.status(201).json({
    success: true,
    message: 'Thank you for contacting us! We will get back to you soon.',
    data: contactMessage
  });
});

// @desc    Get all contact messages (admin)
// @route   GET /api/admin/contact
// @access  Private/Admin
export const getContactMessages = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) query.status = status;

  const messages = await ContactMessage.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await ContactMessage.countDocuments(query);

  res.status(200).json({
    success: true,
    count: messages.length,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    data: messages
  });
});

// @desc    Get single contact message
// @route   GET /api/admin/contact/:id
// @access  Private/Admin
export const getContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    throw new AppError('Contact message not found', 404);
  }

  // Mark as read
  if (message.status === 'new') {
    message.status = 'read';
    await message.save();
  }

  res.status(200).json({
    success: true,
    data: message
  });
});

// @desc    Update contact message status
// @route   PUT /api/admin/contact/:id
// @access  Private/Admin
export const updateContactMessage = asyncHandler(async (req, res) => {
  const { status } = req.body;

  let message = await ContactMessage.findById(req.params.id);

  if (!message) {
    throw new AppError('Contact message not found', 404);
  }

  if (status) message.status = status;

  message = await message.save();

  res.status(200).json({
    success: true,
    data: message
  });
});

// @desc    Delete contact message
// @route   DELETE /api/admin/contact/:id
// @access  Private/Admin
export const deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    throw new AppError('Contact message not found', 404);
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Contact message deleted successfully'
  });
});

// @desc    Get contact stats
// @route   GET /api/admin/contact/stats
// @access  Private/Admin
export const getContactStats = asyncHandler(async (req, res) => {
  const total = await ContactMessage.countDocuments();
  const newMessages = await ContactMessage.countDocuments({ status: 'new' });
  const replied = await ContactMessage.countDocuments({ status: 'replied' });

  // Messages by service
  const byService = await ContactMessage.aggregate([
    { $group: { _id: '$service', count: { $sum: 1 } } }
  ]);

  // Messages this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const thisMonth = await ContactMessage.countDocuments({
    createdAt: { $gte: startOfMonth }
  });

  res.status(200).json({
    success: true,
    data: {
      total,
      new: newMessages,
      replied,
      thisMonth,
      byService
    }
  });
});
