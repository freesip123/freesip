'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Card = forwardRef(
  ({ children, className, hover = true, glow = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={hover ? { y: -5 } : {}}
        className={cn(
          'p-6 rounded-2xl bg-white dark:bg-dark-800',
          'border border-gray-200 dark:border-dark-700',
          'shadow-lg hover:shadow-xl',
          'transition-all duration-300',
          glow && 'glow-purple',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(({ children, className, as: Component = 'h3', ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn('text-xl font-bold font-heading text-gray-900 dark:text-white', className)}
      {...props}
    >
      {children}
    </Component>
  );
});

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-gray-600 dark:text-gray-400 text-sm', className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('mt-6 pt-6 border-t border-gray-200 dark:border-dark-700', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
