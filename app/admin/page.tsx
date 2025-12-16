"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, Edit, Trash, LogOut, FileText, Video, Loader2, 
  LayoutDashboard, ChevronLeft, ChevronRight 
} from 'lucide-react';

const ITEMS_PER_PAGE = 5; // Nombre d'éléments par page

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États pour la pagination
  const [articlePage, setArticlePage] = useState(1);
  const [podcastPage, setPodcastPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        
        if (authError || !session) {
          router.push('/admin/login');
          return; 
        }

        // Chargement des Articles
        const { data: articlesData } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (articlesData) setArticles(articlesData);

        // Chargement des Podcasts
        const { data: podcastsData } = await supabase
          .from('podcasts')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (podcastsData) setPodcasts(podcastsData);

      } catch (err) {
        console.error("Erreur inattendue :", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  // --- LOGIQUE DE PAGINATION ---
  const getPaginatedData = (data: any[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data: any[]) => Math.ceil(data.length / ITEMS_PER_PAGE);

  // --- ACTIONS ---
  const handleDeleteArticle = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (!error) {
            setArticles(articles.filter(a => a.id !== id));
        } else {
            alert("Erreur : " + error.message);
        }
    }
  };

  const handleDeletePodcast = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
        const { error } = await supabase.from('podcasts').delete().eq('id', id);
        if (!error) {
            setPodcasts(podcasts.filter(p => p.id !== id));
        } else {
            alert("Erreur : " + error.message);
        }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Navbar Admin */}
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
            <div className="bg-blue-700 p-2 rounded-lg">
                <LayoutDashboard size={20} />
            </div>
            <div>
                <h1 className="font-black text-lg leading-none">ADMINISTRATION</h1>
                <span className="text-blue-300 text-xs uppercase tracking-wider">Nouvelle Afrique</span>
            </div>
        </div>
        <button onClick={handleSignOut} className="flex items-center gap-2 text-sm font-bold bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
            <LogOut size={16} /> Déconnexion
        </button>
      </nav>

      <main className="container mx-auto px-4 py-8 space-y-12">

        {/* === SECTION ARTICLES === */}
        <section>
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                        <FileText className="text-blue-600" /> Articles
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full ml-2">{articles.length}</span>
                    </h2>
                </div>
                <Link href="/admin/ajouter" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-sm">
                    <Plus size={18} /> Nouvel Article
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-400 font-bold">
                            <th className="p-4">Titre</th>
                            <th className="p-4 hidden md:table-cell">Catégorie</th>
                            <th className="p-4 hidden md:table-cell">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {getPaginatedData(articles, articlePage).map((article) => (
                            <tr key={article.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-bold text-gray-800 max-w-xs truncate">
                                    {article.title}
                                    <div className="md:hidden text-xs text-gray-400 font-normal mt-1">{article.category}</div>
                                </td>
                                <td className="p-4 hidden md:table-cell">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">{article.category}</span>
                                </td>
                                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">
                                    {new Date(article.created_at).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="p-4 flex justify-end gap-2">
                                    <Link href={`/admin/modifier/${article.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"><Edit size={18} /></Link>
                                    <button onClick={() => handleDeleteArticle(article.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"><Trash size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {articles.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">Aucun article.</td></tr>}
                    </tbody>
                </table>
                
                {/* Pagination Articles */}
                {articles.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50">
                        <button 
                            onClick={() => setArticlePage(p => Math.max(1, p - 1))}
                            disabled={articlePage === 1}
                            className="flex items-center gap-1 text-sm font-bold text-gray-600 disabled:opacity-30 hover:text-blue-600"
                        >
                            <ChevronLeft size={16} /> Précédent
                        </button>
                        <span className="text-xs font-bold text-gray-400 uppercase">Page {articlePage} sur {getTotalPages(articles)}</span>
                        <button 
                            onClick={() => setArticlePage(p => Math.min(getTotalPages(articles), p + 1))}
                            disabled={articlePage === getTotalPages(articles)}
                            className="flex items-center gap-1 text-sm font-bold text-gray-600 disabled:opacity-30 hover:text-blue-600"
                        >
                            Suivant <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </section>

        {/* === SECTION VIDÉOS === */}
        <section>
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                        <Video className="text-blue-600" /> Vidéos & Podcasts
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full ml-2">{podcasts.length}</span>
                    </h2>
                </div>
                <Link href="/admin/ajouter-podcast" className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-900 transition shadow-sm">
                    <Plus size={18} /> Nouvelle Vidéo
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-400 font-bold">
                            <th className="p-4">Titre</th>
                            <th className="p-4 hidden md:table-cell">Durée</th>
                            <th className="p-4 hidden md:table-cell">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {getPaginatedData(podcasts, podcastPage).map((podcast) => (
                            <tr key={podcast.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-bold text-gray-800 max-w-xs truncate">{podcast.title}</td>
                                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">{podcast.duration}</td>
                                <td className="p-4 text-sm text-gray-500 hidden md:table-cell">
                                    {new Date(podcast.created_at).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="p-4 flex justify-end gap-2">
                                    <Link href={`/admin/modifier-podcast/${podcast.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"><Edit size={18} /></Link>
                                    <button onClick={() => handleDeletePodcast(podcast.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"><Trash size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {podcasts.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">Aucune vidéo.</td></tr>}
                    </tbody>
                </table>

                {/* Pagination Vidéos */}
                {podcasts.length > ITEMS_PER_PAGE && (
                    <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50">
                        <button 
                            onClick={() => setPodcastPage(p => Math.max(1, p - 1))}
                            disabled={podcastPage === 1}
                            className="flex items-center gap-1 text-sm font-bold text-gray-600 disabled:opacity-30 hover:text-blue-600"
                        >
                            <ChevronLeft size={16} /> Précédent
                        </button>
                        <span className="text-xs font-bold text-gray-400 uppercase">Page {podcastPage} sur {getTotalPages(podcasts)}</span>
                        <button 
                            onClick={() => setPodcastPage(p => Math.min(getTotalPages(podcasts), p + 1))}
                            disabled={podcastPage === getTotalPages(podcasts)}
                            className="flex items-center gap-1 text-sm font-bold text-gray-600 disabled:opacity-30 hover:text-blue-600"
                        >
                            Suivant <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </section>

      </main>
    </div>
  );
}