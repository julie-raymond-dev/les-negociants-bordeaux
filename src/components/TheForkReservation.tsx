'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useReservation } from '@/context/ReservationContext';
import { siteConfig } from '@/config/site';

export default function TheForkReservation() {
  const { isOpen, openModal, closeModal } = useReservation();
  const t = useTranslations('Navigation');

  // Fermer avec la touche Echap
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  return (
    <>
      {/* Modale */}
      {isOpen && (
        <div 
          id="thefork-modal"
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-2 md:p-10"
          onClick={closeModal}
        >
          <div 
            id="thefork-modal-content"
            className="relative w-full max-w-4xl h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span 
              id="thefork-close" 
              onClick={closeModal}
              className="absolute top-2 right-4 text-4xl font-bold cursor-pointer text-gray-500 hover:text-black z-10"
            >
              ×
            </span>
            <iframe
              id="thefork-widget"
              src={siteConfig.urls.theFork}
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <style jsx global>{`
        #thefork-button {
          box-shadow: 0 10px 25px -5px rgba(183, 132, 55, 0.4);
        }
      `}</style>
    </>
  );
}
