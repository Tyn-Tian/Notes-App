import { fireEvent, render, screen } from "@testing-library/react";
import Note from "../Note";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockNote = {
  id: "1",
  title: "Sample Note",
  createdAt: "2023-01-01T00:00:00.000Z",
  body: "This is a sample note body.",
};

describe("Note Component", () => {
  it("should render a note card", () => {
    render(
      <BrowserRouter>
        <Note note={mockNote} />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/Sample Note/);
    expect(titleElement).toBeInTheDocument();

    const dateElement = screen.getByText(/01 Januari 2023/);
    expect(dateElement).toBeInTheDocument();

    const bodyElement = screen.getByText(/This is a sample note body./);
    expect(bodyElement).toBeInTheDocument();
  });

  it('should redirect to note detail page when note card clicked', () => {
    render(
      <BrowserRouter>
        <Note note={mockNote} />
      </BrowserRouter>
    );
    const cardElement = screen.getByTestId("note-card");
    fireEvent.click(cardElement);
    expect(window.location.pathname).toBe(`/notes/${mockNote.id}`);
  });
});
