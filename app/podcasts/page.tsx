import { supabase } from '@/lib/supabase';
import { Video, PlayCircle } from 'lucide-react';
import PodcastItem from '@/components/PodcastItem';
import Link from 'next/link';

// Force la mise à jour des données à chaque visite
export const revalidate = 0;

export default async function PodcastsPage() {
  // Récupération de toutes les vidéos
  const { data: podcasts, error } = await supabase
    .from('podcasts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <div className="p-10 text-red-600">Erreur : {error.message}</div>;

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      
      {/* En-tête de page */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-8 mb-8">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900 mb-2 flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <Video className="text-blue-600 w-8 h-8" />
                </div>
                Vidéos & Reportages
            </h1>
            <p className="text-gray-500 text-lg">
                Retrouvez tous nos reportages, interviews et analyses en vidéo.
            </p>
        </div>
      </div>

      {/* Grille des vidéos */}
      <div className="container mx-auto px-4">
        {(!podcasts || podcasts.length === 0) ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                    <PlayCircle size={40} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Aucune vidéo disponible pour le moment.</p>
                <Link href="/admin/ajouter-podcast" className="text-blue-600 font-bold mt-4 inline-block hover:underline">
                    Ajouter une vidéo (Admin)
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {podcasts.map((podcast) => (
                    <PodcastItem key={podcast.id} podcast={podcast} />
                ))}
            </div>
        )}
      </div>
    </main>
  );
}