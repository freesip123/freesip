'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Section, SectionHeader, SectionTitle, SectionDescription, SectionBadge } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Building,
  ArrowRight,
  CheckCircle,
  Laptop,
  Globe
} from 'lucide-react';
import { publicApi } from '@/lib/api';

const defaultJobs = [
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
      'Participate in code reviews',
    ],
    requirements: [
      '5+ years of experience in full stack development',
      'Proficiency in React, Node.js, and databases',
      'Experience with cloud platforms (AWS/Azure)',
      'Strong problem-solving skills',
    ],
    benefits: ['Competitive salary', 'Health insurance', 'Remote work options', 'Learning budget'],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    isFeatured: true,
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
      'Maintain and evolve our design system',
    ],
    requirements: [
      '4+ years of UI/UX design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Strong portfolio demonstrating UX skills',
      'Understanding of front-end development',
    ],
    benefits: ['Creative environment', 'Latest design tools', 'Conference attendance', 'Flexible hours'],
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    isFeatured: true,
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
      'Ensure security and compliance',
    ],
    requirements: [
      '3+ years of DevOps experience',
      'Experience with Docker and Kubernetes',
      'Proficiency in Infrastructure as Code (Terraform)',
      'Strong scripting skills',
    ],
    benefits: ['Remote-first culture', 'Stock options', 'Home office stipend', 'Unlimited PTO'],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Python'],
    isFeatured: false,
  },
];

function formatSalary(min, max, period) {
  const formatNum = (num) => {
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}k`;
    }
    return `$${num}`;
  };
  return `${formatNum(min)} - ${formatNum(max)} / ${period}`;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState(defaultJobs);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await publicApi.getJobs();
        if (response.data.data.length > 0) {
          setJobs(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <Section background="mesh" padding="xl">
          <div className="container-custom">
            <SectionHeader maxWidth="lg">
              <SectionBadge>Careers</SectionBadge>
              <SectionTitle>
                Join Our{' '}
                <span className="gradient-text">Team</span>
              </SectionTitle>
              <SectionDescription>
                We're always looking for talented individuals who are passionate about
                building great software. Explore our open positions and become part of our journey.
              </SectionDescription>
            </SectionHeader>
          </div>
        </Section>

        {/* Why Join Us */}
        <Section>
          <div className="container-custom">
            <SectionHeader>
              <SectionTitle>Why Work With Us?</SectionTitle>
            </SectionHeader>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Globe,
                  title: 'Remote First',
                  description: 'Work from anywhere with our flexible remote policy.',
                },
                {
                  icon: DollarSign,
                  title: 'Competitive Pay',
                  description: 'Industry-leading compensation and equity packages.',
                },
                {
                  icon: Clock,
                  title: 'Flexible Hours',
                  description: 'Work when you\'re most productive.',
                },
                {
                  icon: Briefcase,
                  title: 'Growth Opportunities',
                  description: 'Continuous learning and career advancement.',
                },
                {
                  icon: Laptop,
                  title: 'Latest Tech',
                  description: 'Top-notch equipment and tools to do your best work.',
                },
                {
                  icon: Building,
                  title: 'Great Culture',
                  description: 'Collaborative, inclusive, and fun work environment.',
                },
              ].map((perk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <perk.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {perk.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {perk.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Job Listings */}
        <Section background="alt">
          <div className="container-custom">
            <SectionHeader>
              <SectionTitle>Open Positions</SectionTitle>
              <SectionDescription>
                Find your next opportunity. Click on a job to see more details.
              </SectionDescription>
            </SectionHeader>

            <div className="space-y-4 max-w-4xl mx-auto">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedJob === job.slug ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedJob(selectedJob === job.slug ? null : job.slug)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          {job.isFeatured && (
                            <span className="px-2.5 py-0.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full">
                              Featured
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full capitalize">
                            {job.department}
                          </span>
                          <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full capitalize">
                            {job.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location} {job.isRemote && '(Remote)'}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {formatSalary(job.salary.min, job.salary.max, job.salary.period)}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {selectedJob === job.slug ? 'Show Less' : 'View Details'}
                        <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${
                          selectedJob === job.slug ? 'rotate-90' : ''
                        }`} />
                      </Button>
                    </div>

                    {/* Expanded details */}
                    {selectedJob === job.slug && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Responsibilities */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                              Responsibilities
                            </h4>
                            <ul className="space-y-2">
                              {job.responsibilities.map((item, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                              Requirements
                            </h4>
                            <ul className="space-y-2">
                              {job.requirements.map((item, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Benefits */}
                        {job.benefits && (
                          <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                              Benefits
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {job.benefits.map((benefit, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1.5 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium rounded-lg"
                                >
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Apply button */}
                        <div className="mt-6 flex justify-end">
                          <a
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            Apply Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* No jobs CTA */}
        <Section>
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Don't See the Right Role?
              </h2>
              <p className="text-white/80 mb-8">
                We're always interested in meeting talented people. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send Speculative Application
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
