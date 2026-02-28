import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactPage from "../iletisim/page";

describe("ContactPage", () => {
  it("renders page heading", () => {
    render(<ContactPage />);
    expect(screen.getByText("İletişim")).toBeInTheDocument();
  });

  it("renders form fields", () => {
    render(<ContactPage />);
    expect(screen.getByLabelText("Adınız")).toBeInTheDocument();
    expect(screen.getByLabelText("E-posta Adresiniz")).toBeInTheDocument();
    expect(screen.getByLabelText("Konu")).toBeInTheDocument();
    expect(screen.getByLabelText("Mesajınız")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactPage />);
    expect(screen.getByRole("button", { name: "Mesaj Gönder" })).toBeInTheDocument();
  });

  it("shows validation for required fields", async () => {
    render(<ContactPage />);
    const submitButton = screen.getByRole("button", { name: "Mesaj Gönder" });
    
    fireEvent.click(submitButton);
    
    // HTML5 validation should prevent submission
    const nameInput = screen.getByLabelText("Adınız");
    expect(nameInput).toBeRequired();
  });

  it("handles form input changes", () => {
    render(<ContactPage />);
    
    const nameInput = screen.getByLabelText("Adınız") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
    
    const emailInput = screen.getByLabelText("E-posta Adresiniz") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput.value).toBe("john@example.com");
  });

  it("renders contact info section", () => {
    render(<ContactPage />);
    expect(screen.getByText("Diğer İletişim Kanalları")).toBeInTheDocument();
    expect(screen.getByText("E-posta")).toBeInTheDocument();
    expect(screen.getByText("Güvenlik")).toBeInTheDocument();
  });

  it("shows success message after form submission", async () => {
    render(<ContactPage />);
    
    fireEvent.change(screen.getByLabelText("Adınız"), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText("E-posta Adresiniz"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText("Konu"), { target: { value: "general" } });
    fireEvent.change(screen.getByLabelText("Mesajınız"), { target: { value: "Test message" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Mesaj Gönder" }));
    
    await waitFor(() => {
      expect(screen.getByText("Mesajınız Gönderildi!")).toBeInTheDocument();
    });
  });
});
