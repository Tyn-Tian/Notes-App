import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Navbar Component", () => {
  it("should render a navigation", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const headerElement = screen.getByRole("navigation");
    expect(headerElement).toBeInTheDocument();
  });

  it("should redirect when listitem Home clicked", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const listHomeElement = screen.getByText(/Home/i);
    fireEvent.click(listHomeElement);
    expect(window.location.pathname).toBe("/");
  });

  it("should redirect when listitem New Notes clicked", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const listHomeElement = screen.getByText(/New Notes/i);
    fireEvent.click(listHomeElement);
    expect(window.location.pathname).toBe("/notes");
  });

  it("should redirect when listitem Archived Notes clicked", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const listHomeElement = screen.getByText(/Archived Notes/i);
    fireEvent.click(listHomeElement);
    expect(window.location.pathname).toBe("/notes/archived");
  });

  it("should has a functional navbar toggler", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const togglerButton = screen.getByLabelText(/Toggle navigation/i);
    expect(togglerButton).toBeInTheDocument();

    const navbarCollapse = screen.getByTestId("navbar-collapse");
    expect(navbarCollapse).toHaveClass("collapse");

    userEvent.click(togglerButton);
    navbarCollapse.classList.add("show");
    expect(navbarCollapse).toHaveClass("show");

    userEvent.click(togglerButton);
    navbarCollapse.classList.remove("show");
    expect(navbarCollapse).not.toHaveClass("show");
  });
});
