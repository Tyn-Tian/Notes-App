import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import NewNotes from "./pages/NewNotes/NewNotes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/notes" element={<NewNotes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
