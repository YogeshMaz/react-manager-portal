// ViewDrawings.js
import React from 'react';
import Table from '../../components/tables/DataTablesV1';
import { viewDrawingsColumnV1 } from '../../components/columns/AllColumnsV1';
import useFetchReportData from '../../components/hooks/fetchReportData';
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const ViewDrawings = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.ViewDrawingRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={viewDrawingsColumnV1} Title={RouteTitles.ViewDrawingRouteTitle} />}
    </div>
  );
};

export default ViewDrawings;

