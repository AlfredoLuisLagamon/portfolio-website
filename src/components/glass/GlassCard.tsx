import React from 'react';

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle';
  blur?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
  as?: 'div' | 'section' | 'article' | 'aside';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  blur = 'md',
  hover = true,
  onClick,
  as: Component = 'div',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'strong':
        return 'glass-surface-strong';
      case 'subtle':
        return 'bg-white/60 dark:bg-black/5 backdrop-blur-sm border border-black/10 dark:border-white/10';
      default:
        return 'glass-surface';
    }
  };

  const getBlurStyles = () => {
    switch (blur) {
      case 'sm':
        return 'backdrop-blur-sm';
      case 'lg':
        return 'backdrop-blur-glass-strong';
      default:
        return 'backdrop-blur-glass';
    }
  };

  const baseClasses = `
    rounded-2xl 
    transition-all 
    duration-300 
    ease-in-out
    ${getVariantStyles()}
    ${hover ? 'hover:-translate-y-1' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (onClick) {
    return (
      <div
        className={baseClasses}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <Component className={baseClasses}>
      {children}
    </Component>
  );
};

export default GlassCard; 