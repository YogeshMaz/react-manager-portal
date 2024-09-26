import axios from 'axios';

async function fetchReportCriteria(appName, reportName, criteriaField, criteriaValue, access_token) {
  try {
    const response = await axios.get(
      `https://creator.zoho.in/api/v2.1/arun.ramu_machinemaze/${appName}/report/${reportName}?${criteriaField}=${criteriaValue}&max_records=1000`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      // Check for specific error codes and messages
      // console.log("@@", error.response.data);
      if (error.response.data.code === 9220) {
        console.warn(`Report for Record ID ${criteriaValue} is empty.`);
        // Return null or an empty object if the report is empty
        return error.response.data;
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

    // Return null or handle the error according to your use case
    return null;
  }
}

export default fetchReportCriteria;

// import axios from 'axios';

// async function fetchReportCriteria(appName, reportName, criteriaField, criteriaValue, access_token) {
//   let allData = [];
//   let pageIndex = 1;
//   let hasMoreData = true;
//   const limit = 200; // Set the maximum number of records per page (as per Zoho's limits)

//   try {
//     while (hasMoreData) {
//       const response = await axios.get(
//         `https://creator.zoho.in/api/v2.1/arun.ramu_machinemaze/${appName}/report/${reportName}?${criteriaField}=${criteriaValue}&from=${(pageIndex - 1) * limit + 1}&limit=${limit}`,
//         {
//           headers: {
//             Authorization: `Zoho-oauthtoken ${access_token}`,
//             Accept: 'application/json',
//           },
//         }
//       );

//       const data = response.data.data;

//       // Append current page data to the allData array
//       allData = allData.concat(data);

//       // If the returned data is less than the limit, we've reached the last page
//       if (data.length < limit) {
//         hasMoreData = false;
//       } else {
//         pageIndex += 1; // Move to the next page
//       }
//     }

//     return allData; // Return all fetched data
//   } catch (error) {
//     if (error.response) {
//       // Handle specific error codes and messages
//       if (error.response.data.code === 9220) {
//         console.warn(`Report for Record ID ${criteriaValue} is empty.`);
//         return error.response.data;
//       } else {
//         console.error('Error Response Data:', error.response.data);
//         console.error('Error Response Status:', error.response.status);
//         console.error('Error Response Headers:', error.response.headers);
//       }
//     } else if (error.request) {
//       console.error('Error Request:', error.request);
//     } else {
//       console.error('Error Message:', error.message);
//     }

//     // Return null or handle the error according to your use case
//     return null;
//   }
// }

// export default fetchReportCriteria;

