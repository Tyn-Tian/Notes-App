import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NewNotes from "../../../../pages/NewNotes/NewNotes";
import apiService from "../../../../services/api.service";
import "@testing-library/jest-dom";

jest.mock("../../../../services/api.service");

describe("NewNote Component Integration", () => {
  it("should render NewNote Component", () => {
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
    expect(window.location.pathname).toBe("/");
  });

  it('handles API failure', async () => {
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
    expect(titleInput).toBeInTheDocument();
  });

  it("should render error message when input is not valid", () => {
    render(
      <BrowserRouter>
        <NewNotes />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText("Title");
    const bodyInput = screen.getByLabelText("Note");
    const submitButton = screen.getByText("Create Notes");

    fireEvent.change(titleInput, { target: { value: "min" } });
    fireEvent.change(bodyInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(
      screen.getByText('"value" length must be at least 5 characters long')
    ).toBeInTheDocument();

    expect(
      screen.getByText('"value" is not allowed to be empty')
    ).toBeInTheDocument();
  });
});
