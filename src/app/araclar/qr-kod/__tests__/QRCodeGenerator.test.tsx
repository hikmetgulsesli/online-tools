import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QRCodeGenerator } from "../QRCodeGenerator";

// Mock qrcode library
vi.mock("qrcode", () => ({
  toDataURL: vi.fn().mockResolvedValue("data:image/png;base64,mockdata"),
  toString: vi.fn().mockResolvedValue("<svg></svg>"),
}));

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe("QRCodeGenerator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the QR code generator page", () => {
    render(<QRCodeGenerator />);

    expect(screen.getByText("QR Kod Oluşturucu")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/https:\/\/example.com/)
    ).toBeInTheDocument();
  });

  it("accepts text input up to maximum length", () => {
    render(<QRCodeGenerator />);

    const textarea = screen.getByPlaceholderText(/https:\/\/example.com/);
    const longText = "a".repeat(2001);

    fireEvent.change(textarea, { target: { value: longText } });

    expect(screen.getByText(/2001 \/ 2000 karakter/)).toBeInTheDocument();
  });

  it("generates QR code on input change", async () => {
    const { toDataURL } = await import("qrcode");
    render(<QRCodeGenerator />);

    const textarea = screen.getByPlaceholderText(/https:\/\/example.com/);
    fireEvent.change(textarea, { target: { value: "https://test.com" } });

    await waitFor(() => {
      expect(toDataURL).toHaveBeenCalledWith(
        "https://test.com",
        expect.objectContaining({
          width: 400,
          margin: 2,
        })
      );
    });
  });

  it("shows error for empty input when trying to download", () => {
    render(<QRCodeGenerator />);

    const pngButton = screen.getByText("PNG İndir");
    const svgButton = screen.getByText("SVG İndir");

    expect(pngButton).toBeDisabled();
    expect(svgButton).toBeDisabled();
  });

  it("clears input when clear button is clicked", () => {
    render(<QRCodeGenerator />);

    const textarea = screen.getByPlaceholderText(
      /https:\/\/example.com/
    ) as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "test text" } });
    expect(textarea.value).toBe("test text");

    // Find and click the clear button (RefreshCw icon)
    const clearButton = screen.getByTitle("Temizle");
    fireEvent.click(clearButton);

    expect(textarea.value).toBe("");
  });

  it("copies text to clipboard", async () => {
    render(<QRCodeGenerator />);

    const textarea = screen.getByPlaceholderText(/https:\/\/example.com/);
    fireEvent.change(textarea, { target: { value: "copy this text" } });

    const copyButton = screen.getByTitle("Kopyala");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "copy this text"
      );
    });
  });

  it("displays character count", () => {
    render(<QRCodeGenerator />);

    const textarea = screen.getByPlaceholderText(/https:\/\/example.com/);
    fireEvent.change(textarea, { target: { value: "hello" } });

    expect(screen.getByText(/5 \/ 2000 karakter/)).toBeInTheDocument();
  });

  it("renders main title and description for page content", () => {
    render(<QRCodeGenerator />);

    // Check for page title element
    expect(screen.getByText("QR Kod Oluşturucu")).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Metin, URL veya herhangi bir veriyi/)
    ).toBeInTheDocument();
  });

  it("renders with responsive container classes", () => {
    render(<QRCodeGenerator />);

    // Check that main container has responsive classes
    const main = document.querySelector("main");
    expect(main).toHaveClass("max-w-4xl");
    expect(main).toHaveClass("px-4");
    expect(main).toHaveClass("sm:px-6");
    expect(main).toHaveClass("lg:px-8");
  });
});
