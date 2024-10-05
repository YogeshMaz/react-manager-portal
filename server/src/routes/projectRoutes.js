// src/routes/projectRoutes.js
import express from "express";
import {
    fetchOpenProjects,
    fetchCompletedProjects,
    fetchOnHoldProjects,
    fetchCancelledProjects,
    fetchViewProjects,
    fetchUpcomingDeliveries,
    fetchQualityCheck,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/project_dashboard/open_projects", fetchOpenProjects);
router.get("/project_dashboard/completed_projects", fetchCompletedProjects);
router.get("/project_dashboard/on_hold_projects", fetchOnHoldProjects);
router.get("/project_dashboard/cancelled_projects", fetchCancelledProjects);
router.get("/project_dashboard/view_projects", fetchViewProjects);
router.get("/upcoming_deliveries", fetchUpcomingDeliveries);
router.get("/quality_check", fetchQualityCheck);
// router.post("/login_details", fetchPMLoginDetails);

export default router;
