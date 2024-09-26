import extractProjectTracker from "./utilities/ExractProjectTracker";
import { constructImageUrl } from "../columns/utilities/ConstructImageUrl";
import { constructLinkUrl } from "./utilities/ConstructLinkUrl";
import { AppNames } from "../zohoAssets/AppLists";
import { ReportNameLists } from "../zohoAssets/ReportLists";
import { publishedUrls } from "../zohoAssets/PublishedUrl";

export const CustomerRFQsColumnsV1 = [
  {
    header: "Customer Details",
    accessorFn: (row) =>
      row?.Customer_Database_Customer_Application?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "RFQ Ref No",
    accessorFn: (row) => row.RFQ_Reference_Number || "-",
    size: 150,
  },
  {
    header: "RFQ Start Date",
    accessorFn: (row) => row.RFQ_Start_Date || "-",
    size: 150,
  },
  {
    header: "RFQ End Date",
    accessorFn: (row) => row.RFQ_End_Date || "-",
    size: 150,
  },
  {
    header: "RFQ Status",
    accessorFn: (row) => row.RFQ_Current_Status || "-",
    size: 150,
  },
  {
    header: "Customer Email",
    accessorFn: (row) => row.Customer_Email || "-",
    size: 150,
  },
  {
    header: "Engineering Drawings",
    accessorFn: (row) =>
      row.Upload_File_Of_Drawings_Pictures_Engineering_Document || "",
    size: 150,
    Cell: ({ cell, row }) => {
      const ZohoLinkUrl = cell.getValue();
      const linkUrl = constructLinkUrl(
        ZohoLinkUrl,
        AppNames.RFQ,
        ReportNameLists.rfqManagement.customerRfq,
        row.original.ID,
        "Upload_File_Of_Drawings_Pictures_Engineering_Document",
        publishedUrls.rfqmanagement.customerRfq
      );
      return linkUrl;
    },
  },
  {
    header: "Brief Description of the Project",
    accessorFn: (row) => row.Brief_Description_of_the_Project || "-",
    size: 150,
  },
];

// Custom order for the columns
// const CustomerRFQsColumnsHeaders = [
//   "RFQ Ref No",
//   "RFQ Status",
//   "RFQ Start Date",
//   "RFQ End Date",
//   "Customer Email",
//   "Brief Description of the Project",
// ];

// // Sorting function to reorder the columns array
// export const CustomerRFQsColumnsV1 = CustomerRFQsColumnsHeaders.map(header =>
//   CustomerRFQsColumns.find(column => column.header === header)
// );

export const openRfqsColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) =>
      row["Machine_Maze_Project_Tracking_Number.Project_Number"]?.[0] || "-",
    size: 150,
  },
  {
    header: "Project Title",
    accessorFn: (row) =>
      row["Machine_Maze_Project_Tracking_Number.Project_Title"]?.[0] || "-",
    size: 150,
  },
  {
    header: "RFQ Reference No",
    accessorFn: (row) => row.RFQ_Reference_Number || "-",
    size: 150,
  },
  {
    header: "RFQ Current Status",
    accessorFn: (row) => row.RFQ_Current_Status || "-",
    size: 150,
  },
  {
    header: "Customer RFQ",
    accessorFn: (row) => row.Customer_RFQ || "-",
    size: 150,
  },
  {
    header: "RFQ End Date",
    accessorFn: (row) => row.RFQ_End_Date || "-",
    size: 150,
  },
  {
    header: "RFQ Start Date",
    accessorFn: (row) => row.RFQ_Start_Date || "-",
    size: 150,
  },
  {
    header: "Total Order Value",
    accessorFn: (row) => row.Total_Order_Value || "-",
    size: 150,
  },
  {
    header: "Type Of Project",
    accessorFn: (row) => row.Type_of_Project || "-",
    size: 150,
  },
];

