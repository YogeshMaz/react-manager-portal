// RequestViewPayments.js
import React from 'react';
import Table from '../../components/tables/DataTablesV1';
import { viewPaymentsColumnsV1 } from '../../components/columns/AllColumnsV1';
import useFetchReportData from '../../components/hooks/fetchReportData';
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const RequestViewPayments = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.RequestViewPaymentsRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={viewPaymentsColumnsV1} Title={RouteTitles.RequestViewPaymentsRouteTitle} />}
    </div>
  );
};

export default RequestViewPayments;

