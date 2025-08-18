'use client';

import React from 'react';

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 120 50" 
      className={className}
      fill="currentColor"
    >
      {/* Aiguille à coudre diagonale */}
      <path d="M25 15 L35 35" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" />
      
      {/* Œil de l'aiguille */}
      <ellipse cx="25" cy="15" rx="2" ry="1" 
               stroke="currentColor" 
               strokeWidth="1" 
               fill="none" />
      
      {/* Fil en forme de cœur */}
      <path d="M25 15 Q25 8 20 8 Q15 8 15 15 Q15 22 20 22 Q25 22 25 15" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round" />
      
      {/* Extension du fil */}
      <path d="M15 15 Q10 20 8 25" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round" />
      
      {/* Titre Leder Schmiede */}
      <text x="50" y="20" 
            className="text-lg font-[var(--font-playfair)] font-bold" 
            fill="currentColor">
        Leder Schmiede
      </text>
      
      {/* Sous-titre Sarah Röttig */}
      <text x="50" y="32" 
            className="text-xs font-[var(--font-cormorant)]" 
            fill="currentColor">
        Fahrzeugsattlerin Sarah Röttig
      </text>
      
      {/* Meisterbetrieb */}
      <text x="50" y="40" 
            className="text-xs font-[var(--font-cormorant)]" 
            fill="currentColor">
        Meisterbetrieb
      </text>
    </svg>
  );
} 