export const postEvaluationRfqsColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) =>
      row["Machine_Maze_Project_Tracking_Number.Project_Number"]?.[0] || "-",
    size: 150,
  },
  {
    header: "Project Title",
    accessorFn: (row) =>
      row["Machine_Maze_Project_Tracking_Number.Project_Title"]?.[0] || "-",
    size: 150,
  },
  {
    header: "RFQ Reference No",
    accessorFn: (row) => row.RFQ_Reference_Number || "-",
    size: 150,
  },
  {
    header: "RFQ Current Status",
    accessorFn: (row) => row.RFQ_Current_Status || "-",
    size: 150,
  },
  {
    header: "RFQ End Date",
    accessorFn: (row) => row.RFQ_End_Date || "-",
    size: 150,
  },
  {
    header: "Total Order Value",
    accessorFn: (row) => row.Total_Order_Value || "-",
    size: 150,
  },
  {
    header: "Type Of Project",
    accessorFn: (row) => row.Type_of_Project || "-",
    size: 150,
  },
];

export const onHoldRfqsColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) =>
      row["Machine_Maze_Project_Tracking_Number.Project_Number"]?.[0] || "-",
    size: 150,
  },
  {
    header: "Project Title",
    accessorFn: (row) =>
      row["Machine_Maze_Project_Tracking_Number.Project_Title"]?.[0] || "-",
    size: 150,
  },
  {
    header: "RFQ Reference No",
    accessorFn: (row) => row.RFQ_Reference_Number || "-",
    size: 150,
  },
  {
    header: "RFQ Current Status",
    accessorFn: (row) => row.RFQ_Current_Status || "-",
    size: 150,
  },
  {
    header: "RFQ End Date",
    accessorFn: (row) => row.RFQ_End_Date || "-",
    size: 150,
  },
  {
    header: "Total Order Value",
    accessorFn: (row) => row.Total_Order_Value || "-",
    size: 150,
  },
  {
    header: "Type Of Project",
    accessorFn: (row) => row.Type_of_Project || "-",
    size: 150,
  },
];

export const closedRfqsColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) =>
      row["Machine_Maze_Project_Tracking_Number.Project_Number"]?.[0] || "-",
    size: 150,
  },
  {
    header: "Project Title",
    accessorFn: (row) =>
      row["Machine_Maze_Project_Tracking_Number.Project_Title"]?.[0] || "-",
    size: 150,
  },
  {
    header: "RFQ Reference No",
    accessorFn: (row) => row.RFQ_Reference_Number || "-",
    size: 150,
  },
  {
    header: "RFQ Current Status",
    accessorFn: (row) => row.RFQ_Current_Status || "-",
    size: 150,
  },
  {
    header: "RFQ End Date",
    accessorFn: (row) => row.RFQ_End_Date || "-",
    size: 150,
  },
  {
    header: "Total Order Value",
    accessorFn: (row) => row.Total_Order_Value || "-",
    size: 150,
  },
  {
    header: "Type Of Project",
    accessorFn: (row) => row.Type_of_Project || "-",
    size: 150,
  },
];

export const PartnerRfqResponseColumnsV1 = [
  {
    header: "ID",
    accessorFn: (row) => row.ID || "-",
    size: 150,
  },
  {
    header: "RFQ Number",
    accessorFn: (row) => row.RFQ_Number || "-",
    size: 150,
  },
  {
    header: "Amount",
    accessorFn: (row) => row.Amount || "-",
    size: 150,
  },
  {
    header: "MF Partner Registration",
    accessorFn: (row) => row?.M_F_PARTNER_REGISTRATION?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Indicate Lead Time",
    accessorFn: (row) =>
      row?.["LEAD_TIME_SAMPLING.Indicate_Lead_Time"]?.[0] || "-",
    size: 150,
  },
  {
    header: "Sample Lead Time",
    accessorFn: (row) =>
      row?.["LEAD_TIME_SAMPLING.Sample_Lead_Time_Details"]?.[0] || "-",
    size: 150,
  },
  {
    header: "PM Email",
    accessorFn: (row) => row?.Manufacturing_RFQ_Form?.zc_display_value || "-",
    size: 150,
  },
];

