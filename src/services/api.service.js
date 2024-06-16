const BASE_URL = "https://notes-api.dicoding.dev/v2/notes";

const sendRequest = async (url, options = null) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  if (options && options.method !== "DELETE" && options.method !== "POST") {
    if (!result.data) {
      throw new Error("Data not found in response");
    }
  }
  return result;
};

const createRequestOptions = (method, body = null) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
};

const getAllNotes = async () => {
  return await sendRequest(`${BASE_URL}`);
};

const getNote = async (id) => {
  return await sendRequest(`${BASE_URL}/${id}`);
};

const createNotes = async (note) => {
  const options = createRequestOptions("POST", note);
  return await sendRequest(`${BASE_URL}`, options);
};

const deleteNote = async (id) => {
  const options = createRequestOptions("DELETE");
  return await sendRequest(`${BASE_URL}/${id}`, options);
};

const archiveNote = async (id) => {
  const options = createRequestOptions("POST");
  return await sendRequest(`${BASE_URL}/${id}/archive`, options);
};

const unarchiveNote = async (id) => {
  const options = createRequestOptions("POST");
  return await sendRequest(`${BASE_URL}/${id}/unarchive`, options);
};

const getArchivedNotes = async () => {
  return await sendRequest(`${BASE_URL}/archived`);
}

const apiService = {
  getAllNotes,
  getNote,
  createNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getArchivedNotes
};

export default apiService;
