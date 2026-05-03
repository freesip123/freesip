'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Section, SectionHeader, SectionTitle, SectionDescription, SectionBadge } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { publicApi } from '@/lib/api';
import toast from 'react-hot-toast';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@freesip.co.in',
    href: 'mailto:hello@freesip.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91-9069216003',
    href: 'tel:+91-9069216003',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'Gadpuri,Faridabad',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
    href: '#',
  },
];

const serviceOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile App Development' },
  { value: 'saas', label: 'SaaS Development' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'api-development', label: 'API Development' },
  { value: 'other', label: 'Other' },
];

const budgetOptions = [
  { value: 'not-sure', label: "I'm not sure" },
  { value: '<5k', label: '< 5,000' },
  { value: '5k-10k', label: '5,000 - 10,000' },
  { value: '10k-25k', label: '10,000 - 25,000' },
  { value: '25k-50k', label: '25,000 - 50,000' },
  { value: '50k+', label: '50,000+' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: 'general',
    budget: 'not-sure',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      await publicApi.submitContact(formData);
      toast.success('Message sent! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        service: 'general',
        budget: 'not-sure',
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <Section background="mesh" padding="xl">
          <div className="container-custom">
            <SectionHeader maxWidth="lg">
              <SectionBadge>Contact Us</SectionBadge>
              <SectionTitle>
               Let&apos;s Start a{' '}
                <span className="gradient-text">Conversation</span>
              </SectionTitle>
              <SectionDescription>
                Have a question or want to discuss a project? We&apos;d love to hear from you.
Send us a message and we&apos;ll respond within 24-48 hours.
              </SectionDescription>
            </SectionHeader>
          </div>
        </Section>

        {/* Contact Section */}
        <Section>
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h4>
                        {item.href.startsWith('http') && item.href !== '#' ? (
                          <a
                            href={item.href}
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <Card>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Name *"
                        name="name"
                        placeholder="Enter the Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                      <Input
                        label="Email *"
                        name="email"
                        type="email"
                        placeholder="mail@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Phone"
                        name="phone"
                        placeholder="+91 "
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <Input
                        label="Company"
                        name="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Select
                        label="Service Interested In"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        options={serviceOptions}
                      />
                      <Select
                        label="Estimated Budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        options={budgetOptions}
                      />
                    </div>

                    <Input
                      label="Subject *"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                    />

                    <Textarea
                      label="Message *"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      hint={`${formData.message.length}/2000 characters`}
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      loading={isSubmitting}
                      rightIcon={!isSubmitting && <Send className="w-5 h-5" />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </Section>

      
      </main>
      <Footer />
    </>
  );
}
