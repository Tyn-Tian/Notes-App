import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import NewNotes from "../../../../pages/NewNotes/NewNotes";
import apiService from "../../../../services/api.service";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
jest.mock("../../../../services/api.service");
jest.mock(
  "../../../../components/InputText/InputText",
  () =>
    ({ label, value, handleChange, placeholder }) =>
      (
        <input
          aria-label={label}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )
);
jest.mock(
  "../../../../components/InputTextarea/InputTextarea",
  () =>
    ({ label, value, handleChange, placeholder }) =>
      (
        <textarea
          aria-label={label}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        ></textarea>
      )
);
jest.mock(
  "../../../../components/OutlineButton/OutlineButton",
  () =>
    ({ desc, handleClick, className }) =>
      (
        <button onClick={handleClick} className={className}>
          {desc}
        </button>
      )
);

describe("NewNote Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render NewNote", () => {
    render(
      <BrowserRouter>
        <NewNotes />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Input Note Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Input Note Body")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should can input title and body", () => {
    render(
      <BrowserRouter>
        <NewNotes />
      </BrowserRouter>
    );
    const titleInput = screen.getByPlaceholderText("Input Note Title");
    const bodyInput = screen.getByPlaceholderText("Input Note Body");

    fireEvent.change(titleInput, { target: { value: "Title Changed" } });
    fireEvent.change(bodyInput, { target: { value: "Body Changed" } });

    expect(titleInput.value).toBe("Title Changed");
    expect(bodyInput.value).toBe("Body Changed");
  });

  it("should submit form and call apiService", async () => {
    apiService.createNotes.mockResolvedValue({ status: "success" });
    render(
      <BrowserRouter>
        <NewNotes />
      </BrowserRouter>
    );
    const titleInput = screen.getByLabelText("Title");
    const bodyInput = screen.getByLabelText("Note");
    const submitButton = screen.getByText("Create Notes");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(bodyInput, { target: { value: "Test Body" } });
    fireEvent.click(submitButton);

    expect(apiService.createNotes).toHaveBeenCalledWith({
      title: "Test Title",
      body: "Test Body",
    });

    await screen.findByText('Create New Note');

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('handles API failure', async () => {
    apiService.createNotes.mockResolvedValue({ status: 'error' });

    render(
      <BrowserRouter>
        <NewNotes />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText('Title');
    const bodyInput = screen.getByLabelText('Note');
    const submitButton = screen.getByText('Create Notes');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
    fireEvent.click(submitButton);

    expect(apiService.createNotes).toHaveBeenCalledWith({
      title: 'Test Title',
      body: 'Test Body',
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
