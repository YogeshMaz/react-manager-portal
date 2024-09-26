import express from "express";
import { fetchAddVisit, fetchViewVisits } from "../controllers/visitContoller.js";

const router = express.Router();

router.get("/add_visit", fetchAddVisit);
router.get("/view_visits", fetchViewVisits);

export default router;
