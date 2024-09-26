import axios from "axios";

async function fetchCustomAPIDataCriteria(apiName, fieldName, pmEmail, access_token) {
  try {
    // Construct the URL
    const url = `https://www.zohoapis.in/creator/custom/arun.ramu_machinemaze/${apiName}?${fieldName}=${encodeURIComponent(pmEmail)}`;

    // Make the API request
    const response = await axios.get(url, {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
        Accept: "application/json",
      },
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Log and throw the error
    console.error("Error details:", error.response ? error.response.data : error.message);
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export default fetchCustomAPIDataCriteria;
