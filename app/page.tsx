import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Clock, Play } from 'lucide-react';

export const revalidate = 0;

export default async function Home() {
  const { data: articles } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
  const { data: podcasts } = await supabase.from('podcasts').select('*').order('created_at', { ascending: false });

  // Sélections spécifiques basées sur les titres insérés via SQL
  const politique = articles?.find(a => a.category === 'Politique' && a.image_url);
  const economie = articles?.find(a => a.category === 'Économie');
  const societe = articles?.find(a => a.category === 'Société');
  const interview = articles?.find(a => a.category === "L'Interview");
  const memoires = articles?.find(a => a.category === 'Les mémoires africaines');
  const villes = articles?.find(a => a.category === 'Villes et communes africaines');
  const culture = articles?.find(a => a.category === 'Culture');
  const sport = articles?.find(a => a.category === 'Sport');
  const femme = articles?.find(a => a.category === "Femme d'Afrique");

  const filInfo = articles?.filter(a => !a.image_url).slice(0, 5) || [];
  const mainVideo = podcasts?.[0];

  return (
    <main className="bg-white min-h-screen font-serif text-gray-900 text-base">
      
      {/* 1. Bande ROUGE */}
      <div className="bg-red-700 text-white text-center py-1 text-sm font-bold uppercase tracking-wider border-b border-red-800 shadow-sm">
          Les brèves
      </div>

      {/* 2. Publicité (Hauteur réduite) */}
      <div className="bg-[#f4e4d4] h-20 flex items-center justify-center mb-4 border-b border-gray-200">
          <span className="text-red-400 font-bold text-2xl opacity-50 uppercase tracking-widest">Espace Publicitaire</span>
      </div>

      <div className="container mx-auto px-4 space-y-6">
        
        {/* === SECTION 1 : POLITIQUE (Gauche) + SIDEBAR (Droite) === */}
        {/* items-stretch force les deux colonnes à avoir la même hauteur visuelle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* ARTICLE PRINCIPAL (8 cols) */}
            <div className="lg:col-span-8 border-r border-gray-200 pr-4 flex flex-col">
                <div className="bg-red-600 text-white inline-block px-3 py-1 text-sm font-bold uppercase mb-2 self-start">Politique</div>
                {politique && (
                    <div className="flex flex-col md:flex-row gap-4 items-stretch flex-1">
                        {/* 1. IMAGE (Plus grande) */}
                        <div className="w-full md:w-5/12 flex-shrink-0 relative min-h-[300px]">
                             {/* object-cover et h-full permettent à l'image de remplir la hauteur disponible */}
                            <img src={politique.image_url} className="w-full h-full object-cover border border-gray-200 shadow-sm absolute inset-0" />
                        </div>
                        
                        {/* 2. CONTENU (Texte plus gros) */}
                        <div className="flex-1 flex flex-col justify-between h-full">
                            <div>
                                <span className="text-gray-500 text-xs font-bold uppercase mb-1 block tracking-wide">
                                    Crise ivoiro - Burkinabée
                                </span>
                                <h1 className="text-3xl md:text-4xl font-black leading-none mb-2 hover:text-red-700 cursor-pointer">
                                    {politique.title}
                                </h1>
                                {/* Résumé en taille standard (text-base) mais dense */}
                                <div className="text-base text-gray-800 text-justify leading-snug">
                                    <span className="first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                                        {politique.excerpt.charAt(0)}
                                    </span>
                                    {politique.excerpt.substring(1)}
                                </div>
                            </div>

                            {/* PUBLICITÉ DE REMPLISSAGE (S'affiche si le texte est court) */}
                            {politique.excerpt.length < 600 && (
                                <div className="mt-4 bg-gray-50 border border-gray-100 p-2 flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">Publicité</span>
                                    <div className="w-full h-24 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400 text-xs font-bold uppercase">Votre Pub Ici</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* SIDEBAR (4 cols) - Ajustée pour prendre toute la hauteur */}
            <div className="lg:col-span-4 flex flex-col gap-4 h-full justify-between">
                {/* L'info en continue - Flex-1 pour s'étirer et remplir l'espace */}
                <div className="bg-gray-50 p-3 border border-gray-200 shadow-sm rounded-sm flex-1 flex flex-col">
                    <div className="bg-red-700 text-white text-center text-sm font-bold uppercase py-1 mb-2 shrink-0">L'info en continue</div>
                    
                    {/* Zone défilante si trop de contenu, sinon remplit l'espace */}
                    <div className="space-y-2 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                        {filInfo.map((news, i) => (
                            <div key={i} className="border-b border-gray-200 pb-2 last:border-0 leading-tight">
                                <p className="text-xs text-red-600 font-bold flex items-center gap-1 mb-0.5">
                                    <Clock size={12} /> 17H41
                                </p>
                                {/* Titres des brèves agrandis */}
                                <Link href="#" className="text-sm font-bold text-gray-900 hover:text-red-600 transition block leading-snug">
                                    {news.title}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Magazine - Reste collé en bas avec une taille fixe */}
                <div className="bg-white border border-gray-200 p-3 flex items-center gap-4 shadow-sm shrink-0">
                    <div className="flex-1 text-center">
                         <div className="bg-red-700 text-white w-full text-center text-xs font-bold uppercase py-1 mb-2">J'achète mon numéro</div>
                         <button className="text-xs font-bold text-blue-700 hover:underline uppercase border border-blue-700 px-2 py-1">S'abonner</button>
                    </div>
                    <div className="w-20 h-28 bg-white border border-gray-300 shadow-sm relative flex flex-col items-center justify-center p-1">
                         <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
                         <span className="text-red-600 font-black text-[10px] relative z-10 leading-none">Nouvelle</span>
                         <span className="text-blue-800 font-black text-[10px] relative z-10 leading-none">Afrique</span>
                    </div>
                </div>
            </div>
        </div>

        {/* === SECTION 2 : 3 COLONNES === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t-2 border-gray-200 pt-4">
            
            {/* Colonnes Standard */}
            {[economie, societe].map((art, idx) => art && (
                <div key={idx}>
                    <div className="bg-red-600 text-white inline-block px-2 py-0.5 text-xs font-bold uppercase mb-2">Actualité - {art.category}</div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                        {art.category === 'Économie' ? 'Togo' : 'Guinée Conakry'}
                    </p>
                    {/* Titres agrandis (text-lg) */}
                    <h3 className="font-bold text-lg leading-tight mb-2 hover:text-red-700 cursor-pointer">{art.title}</h3>
                    <div className="flex gap-3 items-start">
                         <img src={art.image_url} className="w-20 h-20 object-cover border border-gray-200 flex-shrink-0" />
                         {/* Texte agrandi (text-xs -> text-sm) */}
                         <p className="text-sm text-gray-700 text-justify leading-snug line-clamp-6">{art.excerpt}</p>
                    </div>
                </div>
            ))}
            
            {/* Interview */}
            {interview && (
                <div className="bg-gray-50 p-3 border border-gray-100">
                    <div className="bg-red-600 text-white inline-block px-2 py-0.5 text-xs font-bold uppercase mb-2">L'Interview</div>
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Côte d'Ivoire</p>
                    <h3 className="font-bold text-lg leading-tight italic text-blue-900 mb-2">"{interview.title}"</h3>
                    <div className="flex gap-3 items-start">
                         <img src={interview.image_url} className="w-20 h-20 object-cover border border-gray-200 flex-shrink-0" />
                         <p className="text-sm text-gray-700 text-justify leading-snug line-clamp-6">{interview.excerpt}</p>
                    </div>
                </div>
            )}
        </div>

        {/* === SECTION 3 : MÉMOIRES & TV === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t-2 border-gray-200 pt-4">
            {memoires && (
                <div className="flex gap-4 items-start">
                    <div className="w-40 flex-shrink-0">
                         <div className="bg-red-600 text-white text-xs font-bold uppercase px-2 py-0.5 mb-1 text-center">Mémoires</div>
                         <img src={memoires.image_url} className="w-full h-32 object-cover grayscale border border-gray-200 shadow-sm" />
                    </div>
                    <div className="flex-1">
                        <h2 className="font-bold text-xl mb-2 text-gray-900 leading-tight">La Conférence de Brazzaville</h2>
                        <p className="text-sm text-gray-700 text-justify leading-snug">{memoires.excerpt}</p>
                    </div>
                </div>
            )}

            {mainVideo && (
                <div>
                     <div className="flex justify-between items-center bg-red-800 text-white px-3 py-1 mb-2 shadow-sm">
                        <span className="text-xs font-bold uppercase">News Africa TV</span>
                        <span className="text-[10px] font-bold animate-pulse">EN DIRECT</span>
                     </div>
                     <div className="relative bg-black h-40 w-full border border-gray-800 group cursor-pointer overflow-hidden">
                         <img src={mainVideo.image_url} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                         <div className="absolute inset-0 flex items-center justify-center">
                             <Play size={32} fill="white" className="text-white" />
                         </div>
                         <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                             <p className="text-yellow-400 font-bold text-sm leading-none">{mainVideo.title}</p>
                         </div>
                     </div>
                </div>
            )}
        </div>

        {/* === SECTION 4 : BAS DE PAGE === */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t-2 border-gray-900 pt-4 pb-8">
            {[villes, culture, sport, femme].map((item, idx) => item && (
                <div key={idx} className="border-r border-gray-200 pr-2 last:border-0">
                    <div className="bg-red-600 text-white inline-block px-1 py-0.5 text-[10px] font-bold uppercase mb-2">
                        {item.category === 'Villes et communes africaines' ? 'Villes' : item.category}
                    </div>
                    {/* Titre agrandi */}
                    <h4 className="font-bold text-sm mb-1 truncate">{item.title}</h4>
                    <div className="flex gap-2">
                         <img src={item.image_url} className="w-12 h-12 object-cover border border-gray-100 flex-shrink-0" />
                         <p className="text-xs text-gray-600 text-justify leading-tight line-clamp-3">{item.excerpt}</p>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </main>
  );
}