import { render, screen } from "@testing-library/react";
import PrivacyPage from "../gizlilik-politikasi/page";

describe("PrivacyPage", () => {
  it("renders page heading", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("Gizlilik Politikası")).toBeInTheDocument();
  });

  it("renders last updated date", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Son güncelleme:/)).toBeInTheDocument();
  });

  it("renders all sections", () => {
    render(<PrivacyPage />);
    expect(screen.getByText("1. Veri İşleme ve Güvenlik")).toBeInTheDocument();
    expect(screen.getByText("2. Toplanan Bilgiler")).toBeInTheDocument();
    expect(screen.getByText("3. Çerezler (Cookies)")).toBeInTheDocument();
    expect(screen.getByText("4. Üçüncü Taraf Hizmetleri")).toBeInTheDocument();
    expect(screen.getByText("5. Veri Güvenliği")).toBeInTheDocument();
    expect(screen.getByText("6. Haklarınız")).toBeInTheDocument();
    expect(screen.getByText("7. İletişim")).toBeInTheDocument();
    expect(screen.getByText("8. Politika Değişiklikleri")).toBeInTheDocument();
  });

  it("mentions Google AdSense", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/Google AdSense/)).toBeInTheDocument();
  });

  it("has link to contact page", () => {
    render(<PrivacyPage />);
    const contactLink = screen.getByText("iletişim sayfamızdan");
    expect(contactLink.closest("a")).toHaveAttribute("href", "/iletisim");
  });

  it("mentions KVKK rights", () => {
    render(<PrivacyPage />);
    expect(screen.getByText(/KVKK/)).toBeInTheDocument();
  });
});
