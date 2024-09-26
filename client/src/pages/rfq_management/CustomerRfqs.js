// // CustomerRFQs.js
import Table from '../../components/tables/DataTablesV1';
import { CustomerRFQsColumnsV1 } from '../../components/columns/AllColumnsV1';
import useFetchReportData from "../../components/hooks/fetchReportData";
import { APILinkRoutes, RouteTitles } from '../../components/apiLinks/APILinkRoutes';

const CustomerRFQs = () => {
  const { data, error, noData } = useFetchReportData(APILinkRoutes.CustomerRFQsRoute);
  
  // Flatten the data if it's nested within arrays
  const flattenedData = data ? data.flat() : [];

  // console.log("Fetched Data: ", flattenedData);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {noData && <div>No data available</div>}
      {!error && !noData && 
        <Table 
          data={flattenedData} 
          columns={CustomerRFQsColumnsV1} 
          Title={RouteTitles.CustomerRFQsRouteTitle} 
        />
      }
    </div>
  );
};

export default CustomerRFQs;
