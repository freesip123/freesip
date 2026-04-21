import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import JobListing from '../models/JobListing.js';
import TeamMember from '../models/TeamMember.js';

dotenv.config();

// Sample data
const users = [
  {
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || 'admin@freesip.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123456',
    role: 'admin'
  }
];

const services = [
  {
    title: 'Web Development',
    slug: 'web-development',
    shortDescription: 'Custom web applications built with modern technologies for optimal performance.',
    fullDescription: 'We create stunning, responsive, and high-performance web applications using cutting-edge technologies like React, Next.js, Node.js, and more. Our team ensures your website is fast, secure, and scalable.',
    icon: 'Code',
    features: ['Custom Web Applications', 'E-commerce Solutions', 'CMS Development', 'Progressive Web Apps', 'API Integration'],
    benefits: ['Fast Loading Times', 'Mobile Responsive', 'SEO Optimized', 'Secure & Scalable'],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL'],
    isPopular: true,
    order: 1
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    shortDescription: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    fullDescription: 'From concept to deployment, we build mobile applications that users love. Whether you need iOS, Android, or cross-platform solutions, our team delivers apps that are intuitive, performant, and reliable.',
    icon: 'Smartphone',
    features: ['iOS Development', 'Android Development', 'Cross-Platform Apps', 'App Store Optimization', 'Maintenance & Support'],
    benefits: ['Native Performance', 'Intuitive UX', 'Offline Capabilities', 'Push Notifications'],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    isPopular: true,
    order: 2
  },
  {
    title: 'SaaS Development',
    slug: 'saas-development',
    shortDescription: 'Scalable software-as-a-service solutions for modern businesses.',
    fullDescription: 'Transform your business idea into a fully-functional SaaS product. We handle everything from architecture design to deployment, ensuring your platform can scale with your growing user base.',
    icon: 'Cloud',
    features: ['Multi-tenant Architecture', 'Subscription Management', 'Analytics Dashboard', 'User Management', 'Third-party Integrations'],
    benefits: ['Recurring Revenue Model', 'Automatic Updates', 'Cloud-based Access', 'Scalable Infrastructure'],
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'GraphQL'],
    isPopular: true,
    order: 3
  },
  {
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    shortDescription: 'Beautiful, intuitive designs that enhance user engagement and satisfaction.',
    fullDescription: 'Great design is invisible. Our UI/UX team creates interfaces that are not only visually stunning but also intuitive and user-friendly. We conduct user research, create wireframes, and deliver pixel-perfect designs.',
    icon: 'Palette',
    features: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Design Systems', 'Usability Testing'],
    benefits: ['Increased Conversion', 'Better User Retention', 'Brand Consistency', 'Reduced Support Costs'],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer'],
    order: 4
  },
  {
    title: 'API Development',
    slug: 'api-development',
    shortDescription: 'Robust and secure APIs that power your applications and integrations.',
    fullDescription: 'We design and develop RESTful and GraphQL APIs that are secure, well-documented, and easy to integrate. Our APIs follow best practices for authentication, rate limiting, and versioning.',
    icon: 'Server',
    features: ['RESTful APIs', 'GraphQL APIs', 'API Documentation', 'Authentication & Authorization', 'Rate Limiting'],
    benefits: ['Seamless Integrations', 'High Performance', 'Secure by Design', 'Well Documented'],
    technologies: ['Express', 'FastAPI', 'GraphQL', 'Swagger', 'Postman'],
    order: 5
  },
  {
    title: 'Cloud Solutions',
    slug: 'cloud-solutions',
    shortDescription: 'Scalable cloud infrastructure and DevOps services for modern applications.',
    fullDescription: 'Leverage the power of cloud computing with our infrastructure and DevOps services. We help you migrate, optimize, and manage your applications on AWS, Azure, or Google Cloud.',
    icon: 'CloudCog',
    features: ['Cloud Migration', 'Infrastructure Setup', 'CI/CD Pipelines', 'Monitoring & Logging', 'Cost Optimization'],
    benefits: ['High Availability', 'Auto Scaling', 'Disaster Recovery', 'Cost Efficient'],
    technologies: ['AWS', 'Azure', 'GCP', 'Terraform', 'Jenkins'],
    order: 6
  }
];

