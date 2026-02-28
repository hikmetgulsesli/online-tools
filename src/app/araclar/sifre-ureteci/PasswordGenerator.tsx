"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Copy,
  Check,
  Key,
  Shield,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
} from "lucide-react";

const UPPERCASE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWERCASE = "abcdefghjkmnpqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const AMBIGUOUS = "0O1lI";

type StrengthLevel = "zayif" | "orta" | "guclu" | "cok_guclu";

function getStrengthColor(level: StrengthLevel): string {
  switch (level) {
    case "zayif":
      return "text-red-500";
    case "orta":
      return "text-yellow-500";
    case "guclu":
      return "text-green-500";
    case "cok_guclu":
      return "text-emerald-600";
  }
}

function getStrengthBg(level: StrengthLevel): string {
  switch (level) {
    case "zayif":
      return "bg-red-500";
    case "orta":
      return "bg-yellow-500";
    case "guclu":
      return "bg-green-500";
    case "cok_guclu":
      return "bg-emerald-600";
  }
}

function calculateStrength(password: string): StrengthLevel {
  if (!password) return "zayif";

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (password.length >= 20) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 2;

  if (score >= 7) return "cok_guclu";
  if (score >= 5) return "guclu";
  if (score >= 3) return "orta";
  return "zayif";
}

function generatePassword(
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  excludeAmbiguous: boolean
): string {
  let chars = "";

  if (useUppercase) chars += UPPERCASE;
  if (useLowercase) chars += LOWERCASE;
  if (useNumbers) chars += NUMBERS;
  if (useSymbols) chars += SYMBOLS;

  if (excludeAmbiguous) {
    chars = chars
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }

  if (!chars) chars = LOWERCASE;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const strength = calculateStrength(password);

  const generate = useCallback(() => {
    const newPassword = generatePassword(
      length,
      useUppercase,
      useLowercase,
      useNumbers,
      useSymbols,
      excludeAmbiguous
    );
    setPassword(newPassword);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols, excludeAmbiguous]);

  useEffect(() => {
    generate();
  }, [generate]);

  const copyToClipboard = async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const regenerate = () => {
    generate();
  };

  const getStrengthLabel = (level: StrengthLevel): string => {
    switch (level) {
      case "zayif":
        return "Zayıf";
      case "orta":
        return "Orta";
      case "guclu":
        return "Güçlü";
      case "cok_guclu":
        return "Çok Güçlü";
    }
  };

  const getStrengthIcon = (level: StrengthLevel) => {
    switch (level) {
      case "zayif":
        return ShieldX;
      case "orta":
        return ShieldAlert;
      case "guclu":
        return Shield;
      case "cok_guclu":
        return ShieldCheck;
    }
  };

  const StrengthIcon = getStrengthIcon(strength);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Key className="w-6 h-6 text-blue-600" />
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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-4">
            <Key className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Şifre Üretici
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Güvenli ve güçlü şifreler oluşturun. Uzunluk ve karakter
            seçeneklerini ayarlayarak ihtiyacınız olan şifreyi üretin.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="relative">
            <div className="w-full px-4 py-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-lg sm:text-xl text-slate-800 break-all min-h-[80px] flex items-center">
              {password || "Şifre üretiliyor..."}
            </div>
            <div className="absolute right-2 top-2 flex items-center gap-2">
              <button
                onClick={regenerate}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                title="Yeniden üret"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                title="Kopyala"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Şifre Gücü</span>
              <span
                className={`text-sm font-medium ${getStrengthColor(strength)} flex items-center gap-1`}
              >
                <StrengthIcon className="w-4 h-4" />
                {getStrengthLabel(strength)}
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getStrengthBg(strength)} transition-all duration-300`}
                style={{
                  width:
                    strength === "zayif"
                      ? "25%"
                      : strength === "orta"
                        ? "50%"
                        : strength === "guclu"
                          ? "75%"
                          : "100%",
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Şifre Ayarları
          </h2>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-700">
                Şifre Uzunluğu
              </label>
              <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                {length} karakter
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="text-sm text-slate-700 font-medium">
                Büyük Harfler (A-Z)
              </span>
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={(e) => setUseUppercase(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="text-sm text-slate-700 font-medium">
                Küçük Harfler (a-z)
              </span>
              <input
                type="checkbox"
                checked={useLowercase}
                onChange={(e) => setUseLowercase(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="text-sm text-slate-700 font-medium">
                Rakamlar (0-9)
              </span>
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="text-sm text-slate-700 font-medium">
                Özel Karakterler (!@#$%^&*)
              </span>
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="text-sm text-slate-700 font-medium">
                Karışıklık Yaratan Karakterleri Hariç Tut (0, O, 1, l, I)
              </span>
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </label>
          </div>

          <button
            onClick={generate}
            className="w-full mt-6 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Şifre Üret
          </button>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Güvenli</h3>
            <p className="text-sm text-slate-600">
              Şifreler tarayıcınızda oluşturulur. Hiçbir bilgi sunucularımıza
              gönderilmez.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Özelleştirilebilir</h3>
            <p className="text-sm text-slate-600">
              İhtiyacınıza göre uzunluğu ve karakter türlerini ayarlayın.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
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
