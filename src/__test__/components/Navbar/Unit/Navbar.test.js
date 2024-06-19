import { render, screen } from "@testing-library/react";
import Navbar from "../../../../components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../../../../components/NavItem/NavItem", () => ({ desc, to }) => (
  <a href={to}>{desc}</a>
));

const checkNavItem = (navItems) => {
  navItems.map((navItem) => {
    const element = screen.getByText(navItem.desc);
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", navItem.href);
    return true;
  });
};

describe("Navbar Component", () => {
  it("should render a navigation", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("should render NavItem with correct description and href", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    checkNavItem([
      {
        desc: /Home/i,
        href: "/",
      },
      {
        desc: /New Notes/i,
        href: "/notes",
      },
      {
        desc: /Archived Notes/i,
        href: "/notes/archived",
      },
    ]);
  });

  it("should render navbar toggler button", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const togglerButton = screen.getByLabelText(/Toggle navigation/i);
    expect(togglerButton).toBeInTheDocument();
  });
});
