import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen">
      {/* Démarcation supérieure simple */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div
          className="w-full h-1"
          style={{
            background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)",
            filter: "blur(0.5px)",
          }}
        ></div>
      </div>
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      {/* Démarcation inférieure simple */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div
          className="w-full h-1"
          style={{
            background: "radial-gradient(ellipse at center, #AA8C5B 0%, #AA8C5B99 40%, transparent 80%)",
            filter: "blur(0.5px)",
          }}
        ></div>
      </div>
    </section>
  );
} 