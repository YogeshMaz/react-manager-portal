import fs from 'fs';
import path from 'path';
import axios from 'axios';
import fetchReportData from "../components/FetchReportAPIData.js";
import getAccessToken from "../accessToken/checkAuthExpiration.js";
import { AppNames } from '../zohoAssets/AppLists.js';
import { ReportNameLists } from '../zohoAssets/ReportLists.js';
import { exec } from 'child_process'; // Import exec to run shell commands

export const fetchPMLoginDetails = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email:", email, "Password:", password);

    const appName = AppNames.PM;
    const reportName = ReportNameLists.projectManagement.pmLoginReport;
    const access_token = await getAccessToken();
    const data = await fetchReportData(appName, reportName, access_token);

    // Check if the provided email and password match any user in the data
    const user = data.data.find(user => user.Name.Email === email && user.PIN === password);

    if (user) {
      // Update the .env file asynchronously
      await updateEnvVariable('PM_EMAIL', user.Name.Email);

      // Make the external HTTP call only if login is successful
      try {
        const response = await axios.get("http://localhost:5000/api/summary/details");
        console.log("Summary details fetched successfully", response.data);
      } catch (err) {
        console.error("Error fetching summary details:", err.message);
        return res.status(500).json({ message: "Failed to fetch summary details" });
      }

      // Restart the server using pm2
      restartServer();

      // Respond with a success message if login is successful
      return res.status(200).json({ code: 200, message: "Login successful" });
    } else {
      return res.status(401).json({ code: 401, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in fetchPMLoginDetails:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update .env variable using promises for better async control
const updateEnvVariable = async (key, value) => {
  try {
    const envFilePath = path.resolve(process.cwd(), '.env');
    let data = await fs.promises.readFile(envFilePath, 'utf8');

    // Update the variable
    const newEnvData = data.split('\n').map(line => {
      if (line.startsWith(key)) {
        return `${key}=${value}`; // Update the line with the new value
      }
      return line; // Keep the line unchanged
    }).join('\n');

    // Write the updated data back to the .env file
    await fs.promises.writeFile(envFilePath, newEnvData, 'utf8');
    console.log(`${key} updated to ${value} in .env file.`);
  } catch (error) {
    console.error("Error updating .env file:", error.message);
    throw new Error("Failed to update .env file");
  }
};

// Function to restart the server using pm2
const restartServer = () => {
    exec('pm2 restart all', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting server with pm2: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`pm2 stderr: ${stderr}`);
        return;
      }
      console.log(`pm2 restart successful: ${stdout}`);
    });
  };
  
