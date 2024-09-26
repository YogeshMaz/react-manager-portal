// import axios from 'axios';

// async function fetchReportData(access_token) {
//   try {
//     const response = await axios.get('https://creator.zoho.in/api/v2.1/arun.ramu_machinemaze/rfq-management/report/Customer_Portal_Report', {
//       headers: {
//         'Authorization': 'Zoho-oauthtoken ' + access_token,
//         'Cookie': 'ZCNEWLIVEUI=true; _zcsr_tmp=eec5b11f-1318-4647-966e-8ac6c7e73d3c; zalb_f8176abf63=a539d37ef14f6946f36de06c7a4375f2; zccpn=eec5b11f-1318-4647-966e-8ac6c7e73d3c'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(`Error fetching data: ${error.message}`);
//   }
// }

// export default fetchReportData;

import axios from "axios";

async function fetchReportData(appName, reportName, access_token) {
  try {
    const response = await axios.get(
      `https://creator.zoho.in/api/v2.1/arun.ramu_machinemaze/${appName}/report/${reportName}?max_records=1000`,
      {
        headers: {
          Authorization: "Zoho-oauthtoken " + access_token,
          Cookie:
            "ZCNEWLIVEUI=true; _zcsr_tmp=770e3305-945e-4584-bd6b-2662dfb99148; zalb_f8176abf63=824a990513397e205cf960357c59e7e0; zccpn=770e3305-945e-4584-bd6b-2662dfb99148",
          Accept: "application/json",
        },
      }
    );
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export default fetchReportData;
