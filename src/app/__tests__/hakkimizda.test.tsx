import { render, screen } from "@testing-library/react";
import AboutPage from "../hakkimizda/page";

describe("AboutPage", () => {
  it("renders page heading", () => {
    render(<AboutPage />);
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
  });

  it("renders mission section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Misyonumuz")).toBeInTheDocument();
  });

  it("renders vision section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Vizyonumuz")).toBeInTheDocument();
  });

  it("renders values section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Değerlerimiz")).toBeInTheDocument();
    expect(screen.getByText(/Gizlilik:/)).toBeInTheDocument();
    expect(screen.getByText(/Şeffaflık:/)).toBeInTheDocument();
    expect(screen.getByText(/Erişilebilirlik:/)).toBeInTheDocument();
    expect(screen.getByText(/Kalite:/)).toBeInTheDocument();
  });

  it("renders contact section", () => {
    render(<AboutPage />);
    expect(screen.getByText("İletişim")).toBeInTheDocument();
  });

  it("has link to contact page", () => {
    render(<AboutPage />);
    const contactLink = screen.getByText("iletişim sayfamızdan");
    expect(contactLink.closest("a")).toHaveAttribute("href", "/iletisim");
  });
});
