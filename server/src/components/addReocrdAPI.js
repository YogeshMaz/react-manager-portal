import axios from 'axios';

async function submitRFQData(access_token, data) {
  const requestData = {
    data: {
      RFQ_Reference_No: data.RFQ_Reference_No,
      RFQ_Status: data.RFQ_Status,
      RFQ_Start_Date: data.RFQ_Start_Date,
      RFQ_End_Date: data.RFQ_End_Date,
      Target_Price: data.Target_Price,
      Total_Order_Value: data.Total_Order_Value,
      Allocate_to_partner: data.Allocate_to_partner,
      Lead_Time_in_Days: data.Lead_Time_in_Days,
      Total_Cost: data.Total_Cost
    }
  };

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://creator.zoho.in/api/v2.1/arun.ramu_machinemaze/rfq-management/form/RFQ_Form_Testing',
    headers: { 
      'Authorization': `Zoho-oauthtoken ${access_token}`, 
      'Content-Type': 'application/json', 
      'Cookie': ''
    },
    data: requestData
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
