import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a service title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Please provide a short description'],
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  fullDescription: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
    description: 'Icon name from lucide-react or SVG path'
  },
  features: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  pricing: {
    startingAt: String,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  order: {
    type: Number,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug from title
serviceSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
