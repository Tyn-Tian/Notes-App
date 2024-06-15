import moment from "moment";
import "moment/locale/id";
import './Note.css'
import { useNavigate } from "react-router-dom";

const Note = ({ note }) => {
  const navigate = useNavigate();

  // Redirect to note detail
  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  } 

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100" onClick={handleClick}>
        <div className="card-body">
          <h5 className="card-title fw-bold">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {/* converts isoDate to the specified format (Example: 28 Dec 2003)  */}
            {moment(note.createdAt).format("DD MMMM YYYY")} 
          </h6>
          <p className="card-text fw-medium">{note.body}</p>
        </div>
      </div>
    </div>
  );
};

export default Note;
