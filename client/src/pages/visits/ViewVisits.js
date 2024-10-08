// VendorPos.js
import React from 'react';
// import DataTable from '../../../components/tables/DataTables'; // Make sure the path is correct
import Table from '../../components/tables/DataTablesV1';
import { viewVisitColumnV1 } from '../../components/columns/AllColumnsV1'; // Import columns from your column definitions
import useFetchReportData from '../../components/hooks/fetchReportData'; // Adjust the import path as needed
const apiUrl = process.env.REACT_APP_LOCALHOST;

const ViewVisits = () => {
  const { data, error, noData } = useFetchReportData(apiUrl + "/api/visit/view_visits");

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={viewVisitColumnV1} Title={"View Visits"} />}
    </div>
  );
};

export default ViewVisits;

