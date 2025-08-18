import React from 'react';
import ServicePageContent from './ServicePageContent';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = params;
  
  return {
    title: `Service - Leder Schmiede`,
    description: 'Service details',
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = params;
  return <ServicePageContent slug={slug} />;
} 