import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  longDescription: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['web-development', 'mobile-app', 'saas', 'ui-ux', 'api-development', 'other']
  },
  technologies: [{
    type: String
  }],
  images: [{
    url: String,
    caption: String
  }],
  featuredImage: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String,
    default: ''
  },
  repoUrl: {
    type: String,
    default: ''
  },
  client: {
    name: String,
    logo: String
  },
  duration: {
    type: String,
    default: ''
  },
  year: {
    type: Number,
    default: () => new Date().getFullYear()
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from title
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
