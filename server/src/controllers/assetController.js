import fetchReportData from "../components/FetchReportAPIData.js";
import fetchReportCriteria from "../components/FetchReportCriteria.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
const pmEmail = process.env.PM_EMAIL;

import { AppNames } from "../../../client/src/components/zohoAssets/AppLists.js";
import { ReportNameLists } from "../../../client/src/components/zohoAssets/ReportLists.js";
import logger from "../../logger.js";

/** Add Assets **/
export const fetchAddAsset = async (req, res) => {
  try {
    const appName = AppNames.AM;
    const reportName = ReportNameLists.assetManagement.addAsset;
    const criteriaField = "Select_PM";
    const access_token = await getAccessToken();
    const data = await fetchReportData(appName, reportName, access_token);
    logger.info(`Request received at Add Assets`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message View Assets${error}`);
    res.status(500).json({ message: "Error fetching customer RFQs" });
  }
};

/* View Assets */
export const fetchViewAssets = async (req, res) => {
  try {
    const appName = AppNames.AM;
    const reportName = ReportNameLists.assetManagement.viewAssets;
    const access_token = await getAccessToken();
    const data = await fetchReportData(appName, reportName, access_token);
    logger.info(`Request received at View Assets`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message View Assets${error}`);
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

/* Asset Utilisation */
export const fetchAssestUtilisation = async (req, res) => {
    try {
      const appName = AppNames.AM;
      const reportName = ReportNameLists.assetManagement.assetUtilisation;
      const criteriaField = "Email_of_Project_Manager";
      const access_token = await getAccessToken();
      const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
      logger.info(`Request received at Asset Utilisation`);
      res.json(data);
    } catch (error) {
      logger.error(`Error message View Assets${error}`);
      res.status(500).json({ message: "Error fetching open RFQs" });
    }
  };