import { useEffect, useState } from "react";

const useFetch = (apiService) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService();
        setData(result.data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiService]);
  return { data, isLoading, error };
};

export default useFetch;
