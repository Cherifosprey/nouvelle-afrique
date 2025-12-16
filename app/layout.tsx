import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <--- AJOUTER CECI

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nouvelle Afrique - L'information en continu",
  description: "Site d'information de référence en Afrique de l'Ouest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-grow">
            {children}
        </div>
        <Footer /> {/* <--- ET CECI */}
      </body>
    </html>
  );
}