/**
 * ScrollAnimator.ts
 * A utility to add scroll-triggered animations to elements using the Intersection Observer API
 */

interface ScrollAnimatorOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  once?: boolean;
}

export default class ScrollAnimator {
  private observer: IntersectionObserver;
  private animationClass: string;
  private once: boolean;
  
  constructor({
    threshold = 0.1,
    rootMargin = "-50px",
    animationClass = "active",
    once = true
  }: ScrollAnimatorOptions = {}) {
    this.animationClass = animationClass;
    this.once = once;
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { threshold, rootMargin }
    );
  }
  
  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(this.animationClass);
        
        if (this.once) {
          this.observer.unobserve(entry.target);
        }
      } else if (!this.once) {
        entry.target.classList.remove(this.animationClass);
      }
    });
  }
  
  /**
   * Observe elements with the specified selector
   */
  public observe(selector: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => this.observer.observe(el));
    return this;
  }
  
  /**
   * Stop observing all elements
   */
  public disconnect() {
    this.observer.disconnect();
    return this;
  }
  
  /**
   * Static method to initialize a default ScrollAnimator instance
   */
  public static init(selector = '.reveal') {
    const animator = new ScrollAnimator();
    
    if (typeof window !== 'undefined') {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          animator.observe(selector);
        });
      } else {
        animator.observe(selector);
      }
    }
    
    return animator;
  }
}