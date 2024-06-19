import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";
import "@testing-library/jest-dom";

const checkNavItem = (navItems) => {
  navItems.map((navItem) => {
    const element = screen.getByText(navItem.desc);
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", navItem.href);
    return true;
  });
};

const checkNavItemWhenClicked = (navItems) => {
  navItems.map((navItem) => {
    fireEvent.click(screen.getByText(navItem.desc));
    expect(window.location.pathname).toBe(navItem.to);
    return true;
  })
}

describe("Navbar Component Integration Test", () => {
  it("should render navigation and NavItem component", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
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

  it('should navigates to correct page when NavItem is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    checkNavItemWhenClicked([
      {
        desc: /Home/i,
        to: "/",
      },
      {
        desc: /New Notes/i,
        to: "/notes",
      },
      {
        desc: /Archived Notes/i,
        to: "/notes/archived",
      },
    ]);
  });
});
