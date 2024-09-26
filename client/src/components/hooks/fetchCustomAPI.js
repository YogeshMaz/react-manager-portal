import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const useFetchCustomAPI = (url) => {
  const [data, setData] = useState(null); // Set initial state to null since we're returning an object
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);

  const fetchReportData = useCallback(async () => {
    try {
      const response = await Axios.get(url);
      // console.log("** Full Data:", response.data.result.data);

      if (response.data.code === 9220) {
        // No content
        setNoData(true);
        setData(null); // Ensure data is reset when no content
      } else if (response.data.result && response.data.result.data) {
        // Return the entire result.data object
        setData(response.data.result.data);
        setNoData(false);
      } else {
        // Unexpected data format
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    }
  }, [url]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  return { data, error, noData };
};

export default useFetchCustomAPI;
