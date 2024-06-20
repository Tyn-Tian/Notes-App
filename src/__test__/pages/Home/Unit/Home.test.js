import { render, screen } from "@testing-library/react";
import useFetch from "../../../../hooks/useFetch";
import Home from "../../../../pages/Home/Home";
import "@testing-library/jest-dom";

jest.mock("../../../../hooks/useFetch");
jest.mock(
  "../../../../components/Notes/Notes",
  () =>
    ({ isLoading, error, data }) =>
      (
        <p>
          {isLoading
            ? "Loading..."
            : error
            ? `${error.message}`
            : data.length === 0
            ? "no notes..."
            : "data loaded..."}
        </p>
      )
);

const fetchMockReturnValue = (data, isLoading, error) => {
  useFetch.mockReturnValue({
    data,
    isLoading,
    error,
  });
};

describe("Home Component", () => {
  it("should render heading element", () => {
    fetchMockReturnValue(null, true, null);
    render(<Home />);
    const headingElement = screen.getByText(/All Notes/i);
    expect(headingElement).toBeInTheDocument();
  });

  it("should render loading state", () => {
    fetchMockReturnValue(null, true, null);
    render(<Home />);
    const parafElement = screen.getByText(/loading.../i);
    expect(parafElement).toBeInTheDocument();
  });

  it("should render error state", () => {
    fetchMockReturnValue(null, false, { message: "Error..." });
    render(<Home />);
    const parafElement = screen.getByText(/Error.../i);
    expect(parafElement).toBeInTheDocument();
  });

  it("should render notes when data not empty", () => {
    fetchMockReturnValue(
      [{ title: "Note 1" }, { title: "Note 2" }],
      false,
      null
    );
    render(<Home />);
    const parafElement = screen.getByText(/data loaded.../i);
    expect(parafElement).toBeInTheDocument();
  });

  it("should render no notes message when data empty", () => {
    fetchMockReturnValue([], false, null);
    render(<Home />);
    const parafElement = screen.getByText(/no notes.../i);
    expect(parafElement).toBeInTheDocument();
  });
});
