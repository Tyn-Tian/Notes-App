import { useEffect, useState } from "react";
import Note from "../../components/Note/Note";
import "./Home.css";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(`https://notes-api.dicoding.dev/v2/notes`)
      .then((res) => res.json())
      .then((res) => setNotes(res.data));
  }, []);

  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      <h1 className="text-center">All Notes</h1>
      <div className="notes-container row row-gap-3 mt-lg-5 mt-3">
        {notes.length === 0 && <p className="text-center text-white fs-5 fw-semibold">No Notes...</p>}
        {notes.length > 0&& notes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </div>
    </main>
  );
};

export default Home;