export const openProjectsColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) => row.Project_Number || "-",
    size: 150,
  },
  {
    header: "Project Title",
    accessorFn: (row) => row.MM_Manager_Project_Title?.value || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const projectTitle = cell.getValue();
      const projectLink = `http://localhost:3000/project-information?recordID=${row.original.ID}`;

      const handleClick = (e) => {
        e.preventDefault();
        // document.getElementById("projectDetailModal").value = row.original.ID;

        // console.log("Selected Project ID:", row.original.ID);
        window.location.href = projectLink;
      };

      return projectTitle !== "-" ? (
        <a
          href={projectLink}
          target="_self"
          rel="noopener noreferrer"
          id="projectDetail"
          data-bs-toggle="modal"
          data-bs-target="#projectDetailModal"
          onClick={handleClick} // Trigger the handler on click
        >
          {projectTitle}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    header: "Project Tracker",
    accessorFn: (row) => {
      const projectTracker = row.Project_Tracker || "-";
      return extractProjectTracker(projectTracker);
    },
    size: 150,
  },
  {
    header: "Customer Org",
    accessorFn: (row) => row?.Customer_Org?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Project Phase",
    accessorFn: (row) => row?.["Project_Phase_New"] || "-",
    size: 150,
  },
  {
    header: "Total Cost INR",
    accessorFn: (row) => row?.["Total_Cost_INR"] || "-",
    size: 150,
  },
  {
    header: "Partner",
    accessorFn: (row) => row?.Partner || "-",
    size: 150,
  },
];

export const productionProjectsColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) => row.Project_Number || "-",
    size: 150,
  },
  {
    header: "Project Title",
    accessorFn: (row) => row.MM_Manager_Project_Title?.value || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const projectTitle = cell.getValue();
      const projectLink = `http://localhost:3000/project-information?recordID=${row.original.ID}`;

      const handleClick = (e) => {
        e.preventDefault();
        window.location.href = projectLink;
      };

      return projectTitle !== "-" ? (
        <a
          href={projectLink}
          target="_self"
          rel="noopener noreferrer"
          id="projectDetail"
          data-bs-toggle="modal"
          data-bs-target="#projectDetailModal"
          onClick={handleClick}
        >
          {projectTitle}
        </a>
      ) : (
        "-"
      );
    },
  },
  {
    header: "Project Tracker",
    accessorFn: (row) => {
      const projectTracker = row.Project_Tracker || "-";
      return extractProjectTracker(projectTracker);
    },
    size: 150,
  },
  {
    header: "Partner",
    accessorFn: (row) => row?.Partner || "-",
    size: 150,
  },
  {
    header: "Project Phase",
    accessorFn: (row) => row?.["Project_Phase_New"] || "-",
    size: 150,
  },
  {
    header: "Total Cost INR",
    accessorFn: (row) => row?.["Total_Cost_INR"] || "-",
    size: 150,
  },
  {
    header: "Partner",
    accessorFn: (row) => row?.Partner || "-",
    size: 150,
  },
];

export const onHoldProjectsColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) => row.Project_Number || "-",
    size: 150,
  },
  {
    header: "Project Title",
    accessorFn: (row) => row.Project_Title || "-",
    size: 150,
  },
  {
    header: "Project Tracker",
    accessorFn: (row) => {
      const projectTracker = row.Project_Tracker || "-";
      return extractProjectTracker(projectTracker);
    },
    size: 150,
  },
  {
    header: "Project Category",
    accessorFn: (row) => row?.Project_Category?.[0] || "-",
    size: 150,
  },
  {
    header: "Project Phase",
    accessorFn: (row) => row?.["Project_Phase_New"] || "-",
    size: 150,
  },
  {
    header: "Total Cost INR",
    accessorFn: (row) => row?.["Total_Cost_INR"] || "-",
    size: 150,
  },
  {
    header: "PM Email",
    accessorFn: (row) => row?.Email_MachineMaze || "-",
    size: 150,
  },
];

export const cancelledProjectsColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) => row.Project_Number || "-",
    size: 150,
  },
  {
    header: "Project Title",
    accessorFn: (row) => row.MM_Manager_Project_Title?.value || "-",
    size: 150,
  },
  {
    header: "Project Tracker",
    accessorFn: (row) => {
      const projectTracker = row.Project_Tracker || "-";
      return extractProjectTracker(projectTracker);
    },
    size: 150,
  },
  {
    header: "Customer Org",
    accessorFn: (row) => row?.Customer_Org?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Project Phase",
    accessorFn: (row) => row?.["Project_Phase_New"] || "-",
    size: 150,
  },
  {
    header: "Total Cost INR",
    accessorFn: (row) => row?.["Total_Cost_INR"] || "-",
    size: 150,
  },
  {
    header: "Partner",
    accessorFn: (row) => row?.Partner || "-",
    size: 150,
  },
];

