import Notes from "../../components/Notes/Notes";
import useFetch from "../../hooks/useFetch";
import apiService from "../../services/api.service";

const ArchivedNotes = () => {
  const { isLoading, error, data } = useFetch(apiService.getArchivedNotes);

  return (
    <main className="container mt-lg-5 mb-5 mt-3">
      <h1 className="text-center">Archived Notes</h1>
      <Notes isLoading={isLoading} error={error} data={data} />
    </main>
  );
};

export default ArchivedNotes;
