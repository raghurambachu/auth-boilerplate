import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { MdDone } from "react-icons/md";
import { IoHandRightOutline } from "react-icons/io5";

import "@reach/dialog/styles.css";
import Header from "./Header";
import ComplaintModal from "./ComplaintModal";
import moment from "moment";
import useDialog from "../useDialog";
import ViewComplaintModal from "./ViewComplaintModal";

function Home(props) {
  const {
    showDialog: showCreateComplaintDialog,
    open: openCreateComplaint,
    close: closeCreateComplaint,
  } = useDialog();

  const {
    showDialog: showViewDetailsDialog,
    open: openViewComplaintDialog,
    close: closeViewComplaintDialog,
  } = useDialog();

  const [complaintId, setComplaintId] = useState(null);
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("/complaints")
      .then((res) => res.json())
      .then((res) => {
        if (res?.complaints) {
          setComplaints(res.complaints);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (complaintId) {
      fetch(`/complaints/${complaintId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res?.complaint) {
            setComplaintDetails(res.complaint);
            openViewComplaintDialog();
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setComplaintId(null));
    }
  }, [complaintId]);

  function handleViewDetails(complaintId) {
    setComplaintId(complaintId);
  }

  function changeComplaintStatus(complaintId) {
    fetch(`/complaints/${complaintId}/update`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.complaint) {
          const newComplaints = complaints?.map((complaint) => {
            if (complaint._id === complaintId) {
              return res?.complaint;
            }
            return complaint;
          });
          setComplaints(newComplaints);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-0 lg:px-20 xl:px-40 grid grid-cols-1 md:grid-cols-4 pt-8 gap-10">
        <section className="md:col-span-3 order-2 md:order-1">
          <h3 className="text-xl mb-5 font-bold">All Complaints</h3>
          <ul>
            {complaints.map((complaint) => (
              <li
                key={complaint._id}
                className="p-4 bg-white shadow-sm hover:shadow-md roudned-sm mb-4 cursor-pointer"
              >
                <div className="flex justify-between">
                  <div className="w-1/3 sm:w-max">
                    <span className="text-sm">Complainee: </span>{" "}
                    <span>{complaint.name}</span>
                    <p className="text-xs">
                      <span className="hidden sm:inline-block">
                        Created On :
                      </span>{" "}
                      {moment(complaint.createdAt).format("ll")}{" "}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {complaint?.isResolved ? (
                      <div>
                        <MdDone
                          data-tip="Complaint Resolved"
                          className="w-10 h-10 bg-green-200 text-white rounded-full "
                          size={16}
                        />
                        <ReactTooltip />
                      </div>
                    ) : (
                      <div>
                        <IoHandRightOutline
                          data-tip="Resolution in Progress"
                          className="w-10 h-10 bg-red-300 text-white rounded-full "
                          size={5}
                        />
                        <ReactTooltip />{" "}
                      </div>
                    )}

                    <div>
                      <button
                        onClick={() => handleViewDetails(complaint?._id)}
                        className="bg-blue-200 hover:bg-blue-300 text-blue-800 text-xs p-1 px-2 shadow-sm rounded-sm"
                      >
                        View Details
                      </button>
                      <ViewComplaintModal
                        complaintDetails={complaintDetails}
                        showDialog={showViewDetailsDialog}
                        close={closeViewComplaintDialog}
                      />
                    </div>

                    <button
                      onClick={() => changeComplaintStatus(complaint?._id)}
                      className="bg-blue-200 hover:bg-blue-300 text-blue-800 text-xs p-1 px-2 shadow-sm rounded-sm"
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="md:col-span-1 order-1 md:order-2">
          <button
            onClick={openCreateComplaint}
            className="bg-blue-500 hover:bg-blue-400 transition ease-in-out  text-blue-100 block w-full p-2 text-lg sm:text-base lg:text-lg font-bold rounded-sm"
          >
            Create Complaint
          </button>
          <ComplaintModal
            setComplaints={setComplaints}
            showDialog={showCreateComplaintDialog}
            close={closeCreateComplaint}
          />
        </section>
      </main>
    </div>
  );
}

export default Home;