export const upcomingDeliveriesColumnsV1 = [
  {
    header: "Project Number",
    accessorFn: (row) => row.Project_Number || "-",
    size: 150,
  },
  {
    header: "Item Description",
    accessorFn: (row) => row.Item_Description_Item_Part_No || "-",
    size: 150,
  },
  {
    header: "Qty",
    accessorFn: (row) => row.Qty || "-",
    size: 150,
  },
  {
    header: "Delivery Date",
    accessorFn: (row) => row?.Delivery_Date || "-",
    size: 150,
  },
  {
    header: "Delivery Status",
    accessorFn: (row) => row?.["Delivery_Status"] || "-",
    size: 150,
  },
];

export const QualityCheckColumnsV1 = [
  {
    header: "Inspection_Status",
    accessorFn: (row) => row.Inspection_Status || "-",
    size: 150,
  },
  {
    header: "Schedule Date",
    accessorFn: (row) => row.Schedule_Date_of_QC || "-",
    size: 150,
  },
  {
    header: "Schedule Time",
    accessorFn: (row) => row.Schedule_Time_Of_QC || "-",
    size: 150,
  },
  {
    header: "Project Phase",
    accessorFn: (row) => row?.Project_Phase || "-",
    size: 150,
  },
  {
    header: "Assembly Drawing",
    accessorFn: (row) => row.Component_Assembly_Drawing || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const ZohoLinkUrl = cell.getValue();
      const linkUrl = constructLinkUrl(
        ZohoLinkUrl,
        AppNames.PM,
        ReportNameLists.projectManagement.qualityCheck,
        row.original.ID,
        "Component_Assembly_Drawing",
        publishedUrls.projectManagement.qualityCheck
      );
      return linkUrl;
    },
  },
  {
    header: "VMS Report",
    accessorFn: (row) => row.VMS_Report_Upload || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const ZohoLinkUrl = cell.getValue();
      const linkUrl = constructLinkUrl(
        ZohoLinkUrl,
        AppNames.PM,
        ReportNameLists.projectManagement.qualityCheck,
        row.original.ID,
        "VMS_Report_Upload",
        publishedUrls.projectManagement.qualityCheck
      );
      return linkUrl || "-";
    },
  },
  {
    header: "Quality Report",
    accessorFn: (row) => row.Upload_Quality_Report || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const ZohoLinkUrl = cell.getValue();
      const linkUrl = constructLinkUrl(
        ZohoLinkUrl,
        AppNames.PM,
        ReportNameLists.projectManagement.qualityCheck,
        row.original.ID,
        "Upload_Quality_Report",
        publishedUrls.projectManagement.qualityCheck
      );
      return linkUrl || "-";
    },
  },
  {
    header: "Location of QC",
    accessorFn: (row) => row?.Location_of_QC?.zc_display_value || "-",
    size: 150,
  },
];

