import axios from 'axios';

async function submitRFQData(access_token, data) {
  const requestData = { data };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://creator.zoho.in/api/v2.1/arun.ramu_machinemaze/rfq-management/form/RFQ_Form_Testing",
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
      "Content-Type": "application/json",
      Cookie: "",
    },
    data: requestData,
  };

  try {
    const response = await axios.request(config);
    console.log("RFQ Submission Response:", JSON.stringify(response.data));
    return response.data; // Return the response data for further processing if needed
  } catch (error) {
    console.error(`Error submitting RFQ data: ${error.message}`);
    throw new Error(`Failed to submit RFQ data: ${error.message}`); // Throw error to handle it in addRfqRecords
  }
}

export default submitRFQData; // Export the function for use in other modules