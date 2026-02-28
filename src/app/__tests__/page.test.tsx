import { render, screen } from "@testing-library/react";
import HomePage from "../page";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("HomePage", () => {
  it("renders main heading", () => {
    render(<HomePage />);
    expect(screen.getByText("Ücretsiz Online Araçlar")).toBeInTheDocument();
  });

  it("renders hero description", () => {
    render(<HomePage />);
    expect(screen.getByText(/Günlük işlerinizi kolaylaştıran/)).toBeInTheDocument();
  });

  it("renders all 6 tool cards", () => {
    render(<HomePage />);
    expect(screen.getByText("QR Kod Oluşturucu")).toBeInTheDocument();
    expect(screen.getByText("Görsel Sıkıştırıcı")).toBeInTheDocument();
    expect(screen.getByText("Şifre Oluşturucu")).toBeInTheDocument();
    expect(screen.getByText("Base64 Encoder/Decoder")).toBeInTheDocument();
    expect(screen.getByText("URL Kısaltıcı")).toBeInTheDocument();
    expect(screen.getByText("JSON Formatlayıcı")).toBeInTheDocument();
  });

  it("renders feature section", () => {
    render(<HomePage />);
    expect(screen.getByText("Güvenli")).toBeInTheDocument();
    expect(screen.getByText("Hızlı")).toBeInTheDocument();
    expect(screen.getByText("Ücretsiz")).toBeInTheDocument();
  });

  it("has correct tool links", () => {
    render(<HomePage />);
    expect(screen.getByText("QR Kod Oluşturucu").closest("a")).toHaveAttribute("href", "/araclar/qr-kod");
    expect(screen.getByText("Görsel Sıkıştırıcı").closest("a")).toHaveAttribute("href", "/araclar/gorsel-sikistirici");
    expect(screen.getByText("Şifre Oluşturucu").closest("a")).toHaveAttribute("href", "/araclar/sifre-olusturucu");
  });
});
