import { render, screen } from "@testing-library/react";
import InputText from "../InputText";
import "@testing-library/jest-dom";

it('should render label and input element', () => {
    render(<InputText label="test" placeholder="test" />);
    const labelElement = screen.getByLabelText(/test/i);
    const inputElement = screen.getByPlaceholderText(/test/i);
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
});