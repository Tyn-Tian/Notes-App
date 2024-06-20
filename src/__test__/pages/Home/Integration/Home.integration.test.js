import { fireEvent, render, screen } from "@testing-library/react";
import useFetch from "../../../../hooks/useFetch";
import Home from "../../../../pages/Home/Home";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../../hooks/useFetch");

const fetchMockReturnValue = (data, isLoading, error) => {
  useFetch.mockReturnValue({
    data,
    isLoading,
    error,
  });
};

describe("Home Component Integration", () => {
  it("should render All Notes heading element when isArchived is false", () => {
    fetchMockReturnValue(null, true, null);
    render(<Home isArchived={false} />);
    const headingElement = screen.getByText(/All Notes/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('should render Archived Notes heading element when isArchived is true', () => {
    fetchMockReturnValue(null, true, null);
    render(<Home isArchived={true} />);
    const headingElement = screen.getByText(/Archived Notes/i);
    expect(headingElement).toBeInTheDocument();
  });

  it("should render error state", () => {
    fetchMockReturnValue(null, false, { message: "Error..." });
    render(<Home />);
    const parafElement = screen.getByText(/Error.../i);
    expect(parafElement).toBeInTheDocument();
  });

  it("should render notes when data not empty", () => {
    fetchMockReturnValue(
      [
        { title: "Note-1", body: "Body 1" },
        { title: "Note-2", body: "Body 2" },
      ],
      false,
      null
    );
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const notesOneElement = screen.getByText(/Note-1/i);
    const notesTwoElement = screen.getByText(/Note-2/i);
    expect(notesOneElement).toBeInTheDocument();
    expect(notesTwoElement).toBeInTheDocument();
  });

  it("should render no notes message when data empty", () => {
    fetchMockReturnValue([], false, null);
    render(<Home />);
    const parafElement = screen.getByText(/no notes.../i);
    expect(parafElement).toBeInTheDocument();
  });

  it("should navigates to note detail by id", () => {
    fetchMockReturnValue(
      [
        { id: "1", title: "Note-1", body: "Body 1" },
        { id: "2", title: "Note-2", body: "Body 2" },
      ],
      false,
      null
    );
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const notesOneElement = screen.getByText(/Note-1/i);
    fireEvent.click(notesOneElement);
    expect(window.location.pathname).toBe("/notes/1");
  });
});