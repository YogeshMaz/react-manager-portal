import fetchReportData from "../components/FetchReportAPIData.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
const pmEmail = process.env.PM_EMAIL;

/** Add Visit **/
export const fetchAddVisit = async (req, res) => {
  try {
    const appName = "asset-management";
    const reportName = "Visit_Log";
    const access_token = await getAccessToken();
    const data = await fetchReportData(appName, reportName, access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer RFQs" });
  }
};

/* View Visits */
export const fetchViewVisits = async (req, res) => {
  try {
    const appName = "asset-management";
    const reportName = "Visit_Log_Report";
    const access_token = await getAccessToken();
    const data = await fetchReportData(appName, reportName, access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};