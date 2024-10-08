import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useFetchReportById from "../../../../components/hooks/fetchRecordById";
import Logo from "../../../../images/MM.jpeg";
const apiUrl = process.env.REACT_APP_LOCALHOST;

const ProjectDetailPrint = () => {
  // const { data, error, noData } = useFetchReportData(
  //   apiUrl + "/api/project_management/project_dashboard/view_projects"
  // );
  // }
  
  // const recordID = document.getElementById("projectDetailModal").value;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const recordID = params.get('recordID'); 

  // console.log("Record ID:", recordID); 
  const { data, error, noData } = useFetchReportById(
    apiUrl + "/api/project_management/project_dashboard/view_projects",
    { RecordID: recordID } 
  );

  const componentRef = useRef();

  // Handle errors and loading state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (noData) {
    return <div>No data available</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const dataSet = data;

  // Function to download as PDF
  const downloadPDF = () => {
    const input = document.getElementById("project-detail-sheet");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create jsPDF document in portrait mode (A4 size)
      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate width and height to fit the image in an A4 page
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale the image height based on its width

      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page with the image
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Check if the content is longer than one page and add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF with the desired file name
      pdf.save("project_detail_sheet.pdf");
    });
  };
  // Component to render project details
  const ProjectDetailSheet = React.forwardRef((props, ref) => (
    <>
    <style>
      {`
      table {
        font-size: 15px;
      }
    `}
    
    </style>

    <div
      ref={ref}
      id="project-detail-sheet"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3>Project Details</h3>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src={Logo} alt="MMLOGO" width={'100px'}/>
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            MachineMaze
          </p>
        </div>
      </div>
      
      <h5>GENERAL DETAILS</h5>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Field</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Project Number
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Project_Number || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Project Category
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Project_Category || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Project Title
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Project_Title || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Current Project Phase
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Project_Phase_New || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Project Manager
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Project_Manager_Lookup?.zc_display_value || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>Phone</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Project_Manager_Lookup?.zc_display_value || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>Email</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.projectManager?.Email_MachineMaze || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Customer Organisation
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Customer_Organisation_Name_Email_Phone
                ?.Customer_Organisation || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Customer Name
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Customer_Organisation_Name_Email_Phone?.[
                "Customer_Name.first_name"
              ] || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Customer Email
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Customer_Email || "-"}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              Quantity Floated
            </td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              {dataSet?.Quantity_Floated || "-"}
            </td>
          </tr>
        </tbody>
      </table>

      <h5>EXECUTION DETAILS</h5>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Partner
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Cost Per Unit
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              RFQ Reference Number
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Quantity/Year
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSet?.Project_Execution_Detail?.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item?.Production_Allocation_to_M_F_Partner
                  ?.Name_of_the_Organisation ||
                  item?.Allocate_to_EMS_PArtner?.Name_of_the_Organisation ||
                  item?.Production_Allocation_to_Fabrication_Vendor
                    ?.Name_of_the_Organisation ||
                  "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item?.Cost_Per_Unit_INR_Landed || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item?.RFQ_Reference_Number?.RFQ_Reference_Number || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item?.Quantity_Year || "-"}
              </td>
            </tr>
          )) || (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "8px" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h5>PROJECT COLLATERAL</h5>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Upload Type
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Note</th>
            <th style={{ border: "1px solid #ccc", padding: "8px"}}>File</th>
            {/* <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th> */}
          </tr>
        </thead>
        <tbody>
          {dataSet?.Project_Collateral?.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.Upload_Type || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.Note_About_the_attachment || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px", lineBreak:"anywhere" }}>
                <a href={"https://creatorapp.zohopublic.in/file/arun.ramu_machinemaze/machinemaze-project-management/All_Machine_Maze_Project_Trackings/" 
                + dataSet.ID 
                + "/Project_Collateral.File_upload/image-download/nGv00gD4NCg0Y6sP3GpXFjywhnGwH1WNwKXpQa9aByhnPMEeSSbwk5asWrRRqZa51aT5OhZqRkeQjzkW8heSwMhtztjhGVB9B5mn?" 
                + item.File_upload.split("?")[1] || "-"}>Download File</a>
              </td>
              {/* <td style={{ border: "1px solid #ccc", padding: "8px" }}>{item.date}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <h5>DELIVERY SCHEDULE</h5>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Item Description/Item Part No
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Delivery Schedule Type
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Qty</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Unit</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Delivery Status
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Delivery Date
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSet?.Delivery_Schedule_Bi_Directoinal?.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.Item_Description_Item_Part_No || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.Delivery_Schedule_Type || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.Qty || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.Unit || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.Delivery_Status || "-"}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {item.Delivery_Date || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>For any details pls contact </p>
        <p>Regards,</p>
        <p>Machinemaze Team, www.machinemaze.com</p>
      </div>
    </div>
    </>
  ));

  return (
    <div>
      <a href="http://localhost:3000/project-dashboard"><button className="btn btn-sm btn-dark m-2">Back to dashboard</button></a>
      <ReactToPrint
        trigger={() => <button className="btn btn-sm btn-primary m-2">Print this out!</button>}
        content={() => componentRef.current}
      />
      <button className="btn btn-sm btn-primary m-2" onClick={downloadPDF}>Download as PDF</button>
      <ProjectDetailSheet ref={componentRef} />
    </div>
  );
};

export default ProjectDetailPrint;