import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import { Footer } from "../components/Footer";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => {
    return <a href={href} {...props}>{children}</a>;
  }
}));

describe("Footer", () => {
  it("renders brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Online Araçlar")).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/Tüm hakları saklıdır/)).toBeInTheDocument();
  });

  it("renders privacy policy link", () => {
    render(<Footer />);
    expect(screen.getByText("Gizlilik Politikası")).toBeInTheDocument();
  });

  it("renders about link", () => {
    render(<Footer />);
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
  });

  it("renders contact link", () => {
    render(<Footer />);
    expect(screen.getByText("İletişim")).toBeInTheDocument();
  });
});
