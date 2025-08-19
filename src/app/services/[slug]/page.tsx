import React from 'react';
import ServicePageContent from './ServicePageContent';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  
  return {
    title: `Service - Leder Schmiede`,
    description: 'Service details',
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  return <ServicePageContent slug={slug} />;
} 