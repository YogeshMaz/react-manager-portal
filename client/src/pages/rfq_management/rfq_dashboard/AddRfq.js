import React, { useState } from "react";
import useFetchCustomDataV1 from "../../../components/hooks/fetchCustomApiv1";
import { APILinkRoutes } from "../../../components/apiLinks/APILinkRoutes";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
const apiUrl = process.env.REACT_APP_LOCALHOST;

const AddProject = () => {
  const { data } = useFetchCustomDataV1(APILinkRoutes.AddRfqsRoute);
  const projectNumbers = React.useMemo(
    () => data?.project_nos?.all_project_nos || [],
    [data]
  );
  const customerLists = React.useMemo(
    () => data?.Customer_names?.all_cust_names || [],
    [data]
  );
  const pcndaList = React.useMemo(
    () => data?.partner_names?.all_partner_names?.PCndA || [],
    [data]
  );
  const emsList = React.useMemo(
    () => data?.partner_names?.all_partner_names?.ems || [],
    [data]
  );
  const fabList = React.useMemo(
    () => data?.partner_names?.all_partner_names?.fab || [],
    [data]
  );

  const rfqStatus = ["Bidding", "Closed", "On Hold"];
  const partnerCategory = ["Manufacturing", "Fabrication", "EMS"];

  const [drawingFileName, setDrawingFileName] = useState("");
  const [partnerQuoteFileName, setPartnerQuoteFileName] = useState("");

  // Handle file change for both inputs
  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (fileType === "drawingFile" && file) {
      setDrawingFileName(file.name); // Set file name for drawing file
      formik.setFieldValue("drawingFile", file); // Set the file in Formik
    } else if (fileType === "partnerQuoteFile" && file) {
      setPartnerQuoteFileName(file.name); // Set file name for partner quote file
      formik.setFieldValue("partnerQuoteFile", file); // Set the file in Formik
    }
  };
  

  // Handle clear file for both inputs
  const handleClearFile = (inputId) => {
    if (inputId === "drawingFile") {
      setDrawingFileName(""); // Clear drawing file name
    } else if (inputId === "partnerQuoteFile") {
      setPartnerQuoteFileName(""); // Clear partner quote file name
    }
    document.getElementById(inputId).value = ""; // Clear the file input
  };

  const formik = useFormik({
    initialValues: {
      projectNumber: "",
      customer: "",
      referenceNo: "",
      partDescription: "",
      targetPrice: "",
      rfqStatus: "",
      rfqStartDate: dayjs(),
      rfqEndDate: null,
      totalOrderValue: "",
      partnerCategory: "",
      allocateToPartner: [],
      vendorPrice: "",
      leadTime: "",
      totalCost: "",
      drawingFile: null,
      partnerQuoteFile: null,
      projectLookUpId: "",
      customerLookUpId: "",
    },
    validationSchema: Yup.object({
      projectNumber: Yup.string().required("Project Number is required."),
      customer: Yup.string().required("Customer is required."),
      referenceNo: Yup.string().required("Reference No is required."),
      rfqStartDate: Yup.date()
        // .nullable()
        .required("RFQ Start Date is required."),
      rfqEndDate: Yup.date()
        // .nullable()
        .required("RFQ End Date is required.")
        .min(Yup.ref("rfqStartDate"), "End date must be after start date."),
      targetPrice: Yup.number(),
      totalOrderValue: Yup.number(),
      vendorPrice: Yup.number(),
      leadTime: Yup.number(),
      totalCost: Yup.number(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      for (const key in values) {
        if (values[key] instanceof File) {
          formData.append(key, values[key]); // Append file
        } else if (key === "allocateToPartner") {
          const partnerNames = values.allocateToPartner.map(
            (partner) => partner.name_of_organisation
          );
          formData.append(key, JSON.stringify(partnerNames));
        } else {
          formData.append(key, values[key]);
        }
      }

      try {
        const response = await fetch(
          apiUrl + "/api/rfq_management/add_rfq_record",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json(); // Change to JSON for better error handling
          throw new Error(
            `Failed to submit data: ${JSON.stringify(errorResponse)}`
          );
        }

        const result = await response.json();
        console.log("Form submitted successfully:", result);

        // Show success alert
        alert("Your form has been submitted successfully!");

        // Reset the form fields
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);

        // Show error alert
        alert(`Error submitting form: ${error.message}`);
      }
    },
  });

  const uniqueOptions = (options) => {
    const seen = new Set();
    return options.filter((option) => {
      const id = option.look_up_id;
      if (seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Project Number Autocomplete */}
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={projectNumbers}
              getOptionLabel={(option) => option.pn?.project_number || ""}
              value={
                projectNumbers.find(
                  (item) => item.pn.look_up_id === formik.values.projectLookUpId
                ) || null
              }
              onChange={(event, newValue) => {
                if (newValue) {
                  formik.setFieldValue(
                    "projectNumber",
                    newValue.pn.project_number
                  );
                  formik.setFieldValue(
                    "projectLookUpId",
                    newValue.pn.look_up_id
                  );
                } else {
                  formik.setFieldValue("projectNumber", "");
                  formik.setFieldValue("projectLookUpId", "");
                }
              }}
              isOptionEqualToValue={(option, value) =>
                option.pn?.look_up_id === value.look_up_id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Project Number"
                  error={Boolean(formik.errors.projectNumber)}
                  helperText={formik.errors.projectNumber}
                />
              )}
            />
          </Grid>

          {/* Customer Autocomplete */}
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={customerLists}
              getOptionLabel={(option) => option.customer_organisation || ""}
              value={
                customerLists.find(
                  (item) => item.look_up_id === formik.values.customerLookUpId
                ) || null
              }
              onChange={(event, newValue) => {
                formik.setFieldValue(
                  "customer",
                  newValue?.customer_organisation || ""
                );
                formik.setFieldValue(
                  "customerLookUpId",
                  newValue?.look_up_id || ""
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Customer"
                  error={Boolean(formik.errors.customer)}
                  helperText={formik.errors.customer}
                />
              )}
            />
          </Grid>

          {/* Reference Number */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Reference No"
              name="referenceNo"
              value={formik.values.referenceNo}
              onChange={formik.handleChange}
              fullWidth
              error={Boolean(formik.errors.referenceNo)}
              helperText={formik.errors.referenceNo}
            />
          </Grid>

          {/* RFQ Status Autocomplete */}
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={rfqStatus}
              value={formik.values.rfqStatus || null}
              onChange={(event, newValue) => {
                formik.setFieldValue("rfqStatus", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="RFQ Status"
                  error={Boolean(formik.errors.rfqStatus)}
                  helperText={formik.errors.rfqStatus}
                />
              )}
            />
          </Grid>

          {/* RFQ Start Date */}
          <Grid item xs={12} sm={4}>
            <DesktopDatePicker
              label="RFQ Start Date"
              value={formik.values.rfqStartDate}
              onChange={(date) => formik.setFieldValue("rfqStartDate", date)}
              minDate={dayjs()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(formik.errors.rfqStartDate)}
                  helperText={formik.errors.rfqStartDate}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* RFQ End Date */}
          <Grid item xs={12} sm={4}>
            <DesktopDatePicker
              label="RFQ End Date"
              value={formik.values.rfqEndDate}
              onChange={(date) => formik.setFieldValue("rfqEndDate", date)}
              minDate={
                formik.values.rfqStartDate
                  ? dayjs(formik.values.rfqStartDate).add(1, "day")
                  : null
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(formik.errors.rfqEndDate)}
                  helperText={formik.errors.rfqEndDate}
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Part Description */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Part Description"
              name="partDescription"
              value={formik.values.partDescription}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>

          {/* Target Price */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Target Price"
              name="targetPrice"
              type="number"
              value={formik.values.targetPrice}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>

          {/* Total Order Value */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Total Order Value"
              name="totalOrderValue"
              type="number"
              value={formik.values.totalOrderValue}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          {/* Partner Category Autocomplete */}
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={partnerCategory}
              value={formik.values.partnerCategory || null}
              onChange={(event, newValue) => {
                // Set the new partner category and clear the allocateToPartner field
                formik.setFieldValue("partnerCategory", newValue);
                formik.setFieldValue("allocateToPartner", []); // Clear the allocate list
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Partner Category"
                  error={Boolean(formik.errors.partnerCategory)}
                  helperText={formik.errors.partnerCategory}
                />
              )}
            />
          </Grid>

          {/* Allocate To Partner */}
          <Grid item xs={12} sm={8}>
            <Autocomplete
              multiple
              value={formik.values.allocateToPartner || []} // Bind formik value to the Autocomplete
              options={
                formik.values.partnerCategory === "Manufacturing"
                  ? uniqueOptions(pcndaList)
                  : formik.values.partnerCategory === "EMS"
                  ? uniqueOptions(emsList)
                  : formik.values.partnerCategory === "Fabrication"
                  ? uniqueOptions(fabList)
                  : []
              }
              getOptionLabel={(option) => option.name_of_organisation || ""}
              getOptionSelected={(option, value) =>
                option.look_up_id === value.look_up_id
              }
              onChange={(event, newValue) => {
                formik.setFieldValue("allocateToPartner", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Allocate To Partner"
                  error={Boolean(formik.errors.allocateToPartner)}
                  helperText={formik.errors.allocateToPartner}
                />
              )}
            />
          </Grid>

          {/* Vendor Price */}
          {/* <Grid item xs={12} sm={4}>
            <TextField
              label="Vendor Price"
              name="vendorPrice"
              type="number"
              value={formik.values.vendorPrice}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid> */}

          {/* Lead Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lead Time"
              name="leadTime"
              type="number"
              value={formik.values.leadTime}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>

          {/* Total Cost */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Cost"
              name="totalCost"
              type="number"
              value={formik.values.totalCost}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>

          {/* Drawing File Upload */}
          <Grid item xs={6}>
            <input
              accept="application/pdf"
              type="file"
              id="drawingFile"
              onChange={(event) => handleFileChange(event, "drawingFile")}
              style={{ display: "none" }}
            />
            <label htmlFor="drawingFile">
              <Button variant="contained" component="span">
                Upload Drawing File
              </Button>
              {drawingFileName && (
                <span style={{ marginLeft: 10 }}>
                  {drawingFileName}
                  <IconButton
                    aria-label="clear file"
                    size="small"
                    onClick={() => handleClearFile("drawingFile")}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </span>
              )}
            </label>
          </Grid>

          {/* Partner Quote File Upload */}
          <Grid item xs={6}>
            <input
              accept="application/pdf"
              type="file"
              id="partnerQuoteFile"
              onChange={(event) => handleFileChange(event, "partnerQuoteFile")}
              style={{ display: "none" }}
            />
            <label htmlFor="partnerQuoteFile">
              <Button variant="contained" component="span">
                Upload Partner Quote File
              </Button>
              {partnerQuoteFileName && (
                <span style={{ marginLeft: 10 }}>
                  {partnerQuoteFileName}
                  <IconButton
                    aria-label="clear file"
                    size="small"
                    onClick={() => handleClearFile("partnerQuoteFile")}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </span>
              )}
            </label>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default AddProject;
