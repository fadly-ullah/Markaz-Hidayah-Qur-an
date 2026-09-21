import React from 'react';
import { PesantrenProvider, usePesantren } from './context/PesantrenContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { GalleryLightbox } from './components/GalleryLightbox';
import { ToastContainer } from './components/ToastContainer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { ProfilPage } from './pages/ProfilPage';
import { ProgramPage } from './pages/ProgramPage';
import { FasilitasPage } from './pages/FasilitasPage';
import { GaleriPage } from './pages/GaleriPage';
import { ArtikelPage } from './pages/ArtikelPage';
import { ArtikelDetailPage } from './pages/ArtikelDetailPage';
import { PendaftaranPage } from './pages/PendaftaranPage';
import { DonasiPage } from './pages/DonasiPage';
import { KontakPage } from './pages/KontakPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentRoute } = usePesantren();

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'profil':
        return <ProfilPage />;
      case 'program':
        return <ProgramPage />;
      case 'fasilitas':
        return <FasilitasPage />;
      case 'galeri':
        return <GaleriPage />;
      case 'artikel':
        return <ArtikelPage />;
      case 'artikel-detail':
        return <ArtikelDetailPage />;
      case 'pendaftaran':
        return <PendaftaranPage />;
      case 'donasi':
        return <DonasiPage />;
      case 'kontak':
        return <KontakPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-600 selection:text-white antialiased">
      {/* Global Header */}
      <Header />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Floater & Lightbox */}
      <FloatingWhatsApp />
      <GalleryLightbox />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <PesantrenProvider>
        <AppContent />
      </PesantrenProvider>
    </ErrorBoundary>
  );
}
