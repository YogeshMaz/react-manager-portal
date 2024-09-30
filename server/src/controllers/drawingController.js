import fetchReportCriteria from "../components/FetchReportCriteria.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
const pmEmail = process.env.PM_EMAIL;
import {AppNames} from "../zohoAssets/AppLists.js";
import {ReportNameLists} from "../zohoAssets/ReportLists.js";
import logger from "../../logger.js";

/** Add Drawings **/
export const fetchAddDrawings = async (req, res) => {
  try {
    const appName = AppNames.DV;
    const reportName = ReportNameLists.drawingVersion.addDrawing;
    const criteriaField = "Select_PM";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    logger.info(`Request received at Add Drawing`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message Add Drawing${error}`);
    res.status(500).json({ message: "Error fetching customer RFQs" });
  }
};

/* View Drawings */
export const fetchViewDrawings = async (req, res) => {
  try {
    const appName = AppNames.DV;
    const reportName = ReportNameLists.drawingVersion.viewDrawings;
    const criteriaField = "Email_of_Project_Manager";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    logger.info(`Request received at View Drawings`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message View Drawings${error}`);
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};