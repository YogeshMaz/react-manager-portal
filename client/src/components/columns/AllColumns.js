// columns.js

// Define columns for different RFQ tables

export const CustomerRFQsColumns = [
  { Header: 'RFQ Start Date', accessor: 'RFQ_Start_Date' },
  { Header: 'RFQ End Date', accessor: 'RFQ_End_Date' },
  { Header: 'RFQ Reference Number', accessor: 'RFQ_Reference_Number' },
  { Header: 'Customer Email', accessor: 'Customer_Email' },
  { Header: 'RFQ Current Status', accessor: 'RFQ_Current_Status' },
  { Header: 'Brief Description of the Project', accessor: 'Brief_Description_of_the_Project' },
];

export const openRfqsColumns = [
    { Header: 'ID', accessor: 'ID' },
    { Header: 'RFQ Current Status', accessor: 'RFQ_Current_Status' },
    { Header: 'Customer RFQ', accessor: 'Customer_RFQ' },
    { Header: 'RFQ Start Date', accessor: 'RFQ_Start_Date' },
    { Header: 'RFQ End Date', accessor: 'RFQ_End_Date' },
    { Header: 'Project Number', accessor: 'Project_Number' },
    { Header: 'Project Title', accessor: 'Project_Title' },
    { Header: 'Total Order', accessor: 'Total_Order' },
  ];
  
  export const postEvaluationRfqsColumns = [
    // Defined columns specific to Post Evaluation RFQs
    { Header: 'ID', accessor: 'ID' },
    { Header: 'RFQ Current Status', accessor: 'RFQ_Current_Status' },
    { Header: 'Customer RFQ', accessor: 'Customer_RFQ' },
    { Header: 'RFQ Start Date', accessor: 'RFQ_Start_Date' },
    { Header: 'RFQ End Date', accessor: 'RFQ_End_Date' },
    { Header: 'Project Number', accessor: 'Project_Number' },
    { Header: 'Project Title', accessor: 'Project_Title' },
    { Header: 'Total Order', accessor: 'Total_Order' },
  ];
  
  export const onHoldRfqsColumns = [
    // Define columns specific to On Hold RFQs
    { Header: 'ID', accessor: 'ID' },
    { Header: 'RFQ Current Status', accessor: 'RFQ_Current_Status' },
    { Header: 'Customer RFQ', accessor: 'Customer_RFQ' },
    { Header: 'RFQ Start Date', accessor: 'RFQ_Start_Date' },
    { Header: 'RFQ End Date', accessor: 'RFQ_End_Date' },
    { Header: 'Project Number', accessor: 'Project_Number' },
    { Header: 'Project Title', accessor: 'Project_Title' },
    { Header: 'Total Order', accessor: 'Total_Order' },
  ];
  
  export const closedRfqsColumns = [
    // Define columns specific to Closed/Cancelled RFQs
    { Header: 'ID', accessor: 'ID' },
    { Header: 'RFQ Current Status', accessor: 'RFQ_Current_Status' },
    { Header: 'Customer RFQ', accessor: 'Customer_RFQ' },
    { Header: 'RFQ Start Date', accessor: 'RFQ_Start_Date' },
    { Header: 'RFQ End Date', accessor: 'RFQ_End_Date' },
    { Header: 'Project Number', accessor: 'Project_Number' },
    { Header: 'Project Title', accessor: 'Project_Title' },
    { Header: 'Total Order', accessor: 'Total_Order' },
  ];

  export const PartnerRfqResponseColumns = [
    { Header: 'ID', accessor: 'ID' },
    { Header: 'RFQ Number', accessor: 'RFQ_Number' },
    { Header: 'Amount', accessor: 'Amount' },
    { Header: 'MF Partner Registration', accessor: row => row.M_F_PARTNER_REGISTRATION?.zc_display_value || '' },
    { Header: 'Indicate Lead Time', accessor: row => row.LEAD_TIME_SAMPLING?.Indicate_Lead_Time || '' },
    { Header: 'Sample Lead Time', accessor: row => row.LEAD_TIME_SAMPLING?.Sample_Lead_Time_Details || '' },
    { Header: 'PM Email', accessor: row => row.Manufacturing_RFQ_Form?.zc_display_value || '' },
  ];
  
  
  