export const vendorPosColumnsV1 = [
  {
    header: "PO NO",
    accessorFn: (row) => row.PO_No || "-",
    size: 150,
  },
  {
    header: "Name of Org",
    accessorFn: (row) => row.Name_of_Partner_Organization || "-",
    size: 150,
  },
  {
    header: "Customer PO",
    accessorFn: (row) => row.Customer_PO?.PO_Number || "-",
    size: 150,
  },
  {
    header: "Indicative Margin",
    accessorFn: (row) => row?.Indicative_Margin || "-",
    size: 150,
  },
  {
    header: "TYPE",
    accessorFn: (row) => row?.["TYPE"] || "-",
    size: 150,
  },
  {
    header: "Approval Status",
    accessorFn: (row) => row?.Approval_Status || "-",
    size: 150,
  },
  {
    header: "PO Status",
    accessorFn: (row) => row?.PO_Status || "-",
    size: 150,
  },
  {
    header: "Item Details",
    accessorFn: (row) =>
      row?.Item_Details?.[0]?.Link_Part_name?.Part_Name || "-",
    size: 150,
  },
  {
    header: "Date",
    accessorFn: (row) => row?.Date_field1 || "-",
    size: 150,
  },
  {
    header: "GST No",
    accessorFn: (row) => row?.GST_No || "-",
    size: 150,
  },
  {
    header: "Address of Org",
    accessorFn: (row) =>
      row?.Address_of_Partner_Organization?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Contact Person",
    accessorFn: (row) => row?.Contact_Person?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Contact Email",
    accessorFn: (row) => row?.Contact_Email_ID || "-",
    size: 150,
  },
  {
    header: "Contact No",
    accessorFn: (row) => row?.Contact_No || "-",
    size: 150,
  },
  {
    header: "Link MM Project",
    accessorFn: (row) => row?.Link_MM_Project?.zc_display_value || "-",
    size: 150,
  },
  // {
  //   header: 'Name of Buyer',
  //   accessorFn: (row) => {
  //     const buyer = row?.Name_of_Buyer_Details;
  //     return buyer ? `${buyer.prefix || ''} ${buyer.first_name || ''} ${buyer.last_name || ''} ${buyer.suffix || ''}`.trim() || "-" : "-";
  //   },
  //   size: 150,
  // },
  // {
  //   header: 'Email of Buyer',
  //   accessorFn: (row) => row?.Email_of_Buyer_Detail || "-",
  //   size: 150
  // },
  // {
  //   header: 'Delivery Address',
  //   accessorFn: (row) => row?.Delivery_Address.zc_display_value || "-",
  //   size: 150
  // },
  // {
  //   header: 'Billing Address',
  //   accessorFn: (row) => row?.Billing_Address.zc_display_value || "-",
  //   size: 150
  // },
  {
    header: "IncoTerms",
    accessorFn: (row) => row?.IncoTerms || "-",
    size: 150,
  },
  {
    header: "Payment Terms",
    accessorFn: (row) => row?.Payment_Terms || "-",
    size: 150,
  },
  {
    header: "Total Quantity",
    accessorFn: (row) => row?.Total_Quantity || "-",
    size: 150,
  },
  {
    header: "PO Value",
    accessorFn: (row) => row?.Purchases?.[0]?.Purchase_Order_Total_INR || "-",
    size: 150,
  },
  {
    header: "Sub Total",
    accessorFn: (row) => row?.Sub_Total_Before_Tax || "-",
    size: 150,
  },
  {
    header: "PO Balance",
    accessorFn: (row) => row?.PO_Balance || "-",
    size: 150,
  },
];

export const vendorinvoicesColumnsV1 = [
  {
    header: "Payment Status",
    accessorFn: (row) => row.Payment_Ststus || "-",
    size: 150,
  },
  {
    header: "Type",
    accessorFn: (row) => row.Type || "-",
    size: 150,
  },
  {
    header: "Project Details",
    accessorFn: (row) => row.Project_Details?.[0]?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Partner Org Name",
    accessorFn: (row) => row?.Partner_Organization_Name || "-",
    size: 150,
  },
  {
    header: "Invoice Date",
    accessorFn: (row) => row?.Invoice_Date || "-",
    size: 150,
  },
  {
    header: "Invoice Number",
    accessorFn: (row) => row?.Invoice_Number || "-",
    size: 150,
  },
  {
    header: "Sub Total",
    accessorFn: (row) => row?.Sub_Total_Before_tax || "-",
    size: 150,
  },
  {
    header: "IGST",
    accessorFn: (row) => row?.IGST_on_Invoice || "-",
    size: 150,
  },
  {
    header: "CGST",
    accessorFn: (row) => row?.CGST_on_Invoice || "-",
    size: 150,
  },
  {
    header: "SGST",
    accessorFn: (row) => row?.SGST_on_Invoice || "-",
    size: 150,
  },
  {
    header: "Total Tax",
    accessorFn: (row) => row?.Total_Tax_Sum_CGST_SGST_IGST || "-",
    size: 150,
  },
  {
    header: "Actual Amount",
    accessorFn: (row) => row?.Actual_Amount_Invoice_Amount_Balance || "-",
    size: 150,
  },
  {
    header: "Invoice",
    accessorFn: (row) => row.Upload_Invoice_Jpeg_PDF_Word_Exce || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const ZohoLinkUrl = cell.getValue();
      const linkUrl = constructLinkUrl(
        ZohoLinkUrl,
        AppNames.PA,
        ReportNameLists.purchaseManagement.viewVendorInvoices,
        row.original.ID,
        "Upload_Invoice_Jpeg_PDF_Word_Exce",
        publishedUrls.purchaseManagement.viewVendorInvoices
      );
      return linkUrl || "-";
    },
  },
  {
    header: "Search for MM PO",
    accessorFn: (row) => row?.Search_for_MM_PO.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Customer Org",
    accessorFn: (row) =>
      row?.["Project_Details.Customer_Org"]?.[0]?.zc_display_value || "-",
    size: 150,
  },
];

