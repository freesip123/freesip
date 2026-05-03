'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Section, SectionHeader, SectionTitle, SectionDescription, SectionBadge } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Code,
  Smartphone,
  Cloud,
  Palette,
  Server,
  CloudCog,
  CheckCircle,
  ArrowRight,
  Laptop,
  Database,
  Layers,
  GitBranch
} from 'lucide-react';
import { publicApi } from '@/lib/api';

const servicesIcons = {
  Code,
  Smartphone,
  Cloud,
  Palette,
  Server,
  CloudCog,
  Laptop,
  Database,
  Layers,
  GitBranch
};

const defaultServices = [
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
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app',
    shortDescription: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    fullDescription: 'From concept to deployment, we build mobile applications that users love. Whether you need iOS, Android, or cross-platform solutions, our team delivers apps that are intuitive, performant, and reliable.',
    icon: 'Smartphone',
    features: ['iOS Development', 'Android Development', 'Cross-Platform Apps', 'App Store Optimization', 'Maintenance & Support'],
    benefits: ['Native Performance', 'Intuitive UX', 'Offline Capabilities', 'Push Notifications'],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    isPopular: true,
  },
  {
    title: 'SaaS Development',
    slug: 'saas',
    shortDescription: 'Scalable software-as-a-service solutions for modern businesses.',
    fullDescription: 'Transform your business idea into a fully-functional SaaS product. We handle everything from architecture design to deployment, ensuring your platform can scale with your growing user base.',
    icon: 'Cloud',
    features: ['Multi-tenant Architecture', 'Subscription Management', 'Analytics Dashboard', 'User Management', 'Third-party Integrations'],
    benefits: ['Recurring Revenue Model', 'Automatic Updates', 'Cloud-based Access', 'Scalable Infrastructure'],
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'GraphQL'],
    isPopular: true,
  },
  {
    title: 'UI/UX Design',
    slug: 'ui-ux',
    shortDescription: 'Beautiful, intuitive designs that enhance user engagement and satisfaction.',
    fullDescription: 'Great design is invisible. Our UI/UX team creates interfaces that are not only visually stunning but also intuitive and user-friendly. We conduct user research, create wireframes, and deliver pixel-perfect designs.',
    icon: 'Palette',
    features: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Design Systems', 'Usability Testing'],
    benefits: ['Increased Conversion', 'Better User Retention', 'Brand Consistency', 'Reduced Support Costs'],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer'],
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
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await publicApi.getServices();
        if (response.data.data.length > 0) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <Section background="mesh" padding="xl">
          <div className="container-custom">
            <SectionHeader maxWidth="lg">
              <SectionBadge>Our Services</SectionBadge>
              <SectionTitle>
                Everything You Need to{' '}
                <span className="gradient-text">Build & Scale</span>
              </SectionTitle>
              <SectionDescription>
                From concept to deployment and beyond, we provide comprehensive software development
                services to help your business thrive in the digital age.
              </SectionDescription>
            </SectionHeader>
          </div>
        </Section>

        {/* Services Grid */}
        <Section>
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = servicesIcons[service.icon] || Code;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col" glow={service.isPopular}>
                      {service.isPopular && (
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full mb-4 w-fit">
                          Most Popular
                        </span>
                      )}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                        {service.shortDescription}
                      </p>

                      {/* Features */}
                      {service.features && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          What&apos;s included:
                          </h4>
                          <ul className="space-y-2">
                            {service.features.slice(0, 4).map((feature, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Button variant="outline" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Learn More
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Process Section */}
        <Section background="alt">
          <div className="container-custom">
            <SectionHeader>
              <SectionTitle>Our Process</SectionTitle>
              <SectionDescription>
                A proven methodology that delivers results every time.
              </SectionDescription>
            </SectionHeader>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Discovery', description: 'We dive deep into your business needs, goals, and requirements.' },
                { step: '02', title: 'Planning', description: 'Creating a detailed roadmap with timelines, milestones, and deliverables.' },
                { step: '03', title: 'Development', description: 'Building your solution with clean code and regular progress updates.' },
                { step: '04', title: 'Launch & Support', description: 'Deploying your product and providing ongoing maintenance.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-6xl font-bold text-blue-500/10 mb-4">{item.step}</div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8 text-gray-300 dark:text-dark-600">
                      <ArrowRight className="w-full" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
               {"Let's discuss your ideas and turn them into reality. Get a free consultation and quote."}
              </p>
              <Button
                as="a"
                href="/contact"
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
