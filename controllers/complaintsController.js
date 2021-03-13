const complaintService = require("../services/complaintService");

const complaintsController = {
  createComplaint: async function (req, res, next) {
    const { name, mobile, location, address, macAddress } = req.body.complaint;
    if (!req?.body?.complaint)
      return res.status(400).json({ msg: "No complaint details to track" });
    const creator = req.user._id;
    const complaint = {
      name,
      mobile,
      location,
      address,
      macAddress,
      creator,
      isResolved: false,
    };
    try {
      const createdComplaint = await complaintService.createComplaint(
        complaint
      );
      return res.status(201).json({ complaint: createdComplaint });
    } catch (err) {
      next(err);
    }
  },
  getComplaints: async function (req, res, next) {
    const creator = req.user._id;
    try {
      const complaintsCreatedByUser = await complaintService.getComplaints(
        creator
      );
      res.status(200).json({ complaints: complaintsCreatedByUser });
    } catch (err) {
      next(err);
    }
  },
  getComplaint: async function (req, res, next) {
    const complaintId = req.params.id;
    try {
      const complaint = await complaintService.getComplaint(complaintId);
      return res.json({ complaint });
    } catch (err) {
      next(err);
    }
  },
  changeComplaintStatus: async function (req, res, next) {
    const complaintId = req.params.id;
    try {
      const updatedComplaint = await complaintService.changeComplaintStatus(
        complaintId
      );

      res.status(200).json({ complaint: updatedComplaint });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = complaintsController;