export const viewPaymentsColumnsV1 = [
  {
    header: "Status",
    accessorFn: (row) => row.Status || "-",
    size: 150,
  },
  {
    header: "Recipient Name",
    accessorFn: (row) => row.Recipient_Name || "-",
    size: 150,
  },
  {
    header: "Date of Entry",
    accessorFn: (row) => row?.Date_of_Entry || "-",
    size: 150,
  },
  {
    header: "Type of Payee",
    accessorFn: (row) => row?.Type_of_Payee || "-",
    size: 150,
  },
  {
    header: "Payment Purpose",
    accessorFn: (row) => row?.Purpose_of_Payment || "-",
    size: 150,
  },
  {
    header: "Amount Proposed",
    accessorFn: (row) => row?.Amount_Proposed || "-",
    size: 150,
  },
  {
    header: "Payment Type",
    accessorFn: (row) => row?.Type_of_Payment || "-",
    size: 150,
  },
  {
    header: "Proposed Payment Date",
    accessorFn: (row) => row?.Proposed_Payment_Date || "-",
    size: 150,
  },
  {
    header: "Remarks",
    accessorFn: (row) => row?.Remarks || "-",
    size: 150,
  },
  {
    header: "Attachment 1",
    accessorFn: (row) => row.Attachment_1 || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const ZohoLinkUrl = cell.getValue();
      const linkUrl = constructLinkUrl(
        ZohoLinkUrl,
        AppNames.PAY,
        ReportNameLists.purchaseManagement.viewPayments,
        row.original.ID,
        "Attachment_1",
        publishedUrls.purchaseManagement.viewPayments
      );
      return linkUrl || "-";
    },
  },
  {
    header: "Attachment 2",
    accessorFn: (row) => row.Attachment_2 || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const ZohoLinkUrl = cell.getValue();
      const linkUrl = constructLinkUrl(
        ZohoLinkUrl,
        AppNames.PAY,
        ReportNameLists.purchaseManagement.viewPayments,
        row.original.ID,
        "Attachment_2",
        publishedUrls.purchaseManagement.viewPayments
      );
      return linkUrl || "-";
    },
  },
  {
    header: "Attachment 3",
    accessorFn: (row) => row.Attachment_3 || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const ZohoLinkUrl = cell.getValue();
      const linkUrl = constructLinkUrl(
        ZohoLinkUrl,
        AppNames.PAY,
        ReportNameLists.purchaseManagement.viewPayments,
        row.original.ID,
        "Attachment_3",
        publishedUrls.purchaseManagement.viewPayments
      );
      return linkUrl || "-";
    },
  },
  {
    header: "Remarks Accounts",
    accessorFn: (row) => row?.Remarks_Accounts || "-",
    size: 150,
  },
  {
    header: "Additional Attachment",
    accessorFn: (row) => row?.Additional_Attachment || "-",
    size: 150,
  },
  {
    header: "Added User",
    accessorFn: (row) => row?.Added_User || "-",
    size: 150,
  },
];

export const viewDrawingsColumnV1 = [
  {
    header: "Image",
    accessorFn: (row) => row.Upload_Image || "-",
    size: 150,
    Cell: ({ cell, row }) => {
      const imageZohoUrl = cell.getValue();
      const imageUrl = constructImageUrl(
        imageZohoUrl,
        AppNames.DV,
        ReportNameLists.drawingVersion.viewDrawings,
        row.original.ID,
        "Upload_Image",
        publishedUrls.drawingVersion.viewDrawings
      );
      return imageUrl;
    },
  },
  {
    header: "Project Details",
    accessorFn: (row) =>
      "Project No : " +
        row?.Machine_Maze_Project_Tracking?.Project_Number +
        "Project Title : " +
        row?.Machine_Maze_Project_Tracking?.Project_Title || "-",
    size: 150,
  },
  {
    header: "Customer Part NO",
    accessorFn: (row) => row?.Customer_Part_Number || "-",
    size: 150,
  },
  {
    header: "Version Control",
    accessorFn: (row) => row?.Version_Control?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "File Upload",
    accessorFn: (row) => row?.File_upload || "-",
    size: 150,
  },
  {
    header: "PM Email",
    accessorFn: (row) => row?.Email_of_Project_Manager || "-",
    size: 150,
  },
];

