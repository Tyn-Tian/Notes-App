import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../../../pages/NotFound/NotFound";
import "@testing-library/jest-dom";

describe("NotFound Component", () => {
  it("should render NotFound Component", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should navigates to Home Pages when link is clicked', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe("/");
  });
});
