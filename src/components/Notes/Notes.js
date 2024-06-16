import Note from "../Note/Note";
import "./Notes.css";

const Notes = ({ isLoading, error, data }) => {
  return (
    <div className="notes-container row row-gap-3 mt-lg-5 mt-3">
      {isLoading ? (
        <p className="text-center fs-5 fw-semibold">Loading...</p>
      ) : error ? (
        <p className="text-center fs-5 fw-semibold">{error.message}</p>
      ) : data.length === 0 ? (
        <p className="text-center fs-5 fw-semibold">No Notes...</p>
      ) : (
        data.map((note) => <Note note={note} key={note.id} />)
      )}
    </div>
  );
};

export default Notes;
