import React from 'react';
import BaseCard, { BaseCardProps } from './BaseCard';

/**
 * ContentCard - Standard card with header for consistent layout
 * 
 * USE THIS COMPONENT for all cards with titles/headers to ensure uniformity.
 * Automatically applies standard header styling and spacing.
 */
export interface ContentCardProps extends Omit<BaseCardProps, 'children'> {
  title?: string;
  /** Semantic heading level only — styling is identical for h1 and h2 */
  titleAs?: 'h1' | 'h2';
  subtitle?: string | React.ReactNode;
  children: React.ReactNode;
  titleIcon?: React.ReactNode;
  headerAction?: React.ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  titleAs = 'h2',
  subtitle,
  children,
  titleIcon,
  headerAction,
  ...baseCardProps
}) => {
  const TitleTag = titleAs;

  return (
    <BaseCard {...baseCardProps}>
      {/* Card Header */}
      {(title || subtitle || headerAction) && (
        <div className="mb-6">
          {(title || headerAction) && (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {titleIcon && (
                  <div className="text-primary">
                    {titleIcon}
                  </div>
                )}
                {title && (
                  <TitleTag className="text-2xl md:text-3xl font-bold text-primary">
                    {title}
                  </TitleTag>
                )}
              </div>
              {headerAction && (
                <div>
                  {headerAction}
                </div>
              )}
            </div>
          )}
          {subtitle && (
            <div className="text-secondary">
              {subtitle}
            </div>
          )}
        </div>
      )}
      
      {/* Card Content */}
      <div>
        {children}
      </div>
    </BaseCard>
  );
};

export default ContentCard; 