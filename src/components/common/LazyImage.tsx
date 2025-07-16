import { cn } from "@/lib/utils";
import { useLazyLoading } from "@/hooks/common/useLazyLoading";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  className,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
  onLoad,
  onError,
}: LazyImageProps) {
  const { elementRef, isVisible, isLoaded, handleLoad } = useLazyLoading();

  const handleImageLoad = () => {
    handleLoad();
    onLoad?.();
  };

  return (
    <img
      ref={elementRef}
      src={isVisible ? src : placeholder}
      alt={alt}
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        className,
      )}
      onLoad={handleImageLoad}
      onError={onError}
      loading="lazy"
    />
  );
}
