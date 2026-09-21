import React, { useState } from 'react';
import { Article } from '../types';
import { X, Search, Share2, Code2, Globe, Check, Copy } from 'lucide-react';

interface SeoPreviewModalProps {
  article: Article;
  onClose: () => void;
}

export const SeoPreviewModal: React.FC<Article | SeoPreviewModalProps> = (props) => {
  const article: Article = 'article' in props ? props.article : props;
  const onClose = 'onClose' in props ? props.onClose : () => {};

  const [activeTab, setActiveTab] = useState<'google' | 'social' | 'schema'>('google');
  const [copied, setCopied] = useState(false);

  const domain = 'https://markazhidayah.sch.id';
  const articleUrl = `${domain}/artikel/${article.slug}`;

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDescription || article.summary,
    image: article.thumbnail,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: "Markaz Hidayah Qur'an",
      logo: {
        '@type': 'ImageObject',
        url: `${domain}/logo.png`
      }
    },
    datePublished: article.date,
    mainEntityOfPage: articleUrl
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLdSchema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="font-bold text-slate-800 text-sm">SEO & Metadata Previewer</h3>
              <p className="text-xs text-slate-500">Pratinjau mesin pencari & media sosial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('google')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'google'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Google SERP Snippet
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'social'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            Social OpenGraph Card
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'schema'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Schema.org (JSON-LD)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'google' && (
            <div className="space-y-4">
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
                  <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] flex items-center justify-center font-bold">
                    M
                  </span>
                  <span>markazhidayah.sch.id › artikel › {article.slug}</span>
                </div>
                <h4 className="text-blue-800 hover:underline text-base sm:text-lg font-medium cursor-pointer leading-snug">
                  {article.title} - Markaz Hidayah Qur'an
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {article.seoDescription || article.summary}
                </p>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-xs space-y-2">
                <h5 className="font-semibold text-teal-900">Analisis SEO Halaman:</h5>
                <ul className="list-disc list-inside text-teal-800 space-y-1">
                  <li><strong>Target Keyword:</strong> {article.seoKeywords || 'Tidak dispesifikasikan'}</li>
                  <li><strong>Slug URL:</strong> /artikel/{article.slug} (SEO-Friendly & Readable)</li>
                  <li><strong>Panjang Deskripsi:</strong> {(article.seoDescription || article.summary).length} karakter (Optimal 120-160)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-xl overflow-hidden max-w-md mx-auto shadow-sm bg-white">
                <div className="h-44 bg-slate-100 overflow-hidden relative">
                  <img
                    src={article.thumbnail || null}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white rounded text-[10px] font-medium backdrop-blur-xs">
                    markazhidayah.sch.id
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-teal-600 font-bold">
                    Markaz Hidayah Qur'an
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {article.seoDescription || article.summary}
                  </p>
                </div>
              </div>
              <p className="text-center text-xs text-slate-500">
                Tampilan kartu preview saat link artikel ini dibagikan di WhatsApp, Facebook, LinkedIn, dan Twitter/X.
              </p>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">JSON-LD Structured Data:</span>
                <button
                  onClick={handleCopySchema}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin JSON'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-teal-300 rounded-xl text-xs overflow-x-auto font-mono max-h-56">
                {JSON.stringify(jsonLdSchema, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
