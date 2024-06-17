import { fireEvent, render, screen } from "@testing-library/react";
import OutlineButton from "../OutlineButton";
import "@testing-library/jest-dom";

const mockedHandleClick = jest.fn();

describe("OutlineButton Component", () => {
  it("should render a button", async () => {
    render(
      <OutlineButton
        desc="Test"
        className="primary"
        handleClick={mockedHandleClick}
      />
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render correct description", () => {
    render(
      <OutlineButton
        desc="Test"
        className="primary"
        handleClick={mockedHandleClick}
      />
    );
    const buttonElement = screen.getByText(/Test/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("should has the correct classes", () => {
    render(
      <OutlineButton
        desc="Test"
        className="primary"
        handleClick={mockedHandleClick}
      />
    );
    const buttonElement = screen.getByText(/Test/i);
    expect(buttonElement).toHaveClass("btn btn-lg btn-outline-primary");
  });

  it('should calls handleClick when clicked', () => {
    render(
      <OutlineButton
        desc="Test"
        className="primary"
        handleClick={mockedHandleClick}
      />
    );
    const buttonElement = screen.getByText(/Test/i);
    fireEvent.click(buttonElement);
    expect(mockedHandleClick).toHaveBeenCalledTimes(1);
  });
});
