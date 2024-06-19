import apiService from "../../services/api.service";

global.fetch = jest.fn();

describe("apiService Test", () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it("getAllNotes should fetch all notes", async () => {
    const mockResponse = {
      status: "success",
      message: "Note retrieved",
      data: [
        {
          id: "1",
          title: "Note Title 1",
          body: "Note Body 1",
          createdAt: "2022-07-28T10:03:12.594Z",
          archived: false,
        },
        {
          id: "2",
          title: "Note Title 2",
          body: "Note Body 2",
          createdAt: "2024-07-28T10:03:12.594Z",
          archived: false,
        },
      ],
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.getAllNotes();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://notes-api.dicoding.dev/v2/notes",
      null
    );
  });

  it("getNote should fetch a single note by id", async () => {
    const mockResponse = {
      status: "success",
      message: "Note retrieved",
      data: {
        id: "1",
        title: "Note Title 1",
        body: "Note Body 1",
        createdAt: "2022-07-28T10:03:12.594Z",
        archived: false,
      },
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.getNote("1");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://notes-api.dicoding.dev/v2/notes/1",
      null
    );
  });

  it("createNotes should create a new note", async () => {
    const mockNote = { title: "Test Title", body: "Test Body" };
    const mockResponse = {
      status: "success",
      message: "Note created",
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.createNotes(mockNote);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://notes-api.dicoding.dev/v2/notes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockNote),
      }
    );
  });

  it("deleteNote should delete a note by id", async () => {
    const mockResponse = { message: "Note deleted" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.deleteNote(1);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://notes-api.dicoding.dev/v2/notes/1",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: "null",
      }
    );
  });

  it("archiveNote should archive a note by id", async () => {
    const mockResponse = { message: "Note archive" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.archiveNote(1);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://notes-api.dicoding.dev/v2/notes/1/archive",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "null",
      }
    );
  });

  it("unarchiveNote should unarchive a note by id", async () => {
    const mockResponse = { message: "Note unarchived" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.unarchiveNote(1);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://notes-api.dicoding.dev/v2/notes/1/unarchive",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "null",
      }
    );
  });

  it("getArchivedNotes should fetch archived notes", async () => {
    const mockResponse = {
      status: "success",
      message: "Note retrieved",
      data: [
        {
          id: "1",
          title: "Note Title 1",
          body: "Note Body 1",
          createdAt: "2022-07-28T10:03:12.594Z",
          archived: true,
        },
        {
          id: "2",
          title: "Note Title 2",
          body: "Note Body 2",
          createdAt: "2024-07-28T10:03:12.594Z",
          archived: true,
        },
      ],
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.getArchivedNotes();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://notes-api.dicoding.dev/v2/notes/archived",
      null
    );
  });

  it("should handle HTTP errors correctly", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(apiService.getNote(999)).rejects.toThrow(
      "HTTP error! status: 404"
    );
  });
});
