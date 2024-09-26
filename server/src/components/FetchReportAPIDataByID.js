import axios from 'axios';

async function fetchReportDataByID(appName, reportName, RecordID, access_token) {
  try {
    const response = await axios.get(
      `https://creator.zoho.in/api/v2.1/arun.ramu_machinemaze/${appName}/report/${reportName}/${RecordID}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
          Accept: 'application/json',
        },
      }
    );

    if (response.status === 204) {
      // No content
      console.warn(`No records found for Record ID ${RecordID}.`);
      return "No records found";
    }

    // Check if the data is empty or not
    if (response.data && (Array.isArray(response.data.data) ? response.data.data.length === 0 : !response.data.data)) {
      console.warn(`No data available for Record ID ${RecordID}.`);
      return "No records found";
    }

    return response.data;

  } catch (error) {
    if (error.response) {
      let err = "";
      // Check for specific error codes and messages
      if (error.response.status === 400 && error.response.data.code === 9220) {
        console.warn(`Report for Record ID ${RecordID} is empty.`);
        return "No records found";
      } else {
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
        console.error('Error Response Headers:', error.response.headers);
      }
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }

    // Return a message for the error case
    return "Error fetching data. Please try again later.";
  }
}

export default fetchReportDataByID;
