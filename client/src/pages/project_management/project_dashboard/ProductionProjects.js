// ProductionRfqs.js
import React from 'react';
import Table from '../../../components/tables/DataTablesV1';
import { productionProjectsColumnsV1 } from '../../../components/columns/AllColumnsV1';
import useFetchReportData from '../../../components/hooks/fetchReportData';
import { APILinkRoutes } from '../../../components/apiLinks/APILinkRoutes';

const ProductionProjects = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.ProductionProjectsRoute);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && <Table data={data} columns={productionProjectsColumnsV1} />}
    </div>
  );
};

export default ProductionProjects;
