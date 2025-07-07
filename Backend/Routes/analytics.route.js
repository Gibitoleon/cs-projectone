const express = require("express");
const AnalyticsController = require("../Controllers/analytics.controller");
const VerificationGuard = require("../Middleware/Verification.guard");
const router = express.Router();

router.get(
  "/getanalytics",
  VerificationGuard.authorizeAdmin,
  AnalyticsController.GetAnalytics
);

module.exports = router;
