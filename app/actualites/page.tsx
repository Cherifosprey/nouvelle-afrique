import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Clock, ArrowRight, Filter, ChevronRight, Hash } from 'lucide-react';

// Force le rendu dynamique pour les filtres URL
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

const CATEGORIES = ["Tout", "Politique", "Économie", "Société", "Culture", "Sport", "Femme d'Afrique", "L'Interview", "Les mémoires africaines", "Villes et communes africaines"];

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

  if (currentCategory !== "Tout") {
    query = query.eq('category', decodeURIComponent(currentCategory));
  }

  const { data: articles, error } = await query;

  if (error) return <div className="p-10 text-red-600 container mx-auto">Erreur : {error.message}</div>;

  return (
    <main className="min-h-screen bg-white pb-20 font-sans text-gray-800">
      
      {/* === EN-TÊTE DE PAGE (Style MagNews) === */}
      <div className="bg-black text-white py-12 mb-10">
          <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 uppercase font-bold tracking-widest">
                  <Link href="/" className="hover:text-red-500 transition">Accueil</Link> 
                  <ChevronRight size={14} /> 
                  <span className="text-white">Actualités</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
                  {currentCategory === "Tout" ? "Toutes les infos" : currentCategory}
              </h1>
              <div className="w-20 h-1 bg-red-600"></div>
          </div>
      </div>

      <div className="container mx-auto px-4">
        
        {/* === BARRE DE FILTRES (Style Onglets) === */}
        {/* <div className="mb-10 overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex flex-wrap gap-2 items-center border-b border-gray-200 pb-4 min-w-max">
                <span className="mr-3 text-gray-400 flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                    <Filter size={14} /> Filtrer par :
                </span>
                {CATEGORIES.map((cat) => {
                    const isActive = currentCategory === cat;
                    const href = cat === "Tout" ? '/actualites' : `/actualites?category=${encodeURIComponent(cat)}`;
                    
                    return (
                        <Link 
                            key={cat} 
                            href={href}
                            className={`px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all ${
                                isActive 
                                ? "bg-red-600 text-white shadow-md" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {cat}
                        </Link>
                    )
                })}
            </div>
        </div> */}

        {/* === LISTE DES ARTICLES (Grille Modernisée) === */}
        {(!articles || articles.length === 0) ? (
            <div className="text-center py-24 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Hash size={32} />
                </div>
                <p className="text-gray-500 text-lg mb-2">Aucun article trouvé pour <span className="font-bold text-black">"{currentCategory}"</span></p>
                <Link href="/actualites" className="text-red-600 font-bold text-sm uppercase hover:underline">
                    Retour aux actualités
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {articles.map((article: Article) => (
                    <Link key={article.id} href={`/article/${article.slug}`} className="group block h-full">
                        <article className="flex flex-col h-full">
                            {/* Image avec effet de zoom */}
                            <div className="relative overflow-hidden h-60 w-full bg-gray-100 mb-4">
                                <img 
                                    src={article.image_url || "/placeholder.jpg"} 
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                {/* Badge Catégorie flottant */}
                                <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                                    {article.category}
                                </span>
                            </div>

                            {/* Contenu Textuel */}
                            <div className="flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase mb-2 tracking-wide">
                                    <Clock size={12} className="text-red-500" />
                                    <span>{formatDate(article.created_at)}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                    {article.title}
                                </h2>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                                    {article.excerpt}
                                </p>
                                <span className="text-xs font-bold text-black uppercase flex items-center gap-1 group-hover:gap-2 transition-all mt-auto border-b border-transparent group-hover:border-red-600 self-start pb-0.5">
                                    Lire la suite <ArrowRight size={12} className="text-red-600" />
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        )}

        {/* === PAGINATION (Décorative pour l'instant) === */}
        {articles && articles.length > 0 && (
            <div className="mt-16 flex justify-center">
                <button className="bg-gray-100 hover:bg-red-600 hover:text-white text-gray-800 font-bold py-3 px-8 uppercase text-sm tracking-widest transition-colors duration-300">
                    Charger plus d'articles
                </button>
            </div>
        )}

      </div>
    </main>
  );
}