import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import HomePage from "../page";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => {
    return <a href={href} {...props}>{children}</a>;
  }
}));

describe("HomePage", () => {
  it("renders main heading", () => {
    render(<HomePage />);
    expect(screen.getByText("Ücretsiz Online Araçlar")).toBeInTheDocument();
  });

  it("renders hero description", () => {
    render(<HomePage />);
    expect(screen.getByText("Günlük ihtiyaçlarınız için tasarlanmış, hızlı ve kullanışlı web araçları. Kayıt gerekmez, ücretsiz kullanın.")).toBeInTheDocument();
  });

  it("renders tool cards section", () => {
    render(<HomePage />);
    expect(screen.getByText("Tüm Araçlar")).toBeInTheDocument();
    expect(screen.getByText(/İhtiyacınız olan aracı seçin/)).toBeInTheDocument();
  });

  it("renders CTA button", () => {
    render(<HomePage />);
    expect(screen.getByText("Araçları Keşfet")).toBeInTheDocument();
  });
});
