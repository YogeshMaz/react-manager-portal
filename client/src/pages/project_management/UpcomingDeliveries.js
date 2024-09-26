// UpcomingDeliveries.js
import React from 'react';
import Table from '../../components/tables/DataTablesV1';
import { upcomingDeliveriesColumnsV1 } from '../../components/columns/AllColumnsV1';
import useFetchReportData from '../../components/hooks/fetchReportData';
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const UpcomingDeliveries = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.UpcomingDeliveriesRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={upcomingDeliveriesColumnsV1} Title={RouteTitles.UpcomingDeliveriesRouteTitle} />}
    </div>
  );
};

export default UpcomingDeliveries;
