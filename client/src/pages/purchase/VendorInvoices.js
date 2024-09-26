// VendorInvoices.js
import React from 'react';
import Table from '../../components/tables/DataTablesV1';
import { vendorinvoicesColumnsV1 } from '../../components/columns/AllColumnsV1';
import useFetchReportData from '../../components/hooks/fetchReportData';
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const VendorInvoicess = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.VendorInvoicessRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={vendorinvoicesColumnsV1} Title={RouteTitles.VendorInvoicessRouteTitle} />}
    </div>
  );
};

export default VendorInvoicess;
