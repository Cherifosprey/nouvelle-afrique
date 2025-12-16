import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Clock, ArrowRight, FileText, Filter } from 'lucide-react';

// Force la page à se mettre à jour à chaque demande (pour que les filtres marchent)
export const dynamic = 'force-dynamic';

// Types
interface Article {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  slug: string;
  created_at: string;
}

const CATEGORIES = ["Tout", "Politique", "Économie", "Société", "Culture", "Sport", "Chroniques d’experts"];

// Helper date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
};

export default async function AllNewsPage(props: { searchParams: Promise<{ category?: string }> }) {
  const searchParams = await props.searchParams;
  const currentCategory = searchParams.category || "Tout";

  let query = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  // Application du filtre si ce n'est pas "Tout"
  if (currentCategory !== "Tout") {
    // decodeURIComponent gère les caractères spéciaux dans l'URL si besoin
    query = query.eq('category', decodeURIComponent(currentCategory));
  }

  const { data: articles, error } = await query;

  if (error) return <div className="p-10 text-red-600">Erreur : {error.message}</div>;

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      
      {/* En-tête */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-8 mb-8">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 mb-2 flex items-center gap-3">
                <FileText className="text-red-600 w-10 h-10" />
                Le Fil Info
            </h1>
            <p className="text-gray-500 text-lg mb-8">
                Suivez l'actualité politique, économique, culturelle et sportive en temps réel.
            </p>

            {/* Barre de filtres */}
            <div className="flex flex-wrap gap-2 items-center">
                <span className="mr-2 text-gray-400 flex items-center gap-1 text-sm font-bold uppercase">
                    <Filter size={14} /> Filtres :
                </span>
                {CATEGORIES.map((cat) => {
                    const isActive = currentCategory === cat;
                    // On encode la catégorie pour l'URL (ex: "Chroniques d'experts" devient propre dans l'URL)
                    const href = cat === "Tout" ? '/actualites' : `/actualites?category=${encodeURIComponent(cat)}`;
                    
                    return (
                        <Link 
                            key={cat} 
                            href={href}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                                isActive 
                                ? "bg-red-600 text-white border-red-600 shadow-md" 
                                : "bg-white text-gray-600 border-gray-200 hover:border-red-600 hover:text-red-600"
                            }`}
                        >
                            {cat}
                        </Link>
                    )
                })}
            </div>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="container mx-auto px-4">
        {(!articles || articles.length === 0) ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">Aucun article trouvé dans la catégorie <span className="font-bold text-gray-900">"{currentCategory}"</span>.</p>
                <Link href="/actualites" className="text-red-600 font-bold mt-4 inline-block hover:underline">
                    Voir toutes les actualités
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article: Article) => (
                    <Link key={article.id} href={`/article/${article.slug}`} className="group cursor-pointer block h-full">
                        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col hover:shadow-lg transition duration-300 relative">
                            <div className="h-56 overflow-hidden relative">
                                <img 
                                    src={article.image_url || "/placeholder.jpg"} 
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase shadow-sm z-10">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                    <Clock size={14} />
                                    <span>{formatDate(article.created_at)}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                                    {article.excerpt}
                                </p>
                                <div className="pt-4 border-t border-gray-100 mt-auto">
                                    <span className="text-red-600 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Lire l'article <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        )}
      </div>
    </main>
  );
}