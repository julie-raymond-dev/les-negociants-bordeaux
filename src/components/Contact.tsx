'use client';

import {useTranslations} from 'next-intl';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-primary mb-6">
            {t('title')}
          </h2>
          <p className="text-foreground/70 leading-relaxed italic">
            {t('description')}
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstname" className="block text-sm font-bold uppercase tracking-wider mb-2">
                {t('form_firstname')} <span className="text-primary">{t('required')}</span>
              </label>
              <input 
                type="text" 
                id="firstname" 
                className="w-full px-4 py-3 border-2 border-border bg-background focus:border-primary outline-none transition-colors rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-bold uppercase tracking-wider mb-2">
                {t('form_lastname')} <span className="text-primary">{t('required')}</span>
              </label>
              <input 
                type="text" 
                id="lastname" 
                className="w-full px-4 py-3 border-2 border-border bg-background focus:border-primary outline-none transition-colors rounded"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider mb-2">
              {t('form_email')} <span className="text-primary">{t('required')}</span>
            </label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-3 border-2 border-border bg-background focus:border-primary outline-none transition-colors rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider mb-2">
              {t('form_message')}
            </label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full px-4 py-3 border-2 border-border bg-background focus:border-primary outline-none transition-colors rounded"
            ></textarea>
          </div>

          <div className="text-center">
            <button 
              type="submit"
              className="px-12 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors duration-300 rounded shadow-lg"
            >
              {t('form_submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
