import { render, screen } from "@testing-library/react";
import Notes from "../../../../components/Notes/Notes";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../../components/Note/Note", () => ({ note }) => (
  <p>{note.title}</p>
));

const mockData = [
  {
    id: "1",
    title: "Title One",
    createdAt: "2023-01-01T00:00:00.000Z",
    body: "Body One",
  },
  {
    id: "2",
    title: "Title Two",
    createdAt: "2024-01-01T00:00:00.000Z",
    body: "Body Two",
  }
];

describe("Notes Component", () => {
  it("should render loading message when isLoading prop is true", () => {
    render(<Notes isLoading={true} error="null" data="null" />);
    const parafElement = screen.getByText(/Loading.../i);
    expect(parafElement).toBeInTheDocument();
  });

  it("should render error message when error prop is not null", () => {
    render(
      <Notes isLoading={false} error={{ message: "Error" }} data="null" />
    );
    const parafElement = screen.getByText(/Error/i);
    expect(parafElement).toBeInTheDocument();
  });

  it('should render no notes message when data is empty', () => {
    render(
      <BrowserRouter>
        <Notes isLoading={false} error={null} data={[]} />
      </BrowserRouter>
    );
    const parafElement = screen.getByText(/No Notes.../i);
    expect(parafElement).toBeInTheDocument();
  });

  it("should render Note Component when data prop is not null", () => {
    render(
      <BrowserRouter>
        <Notes isLoading={false} error={null} data={mockData} />
      </BrowserRouter>
    );
    const NoteComponent = screen.getByText(/Title One/i);
    expect(NoteComponent).toBeInTheDocument();
  });

  it("should render multiple Note Components when have multiple data notes", () => {
    render(
      <BrowserRouter>
        <Notes isLoading={false} error={null} data={mockData} />
      </BrowserRouter>
    );
    const NoteComponentOne = screen.getByText(/Title One/i);
    const NoteComponentTwo = screen.getByText(/Title Two/i);
    expect(NoteComponentOne).toBeInTheDocument();
    expect(NoteComponentTwo).toBeInTheDocument();
  });
});
