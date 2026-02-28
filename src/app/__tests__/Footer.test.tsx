import { render, screen } from "@testing-library/react";
import { Footer } from "../components/Footer";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("Footer", () => {
  it("renders brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Online Araçlar")).toBeInTheDocument();
  });

  it("renders all footer navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Ana Sayfa")).toBeInTheDocument();
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
    expect(screen.getByText("Gizlilik Politikası")).toBeInTheDocument();
  });

  it("renders copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it("has correct navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Ana Sayfa").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Hakkımızda").closest("a")).toHaveAttribute("href", "/hakkimizda");
    expect(screen.getByText("İletişim").closest("a")).toHaveAttribute("href", "/iletisim");
    expect(screen.getByText("Gizlilik Politikası").closest("a")).toHaveAttribute("href", "/gizlilik-politikasi");
  });
});
