import React, { useState, useMemo } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import { Article, ArticleCategory } from '../types';
import { Search, Clock, Calendar, ArrowRight, BookOpen, Globe, ChevronRight } from 'lucide-react';
import { SeoPreviewModal } from '../components/SeoPreviewModal';

export const ArtikelPage: React.FC = () => {
  const { articles, navigateToArticle } = usePesantren();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [seoPreviewArticle, setSeoPreviewArticle] = useState<Article | null>(null);

  const categories = [
    'Semua',
    'Pengumuman',
    'Berita Pesantren',
    'Artikel Keislaman',
    'Kegiatan Santri',
    'Pendidikan',
    'Laporan'
  ];

  const publishedArticles = useMemo(() => {
    return articles.filter(a => a.status === 'Published');
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return publishedArticles.filter(art => {
      const matchCat = selectedCategory === 'Semua' || art.category === selectedCategory;
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.seoKeywords.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [publishedArticles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-800 via-teal-700 to-sky-800 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
            Warta, Edukasi & Dakwah
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Artikel, Berita & Publikasi Pesantren
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            Pusat informasi resmi kegiatan pesantren, artikel mutiara tauhid, tips tahfidz Al-Qur'an, serta laporan pertanggungjawaban kegiatan umat.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari artikel, topik atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-800"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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

        {/* SEO Indicator Note */}
        <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-teal-900">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              Seluruh artikel terindeks dengan <strong>Meta SEO-Friendly (OpenGraph & Schema.org JSON-LD)</strong> untuk visibilitas mesin pencari Google.
            </span>
          </div>
          <span className="text-[11px] font-medium text-teal-700">
            {filteredArticles.length} artikel ditemukan
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col group"
            >
              <div
                onClick={() => navigateToArticle(article.slug)}
                className="h-52 overflow-hidden relative bg-slate-100 cursor-pointer"
              >
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-teal-600 text-white shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2
                    onClick={() => navigateToArticle(article.slug)}
                    className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-teal-700 transition-colors leading-snug cursor-pointer line-clamp-2"
                  >
                    {article.title}
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => navigateToArticle(article.slug)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>Baca Artikel</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => setSeoPreviewArticle(article)}
                    title="Periksa Metadata SEO & Schema"
                    className="p-1.5 rounded-md text-slate-400 hover:text-teal-700 hover:bg-teal-50 transition-colors text-[11px] flex items-center gap-1"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>SEO Meta</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 space-y-2">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-700">Tidak ada artikel yang cocok</h3>
            <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian Anda atau pilih kategori lain.</p>
          </div>
        )}
      </div>

      {/* SEO Preview Modal */}
      {seoPreviewArticle && (
        <SeoPreviewModal
          article={seoPreviewArticle}
          onClose={() => setSeoPreviewArticle(null)}
        />
      )}
    </div>
  );
};
