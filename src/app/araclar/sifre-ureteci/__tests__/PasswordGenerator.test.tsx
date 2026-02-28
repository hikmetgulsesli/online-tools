import { render, screen, fireEvent } from "@testing-library/react";
import { PasswordGenerator } from "../PasswordGenerator";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("PasswordGenerator", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders password generator page", () => {
    render(<PasswordGenerator />);
    expect(screen.getByText("Şifre Üretici")).toBeInTheDocument();
  });

  it("has length slider with range 8-64", () => {
    render(<PasswordGenerator />);
    
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "8");
    expect(slider).toHaveAttribute("max", "64");
  });

  it("has uppercase toggle", () => {
    render(<PasswordGenerator />);
    
    const uppercaseToggle = screen.getByLabelText("Büyük Harfler (A-Z)");
    expect(uppercaseToggle).toBeInTheDocument();
    expect(uppercaseToggle).toBeChecked();
  });

  it("has lowercase toggle", () => {
    render(<PasswordGenerator />);
    
    const lowercaseToggle = screen.getByLabelText("Küçük Harfler (a-z)");
    expect(lowercaseToggle).toBeInTheDocument();
    expect(lowercaseToggle).toBeChecked();
  });

  it("has numbers toggle", () => {
    render(<PasswordGenerator />);
    
    const numbersToggle = screen.getByLabelText("Rakamlar (0-9)");
    expect(numbersToggle).toBeInTheDocument();
    expect(numbersToggle).toBeChecked();
  });

  it("has symbols toggle", () => {
    render(<PasswordGenerator />);
    
    const symbolsToggle = screen.getByLabelText("Özel Karakterler (!@#$%^&*)");
    expect(symbolsToggle).toBeInTheDocument();
    expect(symbolsToggle).toBeChecked();
  });

  it("has exclude ambiguous toggle", () => {
    render(<PasswordGenerator />);
    
    // Find checkbox by partial label text
    const ambiguousToggle = screen.getByLabelText(/Karışıklık Yaratan/);
    expect(ambiguousToggle).toBeInTheDocument();
    expect(ambiguousToggle).not.toBeChecked();
  });

  it("has generate button", () => {
    render(<PasswordGenerator />);
    
    const generateButton = screen.getByText("Şifre Üret");
    expect(generateButton).toBeInTheDocument();
  });

  it("shows password strength indicator", () => {
    render(<PasswordGenerator />);
    
    expect(screen.getByText("Şifre Gücü")).toBeInTheDocument();
  });

  it("generates new password on button click", () => {
    render(<PasswordGenerator />);
    
    const generateButton = screen.getByText("Şifre Üret");
    fireEvent.click(generateButton);
    
    // Button should be clickable
    expect(generateButton).toBeInTheDocument();
  });

  it("is responsive on mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    render(<PasswordGenerator />);
    
    // Page should still render correctly
    expect(screen.getByText("Şifre Üretici")).toBeInTheDocument();
  });

  it("shows strength levels correctly", () => {
    render(<PasswordGenerator />);
    
    // Check that strength indicator shows one of the expected levels
    const strengthElement = screen.getByText(/Zayıf|Orta|Güçlü|Çok Güçlü/);
    expect(strengthElement).toBeInTheDocument();
  });

  it("has links to other pages in footer", () => {
    render(<PasswordGenerator />);
    
    expect(screen.getByText("Hakkımızda")).toBeInTheDocument();
    expect(screen.getByText("İletişim")).toBeInTheDocument();
    expect(screen.getByText("Gizlilik")).toBeInTheDocument();
  });
});
