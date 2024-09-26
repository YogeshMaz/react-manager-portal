import express from "express";
import { fetchAddAsset, fetchViewAssets, fetchAssestUtilisation } from "../controllers/assetController.js";

const router = express.Router();

router.get("/add_asset", fetchAddAsset);
router.get("/view_assets", fetchViewAssets);
router.get("/asset_utilisation", fetchAssestUtilisation);

export default router;
