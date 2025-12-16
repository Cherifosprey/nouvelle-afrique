"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = ["Politique", "Économie", "Société", "Culture", "Sport", "Chroniques d’experts"];

export default function AddArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Politique',
    excerpt: '',
    content: '',
    image_url: ''
  });

  // Fonction pour créer un "slug" (URL) à partir du titre
  // Exemple : "Mon Super Article" -> "mon-super-article"
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = generateSlug(formData.title);

      // 1. Vérification si le slug existe déjà
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existing) {
        alert("Ce titre existe déjà. Veuillez le modifier légèrement.");
        setLoading(false);
        return;
      }

      // 2. Insertion dans Supabase
      const { error } = await supabase.from('articles').insert([
        {
          title: formData.title,
          slug: slug,
          category: formData.category,
          excerpt: formData.excerpt,
          content: formData.content,
          image_url: formData.image_url || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80", // Image par défaut
        }
      ]);

      if (error) throw error;

      // 3. Succès ! Retour au dashboard
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
            <div className="bg-blue-600 p-6 text-white">
                <h1 className="text-2xl font-black uppercase">Nouvel Article</h1>
                <p className="text-blue-100 text-sm">Remplissez les informations ci-dessous pour publier une actualité.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                {/* Titre */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Titre de l'article</label>
                    <input 
                        type="text" 
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-bold text-lg"
                        placeholder="Ex: Les Éléphants remportent la CAN..."
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Catégorie */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
                        <select 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">URL de l'image</label>
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
                        <p className="text-xs text-gray-500 mt-1">Laissez vide pour utiliser une image par défaut.</p>
                    </div>
                </div>

                {/* Résumé (Chapeau) */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Résumé (Chapeau)</label>
                    <textarea 
                        required
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Une brève introduction qui donne envie de lire la suite..."
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    />
                </div>

                {/* Contenu Complet */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contenu de l'article</label>
                    <textarea 
                        required
                        rows={10}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Écrivez votre article ici..."
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                    />
                </div>

                {/* Bouton Valider */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Publier l'article</>}
                </button>

            </form>
        </div>
      </div>
    </div>
  );
}