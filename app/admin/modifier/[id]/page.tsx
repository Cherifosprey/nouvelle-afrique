"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Trash } from 'lucide-react';

const CATEGORIES = ["Politique", "Économie", "Société", "Culture", "Sport", "Chroniques d’experts"];

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams(); // On récupère l'ID depuis l'URL
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Politique',
    excerpt: '',
    content: '',
    image_url: ''
  });

  // 1. Au chargement, on récupère l'article existant
  useEffect(() => {
    const fetchArticle = async () => {
        if (!id) return;

        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            alert("Article introuvable ou erreur : " + error.message);
            router.push('/admin');
        } else if (data) {
            setFormData({
                title: data.title,
                category: data.category,
                excerpt: data.excerpt || '',
                content: data.content || '',
                image_url: data.image_url || ''
            });
        }
        setLoading(false);
    };

    fetchArticle();
  }, [id, router]);


  // 2. Sauvegarde des modifications
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('articles')
        .update({
          title: formData.title,
          category: formData.category,
          excerpt: formData.excerpt,
          content: formData.content,
          image_url: formData.image_url,
        })
        .eq('id', id);

      if (error) throw error;

      // Succès
      router.push('/admin');
      router.refresh();

    } catch (error: any) {
      alert("Erreur lors de la modification : " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        <Link href="/admin" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
            <ArrowLeft size={18} className="mr-2" /> Annuler et retour
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black uppercase">Modifier l'article</h1>
                    <p className="text-blue-100 text-sm">Modifiez les champs ci-dessous.</p>
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
                        <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
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
                </div>

                {/* Résumé */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Résumé</label>
                    <textarea 
                        required
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    />
                </div>

                {/* Contenu */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contenu</label>
                    <textarea 
                        required
                        rows={10}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={saving}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Enregistrer les modifications</>}
                </button>

            </form>
        </div>
      </div>
    </div>
  );
}