import React, { useState } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Copy,
  Check,
  Globe,
  Tag,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { SeoPreviewModal } from '../components/SeoPreviewModal';

export const ArtikelDetailPage: React.FC = () => {
  const { articles, selectedArticleSlug, setCurrentRoute, navigateToArticle } = usePesantren();
  const [copied, setCopied] = useState(false);
  const [showSeoModal, setShowSeoModal] = useState(false);

  const validArticles = (articles || []).filter(Boolean);
  const article = validArticles.find(a => a && a.slug === selectedArticleSlug) || validArticles[0] || {
    id: 'default',
    title: 'Artikel Pesantren',
    slug: 'artikel-pesantren',
    category: 'Berita Pesantren',
    author: 'Redaksi',
    date: '1 Januari 2026',
    readTime: '3 menit',
    thumbnail: '',
    summary: '',
    content: '',
    tags: ['pesantren'],
    status: 'Published',
    seoTitle: 'Artikel Pesantren',
    seoDescription: 'Artikel Markaz Hidayah Qur\'an',
    seoKeywords: 'pesantren'
  };

  const relatedArticles = validArticles
    .filter(a => a && a.id !== article.id && (!a.status || a.status === 'Published'))
    .slice(0, 3);

  const getShareUrl = () => {
    return `${window.location.origin}/?article=${article.slug}`;
  };

  const handleShareWhatsApp = () => {
    const shareUrl = getShareUrl();
    const text = `Baca artikel "${article.title}" dari Markaz Hidayah Qur'an:\n${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    const shareUrl = getShareUrl();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="bg-slate-100/80 border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-slate-600">
          <button
            onClick={() => setCurrentRoute('artikel')}
            className="flex items-center gap-1.5 font-semibold text-teal-700 hover:text-teal-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Artikel</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Kategori:</span>
            <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold">
              {article.category}
            </span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Title Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              Waktu baca: {article.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Penulis: {article.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {article.summary}
          </p>

          {/* Social Share & SEO Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-y border-slate-200 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Bagikan:</span>
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowSeoModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Cek Metadata SEO & Schema</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-md bg-slate-100 border border-slate-200">
          <img
            src={article.thumbnail || null}
            alt={article.title}
            className="w-full max-h-[460px] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
          {article.content.split('\n\n').map((para, i) => {
            if (para.startsWith('### ')) {
              return (
                <h3 key={i} className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2">
                  {para.replace('### ', '')}
                </h3>
              );
            }
            if (para.startsWith('> ')) {
              return (
                <blockquote
                  key={i}
                  className="p-4 my-4 bg-teal-50/80 border-l-4 border-teal-600 italic text-teal-900 rounded-r-xl"
                >
                  {para.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Kata Kunci / Tagar Artikel:
          </span>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((t, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <section className="pt-10 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Artikel Terkait Lainnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateToArticle(rel.slug)}
                className="cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="h-36 overflow-hidden bg-slate-100">
                  <img
                    src={rel.thumbnail || null}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <span className="text-[10px] font-bold text-teal-700 uppercase">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">{rel.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* SEO Modal */}
      {showSeoModal && (
        <SeoPreviewModal
          article={article}
          onClose={() => setShowSeoModal(false)}
        />
      )}
    </div>
  );
};
