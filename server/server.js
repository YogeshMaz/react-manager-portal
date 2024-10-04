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

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

getAccessToken();
// Token Management
setInterval(getAccessToken, 3600000);

// Routes
app.get("/api/userInfos", (req, res) => {
    res.send(process.env.PM_EMAIL);
});

// app.get('/api/userInfos', (req, res) => {
//   const pmEmail = req.session.pmEmail; // Accessing stored email
//   // Now you can use pmEmail wherever you need
//   res.send(pmEmail);
// });

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
