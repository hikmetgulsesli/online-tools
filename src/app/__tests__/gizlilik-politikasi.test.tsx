import { render, screen } from "@testing-library/react";
import PrivacyPage from "../gizlilik-politikasi/page";

describe("PrivacyPage", () => {
  it("renders page heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { name: "Gizlilik Politikası" })).toBeInTheDocument();
  });

  it("renders all sections", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("1. Veri Toplama")).toBeInTheDocument();
    expect(screen.getByText("2. Çerezler (Cookies)")).toBeInTheDocument();
    expect(screen.getByText("3. Üçüncü Taraf Hizmetleri")).toBeInTheDocument();
  });

  it("has link to contact page", () => {
    render(<PrivacyPage />);
    const contactLink = screen.getByRole("link", { name: /iletişim sayfamız/i });
    expect(contactLink).toHaveAttribute("href", "/iletisim");
  });
});
