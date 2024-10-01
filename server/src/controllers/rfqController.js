import axios from "axios";
import fetchReportCriteria from "../components/FetchReportCriteria.js";
import fetchCustomAPIData from "../components/FetchCustomAPI.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";

import submitRFQData from "../components/addReocrdAPI.js";
import { AppNames } from "../zohoAssets/AppLists.js";
import { ReportNameLists } from "../zohoAssets/ReportLists.js";

const pmEmail = process.env.PM_EMAIL;

/** Customer RFQs **/
export const fetchCustomerRfqs = async (req, res) => {
  try {
    const summaryResponse = await axios.get(
      "http://localhost:5000/api/summary/details"
    );
    const customerRfqIds =
      summaryResponse.data.result.data.rfq_summary_details.customer_rfq_ids;
    console.log("customer rfq ids", customerRfqIds);
    const appName = AppNames.RFQ;
    const reportName = ReportNameLists.rfqManagement.customerRfq;
    const criteriaField = "RFQ_Reference_Number";
    const access_token = await getAccessToken();
    const reportDataPromises = customerRfqIds.map(async (eachRfqId) => {
      const data = await fetchReportCriteria(
        appName,
        reportName,
        criteriaField,
        eachRfqId,
        access_token
      );
      return data.data;
      // return { data };
    });
    const allRfqData = await Promise.all(reportDataPromises);
    const finalData = {
      code: 3000,
      data: allRfqData,
    };
    res.json(finalData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer RFQs" });
  }
};

/* Open RFQs */
export const fetchOpenRfqs = async (req, res) => {
  try {
    const appName = AppNames.RFQ;
    const reportName = ReportNameLists.rfqManagement.rfqDashboard.openRfqs;
    const criteriaField = "PM_Email";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(
      appName,
      reportName,
      criteriaField,
      pmEmail,
      access_token
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

/* Post Evaluation RFQs */
export const fetchPostEvaluationRfqs = async (req, res) => {
  try {
    const appName = AppNames.RFQ;
    const reportName = ReportNameLists.rfqManagement.rfqDashboard.postRfqs;
    const criteriaField = "PM_Email";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(
      appName,
      reportName,
      criteriaField,
      pmEmail,
      access_token
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

/* On Hold RFQs */
export const fetchOnHoldRfqs = async (req, res) => {
  try {
    const appName = AppNames.RFQ;
    const reportName = ReportNameLists.rfqManagement.rfqDashboard.onHoldRfqs;
    const criteriaField = "PM_Email";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(
      appName,
      reportName,
      criteriaField,
      pmEmail,
      access_token
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

/* Closed/Cancelled RFQs */
export const fetchCancelledRfqs = async (req, res) => {
  try {
    const appName = AppNames.RFQ;
    const reportName = ReportNameLists.rfqManagement.rfqDashboard.cancelledRfqs;
    const criteriaField = "PM_Email";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(
      appName,
      reportName,
      criteriaField,
      pmEmail,
      access_token
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

/* Add RFQs */
// export const fetchAddRfqs = async (req, res) => {
//   try {
//     const appName = AppNames.PM;
//     const reportName = ReportNameLists.projectManagement.allProjectTracking;
//     const access_token = await getAccessToken();
//     const data = await fetchReportData(appName, reportName, access_token);
//     const projectNumbers = data.data.map((project) => ({ title: project.Project_Number }));
//     res.json({ data: projectNumbers });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching open RFQs" });
//   }
// };

/** Fetch Add RFQs datas (including Lookup fields) **/
export const fetchAddRfqs = async (req, res) => {
  try {
    // const appName = AppNames.RFQ;
    const ApiName = "AddRFQForm";
    const access_token = await getAccessToken();
    const data = await fetchCustomAPIData(ApiName, access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching add RFQs" });
  }
};

// export const addRfqRecords = async (req, res) => {
//   try {

//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching add RFQs" });
//   }
// };

export const addRfqRecords = async (req, res) => {
  try {
    // Access uploaded files
    const drawingFile = req.files["drawingFile"] ? req.files["drawingFile"][0] : null;
    const partnerQuoteFile = req.files["partnerQuoteFile"] ? req.files["partnerQuoteFile"][0] : null;

    // Access additional form fields from req.body
    const {
      projectNumber,
      customer,
      referenceNo,
      partDescription,
      targetPrice,
      rfqStatus,
      rfqStartDate,
      rfqEndDate,
      totalOrderValue,
      partnerCategory,
      allocateToPartner,
      totalCost,
      leadTime,
    } = req.body;

    // Get access token
    const access_token = await getAccessToken();

    // Format the RFQ start and end dates
    const formattedRfqStartDate = formatDate(rfqStartDate);
    const formattedRfqEndDate = formatDate(rfqEndDate);

    // Prepare the data for submission
    const data = {
      Project_Number1: projectNumber,
      Customer1: customer,
      RFQ_Reference_No: referenceNo,
      Part_Description: partDescription,
      Target_Price: targetPrice,
      RFQ_Status: rfqStatus,
      RFQ_Start_Date: formattedRfqStartDate,
      RFQ_End_Date: formattedRfqEndDate,
      Partner_Category: partnerCategory,
      Allocate_to_partner: allocateToPartner,
      Total_Order_Value: totalOrderValue,
      Total_Cost: totalCost,
      Lead_Time_in_Days: leadTime,
      Upload_Partner_Quote: partnerQuoteFile ? partnerQuoteFile.path : null, // Store the path of the uploaded file
      Upload_Drawing_File: drawingFile ? drawingFile.path : null, // Store the path of the uploaded file
    };

    // Submit RFQ data
    const responseData = await submitRFQData(access_token, data);

    // Log uploaded files (if any)
    if (drawingFile) {
      console.log("Drawing File:", drawingFile.path); // Logging the path of the drawing file
    }
    if (partnerQuoteFile) {
      console.log("Partner Quote File:", partnerQuoteFile.path); // Logging the path of the partner quote file
    }

    // Log the form fields
    console.log("Form Fields:", req.body);

    // Return a successful response
    res.json({
      message: "RFQ record added successfully",
      drawingFile: drawingFile ? drawingFile.path : null, // Return the path of the drawing file
      partnerQuoteFile: partnerQuoteFile ? partnerQuoteFile.path : null, // Return the path of the partner quote file
      data: responseData,
    });
  } catch (error) {
    console.error("Error adding RFQ record:", error);
    res.status(500).json({ message: "Error adding RFQ record", error: error.message });
  }
};


/** Partner RFQ Response **/
export const fetchPartnerRfqResponse = async (req, res) => {
  try {
    const appName = AppNames.RFQ;
    const reportName = ReportNameLists.rfqManagement.partnerRfqResponse;
    const criteriaField = "Manufacturing_RFQ_Form";
    const access_token = await getAccessToken();
    const data = await fetchReportCriteria(
      appName,
      reportName,
      criteriaField,
      pmEmail,
      access_token
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching open RFQs" });
  }
};

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "GMT",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-GB", options).replace(",", "");

  // Reformat the output to desired format
  return formattedDate
    .replace(/\//g, "-")
    .replace(/\s+/g, " ")
    .replace(/(\d{1,2}) (\w{3}) (\d{4}) (\d{2}:\d{2}:\d{2})/, "$1-$2-$3 $4");
}

// Example usage
const dateStr = "Tue, 01 Oct 2024 09:35:17 GMT";
const formatted = formatDate(dateStr);
console.log(formatted); // "01-Oct-2024 09:35:17"
