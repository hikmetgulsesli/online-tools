"use client";

import { useState, useCallback, useEffect } from "react";
import { toDataURL, toString } from "qrcode";
import { Download, RefreshCw, QrCode, Copy, Check } from "lucide-react";

const MAX_INPUT_LENGTH = 2000;

export function QRCodeGenerator() {
  const [input, setInput] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrSvg, setQrSvg] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQR = useCallback(async () => {
    if (!input.trim()) {
      setQrDataUrl("");
      setQrSvg("");
      setError("");
      return;
    }

    if (input.length > MAX_INPUT_LENGTH) {
      setError(`Metin çok uzun. Maksimum ${MAX_INPUT_LENGTH} karakter.`);
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const [pngData, svgData] = await Promise.all([
        toDataURL(input, {
          width: 400,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        }),
        toString(input, {
          type: "svg",
          margin: 2,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        }),
      ]);

      setQrDataUrl(pngData);
      setQrSvg(svgData);
    } catch {
      setError("QR kod oluşturulurken bir hata oluştu.");
    } finally {
      setIsGenerating(false);
    }
  }, [input]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      generateQR();
    }, 300);

    return () => clearTimeout(timeout);
  }, [input, generateQR]);

  const downloadPNG = () => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qr-kod-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSVG = () => {
    if (!qrSvg) return;

    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-kod-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (!input) return;

    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail
    }
  };

  const clearInput = () => {
    setInput("");
    setQrDataUrl("");
    setQrSvg("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <QrCode className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-lg">Online Araçlar</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Ana Sayfa
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
            <QrCode className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            QR Kod Oluşturucu
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Metin, URL veya herhangi bir veriyi QR koda dönüştürün. PNG veya
            SVG formatında indirin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <label
              htmlFor="qr-input"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Metin veya URL
            </label>
            <div className="relative">
              <textarea
                id="qr-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://example.com veya herhangi bir metin..."
                className="w-full h-40 px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none text-slate-700 placeholder:text-slate-400 transition-all"
                maxLength={MAX_INPUT_LENGTH}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {input && (
                  <>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                      title="Kopyala"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
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
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-slate-500">
                {input.length} / {MAX_INPUT_LENGTH} karakter
              </span>
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-3">Hızlı örnekler:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "https://google.com",
                  "https://github.com",
                  "Merhaba Dünya!",
                  "WIFI:T:WPA;S:Agim;P:şifre;;",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setInput(example)}
                    className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {example.length > 30
                      ? example.slice(0, 30) + "..."
                      : example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-sm font-medium text-slate-700 mb-4">QR Kod</h2>

            <div className="aspect-square bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-3 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-sm text-slate-500">Oluşturuluyor...</span>
                </div>
              ) : qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt="Oluşturulan QR Kod"
                  className="max-w-full max-h-full p-4"
                />
              ) : (
                <div className="text-center p-8">
                  <QrCode className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">
                    QR kod görüntülemek için metin girin
                  </p>
                </div>
              )}
            </div>

            {/* Download Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={downloadPNG}
                disabled={!qrDataUrl}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all cursor-pointer active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                PNG İndir
              </button>
              <button
                onClick={downloadSVG}
                disabled={!qrSvg}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all cursor-pointer active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                SVG İndir
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Ücretsiz</h3>
            <p className="text-sm text-slate-600">
              Sınırsız QR kod oluşturun. Hiçbir ücret ödemeden tüm
              özelliklerden yararlanın.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Güvenli</h3>
            <p className="text-sm text-slate-600">
              Verileriniz tarayıcınızda işlenir. Hiçbir bilgi sunucularımıza
              gönderilmez.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Yüksek Kalite</h3>
            <p className="text-sm text-slate-600">
              Yüksek çözünürlüklü PNG ve ölçeklenebilir SVG formatlarında
              indirin.
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
              <a
                href="/hakkimizda"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Hakkımızda
              </a>
              <a
                href="/iletisim"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                İletişim
              </a>
              <a
                href="/gizlilik"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Gizlilik
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
