'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-muted p-8 rounded-3xl border border-border shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-black tracking-widest uppercase mb-2">Accès Admin</h1>
          <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest">Zone réservée aux gérants</p>
        </div>

        <div className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-1">
              Email
            </label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@les-negociants.fr"
                className="w-full bg-background border-2 border-border rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors"
              />
              <Mail size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/20" />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-1">
              Mot de passe
            </label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border-2 border-border rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors font-mono"
              />
              <Lock size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground/20" />
            </div>
          </div>

          <Link 
            href="/admin"
            className="w-full bg-primary text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Se connecter
          </Link>

          <Link 
            href="/"
            className="w-full bg-transparent border-2 border-border text-foreground/60 font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-foreground/5 transition-all"
          >
            <ArrowLeft size={18} />
            Retour au site
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
