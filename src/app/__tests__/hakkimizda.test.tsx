import { render, screen } from "@testing-library/react";
import AboutPage from "../hakkimizda/page";

describe("AboutPage", () => {
  it("renders page heading", () => {
    render(<AboutPage />);
    expect(screen.getAllByRole("heading", { name: "Hakkımızda" })[0]).toBeInTheDocument();
  });

  it("renders mission section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Misyonumuz")).toBeInTheDocument();
  });

  it("renders values section", () => {
    render(<AboutPage />);
    expect(screen.getByText("Değerlerimiz")).toBeInTheDocument();
    expect(screen.getAllByText("Basitlik")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Gizlilik")[0]).toBeInTheDocument();
  });
});
