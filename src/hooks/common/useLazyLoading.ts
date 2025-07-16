import { useEffect, useRef, useState } from "react";

interface UseLazyLoadingOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export const useLazyLoading = ({
  root = null,
  rootMargin = "50px",
  threshold = 0.1,
}: UseLazyLoadingOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [root, rootMargin, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return {
    elementRef,
    isVisible,
    isLoaded,
    handleLoad,
  };
};
