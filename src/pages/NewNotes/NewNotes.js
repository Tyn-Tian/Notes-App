import { useState } from "react";
import "./NewNotes.css";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api.service";
import InputText from "./components/InputText/InputText";
import InputTextarea from "./components/InputTestarea/InputTextarea";
import OutlineButton from "../../components/OutlineButton/OutlineButton";

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

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeBody = (e) => {
    setBody(e.target.value);
  };

  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      <h1 className="text-center">Create New Note</h1>
      <div className="container d-flex justify-content-center mt-3 mt-lg-5">
        <form className="w-100" onSubmit={handleSubmit}>
          <InputText
            label="Title"
            value={title}
            handleChange={(e) => handleChangeTitle(e)}
            placeholder="Input Note Title"
          />
          <InputTextarea
            label="Note"
            value={body}
            handleChange={(e) => handleChangeBody(e)}
            placeholder="Input Note Body"
          />
          <OutlineButton desc="Create Notes" className="primary" />
        </form>
      </div>
    </main>
  );
};

export default NewNotes;
