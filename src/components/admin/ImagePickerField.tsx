import React, { useState, useRef } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { Upload, Images, Link2, X, Check, Search, Eye, Trash2, Camera, Sparkles } from 'lucide-react';

interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  required?: boolean;
}

// Client-side image compression to ensure smooth performance & local storage safety
const compressImageFile = (file: File, maxWidth = 1200, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Gagal memproses gambar'));
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  aspectRatio = 'video',
  required = false
}) => {
  const { gallery, showToast } = usePesantren();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchGallery, setSearchGallery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  // Filter gallery items
  const categories = ['Semua', ...Array.from(new Set(gallery.map(g => g.category)))];
  const filteredGallery = gallery.filter(item => {
    const matchCategory = filterCategory === 'Semua' || item.category === filterCategory;
    const matchSearch = !searchGallery || 
      item.title.toLowerCase().includes(searchGallery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchGallery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Handle file selection from device
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      showToast('Format Tidak Sesuai', 'Silakan pilih file gambar (JPG, PNG, atau WEBP).', 'error');
      return;
    }

    try {
      setIsUploading(true);
      const compressedDataUrl = await compressImageFile(file);
      onChange(compressedDataUrl);
      showToast('Foto Berhasil Diunggah', `Foto "${file.name}" siap digunakan dari perangkat.`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Gagal Membaca File', 'Terjadi kesalahan saat memproses gambar dari perangkat.', 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSelectFromGallery = (imageUrl: string, title: string) => {
    onChange(imageUrl);
    setIsGalleryOpen(false);
    showToast('Foto Dipilih', `Foto "${title}" dari galeri berhasil dipasang.`, 'info');
  };

  const isLocalDevicePhoto = value && value.startsWith('data:image/');

  return (
    <div className="space-y-2">
      {/* Label & Header */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {value && (
          <span className="text-[10px] font-medium text-slate-500">
            {isLocalDevicePhoto ? 'Sumber: Dari Perangkat' : 'Sumber: URL / Galeri'}
          </span>
        )}
      </div>

      {/* Main Preview & Action Box */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
        {/* Preview Container */}
        {value ? (
          <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
            <div
              className={`w-full overflow-hidden bg-slate-900/5 ${
                aspectRatio === 'video' ? 'aspect-video' :
                aspectRatio === 'square' ? 'aspect-square max-h-48 mx-auto' :
                aspectRatio === 'wide' ? 'aspect-21/9' : 'h-40'
              }`}
            >
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Overlay Action Buttons */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white text-slate-800 text-[11px] font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Full</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Ganti Foto</span>
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-2 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                title="Hapus foto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-5 text-center cursor-pointer transition-colors bg-white group"
          >
            <div className="w-10 h-10 mx-auto rounded-full bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
              <Camera className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-700">Pilih atau Unggah Foto</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Klik untuk mengambil dari HP / Laptop Anda</div>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Button: Upload from device */}
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Memproses...' : 'Upload dari Perangkat'}</span>
          </button>

          {/* Button: Pick from gallery */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Images className="w-3.5 h-3.5 text-teal-700" />
            <span>Pilih dari Galeri ({gallery.length})</span>
          </button>

          {/* Button: URL Toggle */}
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showUrlInput 
                ? 'bg-slate-200 border-slate-300 text-slate-900' 
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Input Link URL</span>
          </button>
        </div>

        {/* Optional Manual URL Input */}
        {showUrlInput && (
          <div className="pt-2 border-t border-slate-200/70 space-y-1">
            <label className="block text-[11px] font-semibold text-slate-600">
              Tempel URL / Tautan Gambar Langsung:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://images.unsplash.com/... atau https://..."
                className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono text-slate-900"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="px-2.5 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {helperText && (
          <p className="text-[11px] text-slate-400">
            {helperText}
          </p>
        )}
      </div>

      {/* MODAL: PILIH DARI GALERI PESANTREN */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Images className="w-4 h-4 text-teal-700" />
                  <span>Pilih Foto dari Galeri Pesantren</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Klik foto kegiatan atau fasilitas yang ingin dipasang pada bagian ini
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 border-b border-slate-100 space-y-2.5 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari foto berdasarkan judul kegiatan atau kategori..."
                  value={searchGallery}
                  onChange={(e) => setSearchGallery(e.target.value)}
                  className="w-full text-xs pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      filterCategory === cat
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid Content */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 bg-slate-50/30">
              {filteredGallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredGallery.map((item) => {
                    const isSelected = value === item.imageUrl;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectFromGallery(item.imageUrl, item.title)}
                        className={`group cursor-pointer rounded-xl overflow-hidden border transition-all text-left bg-white relative ${
                          isSelected
                            ? 'ring-2 ring-teal-600 border-teal-600 shadow-md'
                            : 'border-slate-200 hover:border-teal-400 hover:shadow-xs'
                        }`}
                      >
                        <div className="aspect-video relative overflow-hidden bg-slate-100">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                            {item.category}
                          </span>
                          {isSelected && (
                            <div className="absolute inset-0 bg-teal-900/40 flex items-center justify-center text-white">
                              <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center shadow-md">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <div className="text-[11px] font-bold text-slate-800 line-clamp-1 group-hover:text-teal-700">
                            {item.title}
                          </div>
                          <div className="text-[9px] text-slate-400 mt-0.5">{item.date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Tidak ada foto galeri yang cocok dengan pencarian.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 border-t border-slate-100 bg-white flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Total {filteredGallery.length} foto tersedia
              </span>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL PREVIEW MODAL */}
      {isPreviewOpen && value && (
        <div
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-black">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={value}
              alt={label}
              className="max-h-[85vh] w-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
