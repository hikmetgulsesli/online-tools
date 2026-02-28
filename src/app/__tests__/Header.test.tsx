import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../components/Header";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => {
    return <a href={href} {...props}>{children}</a>;
  }
}));

describe("Header", () => {
  it("renders logo and brand name", () => {
    render(<Header />);
    expect(screen.getByText("Online Araçlar")).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Ana Sayfa")).toBeInTheDocument();
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
    expect(screen.getByText("Gizlilik")).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<Header />);
    expect(screen.getByLabelText("Menüyü aç/kapat")).toBeInTheDocument();
  });

  it("toggles mobile menu when button is clicked", () => {
    render(<Header />);
    const menuButton = screen.getByLabelText("Menüyü aç/kapat");
    
    // Mobile menu should not be visible initially
    expect(screen.queryByRole("navigation", { name: /mobile/i })).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(menuButton);
    
    // Mobile menu should now be visible
    expect(screen.getAllByText("Ana Sayfa").length).toBeGreaterThan(1);
    
    // Click to close
    fireEvent.click(menuButton);
  });

  it("has correct navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Ana Sayfa").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Hakkımızda").closest("a")).toHaveAttribute("href", "/hakkimizda");
    expect(screen.getByText("İletişim").closest("a")).toHaveAttribute("href", "/iletisim");
    expect(screen.getByText("Gizlilik").closest("a")).toHaveAttribute("href", "/gizlilik-politikasi");
  });
});
