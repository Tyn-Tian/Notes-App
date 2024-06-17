import { render, screen } from "@testing-library/react";
import InputTextarea from "../InputTextarea";
import "@testing-library/jest-dom";

it('should render label and textarea element', () => {
    render(<InputTextarea label="test" />);
    const labelElement = screen.getByLabelText(/test/i);
    const textareaElement = screen.getByRole('textbox');
    expect(labelElement).toBeInTheDocument();
    expect(textareaElement).toBeInTheDocument();
});