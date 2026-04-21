'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Section, SectionHeader, SectionTitle, SectionDescription, SectionBadge } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Target, Eye, Heart, Zap, Shield, Users } from 'lucide-react';
import { publicApi } from '@/lib/api';

const defaultTeam = [
  {
    name: 'Alex Thompson',
    role: 'CEO & Founder',
    bio: '15+ years in software development. Previously led engineering teams at Fortune 500 companies.',
    avatar: null,
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    bio: 'Full-stack architect with expertise in cloud infrastructure and scalable systems.',
    avatar: null,
  },
  {
    name: 'Marcus Williams',
    role: 'Lead Designer',
    bio: 'Award-winning UI/UX designer passionate about creating intuitive digital experiences.',
    avatar: null,
  },
  {
    name: 'Lisa Chang',
    role: 'Head of Mobile',
    bio: 'Mobile development expert with 10+ years building iOS and Android applications.',
    avatar: null,
  },
];

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in every line of code, every design, and every interaction.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Our clients success is our success. We go above and beyond to deliver value.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We embrace new technologies and creative solutions to solve complex problems.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'Transparency and honesty guide our relationships with clients and team members.',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Great things happen when talented people work together towards a common goal.',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function AboutPage() {
  const [team, setTeam] = useState(defaultTeam);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await publicApi.getTeam({ featured: true });
        if (response.data.data.length > 0) {
          setTeam(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch team:', error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <Section background="mesh" padding="xl">
          <div className="container-custom">
            <SectionHeader maxWidth="lg">
              <SectionBadge>About Us</SectionBadge>
              <SectionTitle>
                We're on a Mission to{' '}
                <span className="gradient-text">Transform Ideas</span>
              </SectionTitle>
              <SectionDescription>
                Freesip Software Solutions is a team of passionate developers, designers, and strategists
                dedicated to building software that makes a difference.
              </SectionDescription>
            </SectionHeader>
          </div>
        </Section>

        {/* Story Section */}
        <Section>
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-3xl bg-white dark:bg-dark-800 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-6xl md:text-7xl font-bold gradient-text mb-4">5+</div>
                      <div className="text-gray-600 dark:text-gray-400">Years of Innovation</div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400 rounded-full opacity-20 blur-xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-6">
                  Our Story
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Founded in 2021, Freesip Software Solutions started with a simple belief: technology should empower businesses, not complicate them. What began as a small team of dedicated developers has grown into a full-service software company.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  We've had the privilege of working with startups, SMEs, and enterprise clients across various industries - from healthcare and finance to e-commerce and education. Each project has taught us something new and helped us refine our approach.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Today, we continue to push boundaries, embrace new technologies, and most importantly, build software that our clients are proud of.
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Mission & Vision */}
        <Section background="alt">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 md:p-12"
              >
                <Target className="w-12 h-12 text-white/20 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/80 leading-relaxed">
                  To empower businesses with innovative software solutions that drive growth,
                  efficiency, and competitive advantage. We believe in building technology that
                  solves real problems and creates meaningful impact.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-8 md:p-12"
              >
                <Eye className="w-12 h-12 text-white/20 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-white/80 leading-relaxed">
                  To be the most trusted technology partner for businesses worldwide, known for
                  delivering exceptional software solutions that transform industries and improve
                  lives through innovation and excellence.
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Values Section */}
        <Section>
          <div className="container-custom">
            <SectionHeader>
              <SectionTitle>Our Core Values</SectionTitle>
              <SectionDescription>
                The principles that guide everything we do.
              </SectionDescription>
            </SectionHeader>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Team Section */}
        <Section background="alt">
          <div className="container-custom">
            <SectionHeader>
              <SectionTitle>Meet Our Team</SectionTitle>
              <SectionDescription>
                The talented people behind our success.
              </SectionDescription>
            </SectionHeader>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full group">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        member.name.charAt(0)
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h4>
                    <p className="text-blue-500 font-medium mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {member.bio}
                      </p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
