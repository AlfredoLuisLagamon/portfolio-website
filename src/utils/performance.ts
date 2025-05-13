/**
 * Performance optimization utilities for frontend applications
 */

/**
 * Creates a debounced version of a function that only executes after a specified delay
 * @param func - The function to debounce
 * @param delay - The delay in milliseconds
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Creates a throttled version of a function that only executes at most once per specified interval
 * @param func - The function to throttle
 * @param limit - The minimum time between function executions in milliseconds
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return function (...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

/**
 * Determines if the user prefers reduced motion
 * @returns True if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Detects if the device is a mobile or tablet 
 * @returns True if the device is mobile or tablet
 */
export const isMobileOrTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
};

/**
 * Lazy-loads images when they approach the viewport
 * @param imageSelector - CSS selector for target images 
 * @param rootMargin - Distance from viewport to trigger loading
 */
export const setupLazyImageLoading = (
  imageSelector: string = '[data-lazy="true"]', 
  rootMargin: string = '200px'
): void => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const loadImage = (element: Element) => {
    if (element.tagName !== 'IMG') return;
    
    const imgElement = element as HTMLImageElement;
    const src = imgElement.dataset.src;
    
    if (src) {
      imgElement.src = src;
      imgElement.removeAttribute('data-src');
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin }
  );

  document.querySelectorAll(imageSelector).forEach((img) => {
    observer.observe(img);
  });
};

/**
 * Defers non-critical CSS loading to improve initial page load
 * @param href - URL of the CSS file
 */
export const loadDeferredCSS = (href: string): void => {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.type = 'text/css';
  document.head.appendChild(link);
};

/**
 * Initializes all performance optimizations
 */
export const initPerformanceOptimizations = (): void => {
  if (typeof window === 'undefined') return;
  
  // Initialize lazy image loading
  window.addEventListener('DOMContentLoaded', () => {
    setupLazyImageLoading();
  });
};
