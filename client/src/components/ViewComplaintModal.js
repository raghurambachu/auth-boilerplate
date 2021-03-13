import React from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";

function capitalize(input) {
  if (input) {
    return input[0].toUpperCase() + input.slice(1);
  }
}

function ViewComplaintModal(props) {
  const { showDialog, close, complaintDetails } = props;
  return (
    <DialogOverlay
      style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
      isOpen={showDialog}
      onDismiss={close}
    >
      <DialogContent
        aria-label="Complaint Modal"
        style={{
          boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.15)",
          width: "360px",
          borderRadius: "0.5rem",
          padding: "2rem",
          position: "relative",
        }}
      >
        <span
          onClick={close}
          className="absolute text-2xl font-bold right-0 top-0 my-2 mx-5 cursor-pointer"
        >
          &times;
        </span>
        <h2 className="text-lg font-bold text-center text-gray-500">
          View Complaint Details
        </h2>
        <article className="mt-4">
          <p className="my-1.5">
            <span className="font-bold text-gray-600">Complainee</span> :{" "}
            {capitalize(complaintDetails?.name)}
          </p>
          <p className="my-1.5">
            <span className="font-bold text-gray-600">MacAddress</span> :{" "}
            {capitalize(complaintDetails?.macAddress)}{" "}
          </p>
          <p className="my-1.5">
            <span className="font-bold text-gray-600">Status</span> :{" "}
            {complaintDetails?.isResolved ? "Resolved" : "In Progress"}{" "}
          </p>
          <p className="my-1.5">
            <span className="font-bold text-gray-600">Stolen Location</span> :{" "}
            {capitalize(complaintDetails?.location)}{" "}
          </p>
          <p className="my-1.5">
            <span className="font-bold text-gray-600">Mobile Number</span> : +91{" "}
            {capitalize(complaintDetails?.mobile)}{" "}
          </p>
          <p className="my-1.5">
            <span className="font-bold text-gray-600">Address</span> :{" "}
            {capitalize(complaintDetails?.address)}{" "}
          </p>
        </article>
      </DialogContent>
    </DialogOverlay>
  );
}

export default ViewComplaintModal;
