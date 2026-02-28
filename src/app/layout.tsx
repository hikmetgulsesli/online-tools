import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Tools - Free Utility Tools",
  description: "Free online tools including QR Code Generator, Image Compressor, Password Generator, Base64 Encoder/Decoder, URL Shortener and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
