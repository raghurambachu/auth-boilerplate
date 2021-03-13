const Complaint = require("../models/Complaint");

const complaintService = {
  createComplaint: async function (complaint) {
    try {
      return await Complaint.create(complaint);
    } catch (err) {
      return err;
    }
  },
  getComplaints: async function (creator) {
    try {
      return await Complaint.find({ creator });
    } catch (err) {
      return err;
    }
  },
  getComplaint: async function (complaintId) {
    try {
      return await Complaint.findById(complaintId);
    } catch (err) {
      return err;
    }
  },
  changeComplaintStatus: async function (complaintId) {
    try {
      const complaint = await Complaint.findById(complaintId);
      const updatedComplaint = await Complaint.findByIdAndUpdate(
        complaintId,
        { isResolved: !complaint.isResolved },
        { new: true }
      );

      return updatedComplaint;
    } catch (err) {
      return err;
    }
  },
};

module.exports = complaintService;
