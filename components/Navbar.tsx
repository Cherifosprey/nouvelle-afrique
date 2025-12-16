"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User } from 'lucide-react';

const NAV_LINKS = [
  // Ajout de Politique en premier
  { name: "Politique", href: "/actualites?category=Politique" },
  { name: "Économie", href: "/actualites?category=Économie" },
  { name: "Société", href: "/actualites?category=Société" },
  { name: "Culture", href: "/actualites?category=Culture" },
  { name: "Sport", href: "/actualites?category=Sport" },
  { name: "L'Interview", href: "/actualites?category=L'Interview" },
  { name: "Villes et Communes", href: "/actualites?category=Villes et communes africaines" },
  { name: "Mémoires africaines", href: "/actualites?category=Les mémoires africaines" },
  { name: "Femmes d'Afrique", href: "/actualites?category=Femme d'Afrique" },
  { name: "Qui sommes-nous ?", href: "/qui-sommes-nous" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm font-sans sticky top-0 z-50">
      
      {/* 1. Ligne du Logo (Centré) */}
      <div className="container mx-auto px-4 py-6 flex justify-between items-center relative">
        
        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* LOGO CENTRÉ */}
        <Link href="/" className="flex items-end mx-auto lg:mx-0">
            <span className="text-3xl md:text-5xl font-black text-blue-600 tracking-tighter">Nouvelle</span>
            {/* Simulation de la carte Afrique en rouge */}
            <span className="text-3xl md:text-5xl font-black text-red-600 tracking-tighter flex items-baseline">
                Afrique
            </span>
        </Link>

        {/* Icons Droite (Recherche / Admin) */}
        <div className="hidden lg:flex items-center gap-4">
            <button className="text-gray-400 hover:text-red-600 transition"><Search size={20} /></button>
            <Link href="/admin" className="text-gray-400 hover:text-blue-600 transition"><User size={20} /></Link>
        </div>
      </div>

      {/* 2. Ligne de Navigation (Menu Desktop) */}
      <div className="border-t border-b border-gray-200 hidden lg:block">
        <div className="container mx-auto px-4">
            <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 py-3">
                {NAV_LINKS.map((link) => (
                    <Link 
                        key={link.name} 
                        href={link.href}
                        className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                            link.name === "Qui sommes-nous ?" 
                            ? "text-blue-600 hover:text-red-600" // Couleur différente pour le distinguer
                            : "text-gray-700 hover:text-red-600"
                        }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </div>
      </div>

      {/* 3. Menu Mobile (Overlay) */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg py-4 px-6 flex flex-col gap-4 z-50">
            {NAV_LINKS.map((link) => (
                <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-base font-bold text-gray-800 py-2 border-b border-gray-50 last:border-0"
                    onClick={() => setIsOpen(false)}
                >
                    {link.name}
                </Link>
            ))}
            <Link href="/admin" className="text-sm text-blue-600 font-bold mt-2 pt-2 border-t border-gray-100">
                Connexion Admin
            </Link>
        </div>
      )}
    </header>
  );
}