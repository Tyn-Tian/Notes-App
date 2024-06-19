import { fireEvent, render, screen } from "@testing-library/react";
import NavItem from "../NavItem";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("NavItem Components", () => {
  it("should render a list item", () => {
    render(
      <BrowserRouter>
        <NavItem to="/" desc="Home" />
      </BrowserRouter>
    );
    const listElement = screen.getByRole("listitem");
    expect(listElement).toBeInTheDocument();
  });

  it('should render correct description', () => {
    render(
      <BrowserRouter>
        <NavItem to="/" desc="Home" />
      </BrowserRouter>
    );
    const link = screen.getByText(/Home/i);
    expect(link).toBeInTheDocument();
  });

  it("should redirect when list clicked", () => {
    render(
      <BrowserRouter>
        <NavItem to="/" desc="Home" />
      </BrowserRouter>
    );
    const link = screen.getByText(/Home/i);
    expect(link).toHaveAttribute("href", "/");

    fireEvent.click(link);
    expect(window.location.pathname).toBe("/");
  });
});