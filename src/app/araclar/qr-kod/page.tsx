import type { Metadata } from "next";
import { QRCodeGenerator } from "./QRCodeGenerator";

export const metadata: Metadata = {
  title: "QR Kod Oluşturucu - Ücretsiz QR Code Generator",
  description: "Metin ve URL'lerden anında QR kod oluşturun. PNG veya SVG formatında indirin. Ücretsiz, hızlı ve mobil uyumlu.",
  keywords: ["QR kod", "QR code generator", "QR oluşturucu", "ücretsiz QR", "QR indir"],
  openGraph: {
    title: "QR Kod Oluşturucu - Ücretsiz QR Code Generator",
    description: "Metin ve URL'lerden anında QR kod oluşturun. PNG veya SVG formatında indirin.",
    type: "website",
  },
};

export default function QRKodPage() {
  return <QRCodeGenerator />;
}
