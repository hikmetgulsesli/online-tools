import Link from "next/link";
import {
  QrCode,
  Image,
  Key,
  Code,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    id: "qr-kod",
    name: "QR Kod Oluşturucu",
    description: "Metin ve URL'lerden anında QR kod oluşturun.",
    icon: QrCode,
    href: "/araclar/qr-kod",
    color: "bg-blue-100 text-blue-600",
    available: true,
  },
  {
    id: "gorsel-sikistirma",
    name: "Görsel Sıkıştırma",
    description: "Görsellerinizi kalite kaybı olmadan sıkıştırın.",
    icon: Image,
    href: "/araclar/gorsel-sikistirma",
    color: "bg-green-100 text-green-600",
    available: true,
  },
  {
    id: "sifre-olusturucu",
    name: "Şifre Oluşturucu",
    description: "Güçlü ve güvenli şifreler oluşturun.",
    icon: Key,
    href: "/araclar/sifre-olusturucu",
    color: "bg-amber-100 text-amber-600",
    available: false,
  },
  {
    id: "base64",
    name: "Base64 Kodlayıcı",
    description: "Metinleri Base64 formatına dönüştürün.",
    icon: Code,
    href: "/araclar/base64",
    color: "bg-purple-100 text-purple-600",
    available: false,
  },
  {
    id: "url-kisaltici",
    name: "URL Kısaltıcı",
    description: "Uzun linkleri kısa ve paylaşılabilir yapın.",
    icon: LinkIcon,
    href: "/araclar/url-kisaltici",
    color: "bg-rose-100 text-rose-600",
    available: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">OA</span>
            </div>
            <span className="font-semibold text-lg">Online Araçlar</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
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
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Ücretsiz Online Araçlar
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Günlük ihtiyaçlarınız için tasarlanmış, hızlı ve kullanışlı web
              araçları. Kayıt gerekmez, ücretsiz kullanın.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#araclar"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all cursor-pointer active:scale-[0.98]"
              >
                Araçları Keşfet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="araclar" className="pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Tüm Araçlar
              </h2>
              <p className="text-slate-600">
                İhtiyacınız olan aracı seçin ve hemen kullanmaya başlayın.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    href={tool.available ? tool.href : "#"}
                    className={`group bg-white rounded-2xl p-6 border border-slate-200 transition-all ${
                      tool.available
                        ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                        : "opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                      {!tool.available && (
                        <span className="ml-2 text-xs font-normal text-slate-400">
                          (Yakında)
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-slate-600">{tool.description}</p>
                    {tool.available && (
                      <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                        Kullan
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OA</span>
                </div>
                <span className="font-semibold">Online Araçlar</span>
              </div>
              <p className="text-sm text-slate-600">
                Günlük ihtiyaçlarınız için ücretsiz web araçları.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Araçlar</h4>
              <ul className="space-y-2">
                {tools.slice(0, 3).map((tool) => (
                  <li key={tool.id}>
                    <Link
                      href={tool.available ? tool.href : "#"}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Kurumsal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/hakkimizda"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/iletisim"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gizlilik"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Gizlilik Politikası
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">İletişim</h4>
              <p className="text-sm text-slate-600">
                Sorularınız veya önerileriniz için bize ulaşın.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              © 2024 Online Araçlar. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
