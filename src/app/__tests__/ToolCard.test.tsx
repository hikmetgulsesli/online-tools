import { describe, it, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import { ToolCard } from "../components/ToolCard";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => {
    return <a href={href} {...props}>{children}</a>;
  }
}));

describe("ToolCard", () => {
  const mockTool = {
    title: "QR Kod Oluştur",
    description: "QR kod oluşturun",
    href: "/araclar/qr-kod",
    icon: "QrCode"
  };

  it("renders tool title", () => {
    render(<ToolCard {...mockTool} />);
    expect(screen.getByText("QR Kod Oluştur")).toBeInTheDocument();
  });

  it("renders tool description", () => {
    render(<ToolCard {...mockTool} />);
    expect(screen.getByText("QR kod oluşturun")).toBeInTheDocument();
  });

  it("renders link with correct href", () => {
    render(<ToolCard {...mockTool} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/araclar/qr-kod");
  });
});
