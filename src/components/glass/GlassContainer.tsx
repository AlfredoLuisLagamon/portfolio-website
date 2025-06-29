import React from 'react';

export interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  as?: 'div' | 'section' | 'article' | 'aside' | 'main';
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  as: Component = 'div',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'strong':
        return 'glass-surface-strong';
      case 'subtle':
        return 'bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10';
      default:
        return 'glass-surface';
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-4';
      case 'lg':
        return 'p-8';
      case 'xl':
        return 'p-12';
      default:
        return 'p-6';
    }
  };

  const baseClasses = `
    ${getVariantStyles()}
    ${getPaddingStyles()}
    rounded-2xl 
    transition-all 
    duration-300 
    ease-in-out
    ${className}
  `;

  return (
    <Component className={baseClasses}>
      {children}
    </Component>
  );
};

export default GlassContainer; 