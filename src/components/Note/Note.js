import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import "./Note.css";

const Note = ({ note }) => {
  const navigate = useNavigate();

  // Redirect to note detail
  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100" onClick={handleClick}>
        <div className="card-body">
          <h5 className="card-title fw-bold">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {formatDate(note.createdAt)}
          </h6>
          <p className="card-text fw-medium">{note.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Note;
