'use client';

import {useTranslations} from 'next-intl';
import { useReservation } from '@/context/ReservationContext';

export default function ReservationButton({ className = "" }: { className?: string }) {
  const t = useTranslations('Navigation');
  const { openModal } = useReservation();

  return (
    <button 
      onClick={openModal}
      className={`inline-flex items-center justify-center px-6 py-2 border-2 border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 rounded ${className}`}
    >
      {t('reserve')}
    </button>
  );
}
