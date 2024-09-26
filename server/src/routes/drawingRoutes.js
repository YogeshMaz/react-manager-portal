import express from "express";
import { fetchAddDrawings, fetchViewDrawings } from "../controllers/drawingController.js";

const router = express.Router();

router.get("/add_drawing", fetchAddDrawings);
router.get("/view_drawings", fetchViewDrawings);

export default router;
