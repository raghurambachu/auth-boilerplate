import React from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { Formik } from "formik";
import * as Yup from "yup";

function ComplaintModal(props) {
  const { close, showDialog, setComplaints } = props;

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
          Raise Complaint
        </h2>

        <Formik
          initialValues={{
            name: "",
            mobile: "",
            address: "",
            location: "",
            macAddress: "",
          }}
          validationSchema={complaintModalFormValidation}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values);
            fetch("/complaints/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ complaint: values }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res?.complaint) {
                  setComplaints((prevComplaints) => [
                    res.complaint,
                    ...prevComplaints,
                  ]);
                }
              })
              .catch((err) => console.log(err))
              .finally(() => {
                setSubmitting(false);
                resetForm({
                  name: "",
                  mobile: "",
                  address: "",
                  location: "",
                  macAddress: "",
                });
                close();
              });
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="my-2">
                <label htmlFor="name" className="font-bold text-sm">
                  Name
                </label>
                <input
                  placeholder="Name"
                  type="text"
                  className="border-2 w-full p-2 "
                  name="name"
                  id="name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <small className="text-xs text-red-600 font-bold">
                    {formik.errors.name}
                  </small>
                ) : null}
              </div>
              <div className="my-2">
                <label htmlFor="mobile" className="font-bold text-sm">
                  Mobile
                </label>
                <input
                  placeholder="Mobile Number"
                  type="text"
                  className="border-2 w-full p-2 "
                  name="mobile"
                  id="mobile"
                  {...formik.getFieldProps("mobile")}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <small className="text-xs text-red-600 font-bold">
                    {formik.errors.mobile}
                  </small>
                ) : null}
              </div>
              <div className="my-2">
                <label htmlFor="location" className="font-bold text-sm">
                  Location
                </label>
                <input
                  placeholder="Location of theft"
                  type="text"
                  className="border-2 w-full p-2 "
                  name="location"
                  id="location"
                  {...formik.getFieldProps("location")}
                />
                {formik.touched.location && formik.errors.location ? (
                  <small className="text-xs text-red-600 font-bold">
                    {formik.errors.location}
                  </small>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="font-bold text-sm">
                  Address
                </label>
                <input
                  placeholder="Address"
                  type="text"
                  className="border-2 w-full p-2  "
                  name="address"
                  id="address"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <small className="text-xs text-red-600 font-bold">
                    {formik.errors.address}
                  </small>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="macAddress" className="font-bold text-sm">
                  Mac Address
                </label>
                <input
                  placeholder="Mac Address Ex- 3D:F2:C9:A6:B3:4F"
                  type="text"
                  className="border-2 w-full p-2  "
                  name="macAddress"
                  id="macAddress"
                  {...formik.getFieldProps("macAddress")}
                />
                {formik.touched.macAddress && formik.errors.macAddress ? (
                  <small className="text-xs text-red-600 font-bold">
                    {formik.errors.macAddress}
                  </small>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-gray-600 text-gray-100 p-2 w-full font-bold flex justify-center"
              >
                Submit
                {formik.isSubmitting && (
                  <svg
                    className="animate-spin mr-3 h-5 w-5 text-white ml-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>
            </form>
          )}
        </Formik>
      </DialogContent>
    </DialogOverlay>
  );
}

function complaintModalFormValidation() {
  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
  const macAddressRegex = RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);

  return Yup.object({
    name: Yup.string()
      .min(5, "Must be 5 characters or more")
      .max(25, "Must be 25 characters or less")
      .required("Required"),
    mobile: Yup.string()
      .matches(phoneRegex, "Invalid phone")
      .required("Phone is required"),
    address: Yup.string()
      .min(5, "Must be 5 characters or more")
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    location: Yup.string()
      .min(3, "Must be atleast 3 charcter long")
      .max(25, "Must be less than 25 characters")
      .required("Required"),
    macAddress: Yup.string()
      .matches(macAddressRegex, "Enter valid Mac Address")
      .required("Required"),
  });
}

export default ComplaintModal;
