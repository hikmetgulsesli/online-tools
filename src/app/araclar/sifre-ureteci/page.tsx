import type { Metadata } from "next";
import { PasswordGenerator } from "./PasswordGenerator";

export const metadata: Metadata = {
  title: "Şifre Üretici - Güvenli Rastgele Şifre Oluşturucu",
  description: "Ücretsiz online şifre üretici. 8-64 karakter arası, büyük/küçük harf, rakam ve özel karakter seçenekleriyle güçlü şifreler oluşturun.",
  keywords: ["şifre üretici", "password generator", "rastgele şifre", "güçlü şifre", "şifre oluştur"],
  openGraph: {
    title: "Şifre Üretici - Güvenli Rastgele Şifre Oluşturucu",
    description: "Ücretsiz online şifre üretici. 8-64 karakter arası güçlü şifreler oluşturun.",
    type: "website",
  },
};

export default function SifreUreticiPage() {
  return <PasswordGenerator />;
}
