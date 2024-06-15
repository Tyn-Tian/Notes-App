import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";
import "./NoteDetail.css";
import useFetch from "../../hooks/useFetch";
import apiService from "../../services/api.service";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(() => apiService.getNote(id));

  const handleDelete = async () => {
    const response = await apiService.deleteNote(id);
    if (response.status === "success") {
      navigate("/");
    }
  };

  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      {isLoading ? (
        <h1 className="text-center fw-bold">Loading...</h1>
      ) : error ? (
        <h1 className="text-center fw-bold">{error.message}</h1>
      ) : (
        data && (
          <div className="note-container container">
            <h1 className="text-center">{data.title}</h1>
            <p className="mt-3 mt-lg-5 mb-0 opacity-50">
              {moment(data.createdAt).format("DD MMMM YYYY")}
            </p>
            <p className="fs-5">{data.body}</p>
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={handleDelete}
            >
              Delete Note
            </button>
          </div>
        )
      )}
    </main>
  );
};

export default NoteDetail;
