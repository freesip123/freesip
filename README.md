# Freesip Software Solutions - Full Stack Website

A modern, professional full-stack website for Freesip Software Solutions, built with Next.js, Tailwind CSS, Framer Motion, Node.js/Express, and MongoDB.

## 🚀 Features

### Frontend
- **Modern UI/UX** - Clean, minimal design inspired by top SaaS companies
- **Dark/Light Mode** - Seamless theme switching with persistence
- **Smooth Animations** - Powered by Framer Motion
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Fast Loading** - Optimized images, lazy loading, code splitting

### Pages
- **Home** - Hero section, services overview, stats, testimonials, CTA
- **About Us** - Company story, mission/vision, team members, values
- **Services** - All services with detailed descriptions
- **Portfolio** - Filterable project showcase
- **Careers** - Job listings with detailed descriptions
- **Contact** - Contact form with validation, Google Maps placeholder

### Backend
- **RESTful API** - MVC architecture
- **JWT Authentication** - Secure admin login
- **MongoDB Database** - Flexible schema design
- **CRUD Operations** - Projects, Services, Testimonials, Jobs, Team, Messages
- **Email Notifications** - Nodemailer integration
- **Rate Limiting** - API protection
- **CORS & Helmet** - Security middleware

### Admin Panel
- **Dashboard** - Analytics and overview stats
- **Projects Management** - Full CRUD
- **Services Management** - Full CRUD
- **Testimonials Management** - Full CRUD
- **Job Listings Management** - Full CRUD
- **Team Management** - Full CRUD
- **Messages** - View, filter, and respond to contact submissions

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Notifications**: React Hot Toast
- **Forms**: Custom with validation

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Email**: Nodemailer
- **Security**: Helmet, CORS, express-rate-limit

## 🏗️ Project Structure

```
freesip-software-solutions/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, validation, error handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── seeders/         # Database seed data
│   ├── utils/           # Utility functions (email)
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── app/         # Next.js app router pages
    │   ├── components/
    │   │   ├── layout/  # Header, Footer, ThemeProvider
    │   │   ├── sections/# Home page sections
    │   │   └── ui/      # Reusable UI components
    │   ├── lib/         # API client, store, utils
    │   └── styles/      # Global styles
    ├── public/          # Static assets
    ├── .env.example
    ├── package.json
    └── tailwind.config.js
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ (https://nodejs.org/)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
cd freesip-software-solutions
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: A secure random string
# - EMAIL credentials (optional for email notifications)

# Seed the database (optional but recommended)
npm run seed

# Start the server
npm run dev     # Development mode
npm start       # Production mode
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# - NEXT_PUBLIC_API_URL: Backend API URL
# - NEXT_PUBLIC_SITE_URL: Your site URL

# Start the development server
npm run dev
```

The website will be available at `http://localhost:3000`

### 4. Admin Access

Default admin credentials (created by seed):
- **Email**: `admin@freesip.com`
- **Password**: `Admin@123456`

Access the admin panel at: `http://localhost:3000/admin/login`

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/freesip-software

JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Freesip Software Solutions <noreply@freesip.com>

FRONTEND_URL=http://localhost:3000

ADMIN_EMAIL=admin@freesip.com
ADMIN_PASSWORD=Admin@123456
```

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 📚 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| GET | `/api/projects/slug/:slug` | Get project by slug |
| GET | `/api/projects/categories` | Get all categories |
| GET | `/api/services` | Get all services |
| GET | `/api/services/:id` | Get single service |
| GET | `/api/testimonials` | Get all testimonials |
| GET | `/api/jobs` | Get all job listings |
| GET | `/api/team` | Get all team members |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/analytics/stats` | Get public stats |

### Admin Endpoints (Require Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/analytics` | Get dashboard analytics |
| CRUD | `/api/admin/projects` | Manage projects |
| CRUD | `/api/admin/services` | Manage services |
| CRUD | `/api/admin/testimonials` | Manage testimonials |
| CRUD | `/api/admin/jobs` | Manage job listings |
| CRUD | `/api/admin/team` | Manage team members |
| GET/PUT/DELETE | `/api/admin/contact` | Manage messages |

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```js
theme: {
  extend: {
    colors: {
      primary: { /* ... */ },
      secondary: { /* ... */ },
      accent: { /* ... */ },
    }
  }
}
```

### Fonts

The project uses Google Fonts (Inter and Plus Jakarta Sans). Edit `globals.css` to change fonts.

### Content

All content can be managed through the admin panel or by modifying the seed data in `backend/seeders/seed.js`.

## 🚀 Deployment

### Backend (Heroku, Railway, Render)

1. Set up MongoDB (Atlas recommended)
2. Set environment variables
3. Deploy with `node server.js`

### Frontend (Vercel, Netlify)

1. Connect your repository
2. Set environment variables
3. Deploy

## 📝 Scripts

### Backend

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm run seed    # Seed database with sample data
```

### Frontend

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Freesip Software Solutions**

- Website: https://freesip.com
- Email: hello@freesip.com

## 🙏 Acknowledgments

- Design inspired by Stripe, Vercel, and modern SaaS websites
- Icons by Lucide React
- Fonts by Google Fonts

---

Built with ❤️ by Freesip Software Solutions
