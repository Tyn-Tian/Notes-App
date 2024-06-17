import { render, screen } from "@testing-library/react";
import OutlineButton from "../OutlineButton";
import "@testing-library/jest-dom";

it("should render a button", async () => {
  render(<OutlineButton />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});
