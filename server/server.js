import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import summaryRoutes from "./src/routes/summaryRoutes.js";
import rfqRoutes from "./src/routes/rfqRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import purchaseRoutes from "./src/routes/purchaseRoutes.js";
import drawingRoutes from "./src/routes/drawingRoutes.js";
import assetRoutes from "./src/routes/assetRoutes.js";
import visitRoutes from "./src/routes/visitRoutes.js";
import getAccessToken from "./src/accessToken/checkAuthExpiration.js";
import { fetchPMLoginDetails } from "./src/authentication/loginController.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Call the getAccessToken function initially and set to refresh every hour
getAccessToken();
setInterval(getAccessToken, 3600000);

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, "uploads");

// Serve static files from the uploads directory
app.use("/uploaded", express.static(UPLOAD_DIR));

app.get("/api/uploaded-files", (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) {
      console.error("Error reading upload directory:", err);
      return res
        .status(500)
        .json({ message: "Error reading upload directory" });
    }

    // Construct URLs for each file
    const uploadedFiles = files.map((file) => ({
      name: file,
      url: `${req.protocol}://${req.get("host")}/uploaded/${file}`, // Create the full URL
    }));

    // Respond with the list of files and their URLs
    res.json(uploadedFiles);
  });
});

// Initialize global variable for logged in email
global.loggedInEmail = null;
global.loggedInName = null;
global.loggedInUserRole = null;
global.loggedInUserProfile = null;
global.loggedInUserId = null;

// Login Route
app.post("/api/login_details", fetchPMLoginDetails);

// Route to get the logged in email
app.get("/api/userInfos", (req, res) => {
  const data = {
    email: global.loggedInEmail,
    name: global.loggedInName,
    role: global.loggedInUserRole,
    profile: global.loggedInUserProfile,
    ID: global.loggedInUserId,
  };

  if (data.email || data.name) {
    res.json(data);
  } else {
    res.status(404).json({ message: "No data logged in." });
  }
});

app.use("/api/healthcheck", (_, res) => {
  res.json({ status: "Ok" });
});

// Other Routes
app.use("/api/summary", summaryRoutes);
app.use("/api/rfq_management", rfqRoutes);
app.use("/api/project_management", projectRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/drawing", drawingRoutes);
app.use("/api/asset", assetRoutes);
app.use("/api/visit", visitRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
