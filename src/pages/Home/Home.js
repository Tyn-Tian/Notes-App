import Note from "../../components/Note/Note";
import "./Home.css";
import useFetch from "../../hooks/useFetch";
import apiService from "../../services/api.service";

const Home = () => {
  const { data, isLoading, error } = useFetch(apiService.getAllNotes);

  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      <h1 className="text-center">All Notes</h1>
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
    </main>
  );
};

export default Home;
