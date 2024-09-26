import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const useFetchReportById = (url, params) => {
  const [data, setData] = useState({}); // Changed to {} if expecting an object
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);

  const fetchReportData = useCallback(async () => {
    if (!params?.RecordID) return; // Early return if RecordID is not available

    try {
      const response = await Axios.get(`${url}?RecordID=${params.RecordID}`);
      console.log("Response data:", response.data);
      
      if (response.data.code === 9220) {
        setNoData(true);
        setData({}); // Reset data when no content
      } else if (response.data && response.data.data) {
        // Here, change to set the relevant data if necessary
        setData(response.data.data);
        setNoData(false);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again later.");
    }
  }, [url, params.RecordID]); // Depend on url and RecordID

  useEffect(() => {
    if (params && params.RecordID) {
      fetchReportData();
    }
  }, [fetchReportData]); // Trigger re-fetch when fetchReportData changes

  return { data, error, noData };
};

export default useFetchReportById;
