"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Youtube, Clock, Image as ImageIcon } from 'lucide-react';

export default function AddPodcastPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    video_url: '', // On utilise le champ 'audio_url' de la base pour stocker le lien YouTube
    image_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insertion dans Supabase
      const { error } = await supabase.from('podcasts').insert([
        {
          title: formData.title,
          description: formData.description,
          duration: formData.duration,
          audio_url: formData.video_url, // Stockage du lien YouTube
          image_url: formData.image_url || "https://images.unsplash.com/photo-1492619882292-1b32d2948e58?auto=format&fit=crop&w=1200&q=80",
        }
      ]);

      if (error) throw error;

      // Succès
      router.push('/admin');
      router.refresh();

    } catch (error: any) {
      alert("Erreur lors de l'enregistrement : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Bouton Retour */}
        <Link href="/admin" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
            <ArrowLeft size={18} className="mr-2" /> Retour au tableau de bord
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-800 p-6 text-white">
                <h1 className="text-2xl font-black uppercase flex items-center gap-2">
                    <Youtube className="text-red-500" /> Nouvelle Vidéo
                </h1>
                <p className="text-gray-400 text-sm">Ajoutez un reportage vidéo (Lien YouTube).</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                {/* Titre */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Titre de la vidéo</label>
                    <input 
                        type="text" 
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-bold text-lg"
                        placeholder="Ex: Reportage exclusif au marché..."
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Lien YouTube */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Lien YouTube</label>
                        <div className="relative">
                            <Youtube className="absolute left-3 top-3 text-red-500" size={20} />
                            <input 
                                type="url" 
                                required
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="https://youtube.com/watch?v=..."
                                value={formData.video_url}
                                onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Durée */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Durée</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                required
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Ex: 12:45"
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                {/* Image URL (Miniature) */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Image de couverture (Miniature)</label>
                    <div className="relative">
                        <ImageIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="url" 
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://..."
                            value={formData.image_url}
                            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Laissez vide pour une image par défaut.</p>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description courte</label>
                    <textarea 
                        required
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="De quoi parle cette vidéo ?"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                {/* Bouton Valider */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gray-800 text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Enregistrer la vidéo</>}
                </button>

            </form>
        </div>
      </div>
    </div>
  );
}