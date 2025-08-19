'use client';

import React from 'react';
import Link from 'next/link';
import { Service } from '../data/servicesData';
import ImageWithFallback from './ImageWithFallback';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative h-full">
      {/* Carte principale avec design moderne */}
      <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#AA8C5B]/30 hover:border-[#BF6C3E]/50 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#BF6C3E]/20 flex flex-col">
        
        {/* Bordure luxueuse subtile */}
        <div className="absolute -inset-1 bg-gradient-to-br from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] rounded-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-sm"></div>
        
        {/* Image avec effets avancés */}
        <div className="relative h-80 overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={service.imageSrc}
            alt={service.altText}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlays multiples */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#BF6C3E]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Contenu avec design moderne */}
        <div className="p-8 flex flex-col flex-1">
          {/* Titre avec effet de survol */}
          <h3 className="text-2xl lg:text-3xl font-[var(--font-cinzel)] font-bold text-[#251C17] mb-4 group-hover:text-[#BF6C3E] transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description avec typographie élégante */}
          <p className="text-[#444444] font-[var(--font-cormorant)] leading-relaxed text-lg mb-6 flex-1">
            {service.description}
          </p>

          {/* CTA moderne - maintenant toujours en bas */}
          <div className="mt-auto">
            <Link
              href={`/services/${service.slug || service.id}`}
              className="group/btn relative overflow-hidden bg-[#BF6C3E] text-white py-4 px-6 rounded-2xl font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#BF6C3E]/25 inline-block w-full text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                {service.ctaText}
                <svg className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-[#AA8C5B] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>

        {/* Effets de fond décoratifs subtils */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#BF6C3E] to-[#AA8C5B] rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#AA8C5B] to-[#BF6C3E] rounded-full opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-700 delay-200"></div>
      </div>
    </div>
  );
} 