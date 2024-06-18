import { Link } from "react-router-dom";
import NavItem from "./components/NavItem";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fw-bold" to="/">
            Notes App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            data-testid="navbar-collapse"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <NavItem desc="Home" to="/" />
              <NavItem desc="New Notes" to="/notes" />
              <NavItem desc="Archived Notes" to="/notes/archived" />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