const projects = [
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured online shopping platform with inventory management and payment integration.',
    longDescription: 'We built a comprehensive e-commerce solution for a retail client, featuring product catalog management, shopping cart, multiple payment gateways, order tracking, and an admin dashboard for inventory management.',
    category: 'web-development',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    featuredImage: '/images/projects/ecommerce.jpg',
    images: [
      { url: '/images/projects/ecommerce-1.jpg', caption: 'Homepage' },
      { url: '/images/projects/ecommerce-2.jpg', caption: 'Product Page' }
    ],
    liveUrl: 'https://example-ecommerce.com',
    client: { name: 'RetailCo', logo: '/images/clients/retailco.png' },
    duration: '4 months',
    year: 2025,
    isFeatured: true,
    stats: { views: 1250, likes: 89 }
  },
  {
    title: 'Healthcare Management App',
    slug: 'healthcare-management-app',
    description: 'Mobile application for patient management and appointment scheduling.',
    longDescription: 'A comprehensive healthcare management app that allows patients to book appointments, view medical records, and communicate with healthcare providers. Includes features for doctors to manage schedules and patient data.',
    category: 'mobile-app',
    technologies: ['React Native', 'Firebase', 'Redux', 'Twilio'],
    featuredImage: '/images/projects/healthcare.jpg',
    images: [
      { url: '/images/projects/healthcare-1.jpg', caption: 'Dashboard' },
      { url: '/images/projects/healthcare-2.jpg', caption: 'Appointment Booking' }
    ],
    duration: '6 months',
    year: 2025,
    isFeatured: true,
    stats: { views: 980, likes: 72 }
  },
  {
    title: 'Project Management SaaS',
    slug: 'project-management-saas',
    description: 'Collaborative project management tool with real-time updates and team features.',
    longDescription: 'A SaaS platform for teams to collaborate on projects, track tasks, manage deadlines, and communicate in real-time. Features include Kanban boards, Gantt charts, time tracking, and team analytics.',
    category: 'saas',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'AWS'],
    featuredImage: '/images/projects/saas-pm.jpg',
    images: [
      { url: '/images/projects/saas-pm-1.jpg', caption: 'Dashboard' },
      { url: '/images/projects/saas-pm-2.jpg', caption: 'Kanban Board' }
    ],
    liveUrl: 'https://example-pm.com',
    duration: '8 months',
    year: 2024,
    isFeatured: true,
    stats: { views: 1540, likes: 126 }
  },
  {
    title: 'Finance Dashboard',
    slug: 'finance-dashboard',
    description: 'Real-time financial data visualization and analytics dashboard.',
    longDescription: 'An interactive dashboard for tracking financial metrics, stock prices, and portfolio performance. Features real-time data updates, customizable widgets, and export capabilities.',
    category: 'ui-ux',
    technologies: ['React', 'D3.js', 'Tailwind CSS', 'WebSocket'],
    featuredImage: '/images/projects/finance.jpg',
    images: [
      { url: '/images/projects/finance-1.jpg', caption: 'Main Dashboard' },
      { url: '/images/projects/finance-2.jpg', caption: 'Analytics View' }
    ],
    duration: '3 months',
    year: 2025,
    stats: { views: 760, likes: 54 }
  },
  {
    title: 'Restaurant Ordering API',
    slug: 'restaurant-ordering-api',
    description: 'Scalable REST API for food ordering and delivery management system.',
    longDescription: 'A robust API backend for a food delivery platform, handling restaurant management, menu catalogs, order processing, payment integration, and delivery tracking.',
    category: 'api-development',
    technologies: ['Express', 'MongoDB', 'Redis', 'RabbitMQ', 'Stripe'],
    featuredImage: '/images/projects/restaurant-api.jpg',
    duration: '5 months',
    year: 2024,
    stats: { views: 620, likes: 41 }
  },
  {
    title: 'Real Estate Platform',
    slug: 'real-estate-platform',
    description: 'Property listing and management platform with virtual tours.',
    longDescription: 'A comprehensive real estate platform featuring property listings, advanced search filters, virtual property tours, agent profiles, and mortgage calculator.',
    category: 'web-development',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Three.js', 'Mapbox'],
    featuredImage: '/images/projects/realestate.jpg',
    images: [
      { url: '/images/projects/realestate-1.jpg', caption: 'Listing Page' },
      { url: '/images/projects/realestate-2.jpg', caption: 'Virtual Tour' }
    ],
    liveUrl: 'https://example-realestate.com',
    duration: '6 months',
    year: 2024,
    stats: { views: 890, likes: 67 }
  }
];

const testimonials = [
  {
    name: 'Dilip Joshi',
    role: 'CEO',
    company: 'TechStart Inc.',
    avatar: '/images/testimonials/sarah.jpg',
    content: 'Freesip transformed our vision into a stunning product. Their team\'s expertise in modern technologies and attention to detail exceeded our expectations. Highly recommended!',
    rating: 5,
    isFeatured: true,
    order: 1
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateCorp',
    avatar: '/images/testimonials/michael.jpg',
    content: 'Working with Freesip was a game-changer for our business. They delivered our SaaS platform on time and within budget. The quality of their work is outstanding.',
    rating: 5,
    isFeatured: true,
    order: 2
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'HealthFirst',
    avatar: '/images/testimonials/emily.jpg',
    content: 'The mobile app Freesip built for us has received amazing feedback from our users. Their understanding of UX principles and technical execution is top-notch.',
    rating: 5,
    isFeatured: true,
    order: 3
  },
  {
    name: 'David Park',
    role: 'CTO',
    company: 'FinanceFlow',
    avatar: '/images/testimonials/david.jpg',
    content: 'Exceptional API development skills. The system they built handles our high traffic loads seamlessly. Great communication throughout the project.',
    rating: 5,
    order: 4
  }
];

