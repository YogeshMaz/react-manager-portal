import fetchReportCriteria from "../components/FetchReportCriteria.js";
import fetchReportDataByID from "../components/FetchReportAPIDataByID.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
const pmEmail = process.env.PM_EMAIL;

import { AppNames } from "../../../client/src/components/zohoAssets/AppLists.js";
import { ReportNameLists } from "../../../client/src/components/zohoAssets/ReportLists.js";
import logger from "../../logger.js";

/* Open Projects */
export const fetchOpenProjects = async (req, res) => {
  try {
    const appName = AppNames.PM;
    const reportName = ReportNameLists.projectManagement.projectDashboard.openProjects;
    const criteriaField = "Email_MachineMaze";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    logger.info(`Request received at Open Projects`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message Open Projects${error}`);
    res.status(500).json({ message: "Error fetching Open Projects" });
  }
};

/* Completed Projects */
export const fetchCompletedProjects = async (req, res) => {
  try {
    const appName = AppNames.PM;
    const reportName = ReportNameLists.projectManagement.projectDashboard.productionProjects;
    const criteriaField = "Email_MachineMaze";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    logger.info(`Request received at Completed Projects`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message Completed Projects${error}`);
    res.status(500).json({ message: "Error fetching Completed Projects" });
  }
};

/* OnHold Projects */
export const fetchOnHoldProjects = async (req, res) => {
    try {
      const appName = AppNames.PM;
      const reportName = ReportNameLists.projectManagement.projectDashboard.onHoldProjects;
        const criteriaField = "Email_MachineMaze";
        const access_token = await getAccessToken();
        const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
        logger.info(`Request received at OnHold Projects`);
      res.json(data);
    } catch (error) {
      logger.error(`Error message OnHold Projects${error}`);
      res.status(500).json({ message: "Error fetching open RFQs" });
    }
  };

/* Cancelled Projects */
export const fetchCancelledProjects = async (req, res) => {
  try {
    const appName = AppNames.PM;
    const reportName = ReportNameLists.projectManagement.projectDashboard.cancelledProjects;
    const criteriaField = "Email_MachineMaze";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    logger.info(`Request received at Cancelled Projects`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message Cancelled Projects${error}`);
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

/* View Projects */
export const fetchViewProjects = async (req, res) => {
  try {
    const { RecordID } = req.query; 
    if (!RecordID) {
      return res.status(400).json({ message: "RecordID is required" });
    }
    
    const appName = AppNames.PM;
    const reportName = ReportNameLists.projectManagement.allProjectTracking;
    const access_token = await getAccessToken();
    const data = await fetchReportDataByID(appName, reportName, RecordID, access_token);
    logger.info(`Request received at View Projects`);
    if (!data) {
      return res.status(404).json({ message: "No data found for the provided RecordID" });
    }
    res.json(data); 
  } catch (error) {
    logger.error(`Error message View Projects${error}`);
    console.error("Error fetching view projects:", error); 
    res.status(500).json({ message: "Error fetching open RFQs", error: error.message });
}
};


/** Upcoming Deliveries **/
export const fetchUpcomingDeliveries = async (req, res) => {
  try {
    const appName = AppNames.PM;
    const reportName = ReportNameLists.projectManagement.upcomingDeliveries;
    const criteriaField = "Machine_Maze_Project_Tracking_ID.Email_MachineMaze";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    logger.info(`Request received at Upcoming Projects`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message Upcoming Deliveries${error}`);
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

/** Quality Check **/
export const fetchQualityCheck = async (req, res) => {
  try {
    const appName = AppNames.PM;
    const reportName = ReportNameLists.projectManagement.qualityCheck;
    const criteriaField = "Machine_Maze_Project_Tracking.Email_MachineMaze";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    logger.info(`Request received at Quality Check`);
    res.json(data);
  } catch (error) {
    logger.error(`Error message Quality Check${error}`);
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};
