import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Clock, ChevronRight, Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

// 1. RENDRE LA PAGE DYNAMIQUE
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: articles } = await supabase.from('articles').select('*').order('created_at', { ascending: false });

  // Sélections dynamiques
  const politique = articles?.find(a => a.category === 'Politique' && a.image_url);
  const economie = articles?.find(a => a.category === 'Économie');
  const societe = articles?.find(a => a.category === 'Société');
  const culture = articles?.find(a => a.category === 'Culture');
  const sport = articles?.find(a => a.category === 'Sport');
  const femme = articles?.find(a => a.category === "Femme d'Afrique");

  // CORRECTION FIL INFO : On prend les 5 derniers articles, peu importe l'image, 
  // en excluant celui qui est déjà à la Une (politique) pour éviter la répétition.
  const filInfo = articles?.filter(a => a.id !== politique?.id).slice(0, 5) || [];

  return (
    <main className="bg-white min-h-screen font-sans text-gray-800">
      
      {/* 1. BARRE "FLASH INFO" (Défilante) */}
      <div className="bg-gray-100 border-b border-gray-200 py-2">
          <div className="container mx-auto px-4 flex items-center gap-3">
              <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 shrink-0">Flash Info</span>
              <div className="overflow-hidden h-5 w-full relative">
                  <div className="flex flex-col animate-pulse">
                      {/* On affiche juste le premier titre pour le flash info header */}
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
        
        {/* === SECTION 1 : LA UNE + SIDEBAR === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* COLONNE GAUCHE (8/12) */}
            <div className="lg:col-span-8">
                
                {/* Article Principal (CLIQUABLE) */}
                {politique && (
                    <Link href={`/article/${politique.slug}`} className="group mb-10 block">
                        <article>
                            <div className="relative overflow-hidden w-full h-[400px] mb-4 bg-gray-200">
                                <img 
                                    src={politique.image_url} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <span className="absolute bottom-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase">
                                    Politique
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3 group-hover:text-red-600 transition-colors">
                                {politique.title}
                            </h1>
                            <div className="flex items-center text-xs text-gray-400 mb-3 gap-3 uppercase font-semibold">
                                <span className="text-gray-900">Par la Rédaction</span>
                                <span className="flex items-center gap-1"><Clock size={12}/> Aujourd'hui</span>
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed text-justify border-l-4 border-gray-200 pl-4 group-hover:border-red-600 transition-colors">
                                {politique.excerpt}
                            </p>
                        </article>
                    </Link>
                )}

                {/* Sous-section : Grille 2 colonnes (Eco / Société) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    {[economie, societe].map((art, idx) => art && (
                        <Link key={idx} href={`/article/${art.slug}`} className="flex gap-4 group items-start">
                            <div className="w-28 h-24 flex-shrink-0 overflow-hidden bg-gray-200 relative">
                                <img src={art.image_url} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-red-600 uppercase mb-1 block">{art.category}</span>
                                <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-3">
                                    {art.title}
                                </h3>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10}/> 2h</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>

            {/* SIDEBAR (4/12) */}
            {/* CORRECTION : justify-start au lieu de justify-between pour empiler vers le haut */}
            <div className="lg:col-span-4 flex flex-col gap-8 justify-start">
                
                {/* Widget: Réseaux Sociaux (ICÔNES RÉELLES) */}
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

                {/* Widget: En Continu */}
                <div>
                    <h4 className="text-lg font-bold border-b-2 border-black mb-4 pb-1">
                        <span className="text-red-600 mr-1">En</span> Continu
                    </h4>
                    
                    {/* LISTE DES INFOS EN CONTINU */}
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
                                        <span className="text-[10px] text-gray-400 mt-1 block uppercase">Il y a 30 min</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">Aucune information en continu pour le moment.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>

        {/* === SECTION 2 : CATÉGORIES GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-t border-gray-200 pt-8">
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
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
                        </div>
                        <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition mb-2">
                            {catItem.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{catItem.excerpt}</p>
                    </Link>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}