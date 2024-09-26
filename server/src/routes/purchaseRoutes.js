import express from "express";
import { fetchVendorPOs, fetchVendorInvoices, fetchRequestViewPayments } from "../controllers/purchaseController.js";

const router = express.Router();

router.get("/vendor_pos", fetchVendorPOs);
router.get("/vendor_invoices", fetchVendorInvoices);
router.get("/req_view_payments", fetchRequestViewPayments);

export default router;
