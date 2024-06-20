import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import NewNotes from "./pages/NewNotes/NewNotes";
import NoteDetail from "./pages/NoteDetail/NoteDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home isArchived={false} />} />
          <Route path="/notes" element={<NewNotes />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/notes/archived" element={<Home isArchived={true} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
