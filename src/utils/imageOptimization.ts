/**
 * Image optimization utilities for better performance and user experience
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  loading?: 'lazy' | 'eager';
  sizes?: string;
  placeholder?: 'blur' | 'empty';
}

/**
 * Generate optimized image props for Next.js Image component
 */
export const getOptimizedImageProps = (
  src: string,
  alt: string,
  options: ImageOptimizationOptions = {}
) => {
  const {
    width = 800,
    height = 600,
    quality = 85,
    loading = 'lazy',
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    placeholder = 'blur'
  } = options;

  // Generate blur placeholder for better loading experience
  const blurDataURL = generateBlurDataURL(width, height);

  return {
    src,
    alt,
    width,
    height,
    quality,
    loading,
    sizes,
    placeholder,
    blurDataURL: placeholder === 'blur' ? blurDataURL : undefined,
  };
};

/**
 * Generate a blur placeholder SVG data URL
 */
export const generateBlurDataURL = (width: number = 800, height: number = 600): string => {
  const svg = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f1f5f9;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gradient)" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

/**
 * Get responsive image sizes for different screen breakpoints
 */
export const getResponsiveSizes = (
  breakpoints: { [key: string]: string } = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw'
  }
): string => {
  const { mobile, tablet, desktop } = breakpoints;
  return `(max-width: 768px) ${mobile}, (max-width: 1200px) ${tablet}, ${desktop}`;
};

/**
 * Create optimized alt text for project images
 */
export const createProjectImageAlt = (
  projectTitle: string,
  imageType: 'dashboard' | 'login' | 'features' | 'mobile' | 'screenshot',
  theme?: 'light' | 'dark'
): string => {
  const themeText = theme ? ` in ${theme} mode` : '';
  const typeDescriptions = {
    dashboard: `${projectTitle} dashboard interface${themeText} showing the main application layout and key features`,
    login: `${projectTitle} login page${themeText} with user authentication interface and security features`,
    features: `${projectTitle} features page${themeText} displaying the main functionality and capabilities`,
    mobile: `${projectTitle} mobile interface${themeText} optimized for smartphone and tablet devices`,
    screenshot: `${projectTitle} application screenshot${themeText} demonstrating the user interface and functionality`
  };
  
  return typeDescriptions[imageType] || `${projectTitle} application interface${themeText}`;
};

/**
 * Preload critical images for better performance
 */
export const preloadCriticalImages = (imagePaths: string[]): void => {
  if (typeof window === 'undefined') return;

  imagePaths.forEach((path) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Check if WebP is supported in the browser
 */
export const isWebPSupported = (): Promise<boolean> => {
  if (typeof window === 'undefined') return Promise.resolve(false);

  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Get optimized image format based on browser support
 */
export const getOptimizedFormat = async (originalFormat: string): Promise<string> => {
  const webpSupported = await isWebPSupported();
  
  if (webpSupported && (originalFormat === 'jpg' || originalFormat === 'jpeg' || originalFormat === 'png')) {
    return 'webp';
  }
  
  return originalFormat;
};

/**
 * Image loading error handler with fallback
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc?: string
): void => {
  const img = event.currentTarget;
  
  if (fallbackSrc && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  } else {
    // Show placeholder or hide image
    img.style.display = 'none';
    
    // Optionally, show an error placeholder
    const placeholder = img.parentElement?.querySelector('.image-error-placeholder');
    if (placeholder) {
      (placeholder as HTMLElement).style.display = 'flex';
    }
  }
};

/**
 * Create an intersection observer for lazy loading images
 */
export const createImageObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions = {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}; 