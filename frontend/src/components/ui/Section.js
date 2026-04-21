'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Section = forwardRef(
  (
    {
      children,
      className,
      id,
      padding = 'default',
      background = 'default',
      ...props
    },
    ref
  ) => {
    const paddingStyles = {
      none: '',
      sm: 'py-12 md:py-16',
      default: 'py-16 md:py-24 lg:py-32',
      lg: 'py-24 md:py-32 lg:py-40',
      xl: 'py-32 md:py-40 lg:py-48',
    };

    const backgrounds = {
      default: 'bg-white dark:bg-dark-900',
      alt: 'bg-gray-50 dark:bg-dark-800',
      gradient: 'gradient-bg',
      mesh: 'mesh-gradient',
      dark: 'bg-dark-900 dark:bg-black',
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(paddingStyles[padding], backgrounds[background], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

const SectionHeader = forwardRef(
  ({ children, className, align = 'center', maxWidth = 'default', ...props }, ref) => {
    const alignStyles = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    const maxWidthStyles = {
      default: 'max-w-3xl',
      sm: 'max-w-xl',
      lg: 'max-w-4xl',
      full: 'max-w-full',
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn('mx-auto mb-12 md:mb-16', alignStyles[align], maxWidthStyles[maxWidth], className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

const SectionTitle = forwardRef(({ children, className, as: Component = 'h2', ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

SectionTitle.displayName = 'SectionTitle';

const SectionDescription = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        'text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-4',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

SectionDescription.displayName = 'SectionDescription';

const SectionBadge = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-block px-4 py-1.5 rounded-full text-sm font-semibold',
        'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
        'mb-4',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

SectionBadge.displayName = 'SectionBadge';

export { Section, SectionHeader, SectionTitle, SectionDescription, SectionBadge };
