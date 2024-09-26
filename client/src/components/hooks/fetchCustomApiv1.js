// useFetchReportData.js
import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const useFetchCustomDataV1 = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);

  // Define fetchReportData with useCallback to memoize it
  const fetchReportData = useCallback(async () => {
    try {
      const response = await Axios.get(url);
      console.log("con", response.data);

      if (response.data.result.code === 9220) {
        // No content
        setNoData(true);
        setData([]); // Ensure data is reset when no content
      } else if (response.data.result && response.data.result.data) {
        // Data is an array
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
  }, [url]); // Dependency on URL

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]); // Include fetchReportData in the dependency array

  return { data, error, noData };
};

export default useFetchCustomDataV1;
