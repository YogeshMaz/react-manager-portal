// useFetchReportData.js
import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const useFetchReportDataCollection = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);

  // Define fetchReportData with useCallback to memoize it
  const fetchReportData = useCallback(async () => {
    try {
      const response = await Axios.get(url);

      if (response.data.code === 9220) {
        // No content
        setNoData(true);
        setData([]); // Ensure data is reset when no content
      } else if (response.data && Array.isArray(response.data.data.data)) {
        // Data is an array
        setData(response.data.data.data);
        setNoData(false);
      } else {
        // Unexpected data format
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    }
  }, [url]); // Dependency on URL

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]); // Include fetchReportData in the dependency array

  return { data, error, noData };
};

export default useFetchReportDataCollection;
