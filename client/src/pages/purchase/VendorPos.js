// VendorPos.js
import React from 'react';
import Table from '../../components/tables/DataTablesV1';
import { vendorPosColumnsV1 } from '../../components/columns/AllColumnsV1';
import useFetchReportData from '../../components/hooks/fetchReportData';
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const VendorPos = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.VendorPosRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={vendorPosColumnsV1} Title={RouteTitles.VendorPosRouteTitle} />}
    </div>
  );
};

export default VendorPos;
