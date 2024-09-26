import fetchReportCriteria from "../components/FetchReportCriteria.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
const pmEmail = process.env.PM_EMAIL;

import { AppNames } from "../../../client/src/components/zohoAssets/AppLists.js";
import { ReportNameLists } from "../../../client/src/components/zohoAssets/ReportLists.js";

/** Vendor POs **/
export const fetchVendorPOs = async (req, res) => {
  try {
    const appName = AppNames.PA;
    const reportName = ReportNameLists.purchaseManagement.viewVendorPos;
    const criteriaField = "Select_PM";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer RFQs" });
  }
};

/* Vendor Invoices */
export const fetchVendorInvoices = async (req, res) => {
  try {
    const appName = AppNames.PA;
    const reportName = ReportNameLists.purchaseManagement.viewVendorInvoices;
    const criteriaField = "Project_Details";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(appName, reportName, criteriaField, pmEmail, access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

/* Request View Payments */
export const fetchRequestViewPayments = async (req, res) => {
    try {
      const appName = AppNames.PAY;
      const reportName = ReportNameLists.purchaseManagement.viewPayments;
      const criteriaField = "Project_manager";
      const access_token = await getAccessToken();
      const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching open RFQs" });
    }
  };