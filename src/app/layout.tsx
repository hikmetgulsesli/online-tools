import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Tools - Ücretsiz Araçlar",
  description: "QR Kod, Şifre Oluşturucu, Base64 ve daha fazlası. Ücretsiz online araçlar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
