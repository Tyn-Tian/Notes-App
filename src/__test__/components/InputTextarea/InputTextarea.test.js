import { fireEvent, render, screen } from "@testing-library/react";
import InputTextarea from "../../../components/InputTextarea/InputTextarea";
import "@testing-library/jest-dom";

const mockedHandleChange = jest.fn();

describe("InputTextarea Component", () => {
  it("should render with correct label", () => {
    render(
      <InputTextarea
        label="test"
        value=""
        placeholder="test"
        handleChange={mockedHandleChange}
      />
    );
    const labelElement = screen.getByLabelText(/test/i);
    expect(labelElement).toBeInTheDocument();
  });

  it("should render with correct placeholder", () => {
    render(
      <InputTextarea
        label="test"
        value=""
        placeholder="test"
        handleChange={mockedHandleChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/test/i);
    expect(inputElement).toHaveAttribute("placeholder", "test");
  });

  it("should render with correct value", () => {
    render(
      <InputTextarea
        label="test"
        value="test"
        placeholder="test"
        handleChange={mockedHandleChange}
      />
    );
    const inputElement = screen.getByDisplayValue("test");
    expect(inputElement).toHaveValue("test");
  });

  it("should calls handleChange on input change", () => {
    render(
      <InputTextarea
        label="test"
        value="test"
        placeholder="test"
        handleChange={mockedHandleChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/test/i);
    fireEvent.change(inputElement, { target: { value: "changed" } });
    expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  });
});
