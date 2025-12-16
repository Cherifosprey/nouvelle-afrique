"use client";

import { useState } from 'react';
import { PlayCircle, Clock, Calendar } from 'lucide-react';

export default function PodcastItem({ podcast }: { podcast: any }) {
  const [showVideo, setShowVideo] = useState(false);

  // Fonction pour extraire l'ID de la vidéo YouTube depuis l'URL
  const getYouTubeID = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoID = getYouTubeID(podcast.audio_url);

  // Fonction date locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group flex flex-col h-full">
        
        {/* Zone Média : Soit Image, Soit Vidéo YouTube */}
        <div className="relative w-full aspect-video bg-black">
            {showVideo && videoID ? (
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
                    title={podcast.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                ></iframe>
            ) : (
                <div 
                    onClick={() => setShowVideo(true)}
                    className="cursor-pointer w-full h-full relative"
                >
                    <img 
                        src={podcast.image_url || "/placeholder.jpg"} 
                        alt={podcast.title} 
                        className="w-full h-full object-cover group-hover:opacity-90 transition duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="text-white w-16 h-16 opacity-90 drop-shadow-lg group-hover:scale-110 transition" />
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Clock size={10} /> {podcast.duration}
                    </span>
                </div>
            )}
        </div>

        {/* Infos */}
        <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <Calendar size={12} />
                <span>{formatDate(podcast.created_at)}</span>
            </div>
            <h3 className="font-bold text-lg leading-tight mb-2 text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                {podcast.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">
                {podcast.description}
            </p>
            
            {!showVideo && (
                <button 
                    onClick={() => setShowVideo(true)}
                    className="mt-auto block w-full text-center border border-blue-600 text-blue-600 text-sm font-bold py-2 rounded hover:bg-blue-600 hover:text-white transition"
                >
                    Regarder la vidéo
                </button>
            )}
        </div>
    </div>
  );
}