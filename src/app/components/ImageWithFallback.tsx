'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function ImageWithFallback({
  src,
  alt,
  fill = true,
  className,
  sizes,
  priority = false,
  width,
  height
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback vers une image placeholder générique
      setImgSrc('/images/services/placeholder-service.jpg');
    }
  };

  // Si l'image n'existe pas, afficher un placeholder coloré
  if (hasError && imgSrc === '/images/services/placeholder-service.jpg') {
    return (
      <div className={`${className} bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center`}>
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-300 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-amber-700 font-medium">Bild wird geladen</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleError}
    />
  );
} 