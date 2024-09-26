// OnHoldRfqs.js
import React from 'react';
import Table from '../../../components/tables/DataTablesV1';
import { onHoldProjectsColumnsV1 } from '../../../components/columns/AllColumnsV1';
import useFetchReportData from '../../../components/hooks/fetchReportData'; 
import { APILinkRoutes } from '../../../components/apiLinks/APILinkRoutes';

const OnHoldProjects = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.OnHoldProjectsRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={onHoldProjectsColumnsV1} />}
    </div>
  );
};

export default OnHoldProjects;
