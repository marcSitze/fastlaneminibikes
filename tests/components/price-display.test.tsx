import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PriceDisplay } from "@/components/products/price-display";
import { Badge } from "@/components/ui/badge";

describe("PriceDisplay Component", () => {
  it("renders standard formatted USD price", () => {
    render(<PriceDisplay price={45.99} />);
    expect(screen.getByText("$45.99")).toBeDefined();
  });

  it("renders strikethrough compare price for discounted items", () => {
    render(<PriceDisplay price={29.99} comparePrice={39.99} />);
    expect(screen.getByText("$29.99")).toBeDefined();
    expect(screen.getByText("$39.99")).toBeDefined();
  });

  it("renders price range when minPrice and maxPrice differ", () => {
    render(<PriceDisplay price={299.99} minPrice={299.99} maxPrice={749.99} />);
    expect(screen.getByText("From $299.99")).toBeDefined();
  });
});

describe("Badge Component", () => {
  it("renders sale badge variant", () => {
    render(<Badge variant="sale">Sale</Badge>);
    expect(screen.getByText("Sale")).toBeDefined();
  });

  it("renders sold out badge variant", () => {
    render(<Badge variant="soldOut">Sold out</Badge>);
    expect(screen.getByText("Sold out")).toBeDefined();
  });
});
