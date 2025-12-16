import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm border-t-4 border-red-600 mt-auto">
      <div className="container mx-auto px-4 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Colonne 1 : Société & Mentions Légales */}
            <div>
                <h3 className="text-white font-black uppercase mb-4 text-lg">Mentions Légales</h3>
                <ul className="space-y-2 text-xs text-gray-500">
                    <li><strong className="text-gray-300">Société éditrice :</strong> Copie Conforme</li>
                    <li><strong className="text-gray-300">Capital social :</strong> 9.500.000 F CFA</li>
                    <li><strong className="text-gray-300">Siège social :</strong> Abidjan Cocody Riviera Bonomin</li>
                    <li><strong className="text-gray-300">Récépissé Procureur :</strong> N°49 D du 20 août 2020</li>
                    <li><strong className="text-gray-300">Dépôt légal :</strong> N° 17017 du 01 décembre 2020</li>
                </ul>
                
                <h4 className="text-white font-bold uppercase mt-6 mb-2 text-xs">Contacts</h4>
                <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                        <MapPin size={14} className="text-red-500"/> Abidjan, Côte d'Ivoire
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone size={14} className="text-red-500"/> +225 07 57 19 19 20
                    </li>
                    <li className="flex items-center gap-2">
                        <Mail size={14} className="text-red-500"/> nouvelleafrique.infos@gmail.com
                    </li>
                </ul>
            </div>

            {/* Colonne 2 : L'Équipe Dirigeante */}
            <div>
                <h3 className="text-white font-black uppercase mb-4 text-lg">La Rédaction</h3>
                <ul className="space-y-3 text-xs text-gray-500">
                    <li className="border-b border-gray-800 pb-2">
                        <strong className="text-gray-300 block">Représentant légal - Gérant :</strong> 
                        M. N’Guessan K. Félix
                    </li>
                    <li className="border-b border-gray-800 pb-2">
                        <strong className="text-gray-300 block">Directeur de la Publication :</strong> 
                        Mme LOUBIA Hortense Kouamé
                    </li>
                    <li>
                        <strong className="text-gray-300 block">Responsable éditions spéciales pays :</strong> 
                        M. Rodolphe Flaha
                    </li>
                </ul>
                
                <div className="mt-6 flex gap-4">
                    <a href="#" className="hover:text-white transition"><Facebook size={20} /></a>
                    <a href="#" className="hover:text-white transition"><Twitter size={20} /></a>
                    <a href="#" className="hover:text-white transition"><Youtube size={20} /></a>
                </div>
            </div>

            {/* Colonne 3 : Liens & Navigation */}
            <div>
                <h3 className="text-white font-black uppercase mb-4 text-lg">Navigation</h3>
                <ul className="space-y-2 mb-6 text-sm">
                    <li><Link href="/qui-sommes-nous" className="hover:text-red-500 transition text-white font-bold">Qui sommes-nous ?</Link></li>
                    <li><a href="#" className="hover:text-red-500 transition">Nous contacter</a></li>
                    <li><a href="#" className="hover:text-red-500 transition">Abonnement</a></li>
                    <li><Link href="/admin" className="text-gray-600 hover:text-white text-xs">Connexion Admin</Link></li>
                </ul>
                
                <h4 className="text-white font-bold uppercase mb-2 text-xs">Télécharger l'application</h4>
                <div className="flex gap-2">
                    <button className="bg-gray-800 border border-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-700 text-white transition">Sur iPhone</button>
                    <button className="bg-gray-800 border border-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-700 text-white transition">Sur Android</button>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs">
             &copy; {new Date().getFullYear()} Nouvelle Afrique. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}