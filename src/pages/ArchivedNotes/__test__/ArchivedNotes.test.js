import { render, screen } from "@testing-library/react";
import ArchivedNotes from "../ArchivedNotes";
import "@testing-library/jest-dom";

it("should render a heading", () => {
  render(<ArchivedNotes />);
  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});
