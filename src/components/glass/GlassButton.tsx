import React from 'react';
import { motion } from 'framer-motion';

export interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  href,
  target,
  rel,
  type = 'button',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return `
          glass-surface 
          text-white 
          hover:bg-blue-500/20 
          border-blue-400/30 
          hover:border-blue-400/50
        `;
      case 'secondary':
        return `
          glass-surface 
          text-gray-700 
          dark:text-gray-200 
          hover:bg-gray-500/10 
          dark:hover:bg-gray-400/10
          border-gray-400/30 
          hover:border-gray-400/50
        `;
      case 'ghost':
        return `
          bg-transparent 
          text-gray-600 
          dark:text-gray-300 
          hover:bg-white/5 
          dark:hover:bg-black/5 
          border-gray-300/30 
          hover:border-gray-400/40
        `;
      default:
        return '';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const baseClasses = `
    inline-flex 
    items-center 
    justify-center 
    gap-2 
    font-medium 
    rounded-xl 
    border 
    transition-all 
    duration-300 
    ease-in-out
    backdrop-blur-md 
    ${getVariantStyles()} 
    ${getSizeStyles()}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}
    ${className}
  `;

  const buttonContent = (
    <>
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        whileHover={!disabled ? { y: -2, scale: 1.02 } : undefined}
        whileTap={!disabled ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      whileHover={!disabled && !loading ? { y: -2, scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {buttonContent}
    </motion.button>
  );
};

export default GlassButton; 