export const viewAssetsColumnV1 = [
  {
    header: "Part Name",
    accessorFn: (row) => row?.PART_NAME || "-",
    size: 150,
  },
  {
    header: "Customer",
    accessorFn: (row) => row?.CUSTOMER?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Partner",
    accessorFn: (row) => row?.PARTNER?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Pattern Making Date",
    accessorFn: (row) => row?.PATTERN_MAKING_DATE || "-",
    size: 150,
  },
  {
    header: "Actual Cost",
    accessorFn: (row) => row?.ACTUAL_COST || "-",
    size: 150,
  },
  {
    header: "Age in Days",
    accessorFn: (row) => row?.AGE || "-",
    size: 150,
  },
  {
    header: "Pattern Material",
    accessorFn: (row) => row?.PATTERN_MATERIAL || "-",
    size: 150,
  },
  {
    header: "Current Cost",
    accessorFn: (row) => row?.CURRENT_COST || "-",
    size: 150,
  },
  {
    header: "Pattern Qty Set",
    accessorFn: (row) => row?.PATTERN_QTY_SET1 || "-",
    size: 150,
  },
  {
    header: "No of Cavity",
    accessorFn: (row) => row?.NO_OF_CAVITY_CORE_BOX1 || "-",
    size: 150,
  },
  {
    header: "Core Box Material",
    accessorFn: (row) => row?.CORE_BOX_MATERIAL || "-",
    size: 150,
  },
  {
    header: "No of Core Box Qty",
    accessorFn: (row) => row?.NO_OF_CORE_BOX_QTY_SET1 || "-",
    size: 150,
  },
  {
    header: "Pattern Life Qty",
    accessorFn: (row) => row?.PATTERN_LIFE_QTY || "-",
    size: 150,
  },
  {
    header: "Sand Process Type",
    accessorFn: (row) => row?.SAND_PROCESS_TYPE || "-",
    size: 150,
  },
  {
    header: "Casting Grade",
    accessorFn: (row) => row?.CASTING_GRADE || "-",
    size: 150,
  },
  {
    header: "Process Type",
    accessorFn: (row) => row?.PROCESS_TYPE || "-",
    size: 150,
  },
  {
    header: "Production Completed Qty NO",
    accessorFn: (row) => row?.NO_OF_PRODUCTION_COMPLETE_QTY || "-",
    size: 150,
  },
  {
    header: "Balance Production Qty",
    accessorFn: (row) => row?.BALANCE_PRODUCTION_QTY || "-",
    size: 150,
  },
  {
    header: "Pattern Revalidation",
    accessorFn: (row) => row?.PATTERN_REVALIDATION || "-",
    size: 150,
  },
  {
    header: "Remarks",
    accessorFn: (row) => row?.REMARKS || "-",
    size: 150,
  },
];

export const viewVisitColumnV1 = [
  // {
  //   header: "Project Manager",
  //   accessorFn: (row) => row?.Project_Manager?.zc_display_value || "-",
  //   size: 150,
  // },
  {
    header: "Visit Purpose",
    accessorFn: (row) => row?.Visit_purpose || "-",
    size: 150,
  },
  {
    header: "If Vendor Name",
    accessorFn: (row) => row?.If_other_enter_Vendor_Name || "-",
    size: 150,
  },
  {
    header: "Visit Date",
    accessorFn: (row) => row?.Date_of_Visit1 || "-",
    size: 150,
  },
  {
    header: "Visit Remarks Outcome",
    accessorFn: (row) => row?.Remarks_Outcome_of_Visit || "-",
    size: 150,
  },
  {
    header: "Vendor Org",
    accessorFn: (row) => row?.Vendor_Organisation_Name?.zc_display_value || "-",
    size: 150,
  },
  {
    header: "Customer Org",
    accessorFn: (row) =>
      row?.Customer_Organisation?.Customer_Organisation || "-",
    size: 150,
  },
  {
    header: "If Customer name",
    accessorFn: (row) => row?.If_other_enter_Customer_name || "-",
    size: 150,
  },
  {
    header: "Type",
    accessorFn: (row) => row?.Type_field || "-",
    size: 150,
  },
];
