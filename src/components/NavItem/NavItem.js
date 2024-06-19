import { Link } from "react-router-dom";

const NavItem = ({ desc, to }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link fw-semibold" to={to}>
        {desc}
      </Link>
    </li>
  );
};

export default NavItem;
