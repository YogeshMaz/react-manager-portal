import express from "express";
import { fetchSummaryDetails } from "../controllers/summaryContoller.js";

const router = express.Router();

router.get("/details", fetchSummaryDetails);

export default router;
