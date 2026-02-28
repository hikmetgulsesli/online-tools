import type { Metadata } from "next";
import { UrlShortener } from "./UrlShortener";

export const metadata: Metadata = {
  title: "URL Kısaltıcı - Ücretsiz Link Kısaltma Aracı",
  description: "Uzun URL'leri kısa ve paylaşılabilir bağlantılara dönüştürün. Hızlı, ücretsiz ve kolay kullanım. Geçmiş özelliği ile kısalttığınız linkleri görün.",
  keywords: ["url kısaltıcı", "link kısaltma", "url shortener", "kısa link", "ücretsiz url kısaltma"],
  openGraph: {
    title: "URL Kısaltıcı - Ücretsiz Link Kısaltma Aracı",
    description: "Uzun URL'leri kısa ve paylaşılabilir bağlantılara dönüştürün. Hızlı, ücretsiz ve kolay kullanım.",
    type: "website",
  },
};

export default function UrlKisaltPage() {
  return <UrlShortener />;
}
