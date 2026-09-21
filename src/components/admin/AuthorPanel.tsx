import React, { useState } from 'react';
import { usePesantren } from '../../context/PesantrenContext';
import { Article, ArticleCategory } from '../../types';
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  Globe,
  Sparkles,
  LogOut,
  Clock,
  BookOpen,
  Cloud,
  CheckCircle2,
  UploadCloud,
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { SeoPreviewModal } from '../SeoPreviewModal';
import { ImagePickerField } from './ImagePickerField';

export const AuthorPanel: React.FC = () => {
  const {
    loggedInAuthor,
    logoutAdmin,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    navigateToArticle,
    showToast,
    syncApiUrl,
    isSyncing,
    lastSyncTime,
    pushArticlesToHosting,
    pushToHosting
  } = usePesantren();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [seoPreviewArticle, setSeoPreviewArticle] = useState<Article | null>(null);

  // Article Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artSlug, setArtSlug] = useState('');
  const [artCategory, setArtCategory] = useState<ArticleCategory>('Berita Pesantren');
  const [artAuthor, setArtAuthor] = useState(loggedInAuthor?.name || 'Redaksi Markaz Hidayah');
  const [artReadTime, setArtReadTime] = useState('4 menit');
  const [artThumbnail, setArtThumbnail] = useState('');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artTags, setArtTags] = useState('pesantren, tahfidz, hidayah quran');
  const [artSeoTitle, setArtSeoTitle] = useState('');
  const [artSeoDesc, setArtSeoDesc] = useState('');
  const [artSeoKeywords, setArtSeoKeywords] = useState('');
  const [artStatus, setArtStatus] = useState<'Published' | 'Draft'>('Published');

  const categories: ArticleCategory[] = [
    'Berita Pesantren',
    'Artikel Keislaman',
    'Kegiatan Santri',
    'Pengumuman',
    'Pendidikan',
    'Laporan'
  ];

  const handleOpenCreateModal = () => {
    setEditingArticleId(null);
    setArtTitle('');
    setArtSlug('');
    setArtCategory('Berita Pesantren');
    setArtAuthor(loggedInAuthor?.name || 'Redaksi Markaz Hidayah');
    setArtReadTime('4 menit');
    setArtThumbnail('https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80');
    setArtSummary('');
    setArtContent('');
    setArtTags('pesantren, tahfidz, hidayah quran');
    setArtSeoTitle('');
    setArtSeoDesc('');
    setArtSeoKeywords('');
    setArtStatus('Published');
    setIsArticleModalOpen(true);
  };

  const handleOpenEditModal = (art: Article) => {
    setEditingArticleId(art.id);
    setArtTitle(art.title || '');
    setArtSlug(art.slug || '');
    setArtCategory(art.category || 'Berita Pesantren');
    setArtAuthor(art.author || loggedInAuthor?.name || 'Redaksi Markaz Hidayah');
    setArtReadTime(art.readTime || '4 menit');
    setArtThumbnail(art.thumbnail || '');
    setArtSummary(art.summary || '');
    setArtContent(art.content || '');
    setArtTags(Array.isArray(art.tags) ? art.tags.join(', ') : (art.tags || ''));
    setArtSeoTitle(art.seoTitle || '');
    setArtSeoDesc(art.seoDescription || '');
    setArtSeoKeywords(art.seoKeywords || '');
    setArtStatus(art.status || 'Published');
    setIsArticleModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setArtTitle(val);
    if (!editingArticleId) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setArtSlug(generatedSlug);
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artContent.trim()) {
      showToast('Gagal Menyimpan', 'Judul dan konten artikel wajib diisi.', 'error');
      return;
    }

    const finalSlug = artSlug.trim() || artTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const tagsArray = artTags.split(',').map((t) => t.trim()).filter(Boolean);
    const today = new Date().toISOString().split('T')[0];

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title: artTitle.trim(),
        slug: finalSlug,
        category: artCategory,
        author: artAuthor.trim(),
        readTime: artReadTime.trim(),
        thumbnail: artThumbnail,
        summary: artSummary.trim(),
        content: artContent.trim(),
        tags: tagsArray,
        seoTitle: artSeoTitle.trim() || artTitle.trim(),
        seoDescription: artSeoDesc.trim() || artSummary.trim(),
        seoKeywords: artSeoKeywords.trim(),
        status: artStatus
      });
    } else {
      addArticle({
        title: artTitle.trim(),
        slug: finalSlug,
        category: artCategory,
        author: artAuthor.trim(),
        date: today,
        readTime: artReadTime.trim(),
        thumbnail: artThumbnail,
        summary: artSummary.trim(),
        content: artContent.trim(),
        tags: tagsArray,
        seoTitle: artSeoTitle.trim() || artTitle.trim(),
        seoDescription: artSeoDesc.trim() || artSummary.trim(),
        seoKeywords: artSeoKeywords.trim(),
        status: artStatus
      });
    }

    setIsArticleModalOpen(false);
  };

  const handlePushToHosting = async () => {
    // Attempt dedicated article push first or standard push
    try {
      await pushArticlesToHosting();
    } catch {
      await pushToHosting();
    }
  };

  // Filter articles safely
  const filteredArticles = (articles || []).filter((art) => {
    if (!art) return false;
    const cat = art.category || '';
    const matchCat = selectedCategory === 'Semua' || cat === selectedCategory;
    const q = (searchQuery || '').toLowerCase().trim();
    if (!q) return matchCat;
    const title = (art.title || '').toLowerCase();
    const summary = (art.summary || '').toLowerCase();
    const author = (art.author || '').toLowerCase();
    const matchSearch = title.includes(q) || summary.includes(q) || author.includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* AUTHOR TOP NAVIGATION BAR */}
      <div className="bg-slate-900 text-white py-5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold shadow-inner">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">Panel Penulis & Redaksi Artikel</h1>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-400/30">
                  Author Khusus
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Selamat datang, <strong>{loggedInAuthor?.name || 'Penulis'}</strong>{loggedInAuthor?.username ? ` (@${loggedInAuthor.username})` : ''}. Fokus tulis, kelola, dan posting artikel ke hosting.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handlePushToHosting}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
              title="Kirim dan terbitkan artikel langsung ke hosting Rumahweb"
            >
              {isSyncing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <UploadCloud className="w-4 h-4" />
              )}
              <span>{isSyncing ? 'Mengupload ke Hosting...' : 'Posting ke Hosting Rumahweb'}</span>
            </button>

            <button
              type="button"
              onClick={logoutAdmin}
              className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-xs border border-rose-500/30 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* QUICK SYNC NOTICE */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-indigo-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Cloud className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Status Sinkronisasi Hosting Rumahweb</span>
                {lastSyncTime && (
                  <span className="text-[10px] text-teal-300 font-mono">
                    (Terakhir: {lastSyncTime})
                  </span>
                )}
              </div>
              <p className="text-[11px] text-teal-200 mt-0.5">
                Setiap selesai membuat atau mengubah artikel, klik tombol <strong>"Posting ke Hosting Rumahweb"</strong> agar artikel langsung terbit dan dapat dibaca oleh publik.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4 text-teal-700" />
            <span>Tulis Artikel Baru</span>
          </button>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul, penulis, topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {['Semua', ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={art.thumbnail || 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80'}
                  alt={art.title || 'Artikel Pesantren'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-600 text-white shadow-xs">
                  {art.category || 'Berita'}
                </span>
                <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs ${
                  art.status === 'Draft' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {art.status || 'Published'}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{art.date || ''}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime || '3 menit'}
                    </span>
                    <span>•</span>
                    <span className="text-teal-700 font-medium truncate max-w-[120px]">
                      {art.author || 'Redaksi'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                    {art.title || 'Tanpa Judul'}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary || (art.content ? art.content.slice(0, 100) : '')}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => navigateToArticle(art.slug)}
                      className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-teal-700 hover:bg-teal-50 text-xs font-medium flex items-center gap-1"
                      title="Lihat Tampilan di Web"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Lihat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSeoPreviewArticle(art)}
                      className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 text-xs font-medium flex items-center gap-1"
                      title="Pratinjau Google & Sosmed"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span className="text-[11px]">SEO</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(art)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-teal-700 hover:text-white transition-colors"
                      title="Edit Artikel"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus artikel "${art.title}"?`)) {
                          deleteArticle(art.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-700">Tidak ada artikel yang sesuai</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Coba gunakan kata kunci lain atau klik tombol "Tulis Artikel Baru" untuk membuat artikel pertama.
            </p>
          </div>
        )}
      </div>

      {/* ARTICLE CREATE / EDIT MODAL */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingArticleId ? 'Edit Artikel Pesantren' : 'Tulis & Publikasikan Artikel Baru'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsArticleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Keutamaan Menghafal Al-Qur'an Sejak Dini"
                    value={artTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Slug URL Web
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="keutamaan-menghafal-al-quran"
                    value={artSlug}
                    onChange={(e) => setArtSlug(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kategori Artikel
                  </label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value as ArticleCategory)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Penulis
                  </label>
                  <input
                    type="text"
                    value={artAuthor}
                    onChange={(e) => setArtAuthor(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimasi Waktu Baca
                  </label>
                  <input
                    type="text"
                    placeholder="cth: 4 menit"
                    value={artReadTime}
                    onChange={(e) => setArtReadTime(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Status Publikasi
                  </label>
                  <select
                    value={artStatus}
                    onChange={(e) => setArtStatus(e.target.value as 'Published' | 'Draft')}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 font-semibold"
                  >
                    <option value="Published">Published (Terbit di Website)</option>
                    <option value="Draft">Draft (Simpan Sementara)</option>
                  </select>
                </div>
              </div>

              {/* THUMBNAIL PICKER */}
              <div>
                <ImagePickerField
                  label="Foto Sampul / Thumbnail Artikel"
                  value={artThumbnail}
                  onChange={(url) => setArtThumbnail(url)}
                  helperText="Upload gambar dari laptop/HP Anda atau gunakan URL gambar yang jernih."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ringkasan Singkat (Muncul di cuplikan kartu web & deskripsi share WA)
                </label>
                <textarea
                  rows={2}
                  placeholder="Penjelasan ringkas 1-2 kalimat mengenai isi artikel..."
                  value={artSummary}
                  onChange={(e) => setArtSummary(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Konten Lengkap Artikel * (Mendukung paragraf rapi & kutipan dalil)
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Tuliskan isi artikel lengkap di sini..."
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono leading-relaxed"
                />
              </div>

              {/* SEO SETTINGS */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-800">
                    Pengaturan Optimasi SEO Google & Media Sosial
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      SEO Meta Title
                    </label>
                    <input
                      type="text"
                      placeholder="Biarkan kosong untuk memakai Judul Artikel"
                      value={artSeoTitle}
                      onChange={(e) => setArtSeoTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Keywords / Kata Kunci Google
                    </label>
                    <input
                      type="text"
                      placeholder="tahfidz, bogor, santri, adab"
                      value={artSeoKeywords}
                      onChange={(e) => setArtSeoKeywords(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <UploadCloud className="w-3.5 h-3.5 text-teal-600" />
                  <span>Setelah disimpan, klik Posting ke Hosting agar terbit di web publik.</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsArticleModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{editingArticleId ? 'Simpan Perubahan' : 'Terbitkan Artikel'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEO MODAL PREVIEW */}
      <SeoPreviewModal
        article={seoPreviewArticle}
        onClose={() => setSeoPreviewArticle(null)}
      />
    </div>
  );
};
