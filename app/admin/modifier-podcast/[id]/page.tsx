"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Youtube, Clock, Image as ImageIcon } from 'lucide-react';

export default function EditPodcastPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    video_url: '',
    image_url: ''
  });

  // 1. Chargement des données existantes
  useEffect(() => {
    const fetchPodcast = async () => {
        if (!id) return;

        const { data, error } = await supabase
            .from('podcasts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            alert("Vidéo introuvable.");
            router.push('/admin');
        } else if (data) {
            setFormData({
                title: data.title,
                description: data.description || '',
                duration: data.duration || '',
                video_url: data.audio_url || '', // On récupère le lien stocké dans audio_url
                image_url: data.image_url || ''
            });
        }
        setLoading(false);
    };

    fetchPodcast();
  }, [id, router]);

  // 2. Sauvegarde
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('podcasts')
        .update({
          title: formData.title,
          description: formData.description,
          duration: formData.duration,
          audio_url: formData.video_url,
          image_url: formData.image_url,
        })
        .eq('id', id);

      if (error) throw error;

      router.push('/admin');
      router.refresh();

    } catch (error: any) {
      alert("Erreur : " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        <Link href="/admin" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
            <ArrowLeft size={18} className="mr-2" /> Annuler
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-800 p-6 text-white flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black uppercase flex items-center gap-2">
                        <Youtube className="text-red-500" /> Modifier la Vidéo
                    </h1>
                </div>
                <div className="bg-white/20 p-2 rounded text-xs font-mono">ID: {id}</div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                {/* Titre */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Titre</label>
                    <input 
                        type="text" 
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg"
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
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Image Miniature (URL)</label>
                    <div className="relative">
                        <ImageIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="url" 
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.image_url}
                            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea 
                        required
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={saving}
                    className="w-full bg-gray-800 text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Enregistrer les modifications</>}
                </button>

            </form>
        </div>
      </div>
    </div>
  );
}