const teamMembers = [
  {
    name: 'Alex Thompson',
    role: 'CEO & Founder',
    bio: '15+ years in software development. Previously led engineering teams at Fortune 500 companies.',
    avatar: '/images/team/alex.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alexthompson',
      twitter: 'https://twitter.com/alexthompson',
      github: 'https://github.com/alexthompson'
    },
    isFeatured: true,
    order: 1
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    bio: 'Full-stack architect with expertise in cloud infrastructure and scalable systems.',
    avatar: '/images/team/priya.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/priyasharma',
      github: 'https://github.com/priyasharma'
    },
    isFeatured: true,
    order: 2
  },
  {
    name: 'Marcus Williams',
    role: 'Lead Designer',
    bio: 'Award-winning UI/UX designer passionate about creating intuitive digital experiences.',
    avatar: '/images/team/marcus.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/marcuswilliams',
      website: 'https://marcuswilliams.design'
    },
    isFeatured: true,
    order: 3
  },
  {
    name: 'Lisa Chang',
    role: 'Head of Mobile',
    bio: 'Mobile development expert with 10+ years building iOS and Android applications.',
    avatar: '/images/team/lisa.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/lisachang',
      github: 'https://github.com/lisachang'
    },
    isFeatured: true,
    order: 4
  }
];

const jobListings = [
  {
    title: 'Senior Full Stack Developer',
    slug: 'senior-full-stack-developer',
    department: 'engineering',
    type: 'full-time',
    location: 'San Francisco, CA',
    isRemote: true,
    salary: { min: 120000, max: 180000, period: 'yearly' },
    description: 'We\'re looking for an experienced Full Stack Developer to join our growing team.',
    responsibilities: [
      'Design and implement scalable web applications',
      'Collaborate with cross-functional teams',
      'Mentor junior developers',
      'Participate in code reviews'
    ],
    requirements: [
      '5+ years of experience in full stack development',
      'Proficiency in React, Node.js, and databases',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong problem-solving skills'
    ],
    benefits: ['Competitive salary', 'Health insurance', 'Remote work options', 'Learning budget'],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    isFeatured: true
  },
  {
    title: 'UI/UX Designer',
    slug: 'ui-ux-designer',
    department: 'design',
    type: 'full-time',
    location: 'New York, NY',
    isRemote: true,
    salary: { min: 90000, max: 140000, period: 'yearly' },
    description: 'Join our design team to create beautiful and intuitive user experiences.',
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with developers and product managers',
      'Maintain and evolve our design system'
    ],
    requirements: [
      '4+ years of UI/UX design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio demonstrating UX skills',
      'Understanding of front-end development'
    ],
    benefits: ['Creative environment', 'Latest design tools', 'Conference attendance', 'Flexible hours'],
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    isFeatured: true
  },
  {
    title: 'DevOps Engineer',
    slug: 'devops-engineer',
    department: 'engineering',
    type: 'full-time',
    location: 'Austin, TX',
    isRemote: true,
    salary: { min: 110000, max: 160000, period: 'yearly' },
    description: 'Help us build and maintain our cloud infrastructure and CI/CD pipelines.',
    responsibilities: [
      'Manage cloud infrastructure on AWS/Azure',
      'Build and maintain CI/CD pipelines',
      'Implement monitoring and alerting systems',
      'Ensure security and compliance'
    ],
    requirements: [
      '3+ years of DevOps experience',
      'Experience with Docker and Kubernetes',
      'Proficiency in Infrastructure as Code (Terraform)',
      'Strong scripting skills'
    ],
    benefits: ['Remote-first culture', 'Stock options', 'Home office stipend', 'Unlimited PTO'],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Python'],
    isFeatured: false
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Service.deleteMany({}),
      Testimonial.deleteMany({}),
      JobListing.deleteMany({}),
      TeamMember.deleteMany({})
    ]);

    // Seed users
    console.log('Seeding users...');
    // User model pre-save hook will hash the password
    await User.create([{
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@freesip.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin'
    }]);

    // Seed services
    console.log('Seeding services...');
    await Service.insertMany(services);

    // Seed projects
    console.log('Seeding projects...');
    await Project.insertMany(projects);

    // Seed testimonials
    console.log('Seeding testimonials...');
    await Testimonial.insertMany(testimonials);

    // Seed team members
    console.log('Seeding team members...');
    await TeamMember.insertMany(teamMembers);

    // Seed job listings
    console.log('Seeding job listings...');
    await JobListing.insertMany(jobListings);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Testimonials: ${testimonials.length}`);
    console.log(`   - Team Members: ${teamMembers.length}`);
    console.log(`   - Job Listings: ${jobListings.length}`);
    console.log('\n🔐 Admin credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@freesip.com'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
