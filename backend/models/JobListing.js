import mongoose from 'mongoose';

const jobListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  department: {
    type: String,
    required: true,
    enum: ['engineering', 'design', 'product', 'marketing', 'sales', 'operations', 'other']
  },
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote']
  },
  location: {
    type: String,
    required: true
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  description: {
    type: String,
    required: true
  },
  responsibilities: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  experience: {
    type: String,
    default: ''
  },
  applicationDeadline: {
    type: Date
  },
  openings: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create slug from title
jobListingSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

export default JobListing;
