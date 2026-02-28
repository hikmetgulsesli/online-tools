import type { Metadata } from "next";
import ImageCompressor from "./ImageCompressor";

export const metadata: Metadata = {
  title: "Görsel Sıkıştırma | Online Araçlar",
  description: "Görsellerinizi çevrimiçi olarak sıkıştırın. JPG, PNG ve WebP formatlarını destekler. Kalite ayarlayarak dosya boyutunu optimize edin.",
  keywords: ["görsel sıkıştırma", "image compressor", "jpg sıkıştırma", "png optimize", "webp sıkıştırma", "ücretsiz"],
};

export default function Page() {
  return <ImageCompressor />;
}
