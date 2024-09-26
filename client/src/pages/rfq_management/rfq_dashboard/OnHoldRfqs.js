// OnHoldRfq.js
import React from 'react';
import Table from '../../../components/tables/DataTablesV1';
import { onHoldRfqsColumnsV1 } from '../../../components/columns/AllColumnsV1';
import useFetchReportData from '../../../components/hooks/fetchReportData';
import { APILinkRoutes } from '../../../components/apiLinks/APILinkRoutes';

const OnHoldRfqs = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.OnHoldRFQsRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={onHoldRfqsColumnsV1} />}
    </div>
  );
};

export default OnHoldRfqs;
