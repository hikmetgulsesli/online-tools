import { render, screen } from "@testing-library/react";
import { ToolCard } from "../components/ToolCard";

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe("ToolCard", () => {
  const defaultProps = {
    href: "/test-tool",
    title: "Test Tool",
    description: "This is a test tool description",
    icon: <svg data-testid="tool-icon" />,
  };

  it("renders tool title", () => {
    render(<ToolCard {...defaultProps} />);
    expect(screen.getByText("Test Tool")).toBeInTheDocument();
  });

  it("renders tool description", () => {
    render(<ToolCard {...defaultProps} />);
    expect(screen.getByText("This is a test tool description")).toBeInTheDocument();
  });

  it("renders icon", () => {
    render(<ToolCard {...defaultProps} />);
    expect(screen.getByTestId("tool-icon")).toBeInTheDocument();
  });

  it("has correct link href", () => {
    render(<ToolCard {...defaultProps} />);
    expect(screen.getByText("Test Tool").closest("a")).toHaveAttribute("href", "/test-tool");
  });

  it("has hover styles applied", () => {
    render(<ToolCard {...defaultProps} />);
    const link = screen.getByText("Test Tool").closest("a");
    expect(link).toHaveClass("hover:shadow-md");
    expect(link).toHaveClass("hover:-translate-y-0.5");
  });
});
