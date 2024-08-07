import { useNavigate, useParams } from "react-router-dom";
import "./NoteDetail.css";
import { formatDate } from "../../utils/utils";
import useFetch from "../../hooks/useFetch";
import apiService from "../../services/api.service";
import OutlineButton from "../../components/OutlineButton/OutlineButton";
import { useCallback } from "react";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useCallback(() => apiService.getNote(id), [id])
  const { data, isLoading, error } = useFetch(api);

  const handleDelete = async () => {
    const response = await apiService.deleteNote(id);
    if (response.status === "success") {
      navigate("/");
    }
  };

  const handleArchive = async () => {
    const response = await apiService.archiveNote(id);
    if (response.status === "success") {
      navigate("/notes/archived");
    }
  };

  const handleUnarchive = async () => {
    const response = await apiService.unarchiveNote(id);
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
      ) : data ? (
        <div className="note-container container">
          <h1 className="text-center">{data.title}</h1>
          <p className="mt-3 mt-lg-5 mb-0 opacity-50">
            {formatDate(data.createdAt)}
          </p>
          <p className="fs-5">{data.body}</p>
          <div className="d-flex gap-3">
            <OutlineButton
              className={"warning"}
              desc={data.archived ? "Unarchive" : "Archive"}
              handleClick={data.archived ? handleUnarchive : handleArchive}
            />
            <OutlineButton
              className={"danger"}
              handleClick={handleDelete}
              desc="Delete Note"
            />
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </main>
  );
};

export default NoteDetail;
