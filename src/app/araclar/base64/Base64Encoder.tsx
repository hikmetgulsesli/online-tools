"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Copy,
  Check,
  RefreshCw,
  FileText,
  FileCode,
} from "lucide-react";

type Mode = "encode" | "decode";

export function Base64Encoder() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    setError("");
    setOutput("");

    if (!input.trim()) {
      setError("Lütfen bir metin girin");
      return;
    }

    try {
      if (mode === "encode") {
        // Encode to Base64
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        // Decode from Base64
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
    } catch {
      setError(
        mode === "decode"
          ? "Geçersiz Base64 formatı. Lütfen doğru bir Base64 kodu girin."
          : "Dönüştürme hatası. Lütfen farklı bir metin deneyin."
      );
    }
  }, [input, mode]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy:");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const swapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setOutput("");
    setError("");
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
            <FileCode className="w-6 h-6 text-blue-600" />
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
            <FileCode className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Base64 Encoder / Decoder
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Metinlerinizi Base64 formatına dönüştürün veya Base64 kodlarını çözün.
            Hızlı, güvenli ve tamamen tarayıcıda çalışır.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200 inline-flex">
            <button
              onClick={() => setMode("encode")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2 ${
                mode === "encode"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2 ${
                mode === "decode"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileCode className="w-4 h-4" />
              Decode
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="base64-input"
                className="block text-sm font-medium text-slate-700"
              >
                {mode === "encode" ? "Dönüştürülecek Metin" : "Çözülecek Base64"}
              </label>
              <button
                onClick={swapMode}
                className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                title="Mod değiştir"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>
            <textarea
              id="base64-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  convert();
                }
              }}
              placeholder={
                mode === "encode"
                  ? "Metninizi buraya girin..."
                  : "Base64 kodunu buraya yapıştırın..."
              }
              className="w-full h-48 px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 font-mono text-sm resize-none transition-all"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-400">
                {input.length} karakter
              </span>
              <button
                onClick={clearAll}
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Temizle
              </button>
            </div>

            <button
              onClick={convert}
              className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {mode === "encode" ? (
                <>
                  <FileText className="w-5 h-5" />
                  Encode Et
                </>
              ) : (
                <>
                  <FileCode className="w-5 h-5" />
                  Decode Et
                </>
              )}
            </button>

            {error && (
              <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
            )}
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="block text-sm font-medium text-slate-700">
                {mode === "encode" ? "Base64 Sonuç" : "Çözümlenmiş Metin"}
              </h2>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors cursor-pointer flex items-center gap-1"
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
              )}
            </div>
            <textarea
              readOnly
              value={output}
              placeholder={
                mode === "encode"
                  ? "Base64 çıktısı burada görünecek..."
                  : "Çözümlenmiş metin burada görünecek..."
              }
              className="w-full h-48 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono text-sm resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-400">
                {output.length} karakter
              </span>
              {output && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Başarılı
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Hızlı</h3>
            <p className="text-sm text-slate-600">
              Base64 dönüşümü saniyeler içinde gerçekleşir. Hiçbir sunucu
              bağlantısı gerektirmez.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Güvenli</h3>
            <p className="text-sm text-slate-600">
              Tüm işlemler tarayıcınızda gerçekleşir. Verileriniz hiçbir
              yere gönderilmez.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Ücretsiz</h3>
            <p className="text-sm text-slate-600">
              Sınırsız kullanım. Herhangi bir ücret ödemeden tüm
              özelliklerden yararlanın.
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
