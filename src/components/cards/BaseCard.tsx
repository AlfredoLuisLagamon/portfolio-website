import React from 'react';
import { GlassCard } from '../glass';

/**
 * BaseCard - Standardized card component for uniform design
 * 
 * DESIGN STANDARDS:
 * - Default padding: 'md' (p-6) for consistency across all cards
 * - Section / hero title: text-2xl md:text-3xl font-bold (ContentCard title)
 * - Card / job title: text-xl md:text-2xl font-bold
 * - Body text: text-base with text-secondary color
 * - UI / CTAs: text-sm font-medium, px-4 py-2, rounded-lg
 * - Panel radius: rounded-2xl · control radius: rounded-lg
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