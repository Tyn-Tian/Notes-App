import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="container mt-lg-5 mb-5 mt-3 text-center">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Back to home.</Link>
    </main>
  );
};

export default NotFound;
