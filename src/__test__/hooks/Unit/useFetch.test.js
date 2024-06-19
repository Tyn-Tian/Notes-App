import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../../../hooks/useFetch";

const mockApiService = jest.fn();

describe("userFetch hooks", () => {
  beforeEach(() => {
    mockApiService.mockClear();
  });

  it("should fetch data successfully", async () => {
    const mockData = { data: [{ id: 1, title: "Test Data" }] };
    mockApiService.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFetch(mockApiService));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(mockData.data);
    expect(result.current.error).toBe(null);
  });

  it("should handle error", async () => {
    const mockError = new Error("Something went wrong");
    mockApiService.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFetch(mockApiService));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(mockError);
  });
});
