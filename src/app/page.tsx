import type { Metadata } from "next";
import { ToolCard } from "./components/ToolCard";

export const metadata: Metadata = {
  title: "Online Araçlar - Ücretsiz Web Araçları",
  description: "QR Kod Oluşturucu, Görsel Sıkıştırıcı, Şifre Oluşturucu, Base64 Encoder/Decoder, URL Kısaltıcı ve daha fazlası. Ücretsiz online araçlar.",
  openGraph: {
    title: "Online Araçlar - Ücretsiz Web Araçları",
    description: "QR Kod Oluşturucu, Görsel Sıkıştırıcı, Şifre Oluşturucu ve daha fazlası.",
  },
};

const tools = [
  {
    href: "/araclar/qr-kod",
    title: "QR Kod Oluşturucu",
    description: "Metin, URL veya verilerinizi anında QR koda dönüştürün. PNG veya SVG formatında indirin.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="5" height="5" x="3" y="3" rx="1" />
        <rect width="5" height="5" x="16" y="3" rx="1" />
        <rect width="5" height="5" x="3" y="16" rx="1" />
        <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
        <path d="M21 21v.01" />
        <path d="M12 7v3a2 2 0 0 1-2 2H7" />
        <path d="M3 12h.01" />
        <path d="M12 3h.01" />
        <path d="M12 16v.01" />
        <path d="M16 12h1" />
        <path d="M21 12v.01" />
        <path d="M12 21v-1" />
      </svg>
    ),
  },
  {
    href: "/araclar/gorsel-sikistirici",
    title: "Görsel Sıkıştırıcı",
    description: "JPEG, PNG ve WebP görsellerinizi kalite kaybı olmadan sıkıştırın. Dosya boyutunu küçültün.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </svg>
    ),
  },
  {
    href: "/araclar/sifre-olusturucu",
    title: "Şifre Oluşturucu",
    description: "Güvenli ve tahmin edilemez şifreler oluşturun. Özel karakter, rakam ve büyük/küçük harf seçenekleri.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    href: "/araclar/base64",
    title: "Base64 Encoder/Decoder",
    description: "Metin ve dosyalarınızı Base64 formatına kodlayın veya Base64 veriyi çözün. Hızlı ve kolay.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m4 5 8 8" />
        <path d="m12 5-8 8" />
        <path d="M20 19h-4a2 2 0 0 1-2-2v-4" />
        <path d="M20 13v4" />
        <path d="M16 13h4" />
      </svg>
    ),
  },
  {
    href: "/araclar/url-kisaltici",
    title: "URL Kısaltıcı",
    description: "Uzun URL'leri kısa ve paylaşılabilir bağlantılara dönüştürün. Tıklama istatistikleri ile birlikte.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    href: "/araclar/json-formatlayici",
    title: "JSON Formatlayıcı",
    description: "JSON verilerinizi okunabilir formatta düzenleyin. Doğrulama ve hata tespiti özellikleri.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
        <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          Ücretsiz Online Araçlar
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Günlük işlerinizi kolaylaştıran, hızlı ve kullanışlı web araçları. 
          Kayıt olmadan, ücretsiz kullanın.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard
            key={tool.href}
            href={tool.href}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
          />
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground">Güvenli</h3>
          <p className="text-sm text-muted-foreground">Verileriniz tarayıcınızda işlenir, sunucularımıza gönderilmez.</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground">Hızlı</h3>
          <p className="text-sm text-muted-foreground">Anında sonuç alın, zaman kaybetmeyin.</p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground">Ücretsiz</h3>
          <p className="text-sm text-muted-foreground">Tüm araçlar tamamen ücretsiz ve sınırsız.</p>
        </div>
      </div>
    </div>
  );
}
