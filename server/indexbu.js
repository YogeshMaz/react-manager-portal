import express from "express";
import cors from "cors";
import fs from 'fs';
import path from 'path';
import generateAccessToken from './src/accessToken/generateToken.js';
import fetchData from "../server/src/components/FetchAPIData.js";
import fetchReportDataByID from "../server/src/components/FetchReportAPIDataByID.js";
import fetchReportData from "../server/src/components/FetchReportAPIData.js";
import fetchReportCriteria from "../server/src/components/FetchReportCriteria.js";
import getAccessToken from './src/accessToken/checkAuthExpiration.js';
const port = process.env.PORT || 5000;
const pmEmail = process.env.PM_EMAIL;
// const access_token = "1000.e5738948ddfd7104c58847cecec92315.81288ea2e200a7c215c5765ceaca86cb";

const TOKEN_FILE_PATH = path.resolve('token.json'); 
const tokenData = JSON.parse(fs.readFileSync(TOKEN_FILE_PATH, 'utf8'));
const access_token = tokenData.access_token;
  

const app = express();
app.use(cors());

/**
 * Machine Maze Operations Portal
 * RFQ Management [Customer RFQs, RFQ Dashboard, Partner RFQ Response]
 * Project Management [Project Dashboard, Upcoming deliveries, Quality check]
 * Purchase [View Vendor POs, View Vendor Invoices, Request/View Payments]
 * Drawing Version [Add Drawings, View Drawings]
 * Assests [Add Assets, View Assets, Asset Utilisation]
 * Visits [Add Visits, View Visits]
 **/
setInterval(getAccessToken, 3600000);
// Initial token fetch
const initacc = getAccessToken();
console.log("initacc", initacc);

app.get("/api/userInfos", (req, res) => {
  res.send(pmEmail);
});

app.get("/api/getTokenData", async (req, res) => {
  try {
    const token = await getAccessToken();
    res.status(200).json(token); 
  } catch (error) {
    console.error("Error fetching token data:", error.message);
    res.status(500).send("Error fetching token data"); 
  }
});


