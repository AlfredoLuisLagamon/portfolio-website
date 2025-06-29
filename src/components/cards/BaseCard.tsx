import React from 'react';
import { GlassCard } from '../glass';

/**
 * BaseCard - Standardized card component for uniform design
 * 
 * DESIGN STANDARDS:
 * - Default padding: 'md' (p-6) for consistency across all cards
 * - Header font: text-xl md:text-2xl font-bold (use ContentCard when possible)
 * - Body text: text-base with text-secondary color (default browser size)
 * - Badges/tags: text-base font-medium (no text-sm)
 * - Spacing: mb-6 for header, mb-2 for title-subtitle gap
 */
export interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'strong';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg'; // Default: 'md' (p-6)
  onClick?: () => void;
}

const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  padding = 'md',
  onClick
}) => {
  const getPaddingClass = () => {
    switch (padding) {
      case 'none': return '';
      case 'sm': return 'p-4';
      case 'md': return 'p-6';
      case 'lg': return 'p-8';
      default: return 'p-6';
    }
  };

  const cardContent = (
    <GlassCard
      variant={variant}
      hover={hover}
      className={`${getPaddingClass()} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </GlassCard>
  );

  return cardContent;
};

export default BaseCard; 