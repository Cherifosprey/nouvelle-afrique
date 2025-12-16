import { supabase } from '@/lib/supabase';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// On définit le type des paramètres pour Next.js
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default async function ArticlePage({ params }: PageProps) {
  // 1. On récupère le slug (l'identifiant de l'URL)
  const { slug } = await params;

  // 2. On cherche l'article correspondant dans Supabase
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  // 3. Si l'article n'existe pas, on renvoie une page 404
  if (error || !article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* === EN-TÊTE IMMERSIF === */}
      <div className="relative w-full h-[450px] md:h-[600px]">
        {/* Image de fond */}
        <img 
          src={article.image_url || "/placeholder.jpg"} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        {/* Filtre dégradé pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {/* Contenu sur l'image */}
        <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-12 md:pb-16">
            <Link 
              href="/" 
              className="w-fit text-white/80 hover:text-white mb-6 flex items-center gap-2 transition-colors font-bold text-sm uppercase tracking-wider"
            >
              <ArrowLeft size={18} /> Retour à l'accueil
            </Link>

            <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs md:text-sm font-bold uppercase w-fit mb-4 shadow-sm">
                {article.category}
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 max-w-4xl shadow-black drop-shadow-md">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base font-medium">
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-red-500" />
                    <span>Publié le {formatDate(article.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <User size={18} className="text-red-500" />
                    <span>Par la Rédaction</span>
                </div>
            </div>
        </div>
      </div>

      {/* === CORPS DE L'ARTICLE === */}
      <main className="container mx-auto px-4 -mt-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Colonne Principale (Contenu) */}
        <div className="lg:col-span-8 bg-white rounded-t-3xl p-6 md:p-10 shadow-sm border border-gray-100">
           
           {/* Chapeau (Introduction) */}
           <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-10 font-serif border-l-4 border-red-600 pl-6 italic">
              {article.excerpt}
           </p>

           {/* Texte Riche */}
           <div className="prose prose-lg prose-blue max-w-none text-gray-800 leading-8">
              {article.content ? (
                  article.content.split('\n').map((paragraph: string, index: number) => (
                    paragraph.trim() !== "" && <p key={index} className="mb-6">{paragraph}</p>
                  ))
              ) : (
                  <p className="text-gray-400 italic">Contenu en cours de rédaction...</p>
              )}
           </div>

           {/* Tags / Mots clés (Fictifs pour l'instant) */}
           <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                  <Tag size={16} /> Sujets associés
              </h3>
              <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">Afrique</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">{article.category}</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition">Actualité</span>
              </div>
           </div>
        </div>

        {/* Colonne Latérale (Sidebar) - Optionnelle ou Pubs */}
        <aside className="lg:col-span-4 space-y-8 mt-10 lg:mt-0">
            {/* Encart "A ne pas manquer" */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-black text-gray-900 uppercase mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-blue-600" /> À lire aussi
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                    Découvrez nos derniers dossiers et analyses exclusives sur Nouvelle Afrique.
                </p>
                <Link href="/actualites" className="text-blue-600 font-bold hover:underline text-sm">
                    Voir le fil info &rarr;
                </Link>
            </div>

            {/* Encart Publicité / Newsletter */}
            <div className="bg-blue-900 text-white p-8 rounded-2xl text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Restez informé</h3>
                    <p className="text-blue-200 text-sm mb-4">Recevez l'essentiel de l'info chaque matin.</p>
                    <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded mb-2 text-gray-900 text-sm" />
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-sm transition">
                        Je m'abonne
                    </button>
                </div>
                {/* Cercle décoratif */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600 rounded-full opacity-50 blur-2xl"></div>
            </div>
        </aside>

      </main>
    </div>
  );
}