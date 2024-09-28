import express from "express";
import {
  fetchCustomerRfqs,
  fetchOpenRfqs,
  fetchPostEvaluationRfqs,
  fetchOnHoldRfqs,
  fetchCancelledRfqs,
  fetchPartnerRfqResponse,
  fetchAddRfqs,
  addRfqRecords,
} from "../controllers/rfqController.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/customer_rfqs", fetchCustomerRfqs);
router.get("/rfq_dashboard/open_rfqs", fetchOpenRfqs);
router.get("/rfq_dashboard/post_evaluation_rfqs", fetchPostEvaluationRfqs);
router.get("/rfq_dashboard/on_hold_rfqs", fetchOnHoldRfqs);
router.get("/rfq_dashboard/cancelled_closed_rfqs", fetchCancelledRfqs);
router.get("/rfq_dashboard/add_rfqs", fetchAddRfqs);
router.get("/partner_rfq_responses", fetchPartnerRfqResponse);

// Define the route with file upload
// Handling multiple file uploads
router.post(
  "/add_rfq_record",
  upload.fields([
    { name: "drawingFile", maxCount: 1 }, // Handle drawing file
    { name: "partnerQuoteFile", maxCount: 1 }, // Handle partner quote file
  ]),
  addRfqRecords
);

export default router;
