import { fireEvent, render, screen } from "@testing-library/react";
import Note from "../../../../components/Note/Note";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

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

  it("should navigates to note detail page when note card clicked", () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <Note note={mockNote} />
      </BrowserRouter>
    );
    const cardElement = screen.getByTestId("note-card");
    fireEvent.click(cardElement);
    expect(mockNavigate).toHaveBeenCalledWith(`/notes/${mockNote.id}`);
  });
});
