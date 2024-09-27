import express from "express";
import {
  fetchCustomerRfqs,
  fetchOpenRfqs,
  fetchPostEvaluationRfqs,
  fetchOnHoldRfqs,
  fetchCancelledRfqs,
  fetchPartnerRfqResponse,
  fetchAddRfqs,
  addRfqRecords
} from "../controllers/rfqController.js";

import multer from "multer";

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });


// // Configure multer storage options if needed
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Directory to save files
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Keep original file name
//   },
// });

// const upload = multer({ storage });

const router = express.Router();

router.get("/customer_rfqs", fetchCustomerRfqs);
router.get("/rfq_dashboard/open_rfqs", fetchOpenRfqs);
router.get("/rfq_dashboard/post_evaluation_rfqs", fetchPostEvaluationRfqs);
router.get("/rfq_dashboard/on_hold_rfqs", fetchOnHoldRfqs);
router.get("/rfq_dashboard/cancelled_closed_rfqs", fetchCancelledRfqs);
router.get("/rfq_dashboard/add_rfqs", fetchAddRfqs);
router.get("/partner_rfq_responses", fetchPartnerRfqResponse);

// Define the route with file upload
router.post('/add_rfq_record', upload.array('files'), addRfqRecords);


export default router;
