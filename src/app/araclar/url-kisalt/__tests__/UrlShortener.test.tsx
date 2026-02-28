import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UrlShortener } from "../UrlShortener";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

// Mock navigator.clipboard
const clipboardMock = {
  writeText: vi.fn().mockResolvedValue(undefined),
};

describe("UrlShortener", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    Object.defineProperty(navigator, "clipboard", {
      value: clipboardMock,
      writable: true,
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it("renders the URL shortener page correctly", () => {
    render(<UrlShortener />);
    
    expect(screen.getByText("URL Kısaltıcı")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://example.com")).toBeInTheDocument();
    expect(screen.getByText("Kısalt")).toBeInTheDocument();
  });

  it("shows validation error for empty URL", async () => {
    render(<UrlShortener />);
    
    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);
    
    await waitFor(() => {
      expect(screen.getByText("Lütfen bir URL girin")).toBeInTheDocument();
    });
  });

  it("generates shortened URL for valid input", async () => {
    render(<UrlShortener />);
    
    const input = screen.getByPlaceholderText("https://example.com");
    fireEvent.change(input, { target: { value: "https://google.com" } });
    
    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Kısa URL/)).toBeInTheDocument();
    });
  });

  it("clears input when clear button is clicked", async () => {
    render(<UrlShortener />);
    
    const input = screen.getByPlaceholderText("https://example.com") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "https://google.com" } });
    
    expect(input.value).toBe("https://google.com");
    
    const clearButton = screen.getByTitle("Temizle");
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("accepts URLs with http:// protocol", async () => {
    render(<UrlShortener />);
    
    const input = screen.getByPlaceholderText("https://example.com");
    fireEvent.change(input, { target: { value: "http://example.com" } });
    
    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Kısa URL/)).toBeInTheDocument();
    });
  });

  it("displays URL history from localStorage", async () => {
    const mockHistory = [
      { id: "abc123", originalUrl: "https://example.com", shortCode: "abc123", createdAt: Date.now() },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockHistory));
    
    render(<UrlShortener />);
    
    await waitFor(() => {
      expect(screen.getByText("Geçmiş")).toBeInTheDocument();
      expect(screen.getByText("https://example.com")).toBeInTheDocument();
    });
  });

  it("saves new URL to localStorage", async () => {
    render(<UrlShortener />);
    
    const input = screen.getByPlaceholderText("https://example.com");
    fireEvent.change(input, { target: { value: "https://github.com" } });
    
    const shortenButton = screen.getByText("Kısalt");
    fireEvent.click(shortenButton);
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });
});
