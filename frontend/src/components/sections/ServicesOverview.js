'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code,
  Smartphone,
  Cloud,
  Palette,
  Server,
  CloudCog,
  ArrowRight
} from 'lucide-react';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies for optimal performance and scalability.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    title: 'SaaS Development',
    description: 'Scalable software-as-a-service solutions designed for growth and recurring revenue.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that enhance user engagement and satisfaction.',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Server,
    title: 'API Development',
    description: 'Robust and secure APIs that power your applications and third-party integrations.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: CloudCog,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and DevOps services for modern applications.',
    color: 'from-purple-500 to-purple-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicesOverview() {
  return (
    <Section background="alt" id="services">
      <div className="container-custom">
        <SectionHeader>
          <SectionTitle>
            Our <span className="gradient-text">Services</span>
          </SectionTitle>
          <SectionDescription>
            We offer comprehensive software development services to bring your ideas to life.
            From concept to deployment, we've got you covered.
          </SectionDescription>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card hover className="h-full group cursor-pointer">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.description}
                </p>
                <Link
                  href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors group-hover:translate-x-1 transform duration-300"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
          >
            View All Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
