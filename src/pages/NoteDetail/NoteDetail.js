import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";
import './NoteDetail.css'

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setNote(res.data);
        setIsPending(false);
      });
  }, [id]);

  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      {isPending && <h1 className="text-center fw-bold">Loading...</h1>}
      {note && (
        <div className="note-container container">
          <h1 className="text-center">{note.title}</h1>
          <p className="mt-3 mt-lg-5 mb-0 opacity-50">
            {moment(note.createdAt).format("DD MMMM YYYY")}
          </p>
          <p className="fs-5">{note.body}</p>
        </div>
      )}
    </main>
  );
};

export default NoteDetail;
