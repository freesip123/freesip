'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      as: Component = 'button',
      loading = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0';

    const variants = {
      primary:
        'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 focus:ring-blue-500',
      secondary:
        'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-900 dark:text-white hover:bg-white/20 dark:hover:bg-white/5 focus:ring-gray-500',
      outline:
        'border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 focus:ring-blue-500',
      ghost:
        'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 focus:ring-gray-500',
      danger:
        'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 focus:ring-red-500',
      success:
        'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 focus:ring-green-500',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };

    return (
      <motion.div whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
        <Component
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          disabled={loading || props.disabled}
          {...props}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        </Component>
      </motion.div>
    );
  }
);

Button.displayName = 'Button';

export default Button;
