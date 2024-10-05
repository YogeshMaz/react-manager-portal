import fs from "fs";
import path from "path";
import axios from "axios";
import fetchReportData from "../components/FetchReportAPIData.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
import { AppNames } from "../zohoAssets/AppLists.js";
import { ReportNameLists } from "../zohoAssets/ReportLists.js";

export const fetchPMLoginDetails = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email:", email, "Password:", password);

    const appName = AppNames.PM;
    const reportName = ReportNameLists.projectManagement.pmLoginReport;
    const access_token = await getAccessToken();
    const data = await fetchReportData(appName, reportName, access_token);

    // Check if the provided email and password match any user in the data
    const user = data.data.find(
      (user) => user.Name.Email === email && user.PIN === password
    );

    if (user) {
      // Instead of updating .env, store the email in a global variable
      global.loggedInEmail = user.Name.Email;
      global.loggedInName = user.Name["Name.first_name"];
      // console.log("name", user.Name["Name.first_name"]);
      // console.log(`Logged in email set to: ${global.loggedInEmail}`);

      // Respond with a success message if login is successful
      return res
        .status(200)
        .json({
          code: 200,
          message: "Login successful",
          email: global.loggedInEmail,
          name: global.loggedInName
        });
    } else {
      return res
        .status(401)
        .json({ code: 401, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in fetchPMLoginDetails:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
