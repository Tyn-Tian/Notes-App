import { useState } from "react";
import "./NewNotes.css";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import apiService from "../../services/api.service";
import InputText from "../../components/InputText/InputText";
import InputTextarea from "../../components/InputTextarea/InputTextarea";
import OutlineButton from "../../components/OutlineButton/OutlineButton";

const NewNotes = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const navigate = useNavigate();

  const titleSchema = Joi.string().min(5).max(50).required();
  const bodySchema = Joi.string().min(10).required();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isTitleValid = titleSchema.validate(title);
    const isBodyValid = bodySchema.validate(body);

    if (isTitleValid.error || isBodyValid.error) {
      setTitleError(isTitleValid.error ? isTitleValid.error.message : "");
      setBodyError(isBodyValid.error ? isBodyValid.error.message : "");
      return;
    }

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
          <p className="text-danger">{titleError}</p>
          <InputTextarea
            label="Note"
            value={body}
            handleChange={(e) => handleChangeBody(e)}
            placeholder="Input Note Body"
          />
          <p className="text-danger">{bodyError}</p>
          <OutlineButton desc="Create Notes" className="primary" />
        </form>
      </div>
    </main>
  );
};

export default NewNotes;
