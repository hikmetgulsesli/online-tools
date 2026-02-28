"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Link2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Trash2,
  Clock,
} from "lucide-react";

interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: number;
}

const STORAGE_KEY = "url-shortener-history";
const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

function generateShortCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function UrlShortener() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrl | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<ShortenedUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ShortenedUrl[];
        setHistory(parsed);
      }
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  // Save history to localStorage
  const saveHistory = useCallback((newHistory: ShortenedUrl[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  const shortenUrl = useCallback(() => {
    setError("");
    setShortenedUrl(null);

    if (!input.trim()) {
      setError("Lütfen bir URL girin");
      return;
    }

    let urlToShorten = input.trim();
    
    // Add protocol if missing
    if (!/^https?:\/\//i.test(urlToShorten)) {
      urlToShorten = "https://" + urlToShorten;
    }

    if (!isValidUrl(urlToShorten)) {
      setError("Geçerli bir URL girin (http:// veya https://)");
      return;
    }

    setIsLoading(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      const shortCode = generateShortCode();
      const newUrl: ShortenedUrl = {
        id: shortCode,
        originalUrl: urlToShorten,
        shortCode,
        createdAt: Date.now(),
      };

      setShortenedUrl(newUrl);
      
      // Add to history
      const updatedHistory = [newUrl, ...history].slice(0, 10); // Keep last 10
      setHistory(updatedHistory);
      saveHistory(updatedHistory);
      
      setIsLoading(false);
    }, 500);
  }, [input, history, saveHistory]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearInput = () => {
    setInput("");
    setError("");
    setShortenedUrl(null);
  };

  const deleteFromHistory = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const getShortUrl = (shortCode: string): string => {
    return `${BASE_URL}/go/${shortCode}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Link2 className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-lg">Online Araçlar</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Ana Sayfa
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
            <Link2 className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            URL Kısaltıcı
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Uzun URL&apos;leri kısa ve paylaşılabilir bağlantılara dönüştürün.
            Hızlı, ücretsiz ve kolay kullanım.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <label
              htmlFor="url-input"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Uzun URL
            </label>
            <div className="relative">
              <input
                id="url-input"
                type="url"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && shortenUrl()}
                placeholder="https://example.com"
                className="w-full px-4 py-3 pr-24 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 placeholder:text-slate-400 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {input && (
                  <>
                    <button
                      onClick={clearInput}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                      title="Temizle"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}

            <button
              onClick={shortenUrl}
              disabled={isLoading}
              className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Kısaltılıyor...
                </>
              ) : (
                <>
                  <Link2 className="w-5 h-5" />
                  Kısalt
                </>
              )}
            </button>

            {/* Quick Examples */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-3">Hızlı örnekler:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "https://google.com",
                  "https://github.com",
                  "https://wikipedia.org",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setInput(example)}
                    className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {example.replace("https://", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-sm font-medium text-slate-700 mb-4">Kısa URL</h2>

            <div className="min-h-[120px] flex items-center justify-center">
              {shortenedUrl ? (
                <div className="w-full">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-mono text-blue-600 font-medium truncate">
                        {getShortUrl(shortenedUrl.shortCode)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(getShortUrl(shortenedUrl.shortCode))}
                        className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
                        title="Kopyala" aria-label="Kısa URL kopyala"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <div className="text-sm text-slate-500 truncate">
                      <span className="text-slate-400">Orijinal:</span>{" "}
                      {shortenedUrl.originalUrl}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <a
                      href={shortenedUrl.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-medium transition-all cursor-pointer active:scale-[0.98]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ziyaret Et
                    </a>
                    <button
                      onClick={() => copyToClipboard(getShortUrl(shortenedUrl.shortCode))}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all cursor-pointer active:scale-[0.98]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Kopyalandı
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Kopyala
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <Link2 className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">
                    Kısa URL oluşturmak için bir adres girin
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900">Geçmiş</h2>
              </div>
              <button
                onClick={clearHistory}
                className="text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Temizle
              </button>
            </div>

            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-blue-600 font-medium truncate">
                      {getShortUrl(item.shortCode)}
                    </div>
                    <div className="text-sm text-slate-500 truncate mt-1">
                      {item.originalUrl}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyToClipboard(getShortUrl(item.shortCode))}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
                      title="Kopyala" aria-label="Kısa URL kopyala"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteFromHistory(item.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Ücretsiz</h3>
            <p className="text-sm text-slate-600">
              Sınırsız URL kısaltma. Hiçbir ücret ödemeden tüm
              özelliklerden yararlanın.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Güvenli</h3>
            <p className="text-sm text-slate-600">
              URL&apos;ler tarayıcınızda işlenir. Geçmiş sadece sizin
              cihazınızda saklanır.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Hızlı</h3>
            <p className="text-sm text-slate-600">
              Saniyeler içinde kısa URL oluşturun ve paylaşmaya
              başlayın.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2024 Online Araçlar. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/hakkimizda"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                İletişim
              </Link>
              <Link
                href="/gizlilik"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Gizlilik
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
