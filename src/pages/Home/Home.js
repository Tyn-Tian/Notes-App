import Note from "../../components/Note/Note";
import { notes } from "../../data/notes";
import "./Home.css";

const Home = () => {
  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      <h1 className="text-center text-white">All Notes</h1>
      <div className="notes-container row row-gap-3 mt-lg-5 mt-3">
        {notes.map((note) => (
          <Note note={note}  key={note.id} />
        ))}
      </div>
    </main>
  );
};

export default Home;
