'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Identifiants incorrects ou accès refusé.');
        setIsLoggingIn(false);
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion.');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-muted p-8 rounded-[40px] border border-border shadow-2xl"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-black tracking-widest uppercase mb-2 text-center">Accès Admin</h1>
          <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.3em]">Zone réservée aux gérants</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold"
            >
              <AlertCircle size={16} />
              <p>{error}</p>
            </motion.div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-4">
              Email
            </label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="gerant@les-negociants.fr"
                className="w-full bg-background border-2 border-border rounded-full px-8 py-5 outline-none focus:border-primary transition-colors font-bold"
                required
              />
              <Mail size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-foreground/20" />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-4">
              Mot de passe
            </label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border-2 border-border rounded-full px-8 py-5 outline-none focus:border-primary transition-colors font-mono"
                required
              />
              <Lock size={18} className="absolute right-8 top-1/2 -translate-y-1/2 text-foreground/20" />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-primary text-white font-black uppercase tracking-[0.2em] text-xs py-6 rounded-full flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            {isLoggingIn ? <Loader2 className="animate-spin" size={18} /> : "Se connecter"}
          </button>

          <Link 
            href="/"
            className="w-full bg-transparent border-2 border-border text-foreground/40 font-black uppercase tracking-[0.2em] text-[10px] py-5 rounded-full flex items-center justify-center gap-3 hover:bg-foreground/5 hover:text-foreground transition-all"
          >
            <ArrowLeft size={16} />
            Retour au site
          </Link>
        </form>
      </motion.div>
    </div>
  );
}
