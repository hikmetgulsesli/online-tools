import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Base64Encoder } from "../Base64Encoder";

describe("Base64Encoder", () => {
  beforeEach(() => {
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders page heading", () => {
    render(<Base64Encoder />);
    expect(screen.getByRole("heading", { name: /Base64 Encoder/i })).toBeInTheDocument();
  });

  it("renders encode mode by default", () => {
    render(<Base64Encoder />);
    expect(screen.getByText("Dönüştürülecek Metin")).toBeInTheDocument();
  });

  it("renders decode button", () => {
    render(<Base64Encoder />);
    expect(screen.getByText("Decode")).toBeInTheDocument();
  });

  it("allows text input", () => {
    render(<Base64Encoder />);
    const input = screen.getByPlaceholderText(/Metninizi buraya girin/);
    fireEvent.change(input, { target: { value: "Hello World" } });
    expect(input).toHaveValue("Hello World");
  });

  it("encodes text to Base64", () => {
    render(<Base64Encoder />);
    
    const input = screen.getByPlaceholderText(/Metninizi buraya girin/);
    fireEvent.change(input, { target: { value: "Hello" } });
    
    const encodeButton = screen.getByText("Encode Et");
    fireEvent.click(encodeButton);
    
    const output = screen.getByDisplayValue("SGVsbG8=");
    expect(output).toBeInTheDocument();
  });

  it("decodes Base64 to text", async () => {
    render(<Base64Encoder />);
    
    // Switch to decode mode
    const decodeButton = screen.getByText("Decode");
    fireEvent.click(decodeButton);
    
    const input = screen.getByPlaceholderText(/Base64 kodunu buraya yapıştırın/);
    fireEvent.change(input, { target: { value: "SGVsbG8=" } });
    
    const decodeButton2 = screen.getByText("Decode Et");
    fireEvent.click(decodeButton2);
    
    await waitFor(() => {
      const output = screen.getByDisplayValue("Hello");
      expect(output).toBeInTheDocument();
    });
  });

  it("shows error for invalid Base64", async () => {
    render(<Base64Encoder />);
    
    // Switch to decode mode
    const decodeButton = screen.getByText("Decode");
    fireEvent.click(decodeButton);
    
    const input = screen.getByPlaceholderText(/Base64 kodunu buraya yapıştırın/);
    fireEvent.change(input, { target: { value: "not-valid-base64!!!" } });
    
    const decodeButton2 = screen.getByText("Decode Et");
    fireEvent.click(decodeButton2);
    
    await waitFor(() => {
      expect(screen.getByText(/Geçersiz Base64 formatı/)).toBeInTheDocument();
    });
  });

  it("clears input and output", () => {
    render(<Base64Encoder />);
    
    const input = screen.getByPlaceholderText(/Metninizi buraya girin/);
    fireEvent.change(input, { target: { value: "Hello" } });
    
    const encodeButton = screen.getByText("Encode Et");
    fireEvent.click(encodeButton);
    
    const clearButton = screen.getByText("Temizle");
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue("");
  });

  it("shows copy button after conversion", () => {
    render(<Base64Encoder />);
    
    const input = screen.getByPlaceholderText(/Metninizi buraya girin/);
    fireEvent.change(input, { target: { value: "Hello" } });
    
    const encodeButton = screen.getByText("Encode Et");
    fireEvent.click(encodeButton);
    
    expect(screen.getByText("Kopyala")).toBeInTheDocument();
  });

  it("swaps between encode and decode modes", () => {
    render(<Base64Encoder />);
    
    // Initially in encode mode
    expect(screen.getByPlaceholderText(/Metninizi buraya girin/)).toBeInTheDocument();
    
    // Click decode button
    const decodeButton = screen.getByText("Decode");
    fireEvent.click(decodeButton);
    
    // Now in decode mode
    expect(screen.getByPlaceholderText(/Base64 kodunu buraya yapıştırın/)).toBeInTheDocument();
  });
});
