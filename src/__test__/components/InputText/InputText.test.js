import { fireEvent, render, screen } from "@testing-library/react";
import InputText from "../../../components/InputText/InputText";
import "@testing-library/jest-dom";

const mockedHandleChange = jest.fn();

describe("InputText Component", () => {
  it("should render with correct label", () => {
    render(
      <InputText
        label="test"
        placeholder="test"
        value=""
        handleChange={mockedHandleChange}
      />
    );
    const labelElement = screen.getByLabelText(/test/i);
    expect(labelElement).toBeInTheDocument();
  });

  it("should render with correct placeholder", () => {
    render(
      <InputText
        label="test"
        placeholder="test"
        value=""
        handleChange={mockedHandleChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/test/i);
    expect(inputElement).toHaveAttribute("placeholder", "test");
  });

  it("should render with correct value", () => {
    render(
      <InputText
        label="test"
        placeholder="test"
        value="test"
        handleChange={mockedHandleChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/test/i);
    expect(inputElement).toHaveAttribute("value", "test");
  });

  it("should calls handleChange on input change", () => {
    render(
      <InputText
        label="test"
        placeholder="test"
        value="test"
        handleChange={mockedHandleChange}
      />
    );
    const inputElement = screen.getByPlaceholderText(/test/i);
    fireEvent.change(inputElement, { target: { value: "Changed" } });
    expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  });
});