import axios from "axios";
import fetchReportData from "../components/FetchReportAPIData.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
import { AppNames } from "../zohoAssets/AppLists.js";
import { ReportNameLists } from "../zohoAssets/ReportLists.js";

export const fetchPMLoginDetails = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email:", email, "Password:", password);

    // const appName = AppNames.PM;
    // const reportName = ReportNameLists.loginManagement.employeeDatabse;
    // const access_token = await getAccessToken();
    // const data = await fetchReportData(appName, reportName, access_token);

    const data = await axios.get("http://localhost:5000/getUsers");
    // console.log("Fetched data:", data.data);  // Log to verify structure

    const eData = data.data;  // Access all users, not just the first one
    const sanitizedEmail = email.trim().toLowerCase();

    // Find the user by comparing email and login pin
    const user = eData.find(
      (user) => 
        user.Email.trim().toLowerCase() === sanitizedEmail &&
        user['Login Pin'] === Number(password)  // Ensure Login Pin is a number
    );

    console.log("User found:", user.Email);  // Log if user was found

    if (user) {
      // Instead of updating .env, store the email in a global variable
      global.loggedInEmail = user?.Email;
      global.loggedInName = user?.Name;
      global.loggedInUserRole = user?.Department;
      global.loggedInUserProfile = user?.["Upload Photo"];
      global.loggedInUserId = user?.ID;

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
