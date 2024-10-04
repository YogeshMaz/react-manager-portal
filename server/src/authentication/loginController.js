export const fetchPMLoginDetails = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Email:", email, "Password:", password);
  
      const appName = AppNames.PM;
      const reportName = ReportNameLists.projectManagement.pmLoginReport;
      const access_token = await getAccessToken();
      const data = await fetchReportData(appName, reportName, access_token);
  
      // Check if the provided email and password match any user in the data
      const user = data.data.find(user => user.Name.Email === email && user.PIN === password); // Use find for better readability
  
      if (user) {
        // If a user is found, respond with success
        return res.status(200).json({ code: 200, message: "Login successful" });
      } else {
        // If no user was found, respond with invalid credentials
        return res.status(401).json({ code: 401, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error in fetchPMLoginDetails:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };