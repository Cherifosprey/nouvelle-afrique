"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Connexion réussie, on redirige vers le tableau de bord
      router.push('/admin');
      router.refresh();
      
    } catch (err: any) {
      setError("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
        
        {/* En-tête bleu */}
        <div className="bg-blue-600 p-8 text-center">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Lock className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider">Espace Admin</h1>
            <p className="text-blue-100 text-sm mt-2">Connectez-vous pour gérer le site.</p>
        </div>

        {/* Formulaire */}
        <div className="p-8">
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
                
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center font-medium">
                        {error}
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input 
                            type="email" 
                            required
                            placeholder="admin@nouvelleafrique.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Mot de passe</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="mt-4 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Se connecter <ArrowRight size={18} /></>}
                </button>
            </form>
            
            <div className="mt-6 text-center">
                <a href="/" className="text-gray-400 text-sm hover:text-gray-600 transition">
                    Retour au site
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}