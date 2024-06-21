import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NoteDetail from "../../../pages/NoteDetail/NoteDetail";
import "@testing-library/jest-dom";
import apiService from "../../../services/api.service";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("../../../../hooks/useFetch");
jest.mock("../../../../services/api.service");

const fetchMockReturnValue = (data, isLoading, error) => {
  useFetch.mockReturnValue({
    data,
    isLoading,
    error,
  });
};

describe("NoteDetail Component", () => {
  const navigate = jest.fn();
  const mockNote = {
    id: "1",
    title: "Sample Note",
    body: "This is a sample note.",
    createdAt: "2023-06-01T12:00:00Z",
    archived: false,
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(navigate);
    useParams.mockReturnValue({ id: "1" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state when isLoading is true", () => {
    fetchMockReturnValue(null, true, null);
    render(<NoteDetail />);
    const headingElement = screen.getByText(/Loading.../i);
    expect(headingElement).toBeInTheDocument();
  });

  it("should render error state", () => {
    fetchMockReturnValue(null, false, { message: "Error..." });
    render(<NoteDetail />);
    const headingElement = screen.getByText(/Error.../i);
    expect(headingElement).toBeInTheDocument();
  });

  it("should render note detail", () => {
    fetchMockReturnValue(mockNote, false, null);
    render(<NoteDetail />);
    expect(screen.getByText(mockNote.title)).toBeInTheDocument();
    expect(screen.getByText(mockNote.body)).toBeInTheDocument();
  });

  it("should navigates to / when data is null", () => {
    fetchMockReturnValue(null, false, null);
    render(<NoteDetail />);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("should delete note when delete button clicked", async () => {
    fetchMockReturnValue(mockNote, false, null);
    apiService.deleteNote.mockResolvedValue({ status: "success" });

    render(<NoteDetail />);
    fireEvent.click(screen.getByText(/Delete Note/i));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  it("should archive note when archive button clicked", async () => {
    fetchMockReturnValue(mockNote, false, null);
    apiService.archiveNote.mockResolvedValue({ status: "success" });

    render(<NoteDetail />);
    fireEvent.click(screen.getByText(/Archive/i));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/notes/archived");
    });
  });

  it("should unarchive note when unarchive button clicked", async () => {
    const archivedNote = { ...mockNote, archived: true };
    fetchMockReturnValue(archivedNote, false, null);
    apiService.unarchiveNote.mockResolvedValue({ status: "success" });

    render(<NoteDetail />);
    fireEvent.click(screen.getByText(/Unarchive/i));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
