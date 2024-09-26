import express from "express";
import {
  fetchCustomerRfqs,
  fetchOpenRfqs,
  fetchPostEvaluationRfqs,
  fetchOnHoldRfqs,
  fetchCancelledRfqs,
  fetchPartnerRfqResponse,
  fetchAddRfqs,
} from "../controllers/rfqController.js";

const router = express.Router();

router.get("/customer_rfqs", fetchCustomerRfqs);
router.get("/rfq_dashboard/open_rfqs", fetchOpenRfqs);
router.get("/rfq_dashboard/post_evaluation_rfqs", fetchPostEvaluationRfqs);
router.get("/rfq_dashboard/on_hold_rfqs", fetchOnHoldRfqs);
router.get("/rfq_dashboard/cancelled_closed_rfqs", fetchCancelledRfqs);
router.get("/rfq_dashboard/add_rfqs", fetchAddRfqs);
router.get("/partner_rfq_responses", fetchPartnerRfqResponse);

export default router;
