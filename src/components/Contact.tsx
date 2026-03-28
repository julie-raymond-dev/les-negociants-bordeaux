'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import emailjs from '@emailjs/browser';
import { siteConfig } from '@/config/site';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('Contact');
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(
        siteConfig.emailjs.serviceId,
        siteConfig.emailjs.templateId,
        formRef.current,
        siteConfig.emailjs.publicKey
      );
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="heading-section text-primary mb-6">
            {t('title')}
          </h2>
          <p className="text-foreground/70 leading-relaxed italic">
            {t('description')}
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 size={48} className="text-primary" />
            <p className="text-lg font-bold">{t('success')}</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-black uppercase tracking-widest text-primary hover:underline"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                <AlertCircle size={18} />
                <p>{t('error')}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstname" className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                  {t('form_firstname')} <span className="text-primary">{t('required')}</span>
                </label>
                <input 
                  type="text" 
                  name="firstname"
                  id="firstname" 
                  className="w-full px-6 py-4 border-2 border-border bg-background focus:border-primary outline-none transition-colors rounded-xl font-bold text-sm"
                  required
                  disabled={status === 'sending'}
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                  {t('form_lastname')} <span className="text-primary">{t('required')}</span>
                </label>
                <input 
                  type="text" 
                  name="lastname"
                  id="lastname" 
                  className="w-full px-6 py-4 border-2 border-border bg-background focus:border-primary outline-none transition-colors rounded-xl font-bold text-sm"
                  required
                  disabled={status === 'sending'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                {t('form_email')} <span className="text-primary">{t('required')}</span>
              </label>
              <input 
                type="email" 
                name="email"
                id="email" 
                className="w-full px-6 py-4 border-2 border-border bg-background focus:border-primary outline-none transition-colors rounded-xl font-bold text-sm"
                required
                disabled={status === 'sending'}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                {t('form_message')}
              </label>
              <textarea 
                name="message"
                id="message" 
                rows={5}
                className="w-full px-6 py-4 border-2 border-border bg-background focus:border-primary outline-none transition-colors rounded-xl font-bold text-sm resize-none"
                disabled={status === 'sending'}
              ></textarea>
            </div>

            <div className="text-center">
              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`group relative px-12 py-5 bg-primary text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-full shadow-2xl shadow-primary/20 transition-all duration-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed`}
              >
                <span className={status === 'sending' ? 'opacity-0' : 'opacity-100'}>
                  {t('form_submit')}
                </span>
                {status === 'sending' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
