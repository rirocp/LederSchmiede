'use client';

import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Bitte füllen Sie alle Felder aus.');
      return;
    }

    if (!formData.email.includes('@')) {
      setSubmitStatus('error');
      setErrorMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '16f8e101-73ec-49a1-81a6-f18d3b7d4cfa',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Neue Nachricht von ${formData.name} - Leder Schmiede Website`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Fehler beim Senden der Nachricht');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="relative py-20 bg-[#FAF6ED]">
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
      
      <div className="px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-[var(--font-cinzel)] font-bold mb-4 text-[#251C17]">Kontaktieren Sie mich</h2>
          
          {/* Ligne décorative simple */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#AA8C5B] via-[#BF6C3E] to-[#AA8C5B] mx-auto mb-8"></div>
          
          <p className="text-[#444444] mb-12 font-[var(--font-cormorant)] text-lg leading-relaxed">Haben Sie Fragen oder wünschen ein unverbindliches Angebot? Schreiben Sie mir eine Nachricht!</p>
        </div>
        
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#AA8C5B]/30">
          {/* Message de succès */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.</span>
                <button
                  onClick={resetForm}
                  className="text-green-700 hover:text-green-900 font-bold text-xl"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Message d'erreur */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{errorMessage}</span>
                <button
                  onClick={resetForm}
                  className="text-red-700 hover:text-red-900 font-bold text-xl"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-[#444444] font-semibold mb-2 font-[var(--font-cinzel)]">
                Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white/50 text-black placeholder-gray-500" 
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-[#444444] font-semibold mb-2 font-[var(--font-cinzel)]">
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white/50 text-black placeholder-gray-500" 
              />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-[#444444] font-semibold mb-2 font-[var(--font-cinzel)]">
                Nachricht <span className="text-red-500">*</span>
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-[#AA8C5B]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BF6C3E] focus:border-[#BF6C3E] transition-all duration-300 bg-white/50 resize-none text-black placeholder-gray-500"
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 font-semibold w-full shadow-lg hover:shadow-xl ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#BF6C3E] hover:bg-[#AA8C5B] text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Wird gesendet...
                  </div>
                ) : (
                  'Nachricht Senden'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
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
