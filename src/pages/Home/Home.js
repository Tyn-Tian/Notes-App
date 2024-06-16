import Notes from "../../components/Notes/Notes";
import useFetch from "../../hooks/useFetch";
import apiService from "../../services/api.service";

const Home = () => {
  const { data, isLoading, error } = useFetch(apiService.getAllNotes);

  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      <h1 className="text-center">All Notes</h1>
      <Notes isLoading={isLoading} error={error} data={data} />
    </main>
  );
};

export default Home;
