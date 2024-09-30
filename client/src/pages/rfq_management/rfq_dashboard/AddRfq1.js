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