/** Module 1 - RFQ Management */
/** Customer RFQs **/
app.get("/api/rfq_management/customer_rfqs", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = 'rfq-management';
    const reportName = 'Customer_Upload_RFQ_Internal_View';
    const data = await fetchReportData(appName, reportName, access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** RFQ Dashboard **/
/* Open RFQs */
app.get("/api/rfq_management/rfq_dashboard/open_rfqs", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "rfq-management";
    const reportName = "MachineMaze_Manager_RFQ_Report";
    const criteriaField = "PM_Email";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/* Post Evaluation RFQs */
app.get("/api/rfq_management/rfq_dashboard/post_evaluation_rfqs", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "rfq-management";
    const reportName = "MM_Manager_Post_Evaluation_Bids";
    const criteriaField = "PM_Email";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/* On Hold RFQs */
app.get("/api/rfq_management/rfq_dashboard/on_hold_rfqs", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "rfq-management";
    const reportName = "Project_Manager_Onhold_Bids";
    const criteriaField = "PM_Email";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/* Closed/Cancelled RFQs */
app.get("/api/rfq_management/rfq_dashboard/cancelled_closed_rfqs", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "rfq-management";
    const reportName = "MachineMaze_Manager_Closed_Bids_Report";
    const criteriaField = "PM_Email";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** Partner RFQ Response **/
app.get("/api/rfq_management/partner_rfq_response", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "rfq-management";
    const reportName = "RFQ_Online_Responses_Report_For_MM_Manager";
    const criteriaField = "Manufacturing_RFQ_Form";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** Module 2 - Project Management **/
/** Project Dashboard **/
/* Open Projects */
app.get("/api/project_management/project_dashboard/open_projects", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "machinemaze-project-management";
    const reportName = "MM_Manager_Open_Projects";
    const criteriaField = "Email_MachineMaze";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/* Completed Projects */
app.get("/api/project_management/project_dashboard/completed_projects", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "machinemaze-project-management";
    const reportName = "MM_Manager_Completed_Projects";
    const criteriaField = "Email_MachineMaze";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/* On Hold Projects */
app.get("/api/project_management/project_dashboard/on_hold_projects", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "machinemaze-project-management";
    const reportName = "MM_Manager_Onhold_Projects";
    const criteriaField = "Email_MachineMaze";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/* Cancelled Projects */
app.get("/api/project_management/project_dashboard/cancelled_projects", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "machinemaze-project-management";
    const reportName = "MM_Manager_Cancelled_Projects";
    const criteriaField = "Email_MachineMaze";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** Upcoming Deliveries **/
app.get("/api/project_management/project_dashboard/upcoming_deliveries", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "machinemaze-project-management";
    const reportName = "Delivery_Schedule_Calender";
    const criteriaField = "Machine_Maze_Project_Tracking_ID.Email_MachineMaze";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** Quality Check **/
app.get("/api/project_management/project_dashboard/quality_check", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "machinemaze-project-management";
    const reportName = "All_Quality_Controls";
    const criteriaField = "Machine_Maze_Project_Tracking.Email_MachineMaze";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** Module 3 - Purchase **/
/** View Vendor PO **/
app.get("/api/project_management/purchase/vendor_pos", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "purchase-application";
    const reportName = "Approved_POs";
    const criteriaField = "Select_PM";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** View Vendor Invoices **/
app.get("/api/project_management/purchase/vendor_invoices", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "purchase-application";
    const reportName = "All_Invoices";
    const criteriaField = "Project_Details";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** Request/View Payments **/
app.get("/api/project_management/purchase/req_view_payments", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "payments";
    const reportName = "Payment_Request_Status";
    const criteriaField = "Project_manager";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** Module 4 - Drawings **/
/** Add Drawings **/
app.get("/api/project_management/purchase/add_drawings", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "purchase-application";
    const reportName = "Approved_POs";
    const criteriaField = "Select_PM";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

/** View Drawings **/
app.get("/api/project_management/purchase/view_drawings", async (req, res) => {
  try {
    // console.log('Access token:', access_token);
    const appName = "drawing-version-control";
    const reportName = "All_Invoices";
    const criteriaField = "Project_Details";
    const data = await fetchReportCriteria(appName,reportName,criteriaField,pmEmail,access_token);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

// app.get('/api/project_management/project_dashboard', async (req, res) => {
//   try {
//     const proj_numbers = [
//       "MM00318", "MM00327", "MM00334", "MM00482", "MM00483", "MM00509", 
//       "MM00539", "MM00540", "MM00541", "MM00542", "MM00578", "MM00579", 
//       "MM00585", "MM00604", "MM00605", "MM00606", "MM00607", "MM00637", 
//       "MM00638", "MM00656", "MM00662", "MM00663", "MM00664", "MM00672", 
//       "MM00674", "MM00708", "MM00709", "MM00719", "MM00733", "MM00734", 
//       "MM00745", "MM00746"
//     ];
    
//     const appName = "machinemaze-project-management";
//     const reportName = "MM_Manager_Open_Projects";
//     const criteriaField = "Project_Number";

//     // Create an array of promises for fetching data
//     const dataPromises = proj_numbers.map(projNumber =>
//       fetchReportCriteria(appName, reportName, criteriaField, "MM00318", access_token)
//     );

//     // Wait for all promises to resolve
//     const dataArray = await Promise.all(dataPromises);

//     // Filter out null values from the array
//     const validData = dataArray.filter(data => data !== null);

//     // Send the combined data as the response
//     res.json(validData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send(`Error fetching data: ${error.message}`);
//   }
// });

// API endpoint to fetch data Summary Data's
// app.get("/api/data", async (req, res) => {
//   try {
//     // console.log('Access token:', access_token);
//     const reportName = "FetchSummaryDetails";
//     const data = await fetchData(access_token, reportName, userEmail);
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Error fetching data");
//   }
// });

// app.get("/api/projectData", async (req, res) => {
//   try {
//     // console.log('Access token:', access_token);
//     const reportName = "fetchProjectDashboardDetails";
//     const data = await fetchData(access_token, reportName, userEmail);
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Error fetching data");
//   }
// });

// app.get("/api/deliveryScheduleData", async (req, res) => {
//   try {
//     // console.log('Access token:', access_token);
//     const reportName = "FetchDeliveryScheduleDetails";
//     const data = await fetchData(access_token, reportName, userEmail);
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Error fetching data");
//   }
// });

// app.get("/api/yourPartnerData", async (req, res) => {
//   try {
//     // console.log('Access token:', access_token);
//     const reportName = "getFetchYourPartnerDetails";
//     const data = await fetchData(access_token, reportName, userEmail);
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).send("Error fetching data");
//   }
// });

// good practice
//   const data = await fetchReportData(process.env.ZOHO_ACCESS_TOKEN, appName, reportName);

// const customer_rfq_ids = [
//   88342000003173396,
//   88342000003222447,
//   88342000005454069,
//   88342000006675016,
//   88342000009342415
// ];
// app.get('/api/rfq_management/customer_rfqs', async (req, res) => {
//   try {
//     const appName = 'rfq-management';
//     const reportName = 'Customer_Upload_RFQ_Internal_View';

//     const dataPromises = customer_rfq_ids.map((eachCustRfqId) =>
//       fetchReportDataByID(appName, reportName, eachCustRfqId, access_token)
//     );

//     const dataArray = await Promise.all(dataPromises);

//     // Filter out null values from the array
//     const validData = dataArray.filter(data => data !== null);

//     res.json(validData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send(`Error fetching data: ${error.message}`);
//   }
// });


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong',
  });
});


app.listen(5000, () => console.log("App is running.."));
