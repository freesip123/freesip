'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Section, SectionHeader, SectionTitle, SectionDescription, SectionBadge } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { ExternalLink, Github, Calendar, Tag, Filter } from 'lucide-react';
import { publicApi } from '@/lib/api';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile Apps' },
  { value: 'saas', label: 'SaaS' },
  { value: 'ui-ux', label: 'UI/UX' },
  { value: 'api-development', label: 'API Development' },
];

const defaultProjects = [
  {
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A full-featured online shopping platform with inventory management and payment integration.',
    category: 'web-development',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    featuredImage: null,
    liveUrl: 'https://example.com',
    year: 2025,
    isFeatured: true,
  },
  {
    title: 'Healthcare Management App',
    slug: 'healthcare-app',
    description: 'Mobile application for patient management and appointment scheduling.',
    category: 'mobile-app',
    technologies: ['React Native', 'Firebase', 'Redux'],
    featuredImage: null,
    year: 2025,
    isFeatured: true,
  },
  {
    title: 'Project Management SaaS',
    slug: 'project-management-saas',
    description: 'Collaborative project management tool with real-time updates and team features.',
    category: 'saas',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    featuredImage: null,
    liveUrl: 'https://example-pm.com',
    year: 2024,
    isFeatured: true,
  },
  {
    title: 'Finance Dashboard',
    slug: 'finance-dashboard',
    description: 'Real-time financial data visualization and analytics dashboard.',
    category: 'ui-ux',
    technologies: ['React', 'D3.js', 'Tailwind CSS'],
    featuredImage: null,
    year: 2025,
  },
  {
    title: 'Restaurant Ordering API',
    slug: 'restaurant-api',
    description: 'Scalable REST API for food ordering and delivery management system.',
    category: 'api-development',
    technologies: ['Express', 'MongoDB', 'Redis', 'RabbitMQ'],
    featuredImage: null,
    year: 2024,
  },
  {
    title: 'Real Estate Platform',
    slug: 'real-estate-platform',
    description: 'Property listing and management platform with virtual tours.',
    category: 'web-development',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Three.js'],
    featuredImage: null,
    liveUrl: 'https://example-re.com',
    year: 2024,
  },
];

function PortfolioContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [projects, setProjects] = useState(defaultProjects);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await publicApi.getProjects({ limit: 20 });
        if (response.data.data.length > 0) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <Section background="mesh" padding="xl">
          <div className="container-custom">
            <SectionHeader maxWidth="lg">
              <SectionBadge>Our Portfolio</SectionBadge>
              <SectionTitle>
                Work That{' '}
                <span className="gradient-text">Speaks for Itself</span>
              </SectionTitle>
              <SectionDescription>
                Explore our collection of projects showcasing innovation, craftsmanship,
                and results-driven solutions.
              </SectionDescription>
            </SectionHeader>

            {/* Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Projects Grid */}
        <Section>
          <div className="container-custom">
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full overflow-hidden p-0 group">
                        {/* Image */}
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                          {project.featuredImage ? (
                            <img
                              src={project.featuredImage}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-white/20 text-6xl font-bold">
                                {project.title.charAt(0)}
                              </span>
                            </div>
                          )}
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                          {/* Featured badge */}
                          {project.isFeatured && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                              Featured
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {project.year}
                            </span>
                            <span className="flex items-center gap-1">
                              <Tag className="w-4 h-4" />
                              {categories.find(c => c.value === project.category)?.label || project.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                            {project.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <Filter className="w-16 h-16 text-gray-300 dark:text-dark-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try selecting a different category.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>

        {/* CTA Section */}
        <Section background="alt">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Have a Project in Mind?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Let's collaborate to create something amazing together. We're ready to bring your vision to life.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="pt-20"><Header /><div className="container-custom py-20 text-center">Loading...</div></div>}>
      <PortfolioContent />
    </Suspense>
  );
}
