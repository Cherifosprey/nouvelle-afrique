import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Clock, ChevronRight, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

// 1. RENDRE LA PAGE DYNAMIQUE
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch all articles ordered by date (newest first)
  const { data: articles } = await supabase.from('articles').select('*').order('created_at', { ascending: false });

  // --- SELECTION LOGIC (Chronological) ---
  
  // 1. Top 2 Articles (The very latest ones) for the "Une" section
  const mainArticle1 = articles?.[0];
  const mainArticle2 = articles?.[1];

  // 2. Next 4 articles for the "Fil Info" (Flash Info) - excluding the top 2
  const filInfo = articles?.slice(2, 6) || [];

  // 3. Next 6 articles for the secondary grid - excluding top 2 and fil info
  const secondaryArticles = articles?.slice(6, 12) || [];

  // 4. Specific categories for bottom sections (optional, keeps some variety)
  const culture = articles?.find(a => a.category === 'Culture');
  const sport = articles?.find(a => a.category === 'Sport');
  const femme = articles?.find(a => a.category === "Femme d'Afrique");


  return (
    <main className="bg-white min-h-screen font-sans text-gray-800">
      
      {/* 1. BARRE "FLASH INFO" (Défilante) */}
      <div className="bg-gray-100 border-b border-gray-200 py-2">
          <div className="container mx-auto px-4 flex items-center gap-3">
              <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 shrink-0">Flash Info</span>
              <div className="overflow-hidden h-5 w-full relative">
                  <div className="flex flex-col animate-pulse">
                      {filInfo.length > 0 && (
                          <Link href={`/article/${filInfo[0].slug}`} className="text-xs font-medium text-gray-600 truncate block h-5 hover:text-red-600 transition">
                              {filInfo[0].title}
                          </Link>
                      )}
                  </div>
              </div>
          </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        
        {/* === SECTION 1 : LA GRANDE UNE (2 Articles côte à côte) === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* COLONNE PRINCIPALE (8/12) - Contient les 2 gros articles */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Article 1 (Le plus récent) */}
                {mainArticle1 && (
                    <Link href={`/article/${mainArticle1.slug}`} className="group block">
                        <article className="flex flex-col h-full">
                            <div className="relative overflow-hidden w-full h-64 mb-4 bg-gray-200">
                                <img 
                                    src={mainArticle1.image_url} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <span className="absolute bottom-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase">
                                    {mainArticle1.category}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold leading-tight mb-3 group-hover:text-red-600 transition-colors">
                                {mainArticle1.title}
                            </h1>
                            <div className="flex items-center text-xs text-gray-400 mb-3 gap-3 uppercase font-semibold">
                                <span className="text-gray-900">À la Une</span>
                                <span className="flex items-center gap-1"><Clock size={12}/> Il y a 10 min</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify line-clamp-4">
                                {mainArticle1.excerpt}
                            </p>
                        </article>
                    </Link>
                )}

                {/* Article 2 (Le 2ème plus récent) */}
                {mainArticle2 && (
                    <Link href={`/article/${mainArticle2.slug}`} className="group block">
                        <article className="flex flex-col h-full">
                            <div className="relative overflow-hidden w-full h-64 mb-4 bg-gray-200">
                                <img 
                                    src={mainArticle2.image_url} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <span className="absolute bottom-0 left-0 bg-black text-white text-xs font-bold px-3 py-1 uppercase">
                                    {mainArticle2.category}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold leading-tight mb-3 group-hover:text-red-600 transition-colors">
                                {mainArticle2.title}
                            </h1>
                            <div className="flex items-center text-xs text-gray-400 mb-3 gap-3 uppercase font-semibold">
                                <span className="text-gray-900">Récent</span>
                                <span className="flex items-center gap-1"><Clock size={12}/> Il y a 30 min</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify line-clamp-4">
                                {mainArticle2.excerpt}
                            </p>
                        </article>
                    </Link>
                )}

            </div>

            {/* SIDEBAR (4/12) */}
            <div className="lg:col-span-4 flex flex-col gap-8 justify-start">
                
                {/* Widget: Réseaux Sociaux */}
                <div className="bg-gray-50 p-6 border border-gray-100 text-center">
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Suivez-nous</h4>
                    <div className="flex justify-center gap-3">
                        <Link href="#" className="w-10 h-10 bg-white border border-gray-200 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition flex items-center justify-center rounded-full text-gray-600">
                            <Facebook size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 bg-white border border-gray-200 hover:bg-black hover:text-white hover:border-transparent transition flex items-center justify-center rounded-full text-gray-600">
                            <Twitter size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 bg-white border border-gray-200 hover:bg-[#0A66C2] hover:text-white hover:border-transparent transition flex items-center justify-center rounded-full text-gray-600">
                            <Linkedin size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 bg-white border border-gray-200 hover:bg-[#FF0000] hover:text-white hover:border-transparent transition flex items-center justify-center rounded-full text-gray-600">
                            <Youtube size={18} />
                        </Link>
                        <Link href="#" className="w-10 h-10 bg-white border border-gray-200 hover:bg-[#E4405F] hover:text-white hover:border-transparent transition flex items-center justify-center rounded-full text-gray-600">
                            <Instagram size={18} />
                        </Link>
                    </div>
                </div>

                {/* Widget: En Continu (Liste verticale) */}
                <div>
                    <h4 className="text-lg font-bold border-b-2 border-black mb-4 pb-1">
                        <span className="text-red-600 mr-1">En</span> Continu
                    </h4>
                    
                    <div className="space-y-4">
                        {filInfo.length > 0 ? (
                            filInfo.map((news, i) => (
                                <Link key={i} href={`/article/${news.slug}`} className="flex gap-3 border-b border-gray-100 pb-3 last:border-0 group">
                                    <span className="text-3xl font-black text-gray-200 group-hover:text-red-600 transition-colors leading-none">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h5 className="font-bold text-sm leading-snug hover:text-red-600 transition cursor-pointer line-clamp-2">
                                            {news.title}
                                        </h5>
                                        <span className="text-[10px] text-gray-400 mt-1 block uppercase">{news.category}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">Aucune information en continu.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>

        {/* === SECTION 2 : GRILLE D'ARTICLES RÉCENTS (Les suivants) === */}
        <div className="pt-8 border-t border-gray-200">
            <h4 className="text-lg font-bold border-b-2 border-black mb-6 pb-1 inline-block">
                Dernières publications
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {secondaryArticles.map((art, idx) => (
                    <Link key={idx} href={`/article/${art.slug}`} className="group cursor-pointer block">
                        <div className="overflow-hidden h-48 w-full mb-3 bg-gray-200 relative">
                            <img src={art.image_url} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <span className="text-[10px] font-bold text-red-600 uppercase mb-1 block">{art.category}</span>
                        <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition mb-2">
                            {art.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{art.excerpt}</p>
                    </Link>
                ))}
            </div>
        </div>

        {/* === SECTION 3 : CATÉGORIES SPÉCIFIQUES (Bas de page) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-t border-gray-200 pt-8 mt-8">
            {[culture, sport, femme].map((catItem, idx) => catItem && (
                <div key={idx}>
                    <h4 className="text-lg font-bold border-b-2 border-black mb-4 pb-1 flex justify-between items-end">
                        <span>{catItem.category}</span>
                        <Link href={`/actualites?category=${catItem.category}`} className="text-[10px] text-gray-500 uppercase hover:text-red-600 flex items-center">
                            Voir plus <ChevronRight size={12}/>
                        </Link>
                    </h4>
                    
                    <Link href={`/article/${catItem.slug}`} className="group cursor-pointer block">
                        <div className="overflow-hidden h-48 w-full mb-3 bg-gray-200 relative">
                            <img src={catItem.image_url} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition mb-2">
                            {catItem.title}
                        </h3>
                    </Link>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}