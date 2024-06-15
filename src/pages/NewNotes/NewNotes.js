import { useState } from "react";
import "./NewNotes.css";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";

const NewNotes = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = {
      title,
      body,
    };
    const response = await apiService.createNotes(note);
    if (response.status === "success") {
      navigate("/");
    }
  };

  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      <h1 className="text-center">Create New Note</h1>
      <div className="container d-flex justify-content-center mt-3 mt-lg-5">
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label fs-4 fw-bold"
            >
              Title
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Input Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label fs-4 fw-bold"
            >
              Note
            </label>
            <textarea
              className="form-control"
              required
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Input Note Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              autoComplete="off"
            ></textarea>
          </div>
          <button className="btn btn-lg btn-outline-primary">
            Create Notes
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewNotes;
