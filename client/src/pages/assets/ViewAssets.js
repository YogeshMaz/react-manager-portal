// ViewAssests.js
import React from 'react';
import Table from '../../components/tables/DataTablesV1';
import { viewAssetsColumnV1 } from '../../components/columns/AllColumnsV1'; 
import useFetchReportData from '../../components/hooks/fetchReportData'; 
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const ViewAssets = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.ViewAssetsRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={viewAssetsColumnV1} Title={RouteTitles.ViewAssetsRouteTitle} />}
    </div>
  );
};

export default ViewAssets;

