import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(url);
        const {results} = await response.json();

        setData(results);
        setLoading(false);
      } 
      catch (error) {
        setError(error.message);
        setLoading(false);

      } 
    
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
