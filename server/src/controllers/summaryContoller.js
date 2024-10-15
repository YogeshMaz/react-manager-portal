// import fetchCustomAPIDataCriteria from "../components/FetchCustomAPICriteria.js";
import fetchReportCriteria from "../components/FetchReportCriteria.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";

import { AppNames } from "../zohoAssets/AppLists.js";
import { ReportNameLists } from "../zohoAssets/ReportLists.js";
// const pmEmail = process.env.PM_EMAIL;

/** Summary/Dashboard **/
export const fetchSummaryDetails = async (req, res) => {
  try {
    // const appName = AppNames.RFQ;
    // const ApiName = "GetPMSummaryDetails";
    // const criteria = "email";
    // const access_token = await getAccessToken();
    // const data = await fetchCustomAPIDataCriteria(ApiName, criteria, global.loggedInEmail, access_token);
    // res.json(data);

    const appName = AppNames.PM;
    const reportName = ReportNameLists.summaryManagement.summaryDetails;
    const criteriaField = "PM_Email";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(
      appName,
      reportName,
      criteriaField,
      global.loggedInEmail.trim(),
      access_token
    );
    console.log("email", global.loggedInEmail);
    res.json(data);

  } catch (error) {
    res.status(500).json({ message: "Error fetching customer RFQs" });
  }
};
