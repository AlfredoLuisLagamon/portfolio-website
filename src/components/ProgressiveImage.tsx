import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

/**
 * Component that loads images progressively for better performance
 * - Shows low-quality placeholder while the full image loads
 * - Uses Next.js Image component under the hood
 * - Adds fade-in transition when the image loads
 */
const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  placeholder = "empty",
  blurDataURL,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate a very low-quality placeholder if none provided
  const defaultBlurDataURL =
    blurDataURL ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmNWY5Ij48L3N2Zz4=";

  useEffect(() => {
    // Reset loaded state when src changes
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={placeholder === "blur" ? defaultBlurDataURL : undefined}
        className={`
          transition-opacity duration-500 ease-in-out
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
        onLoadingComplete={() => setIsLoaded(true)}
      />

      {/* Show shimmer effect while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
};

export default ProgressiveImage;
