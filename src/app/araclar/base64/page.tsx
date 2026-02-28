import type { Metadata } from "next";
import { Base64Encoder } from "./Base64Encoder";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder - Ücretsiz Online Araç",
  description: "Metin veya dosyalarınızı Base64 formatına dönüştürün veya Base64 kodlarını çözün. Hızlı, güvenli ve tarayıcıda çalışır.",
  keywords: ["base64 encoder", "base64 decoder", "base64 çevirici", "encode decode", "ücretsiz base64"],
  openGraph: {
    title: "Base64 Encoder/Decoder - Ücretsiz Online Araç",
    description: "Metin veya dosyalarınızı Base64 formatına dönüştürün veya Base64 kodlarını çözün.",
    type: "website",
  },
};

export default function Base64Page() {
  return <Base64Encoder />;
}
