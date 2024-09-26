// CancelledRfqs.js
import React from 'react';
import Table from '../../../components/tables/DataTablesV1';
import { cancelledProjectsColumnsV1 } from '../../../components/columns/AllColumnsV1';
import useFetchReportData from '../../../components/hooks/fetchReportData';
import { APILinkRoutes } from '../../../components/apiLinks/APILinkRoutes';

const CancelledProjects = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.CancelledProjectsRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={cancelledProjectsColumnsV1} />}
    </div>
  );
};

export default CancelledProjects;
