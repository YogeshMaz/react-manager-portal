// QualityCheck.js
import React from 'react';
import Table from '../../components/tables/DataTablesV1';
import { QualityCheckColumnsV1 } from '../../components/columns/AllColumnsV1';
import useFetchReportData from '../../components/hooks/fetchReportData';
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const QualityCheck = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.QualityCheckRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={QualityCheckColumnsV1} Title={RouteTitles.QualityCheckRouteTitle} />}
    </div>
  );
};

export default QualityCheck;
