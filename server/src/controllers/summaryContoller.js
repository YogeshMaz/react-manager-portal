import fetchCustomAPIDataCriteria from "../components/FetchCustomAPICriteria.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
const pmEmail = process.env.PM_EMAIL;

/** Summary/Dashboard **/
export const fetchSummaryDetails = async (req, res) => {
  try {
    // const appName = AppNames.RFQ;
    const ApiName = "GetPMSummaryDetails";
    const criteria = "email";
    const access_token = await getAccessToken();
    const data = await fetchCustomAPIDataCriteria(ApiName, criteria, pmEmail, access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer RFQs" });
  }
};
