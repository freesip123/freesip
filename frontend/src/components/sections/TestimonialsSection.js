'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { publicApi } from '@/lib/api';

const defaultTestimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc.',
    avatar: null,
    content: 'Freesip transformed our vision into a stunning product. Their team\'s expertise in modern technologies and attention to detail exceeded our expectations. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateCorp',
    avatar: null,
    content: 'Working with Freesip was a game-changer for our business. They delivered our SaaS platform on time and within budget. The quality of their work is outstanding.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'HealthFirst',
    avatar: null,
    content: 'The mobile app Freesip built for us has received amazing feedback from our users. Their understanding of UX principles and technical execution is top-notch.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'CTO',
    company: 'FinanceFlow',
    avatar: null,
    content: 'Exceptional API development skills. The system they built handles our high traffic loads seamlessly. Great communication throughout the project.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await publicApi.getTestimonials({ featured: true });
        if (response.data.data.length > 0) {
          setTestimonials(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <Section id="testimonials">
      <div className="container-custom">
        <SectionHeader>
          <SectionTitle>
            What Our <span className="gradient-text">Clients Say</span>
          </SectionTitle>
          <SectionDescription>
            Don't just take our word for it. Hear from some of our satisfied clients.
          </SectionDescription>
        </SectionHeader>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-dark-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-dark-700"
            >
              {/* Quote icon */}
              <Quote className="w-12 h-12 text-blue-500/20 mb-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="secondary"
              size="sm"
              onClick={prevTestimonial}
              className="!rounded-full !p-3"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={nextTestimonial}
              className="!rounded-full !p-3"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-blue-500'
                    : 'bg-gray-300 dark:bg-dark-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
