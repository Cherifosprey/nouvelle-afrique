import Link from 'next/link';
import { Quote } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen font-serif text-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Titre */}
        <div className="text-center mb-12">
            <span className="text-red-600 font-bold uppercase tracking-widest text-sm">À propos de nous</span>
            <h1 className="text-4xl md:text-5xl font-black mt-2 mb-6">L'Esprit Nouvelle Afrique</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Contenu */}
        <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed text-justify space-y-6">
            
            <p className="first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:float-left first-letter:mr-3">
                <span className="font-bold text-gray-900">Nouvelle Afrique</span> est un magazine panafricain d’information et de réflexion, né de la conviction profonde que l’Afrique doit reprendre la parole sur elle-même et assumer pleinement son destin.
            </p>

            <p>
                Initié par Monsieur <strong>Félix N’Guessan</strong>, journaliste et promoteur engagé, le projet repose sur une foi inébranlable en la dignité, l’intelligence et le génie créatif du continent africain.
            </p>

            {/* Citation mise en valeur */}
            <div className="bg-gray-50 border-l-4 border-red-600 p-8 my-8 relative rounded-r-lg">
                <Quote className="absolute top-4 left-4 text-gray-200 w-12 h-12 -z-10" />
                <p className="text-xl font-bold text-blue-900 italic text-center">
                    « Informer, former pour construire ensemble une Afrique de rêve »
                </p>
            </div>

            <p>
                À travers cette ligne éditoriale, Nouvelle Afrique se donne pour mission de valoriser les élites, les talents et les compétences africaines, tout en proposant des analyses rigoureuses, des témoignages, des enquêtes et des portraits inspirants.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Une aventure collective</h3>
            <p>
                Magazine 100 % africain, conçu et édité en Côte d’Ivoire par la société <strong>Copie Conforme</strong>, il fédère des compétences venues de plusieurs pays du continent.
            </p>

            <p>
                Cette aventure collective porte aussi l’empreinte indélébile de Monsieur <strong>Brou Bonaventure</strong>, l’un des pionniers du projet, dont l’engagement, la vision et la générosité intellectuelle ont marqué les fondations du magazine. Disparu en mars 2024, il demeure une source d’inspiration et de mémoire pour toute l’équipe.
            </p>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl text-center border border-blue-100">
                <p className="text-lg font-bold text-blue-900">
                    Nouvelle Afrique est avant tout votre magazine, un espace d’expression et d’espoir pour une Afrique confiante en son avenir.
                </p>
            </div>

        </div>

        {/* Bouton Retour */}
        <div className="mt-12 text-center">
            <Link href="/" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition shadow-lg">
                Retour à l'accueil
            </Link>
        </div>

      </div>
    </main>
  );
}