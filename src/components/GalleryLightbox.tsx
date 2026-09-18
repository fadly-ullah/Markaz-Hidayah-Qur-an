import React, { useEffect } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GalleryLightbox: React.FC = () => {
  const { gallery, activeLightboxIndex, closeLightbox, openLightbox } = usePesantren();

  const isVisible = activeLightboxIndex !== null && gallery[activeLightboxIndex] !== undefined;
  const currentItem = isVisible ? gallery[activeLightboxIndex!] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, activeLightboxIndex, gallery.length]);

  if (!isVisible || !currentItem) return null;

  const handleNext = () => {
    if (activeLightboxIndex === null) return;
    const nextIdx = (activeLightboxIndex + 1) % gallery.length;
    openLightbox(nextIdx);
  };

  const handlePrev = () => {
    if (activeLightboxIndex === null) return;
    const prevIdx = (activeLightboxIndex - 1 + gallery.length) % gallery.length;
    openLightbox(prevIdx);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 z-60 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Tutup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-60 p-2.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/25 rounded-full transition-colors hidden sm:flex items-center justify-center"
          aria-label="Foto Sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-60 p-2.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/25 rounded-full transition-colors hidden sm:flex items-center justify-center"
          aria-label="Foto Selanjutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Modal Content */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Canvas */}
          <div className="relative flex-1 bg-black/50 flex items-center justify-center min-h-[300px] max-h-[65vh] overflow-hidden">
            <img
              src={currentItem.imageUrl}
              alt={currentItem.title}
              className="max-w-full max-h-[65vh] object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Details Bar */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Tag className="w-3 h-3" />
                {currentItem.category}
              </span>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {currentItem.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {currentItem.location}
                </span>
                <span className="text-slate-500">
                  {activeLightboxIndex! + 1} / {gallery.length}
                </span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
              {currentItem.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentItem.description}
            </p>

            {/* Mobile Prev/Next controls */}
            <div className="flex sm:hidden items-center justify-between mt-4 pt-3 border-t border-slate-800 text-xs">
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white"
              >
                ← Sebelumnya
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
