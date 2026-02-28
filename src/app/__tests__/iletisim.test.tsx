import { render, screen } from "@testing-library/react";
import ContactPage from "../iletisim/page";

describe("ContactPage", () => {
  it("renders page heading", () => {
    render(<ContactPage />);
    expect(screen.getAllByRole("heading", { name: "İletişim" })[0]).toBeInTheDocument();
  });

  it("renders form fields", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("İsim *")).toBeInTheDocument();
    expect(screen.getByLabelText("E-posta *")).toBeInTheDocument();
    expect(screen.getByLabelText("Konu *")).toBeInTheDocument();
    expect(screen.getByLabelText("Mesaj *")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactPage />);
    expect(screen.getByRole("button", { name: "Mesaj Gönder" })).toBeInTheDocument();
  });

  it("renders contact info section", () => {
    render(<ContactPage />);
    expect(screen.getByText("E-posta")).toBeInTheDocument();
    expect(screen.getByText("Adres")).toBeInTheDocument();
    expect(screen.getByText("Yanıt Süresi")).toBeInTheDocument();
  });
});
