import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
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
app.use(morgan('dev'));
app.use(express.json());

// Call the getAccessToken function initially and set to refresh every hour
getAccessToken();
setInterval(getAccessToken, 3600000);

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
      ID: global.loggedInUserId
    };
  
    if (data.email || data.name) {
      res.json(data);
    } else {
      res.status(404).json({ message: "No data logged in." });
    }
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
