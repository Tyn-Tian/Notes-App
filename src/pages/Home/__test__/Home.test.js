import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../Home";

it("should render a heading", () => {
  render(<Home />);
  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});
