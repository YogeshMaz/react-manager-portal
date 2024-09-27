import React, { useState } from "react";
import useFetchCustomDataV1 from "../../../components/hooks/fetchCustomApiv1";
import { APILinkRoutes } from "../../../components/apiLinks/APILinkRoutes";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProject = () => {
  const { data, error, noData } = useFetchCustomDataV1(
    APILinkRoutes.AddRfqsRoute
  );

  // Safely destructure data
  const projectNumbers = data?.project_nos?.all_project_nos || [];
  const customerLists = data?.Customer_names?.all_cust_names || [];
  const pcndaList = data?.partner_names?.all_partner_names?.PCndA || [];
  const emsList = data?.partner_names?.all_partner_names?.ems || [];
  const fabList = data?.partner_names?.all_partner_names?.fab || [];

  const rfqStatus = ["Bidding", "Closed", "On Hold"];
  const partnerCategory = ["Manufacturing", "Fabrication", "EMS"];

  const [drawingFileName, setDrawingFileName] = useState("");
  const [partnerQuoteFileName, setPartnerQuoteFileName] = useState("");

  const formik = useFormik({
    initialValues: {
      projectNumber: "",
      customer: "",
      referenceNo: "",
      partDescription: "",
      targetPrice: "",
      rfqStartDate: dayjs(),
      rfqEndDate: null,
      totalOrderValue: "",
      allocateToPartner: [],
      bestQuotePartner: "",
      vendorPrice: "",
      leadTime: "",
      totalCost: "",
      drawingFile: null,
      partnerQuoteFile: null,
    },
    validationSchema: Yup.object({
      projectNumber: Yup.string().required("Project Number is required."),
      customer: Yup.string().required("Customer is required."),
      referenceNo: Yup.string().required("Reference No is required."),
      partDescription: Yup.string(),
      rfqStartDate: Yup.date()
        .nullable()
        .required("RFQ Start Date is required."),
      rfqEndDate: Yup.date()
        .nullable()
        .required("RFQ End Date is required.")
        .min(Yup.ref("rfqStartDate"), "End date must be after start date."),
      targetPrice: Yup.number(),
      totalOrderValue: Yup.number(),
      bestQuotePartner: Yup.string(),
      vendorPrice: Yup.number(),
      leadTime: Yup.number(),
      totalCost: Yup.number(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      // Log FormData contents
      console.log("Form Data Contents:");
      for (let [key, value] of formData.entries()) {
        // console.log(`${key}:`, value);
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/rfq_management/add_rfq_record",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit data");
        }

        console.log("Form submitted successfully", await response.json());
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue(fileType, file);
      if (fileType === "drawingFile") {
        setDrawingFileName(file.name);
      } else if (fileType === "partnerQuoteFile") {
        setPartnerQuoteFileName(file.name);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Project Number Autocomplete */}
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={projectNumbers}
              value={formik.values.projectNumber}
              onChange={(event, newValue) => {
                formik.setFieldValue("projectNumber", newValue);
              }}
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
              value={formik.values.customer}
              onChange={(event, newValue) => {
                formik.setFieldValue("customer", newValue);
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

          {/* RFQ status Autocomplete */}
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={rfqStatus}
              value={formik.values.rfqStatus}
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
                  ? dayjs(formik.values.rfqStartDate).add(0, "day")
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
              error={Boolean(formik.errors.partDescription)}
              helperText={formik.errors.partDescription}
            />
          </Grid>

          {/* Target Price */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Target Price"
              type="number"
              name="targetPrice"
              value={formik.values.targetPrice}
              onChange={formik.handleChange}
              fullWidth
              error={Boolean(formik.errors.targetPrice)}
              helperText={formik.errors.targetPrice}
            />
          </Grid>

          {/* Total Order Value */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Total Order Value"
              type="number"
              name="totalOrderValue"
              value={formik.values.totalOrderValue}
              onChange={formik.handleChange}
              fullWidth
              error={Boolean(formik.errors.totalOrderValue)}
              helperText={formik.errors.totalOrderValue}
            />
          </Grid>

          {/* Partner Category Autocomplete */}
          <Grid item xs={12} sm={4}>
            <Autocomplete
              options={partnerCategory}
              value={formik.values.partnerCategory}
              onChange={(event, newValue) => {
                formik.setFieldValue("partnerCategory", newValue);
                // Reset allocateToPartner when category changes
                formik.setFieldValue("allocateToPartner", []); // Clear previous selections
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

          {/* Allocate to Partner Multi-Select */}
          <Grid item xs={12} sm={8}>
            <Autocomplete
              multiple
              options={
                formik.values.partnerCategory === "Manufacturing"
                  ? pcndaList // Use the list directly based on the selected category
                  : formik.values.partnerCategory === "EMS"
                  ? emsList
                  : formik.values.partnerCategory === "Fabrication"
                  ? fabList
                  : [] // No selection
              }
              getOptionLabel={(option) => option} // Ensure this is returning the option as a string
              value={formik.values.allocateToPartner || []} // Ensure this is always an array
              onChange={(event, newValue) => {
                // Set the selected values in Formik and ensure they are plain strings
                formik.setFieldValue(
                  "allocateToPartner",
                  newValue.map((item) => item.trim())
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Allocate to Partner"
                  placeholder="Select Partners"
                  error={Boolean(formik.errors.allocateToPartner)}
                  helperText={formik.errors.allocateToPartner}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} style={{ padding: "8px", cursor: "pointer" }}>
                  {option}
                </li>
              )}
              ChipProps={{
                color: "secondary",
                style: { backgroundColor: "#0082d9", color: "white" },
              }}
            />
          </Grid>

          {/* Best Quote Partner Multi-Select */}
          {/* <Grid item xs={12} sm={4}>
            <Autocomplete
              multiple
              options={formik.values.allocateToPartner || []} // Use the selected partners from Allocate to Partner
              value={formik.values.bestQuotePartner || []} // Ensure this is also an array
              onChange={(event, newValue) => {
                // Log selected values for debugging
                console.log(
                  "Selected Values for Best Quote Partner: ",
                  newValue
                ); // Debugging line
                // Set the selected values in Formik, ensuring they are plain strings
                formik.setFieldValue(
                  "bestQuotePartner",
                  newValue.map((item) => item.trim())
                ); // Trim any unwanted spaces
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Best Quote Partner"
                  placeholder="Select Partners"
                  error={Boolean(formik.errors.bestQuotePartner)}
                  helperText={formik.errors.bestQuotePartner}
                />
              )}
              getOptionLabel={(option) => option} // Ensure it uses the plain string
              renderOption={(props, option) => (
                <li {...props} style={{ padding: "8px", cursor: "pointer" }}>
                  {option}
                </li>
              )}
              ChipProps={{
                color: "secondary",
                style: { backgroundColor: "#0082d9", color: "white" },
              }}
            />
          </Grid> */}

          {/* Lead Time */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Lead Time (days)"
              type="number"
              name="leadTime"
              value={formik.values.leadTime}
              onChange={formik.handleChange}
              fullWidth
              error={Boolean(formik.errors.leadTime)}
              helperText={formik.errors.leadTime}
            />
          </Grid>

          {/* Total Cost */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Total Cost"
              type="number"
              name="totalCost"
              value={formik.values.totalCost}
              onChange={formik.handleChange}
              fullWidth
              error={Boolean(formik.errors.totalCost)}
              helperText={formik.errors.totalCost}
            />
          </Grid>

          {/* Vendor Price */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Vendor Price"
              type="number"
              name="vendorPrice"
              value={formik.values.vendorPrice}
              onChange={formik.handleChange}
              fullWidth
              error={Boolean(formik.errors.vendorPrice)}
              helperText={formik.errors.vendorPrice}
            />
          </Grid>

          {/* Drawing Upload */}
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label">
              Upload Drawing
              <input
                type="file"
                hidden
                onChange={(event) => handleFileChange(event, "drawingFile")}
              />
            </Button>
            {drawingFileName && (
              <Typography variant="body2">{drawingFileName}</Typography>
            )}
          </Grid>

          {/* Partner Quote Upload */}
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label">
              Upload Partner Quote
              <input
                type="file"
                hidden
                onChange={(event) =>
                  handleFileChange(event, "partnerQuoteFile")
                }
              />
            </Button>
            {partnerQuoteFileName && (
              <Typography variant="body2">{partnerQuoteFileName}</Typography>
            )}
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

// import React from "react";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import Stack from '@mui/material/Stack';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { useState } from "react";
// import { Button, Divider } from "@mui/material";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';

// /** Server side fetch */
// import useFetchReportData from "../../../components/hooks/fetchReportData";
// import { APILinkRoutes } from "../../../components/apiLinks/APILinkRoutes";

// export default function AddRfq() {

// const { data, error, noData } = useFetchReportData(APILinkRoutes.AddRfqsRoute);
// console.log("rfq add ", data)

//   const [file, setFile] = useState(null);
//   const  [file1, setFile1] = useState(null);

//   const handleFileChange = (event) => {
//       const selectedFile = event.target.files[0];
//       setFile(selectedFile);

//       // Automatically handle file upload logic here
//       if (selectedFile) {
//           console.log('Uploading:', selectedFile);
//           // Add your upload logic here (e.g., using FormData or an API call)
//       }
//   };

//   const handleFileChange1 = (event) => {
//     const selectedFile1 = event.target.files[0];
//     setFile1(selectedFile1);

//     // Automatically handle file upload logic here
//     if (selectedFile1) {
//         console.log('Uploading:', selectedFile1);
//         // Add your upload logic here (e.g., using FormData or an API call)
//     }
// };

//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);

//   const handleStartDateChange = (date) => {
//     setSelectedStartDate(date);
//     // Reset end date if the new start date is after the current end date
//     if (selectedEndDate && date > selectedEndDate) {
//       setSelectedEndDate(null);
//     }
//   };

//   const handleEndDateChange = (date) => {
//     setSelectedEndDate(date);
//     // Reset start date if the new end date is before the current start date
//     if (selectedStartDate && date < selectedStartDate) {
//       setSelectedStartDate(null);
//     } else if (!selectedStartDate) {
//       // Automatically set the start date if it hasn't been selected yet
//       setSelectedStartDate(date);
//     }
//   };

//   const proNoProps = {
//     options: data,
//     getOptionLabel: (option) => option.title,
//   };
//   const customerProps = {
//       options: customer,
//       getOptionLabel: (option) => option.title,
//   };
//   const rfqStatusProps = {
//       options: rfqStatus,
//       getOptionLabel: (option) => option.title,
//   };
//   const pcaProps = {
//       options: pcaPartner,
//       getOptionLabel: (option) => option.title,
//   };

// return(
//     <>
//     <Card variant="outlined">
//       <CardContent>
//         <div className="row">
//             <h5>Add RFQ</h5>
//             <hr/>
//             <div className='col-md-4 mt-3'>
//                 <Stack spacing={1} >
//                     <Autocomplete
//                     {...proNoProps}
//                     id=""
//                     renderInput={(params) => (
//                     <TextField {...params} label="Project Number" className='w-100'
//                     id="outlined-size-small"

//                     size="small"/>
//                     )}
//                     />
//                 </Stack>
//             </div>
//             <div className='col-md-4 mt-3'>
//                 <Stack spacing={1} >
//                     <Autocomplete
//                     {...customerProps}
//                     id=""
//                     renderInput={(params) => (
//                     <TextField {...params} label="Customer"
//                     id="outlined-size-small"

//                     size="small" className='w-100'/>
//                     )}
//                     />
//                 </Stack>
//             </div>
//             <div className="col-md-4 mt-3">
//                 <TextField label="RFQ Referance No" className='w-100'
//                  id="outlined-size-small"
//                  size="small"/>
//             </div>
//             <div className='col-md-4 mt-4'>
//                 <Stack spacing={1} >
//                     <Autocomplete
//                     {...rfqStatusProps}
//                     id=""
//                     renderInput={(params) => (
//                     <TextField {...params} label="RFQ Status" className='w-100'
//                     id="outlined-size-small"

//                     size="small"/>
//                     )}
//                     />
//                 </Stack>
//             </div>
//             <div className="col-md-4 mt-4">
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <DatePicker
//                   className='w-100'
//                   label="Start Date"
//                   value={selectedStartDate}
//                   onChange={handleStartDateChange}
//                   format="dd-MM-yyyy" // Custom date format
//                   renderInput={(params) => <TextField {...params} />}
//                 />
//               </LocalizationProvider>
//             </div>
//             <div className="col-md-4 mt-4">
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <DatePicker
//                     className='w-100'
//                     label="End Date"
//                     value={selectedEndDate}
//                     onChange={handleEndDateChange}
//                     format="dd-MM-yyyy" // Custom date format
//                     minDate={selectedStartDate} // Disable dates before the selected start date
//                     renderInput={(params) => <TextField {...params} />}
//                   />
//                 </LocalizationProvider>
//             </div>

//             <div className="col-md-4 mt-4">
//                 <TextField label="Total Order Value" className='w-100'
//                  id="outlined-size-small"
//                  size="small"/>
//             </div>
//             <div className="col-md-4 mt-4">
//                 <TextField label="Target Price" className='w-100'
//                  id="outlined-size-small"
//                  size="small"/>
//             </div>
//             <div className="col-md-4 mt-4">
//                 <TextField label="Total Cost"  id="outlined-size-small"
//                 size="small"
//                 className='w-100'/>
//             </div>
//             <div className='col-md-4 mt-4'>
//                 <Stack spacing={1}>
//                     <Autocomplete
//                     {...pcaProps}
//                     id=""
//                     renderInput={(params) => (
//                     <TextField {...params} label="Allocate to PC&A Partner" className='w-100'
//                     id="outlined-size-small"
//                     size="small"/>
//                     )}
//                     />
//                 </Stack>
//             </div>
//             <div className='col-md-4 mt-4'>
//                 <Stack spacing={1} >
//                     <Autocomplete
//                     {...pcaProps}
//                     id=""
//                     renderInput={(params) => (
//                     <TextField {...params} label="Allocate to EMS Partner"
//                     id="outlined-size-small"

//                     size="small" className='w-100'/>
//                     )}
//                     />
//                 </Stack>
//             </div>
//             <div className='col-md-4 mt-4'>
//                 <Stack spacing={1} >
//                     <Autocomplete
//                     {...pcaProps}
//                     id=""
//                     renderInput={(params) => (
//                     <TextField {...params} label="Allocate to Fabrication Partner"
//                     id="outlined-size-small"

//                     size="small" className='w-100'/>
//                     )}
//                     />
//                 </Stack>
//             </div>
//             <div className="col-md-4 mt-4">
//                 <TextField label="Best Quote Partner"
//                  id="outlined-size-small"
//                  size="small"className='w-100'/>
//             </div>

//             <div className="col-md-4 mt-4">
//                 <TextField label="Lead Time in Days"  id="outlined-size-small"
//                 size="small"
//                 className='w-100'/>
//             </div>
//             <div className="col-md-4 mt-4">
//                 <TextField label="Vendor Price/Best Price"  id="outlined-size-small"
//                 size="small"
//                 className='w-100'/>
//             </div>

//             <div className="col-md-4 mt-4 d-flex">
//               <input
//                   type="file"
//                   accept="image/*"  // Accept images only
//                   onChange={handleFileChange}
//                   style={{ display: 'none'}} // Hide the native input element
//                   id="file-input"
//               />
//               <TextField
//                   label={file ? file.name : "Upload Partner Quote"}
//                   variant="outlined"
//                   size="small"
//                   InputProps={{
//                       readOnly: true,
//                   }}
//               />
//               <label htmlFor="file-input">
//                   <Button variant="contained" component="span">
//                       Select File
//                   </Button>
//               </label>
//             </div>

//             <div className="col-md-4 mt-4 d-flex">
//               <input
//                   type="file"
//                   accept="image/*"  // Accept images only
//                   onChange={handleFileChange1}
//                   style={{ display: 'none'}} // Hide the native input element
//                   id="file-input1"
//               />
//               <TextField
//                   label={file1 ? file1.name : "Upload Drawing"}
//                   variant="outlined"
//                   size="small"
//                   InputProps={{
//                       readOnly: true,
//                   }}
//               />
//               <label htmlFor="file-input1">
//                   <Button variant="contained" component="span" className="btnbrdr">
//                       Select File
//                   </Button>
//               </label>
//             </div>
//             <div className="col-md-4 mt-4">
//                 <TextField
//                 label="Part Description"
//                 placeholder="Part Description"
//                 multiline
//                 className='w-100'
//                 id="outlined-size-small"
//                 size="small"
//                 />
//             </div>
//             <div className="col-md-12 mt-4">
//               <button className="btn btn-primary float-end" component="span">
//                   Submit
//               </button>
//             </div>
//         </div>
//       </CardContent>
//       </Card>
//     </>
// )
// }

// // const proNo = [
// // { title: 'MM00123' },
// // { title: 'MM00124' },
// // { title: 'MM00125' },
// // { title: 'MM00126' },
// // { title: 'MM00127' },
// // { title: 'MM00128' },
// // { title: 'MM00129' }
// // ];

// const customer = [
// { title: 'Customer 1' },
// { title: 'Customer 2' },
// { title: 'Customer 3' },
// { title: 'Customer 4' },
// { title: 'Customer 5' }
// ];

// const rfqStatus = [
// { title: 'Bidding' },
// { title: 'Closed' },
// { title: 'On Hold' }
// ];

// const pcaPartner = [
// { title: 'Partner1' },
// { title: 'Partner2' },
// { title: 'Partner3' }
// ];
