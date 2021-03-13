const express = require("express");
const complaintsController = require("../controllers/complaintsController");
const router = express.Router();
const { identifyUser } = require("../middleware/authMiddleware");

router.get("/", identifyUser, complaintsController.getComplaints);
router.get("/:id", identifyUser, complaintsController.getComplaint);
router.put(
  "/:id/update",
  identifyUser,
  complaintsController.changeComplaintStatus
);
router.post("/create", identifyUser, complaintsController.createComplaint);

module.exports = router;
